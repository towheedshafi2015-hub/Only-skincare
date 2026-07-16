import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: string
  title: string
  price: number
  img: string
  quantity: number
  variantTitle?: string
}

interface CartContextType {
  cartItems: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, q: number) => void
  cartCount: number
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem('os_cart')
    if (saved) {
      try {
        setCartItems(JSON.parse(saved))
      } catch (e) {
        console.error('Error parsing cart from storage', e)
      }
    }
  }, [])

  // Save cart to localStorage on change
  const saveCart = (items: CartItem[]) => {
    setCartItems(items)
    localStorage.setItem('os_cart', JSON.stringify(items))
  }

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    const items = [...cartItems]
    const existing = items.find((item) => item.id === newItem.id)

    if (existing) {
      existing.quantity += 1
    } else {
      items.push({ ...newItem, quantity: 1 })
    }

    saveCart(items)
    setIsOpen(true) // Automatically open drawer on add
  }

  const removeItem = (id: string) => {
    const items = cartItems.filter((item) => item.id !== id)
    saveCart(items)
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    const items = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    )
    saveCart(items)
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
