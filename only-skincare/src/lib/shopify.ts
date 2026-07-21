// ── Shopify Storefront API Client ─────────────────────────────────────────
// Single source of truth for all Shopify API calls.
// Credentials come from environment variables (never hardcoded).

const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string
const API_VERSION = '2024-01'

export const STOREFRONT_URL = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`

/** Generic Shopify Storefront GraphQL fetch */
export async function shopifyFetch<T = unknown>({
  query,
  variables,
}: {
  query: string
  variables?: Record<string, unknown>
}): Promise<T> {
  const res = await fetch(STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()

  if (json.errors?.length) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '))
  }

  return json as T
}

// ── GraphQL Fragments ─────────────────────────────────────────────────────

export const CART_FIELDS = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              priceV2 { amount currencyCode }
              product {
                title
                images(first: 1) { edges { node { url } } }
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount { amount currencyCode }
    }
  }
`

// ── Cart Mutations ────────────────────────────────────────────────────────

export const CART_CREATE_MUTATION = `
  ${CART_FIELDS}
  mutation cartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`

export const CART_LINES_ADD_MUTATION = `
  ${CART_FIELDS}
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`

export const CART_LINES_UPDATE_MUTATION = `
  ${CART_FIELDS}
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`

export const CART_LINES_REMOVE_MUTATION = `
  ${CART_FIELDS}
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`

// ── Types ─────────────────────────────────────────────────────────────────

export interface ShopifyCartLine {
  id: string           // line item ID (used for update/remove)
  quantity: number
  variantId: string
  variantTitle: string
  title: string
  price: number
  img: string
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: ShopifyCartLine[]
  subtotal: number
}

/** Parse the raw GraphQL Cart object into our clean ShopifyCart shape */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseCart(raw: any): ShopifyCart {
  const lines: ShopifyCartLine[] = (raw.lines?.edges || []).map((e: any) => {
    const node = e.node
    const variant = node.merchandise
    return {
      id: node.id,
      quantity: node.quantity,
      variantId: variant.id,
      variantTitle: variant.title,
      title: variant.product.title,
      price: parseFloat(variant.priceV2.amount),
      img: variant.product.images?.edges[0]?.node?.url || '',
    }
  })

  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    lines,
    subtotal: parseFloat(raw.cost?.subtotalAmount?.amount || '0'),
  }
}
