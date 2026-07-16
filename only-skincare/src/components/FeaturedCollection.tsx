import { useEffect, useState } from 'react'
import { Star, ShoppingBag, Loader2, Sparkles } from 'lucide-react'
import { useCart } from '../context/CartContext'

interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  price: number
  img: string
  badge?: string
  rating: number
  reviewsCount: number
}

// Fallback pricing for products that have 0.0 in Shopify
const REAL_PRICES: Record<string, number> = {
  'only-skincare-spf-50-pa-dermatologist-tested-sunscreen': 749,
  'nighttime-recovery-cream': 849,
}

// Custom handpicked badges for styling
const BRAND_BADGES: Record<string, string> = {
  'only-skincare-spf-50-pa-dermatologist-tested-sunscreen': 'Best Seller',
  'only-skincare-nourishing-cleansing-oil': 'New Launch',
  'clarifying-exfoliating-toner': 'Dermatologist Approved',
  'nighttime-recovery-cream': 'Intensive Hydration',
}

const RATING_VALS: Record<string, { rating: number; count: number }> = {
  'only-skincare-spf-50-pa-dermatologist-tested-sunscreen': { rating: 4.9, count: 184 },
  'only-skincare-nourishing-cleansing-oil': { rating: 4.8, count: 96 },
  'clarifying-exfoliating-toner': { rating: 4.7, count: 112 },
  'nighttime-recovery-cream': { rating: 4.9, count: 148 },
}

export default function FeaturedCollection() {
  const { addItem } = useCart()
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [addingId, setAddingId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      const url = 'https://onlyskincareofficial.myshopify.com/api/2024-01/graphql.json'
      const query = `
        {
          products(first: 4) {
            edges {
              node {
                id
                title
                handle
                description
                variants(first: 1) {
                  edges {
                    node {
                      id
                      price {
                        amount
                      }
                    }
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      `

      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': '38fea3ad93a39bbcf4072ee13ac04eee',
          },
          body: JSON.stringify({ query }),
        })
        const json = await res.json()
        const edges = json.data?.products?.edges || []

        const mapped: ShopifyProduct[] = edges.map((edge: any) => {
          const node = edge.node
          const rawPrice = parseFloat(node.variants?.edges[0]?.node?.price?.amount || '0')
          
          // Override 0.0 with realistic fallbacks, otherwise use storefront price
          const price = rawPrice === 0 ? (REAL_PRICES[node.handle] || 699) : rawPrice
          const img = node.images?.edges[0]?.node?.url || 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600'
          const ratingData = RATING_VALS[node.handle] || { rating: 4.8, count: 42 }

          return {
            id: node.id,
            title: node.title,
            handle: node.handle,
            description: node.description,
            price,
            img,
            badge: BRAND_BADGES[node.handle],
            rating: ratingData.rating,
            reviewsCount: ratingData.count,
          }
        })

        setProducts(mapped)
      } catch (err) {
        console.error('Error fetching Shopify products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleQuickAdd = (product: ShopifyProduct) => {
    setAddingId(product.id)
    setTimeout(() => {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.img,
      })
      setAddingId(null)
    }, 850) // Premium lag/confirm sequence
  }

  return (
    <section className="fc-section">
      <div className="container-os">
        
        {/* Header Stack */}
        <div className="fc-header text-center">
          <div className="fc-eyebrow">
            <Sparkles size={12} className="inline mr-2 text-gold animate-pulse" />
            The Best Sellers
          </div>
          <h2 className="fc-title">
            Formulated for Clinical Efficacy.
          </h2>
          <p className="fc-subtitle">
            Clean ingredients, dermatologically tested, and optimized to transition your skin to its healthiest natural state.
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          /* Loading Skeleton */
          <div className="fc-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="fc-skeleton-card">
                <div className="fc-skeleton-img" />
                <div className="fc-skeleton-line w-[40%] mt-4" />
                <div className="fc-skeleton-line w-[80%] mt-2" />
                <div className="fc-skeleton-line w-[60%] mt-2" />
                <div className="fc-skeleton-btn mt-6" />
              </div>
            ))}
          </div>
        ) : (
          <div className="fc-grid">
            {products.map((p) => (
              <div key={p.id} className="fc-card">
                
                {/* Product Image Frame */}
                <div className="fc-img-frame">
                  <img src={p.img} alt={p.title} className="fc-product-img" />
                  
                  {/* Badge */}
                  {p.badge && (
                    <span className="fc-badge">{p.badge}</span>
                  )}
                </div>

                {/* Info Block */}
                <div className="fc-info">
                  
                  {/* Star Rating */}
                  <div className="fc-rating-row">
                    <div className="fc-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} fill={i < Math.floor(p.rating) ? '#D4B06A' : 'none'} stroke={i < Math.floor(p.rating) ? 'none' : '#B4B4B4'} />
                      ))}
                    </div>
                    <span className="fc-rating-num">{p.rating}</span>
                    <span className="fc-reviews-count">({p.reviewsCount} reviews)</span>
                  </div>

                  {/* Title */}
                  <h3 className="fc-card-title">{p.title}</h3>

                  {/* Price */}
                  <span className="fc-card-price">₹{p.price}</span>

                  {/* Action Button */}
                  <button 
                    className={`btn-primary fc-add-btn ${addingId === p.id ? 'adding' : ''}`}
                    onClick={() => handleQuickAdd(p)}
                    disabled={addingId !== null}
                    aria-label={`Add ${p.title} to cart`}
                  >
                    {addingId === p.id ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>Quick Add</span>
                      </>
                    )}
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
