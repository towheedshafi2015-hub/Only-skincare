import { useEffect, useState, useRef } from 'react'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import '../navbar.css'

/* ─── Nav Items ────────────────────────────────────── */
const NAV_ITEMS = [
  { name: 'Collections', url: '#featured-collection' },
  { name: 'Ritual', url: '#how-it-works' },
  { name: 'Benefits', url: '#product-benefits' },
  { name: 'Results', url: '#customer-results' },
  { name: 'Reviews', url: '#faq-guarantee' }, // Can jump to trust/FAQ section
  { name: 'Contact', url: '#footer' },
]

export default function Navbar() {
  const { cartCount, openCart } = useCart()
  const [activeTab, setActiveTab] = useState(NAV_ITEMS[0].name)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [announcementVisible, setAnnouncementVisible] = useState(true)

  const navRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({})

  // Update scrolled state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate active indicator position dynamically for smooth tubelight slide
  useEffect(() => {
    const activeEl = navRefs.current[activeTab]
    if (activeEl) {
      const { offsetLeft, offsetWidth } = activeEl
      setIndicatorStyle({
        transform: `translateX(${offsetLeft}px)`,
        width: `${offsetWidth}px`,
        opacity: 1,
      })
    } else {
      setIndicatorStyle({ opacity: 0 })
    }
  }, [activeTab])

  // Nav list element
  const setNavRef = (name: string, el: HTMLButtonElement | null) => {
    navRefs.current[name] = el
  }

  const handleNavClick = (name: string, url: string) => {
    setActiveTab(name)
    setMobileMenuOpen(false)
    const element = document.querySelector(url)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* ─── Announcement Bar (Endless scrolling marquee) ─── */}
      {announcementVisible && (
        <div className="ann-bar">
          <div className="ann-bar-marquee">
            <div className="ann-bar-track">
              <span>🚚 Free Shipping above ₹999</span>
              <span>•</span>
              <span>🔄 30 Day Returns</span>
              <span>•</span>
              <span>✨ 20,000+ Happy Customers</span>
              <span>•</span>
              <span>🛡️ 0% complaints</span>
              <span>•</span>
              {/* Duplicate for endless continuous scroll */}
              <span>🚚 Free Shipping above ₹999</span>
              <span>•</span>
              <span>🔄 30 Day Returns</span>
              <span>•</span>
              <span>✨ 20,000+ Happy Customers</span>
              <span>•</span>
              <span>🛡️ 0% complaints</span>
            </div>
          </div>
          <button 
            className="ann-bar-close" 
            onClick={() => setAnnouncementVisible(false)}
            aria-label="Dismiss Announcement"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* ─── Main Navigation Bar ─── */}
      <header className={`navbar-header ${scrolled ? 'nav-scrolled' : ''} ${!announcementVisible ? 'nav-no-ann' : ''}`}>
        <div className="container-os navbar-container">
          
          {/* Logo */}
          <a href="#" className="nav-logo" onClick={() => handleNavClick(NAV_ITEMS[0].name, '#')}>
            <span className="logo-symbol">○</span>
            <span className="logo-text">Only Skincare</span>
          </a>

          {/* Central Tubelight Desktop Nav */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <div className="nav-items-wrapper">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.name}
                  ref={el => { setNavRef(item.name, el) }}
                  className={`nav-tab-btn ${activeTab === item.name ? 'tab-active' : ''}`}
                  onClick={() => handleNavClick(item.name, item.url)}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Dynamic Sliding Tubelight Indicator */}
              <div className="tubelight-indicator" style={indicatorStyle}>
                <div className="tubelight-lamp-glow" />
                <div className="tubelight-lamp-light" />
              </div>
            </div>
          </nav>

          {/* Actions (Search, Cart, Mobile Hamburger) */}
          <div className="nav-actions">
            <button className="action-btn search-btn" aria-label="Search">
              <Search size={16} />
            </button>
            
            <button 
              className="action-btn cart-btn" 
              onClick={openCart} 
              aria-label={`Open Cart (${cartCount} items)`}
            >
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>

            <button 
              className="action-btn mobile-hamburger" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* ─── Mobile Fullscreen Overlay Menu ─── */}
      <div className={`mobile-overlay ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="mobile-overlay-bg" onClick={() => setMobileMenuOpen(false)} />
        <div className="mobile-menu-drawer">
          <div className="mobile-menu-header">
            <span className="mobile-logo">○ Only Skincare</span>
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <nav className="mobile-nav-links">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.name}
                className={`mobile-nav-item ${activeTab === item.name ? 'mobile-active' : ''}`}
                onClick={() => handleNavClick(item.name, item.url)}
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="mobile-nav-num">0{idx + 1}</span>
                <span className="mobile-nav-name">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="mobile-menu-footer">
            <div className="mobile-footer-tag">Luxury Formulations</div>
            <div className="mobile-footer-socials">
              <a href="#">Instagram</a>
              <a href="#">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
