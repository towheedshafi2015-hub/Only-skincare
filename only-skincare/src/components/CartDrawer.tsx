import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { cartItems, isOpen, closeCart, updateQuantity, removeItem, cartTotal } = useCart()

  if (!isOpen) return null

  return (
    <div className="cart-overlay" onClick={closeCart}>
      {/* Drawer Panel */}
      <div 
        className="cart-panel" 
        onClick={(e) => e.stopPropagation()} // Stop click bubbling to keep panel open
      >
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title-wrap">
            <ShoppingBag size={20} className="text-forest" />
            <span className="cart-title">Your Cart</span>
            <span className="cart-count-badge">{cartItems.length}</span>
          </div>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="cart-content">
          {cartItems.length === 0 ? (
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
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.img} alt={item.title} className="cart-item-img" />
                  
                  <div className="cart-item-details">
                    <span className="cart-item-name">{item.title}</span>
                    {item.variantTitle && item.variantTitle !== 'Default Title' && (
                      <span className="cart-item-variant">{item.variantTitle}</span>
                    )}
                    <span className="cart-item-price">₹{item.price * item.quantity}</span>
                    
                    {/* Quantity Selector */}
                    <div className="cart-qty-selector">
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <button 
                    className="cart-item-remove" 
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-val">₹{cartTotal}</span>
            </div>
            <p className="cart-tax-notice">Shipping and taxes calculated at checkout.</p>
            <button 
              className="btn-primary cart-checkout-btn"
              onClick={() => alert('Proceeding to checkout...')}
            >
              Checkout Now
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
