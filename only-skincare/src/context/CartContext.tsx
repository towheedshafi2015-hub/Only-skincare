import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  shopifyFetch,
  parseCart,
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  type ShopifyCart,
  type ShopifyCartLine,
} from '../lib/shopify'

// ── Types ─────────────────────────────────────────────────────────────────

/** What the rest of the app uses when adding to cart */
export interface AddItemPayload {
  variantId: string   // Shopify variant GID  e.g. "gid://shopify/ProductVariant/123"
  title: string
  price: number
  img: string
  variantTitle?: string
}

interface CartContextType {
  cart: ShopifyCart | null
  cartLines: ShopifyCartLine[]
  isOpen: boolean
  loading: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (payload: AddItemPayload) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
  cartCount: number
  cartTotal: number
  checkoutUrl: string
}

// ── Context ───────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_ID_KEY = 'os_shopify_cart_id'

// ── Helper: extract cart from mutation response ───────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractCart(json: any): ShopifyCart | null {
  const data = json.data
  const raw =
    data?.cartCreate?.cart ||
    data?.cartLinesAdd?.cart ||
    data?.cartLinesUpdate?.cart ||
    data?.cartLinesRemove?.cart
  return raw ? parseCart(raw) : null
}

// ── Provider ──────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Restore saved cart ID on mount
  useEffect(() => {
    const savedId = localStorage.getItem(CART_ID_KEY)
    if (savedId) {
      // We have a cart ID but don't re-fetch (keep cart lines from Shopify on next interaction)
      // This is intentional — avoids an extra fetch on every page load.
    }
  }, [])

  const persistCart = (newCart: ShopifyCart) => {
    setCart(newCart)
    localStorage.setItem(CART_ID_KEY, newCart.id)
  }

  // ── addItem ──────────────────────────────────────────────────────────────
  const addItem = useCallback(async (payload: AddItemPayload) => {
    setLoading(true)
    try {
      const existingCartId = localStorage.getItem(CART_ID_KEY)
      const line = { merchandiseId: payload.variantId, quantity: 1 }

      let result: ShopifyCart | null = null

      if (existingCartId) {
        // Cart already exists — add line to it
        const json = await shopifyFetch({
          query: CART_LINES_ADD_MUTATION,
          variables: { cartId: existingCartId, lines: [line] },
        })
        result = extractCart(json)
      }

      if (!result) {
        // No cart yet (or stale cart) — create a fresh one
        const json = await shopifyFetch({
          query: CART_CREATE_MUTATION,
          variables: { lines: [line] },
        })
        result = extractCart(json)
      }

      if (result) {
        persistCart(result)
        setIsOpen(true)
      }
    } catch (err) {
      console.error('[CartContext] addItem error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // ── removeItem ───────────────────────────────────────────────────────────
  const removeItem = useCallback(async (lineId: string) => {
    const cartId = cart?.id || localStorage.getItem(CART_ID_KEY)
    if (!cartId) return
    setLoading(true)
    try {
      const json = await shopifyFetch({
        query: CART_LINES_REMOVE_MUTATION,
        variables: { cartId, lineIds: [lineId] },
      })
      const result = extractCart(json)
      if (result) persistCart(result)
    } catch (err) {
      console.error('[CartContext] removeItem error:', err)
    } finally {
      setLoading(false)
    }
  }, [cart])

  // ── updateQuantity ───────────────────────────────────────────────────────
  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(lineId)
      return
    }
    const cartId = cart?.id || localStorage.getItem(CART_ID_KEY)
    if (!cartId) return
    setLoading(true)
    try {
      const json = await shopifyFetch({
        query: CART_LINES_UPDATE_MUTATION,
        variables: { cartId, lines: [{ id: lineId, quantity }] },
      })
      const result = extractCart(json)
      if (result) persistCart(result)
    } catch (err) {
      console.error('[CartContext] updateQuantity error:', err)
    } finally {
      setLoading(false)
    }
  }, [cart, removeItem])

  // ── Derived values ────────────────────────────────────────────────────────
  const cartLines = cart?.lines ?? []
  const cartCount = cart?.totalQuantity ?? 0
  const cartTotal = cart?.subtotal ?? 0
  const checkoutUrl = cart?.checkoutUrl ?? ''

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLines,
        isOpen,
        loading,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        updateQuantity,
        cartCount,
        cartTotal,
        checkoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
