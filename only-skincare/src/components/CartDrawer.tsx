import { X, Plus, Minus, ShoppingBag, Trash2, Loader2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const {
    cartLines,
    isOpen,
    loading,
    closeCart,
    updateQuantity,
    removeItem,
    cartTotal,
    cartCount,
    checkoutUrl,
  } = useCart()

  if (!isOpen) return null

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl
    }
  }

  return (
    <div className="cart-overlay" onClick={closeCart}>
      {/* Drawer Panel */}
      <div
        className="cart-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title-wrap">
            <ShoppingBag size={20} className="text-forest" />
            <span className="cart-title">Your Cart</span>
            <span className="cart-count-badge">{cartCount}</span>
          </div>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="cart-loading-bar">
            <div className="cart-loading-fill" />
          </div>
        )}

        {/* Content Area */}
        <div className="cart-content">
          {cartLines.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-bag-wrap">
                <ShoppingBag size={48} strokeWidth={1.2} className="text-light-gray animate-bounce" />
              </div>
              <p className="empty-title">Your cart is empty</p>
              <p className="empty-desc">Fill it with science-backed essentials to start your transition.</p>
              <button className="btn-primary mt-6" onClick={closeCart}>Shop Best Sellers</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartLines.map((line) => (
                <div key={line.id} className="cart-item">
                  <img src={line.img} alt={line.title} className="cart-item-img" />

                  <div className="cart-item-details">
                    <span className="cart-item-name">{line.title}</span>
                    {line.variantTitle && line.variantTitle !== 'Default Title' && (
                      <span className="cart-item-variant">{line.variantTitle}</span>
                    )}
                    <span className="cart-item-price">₹{(line.price * line.quantity).toFixed(0)}</span>

                    {/* Quantity Selector — passes line.id (Shopify line GID) */}
                    <div className="cart-qty-selector">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        disabled={loading}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-number">{line.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        disabled={loading}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(line.id)}
                    aria-label="Remove item"
                    disabled={loading}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout */}
        {cartLines.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-val">₹{cartTotal.toFixed(0)}</span>
            </div>
            <p className="cart-tax-notice">Shipping and taxes calculated at checkout.</p>
            <button
              className="btn-primary cart-checkout-btn"
              onClick={handleCheckout}
              disabled={loading || !checkoutUrl}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                'Checkout Now →'
              )}
            </button>
            <button className="cart-continue-btn" onClick={closeCart}>
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
