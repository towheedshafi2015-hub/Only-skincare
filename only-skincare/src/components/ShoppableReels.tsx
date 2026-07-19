import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, X, ShoppingBag, ChevronLeft, ChevronRight, Sparkles, Star, Tag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import '../shoppable-reels.css'

/* ── Reel data ── */
interface Reel {
  id: string
  product: string
  price: number
  mrp: number
  handle: string
  image: string
  benefit: string
  badge?: string
  description: string
  stars: number
  reviews: number
}

const REELS: Reel[] = [
  {
    id: 'only-skincare-spf-50-pa-dermatologist-tested-sunscreen',
    product: 'SPF 50 PA++++',
    price: 749, mrp: 999,
    handle: '@skincare.diaries',
    image: '/products/sunscreen.jpeg',
    benefit: 'Sun Protection',
    badge: 'Best Seller',
    description: 'Lightweight, zero white-cast sunscreen. Dermatologist-tested for Indian skin.',
    stars: 4.9, reviews: 184,
  },
  {
    id: 'only-skincare-nourishing-cleansing-oil',
    product: 'Nourishing Cleansing Oil',
    price: 649, mrp: 899,
    handle: '@glowwithme_in',
    image: '/products/cleansing-oil.jpeg',
    benefit: 'Deep Cleanse',
    description: 'Melts away makeup, SPF, and impurities without stripping your skin barrier.',
    stars: 4.8, reviews: 96,
  },
  {
    id: 'only-skincare-luxury-moisturiser',
    product: 'Luxury Moisturiser',
    price: 849, mrp: 1199,
    handle: '@skintok.india',
    image: '/products/moisturizer.jpeg',
    benefit: 'Deep Hydration',
    badge: 'New Launch',
    description: 'Clinically formulated with Hyaluronic Acid + Niacinamide for 72-hour hydration.',
    stars: 4.9, reviews: 148,
  },
  {
    id: 'clarifying-exfoliating-toner',
    product: 'Clarifying Toner',
    price: 599, mrp: 799,
    handle: '@derma.routine',
    image: '/products/toner.jpeg',
    benefit: 'Pore Refinement',
    badge: 'Dermat Approved',
    description: 'AHA/BHA blend that gently exfoliates and refines pores for a visibly clearer look.',
    stars: 4.7, reviews: 112,
  },
  {
    id: 'nighttime-recovery-cream',
    product: 'Nighttime Recovery Cream',
    price: 949, mrp: 1299,
    handle: '@nightskincare',
    image: '/products/night-cream.jpeg',
    benefit: 'Overnight Repair',
    description: 'Rich, nourishing cream that rebuilds your skin barrier while you sleep.',
    stars: 4.9, reviews: 148,
  },
  {
    id: 'only-skincare-spf-50-uva',
    product: 'SPF 50 PA++++',
    price: 749, mrp: 999,
    handle: '@onlyskincare.in',
    image: '/products/sunscreen.jpeg',
    benefit: 'UV Defence',
    description: 'PA++++ rated — the highest UVA protection available. Reef-safe formula.',
    stars: 4.9, reviews: 184,
  },
  {
    id: 'only-skincare-luxury-moisturiser-glow',
    product: 'Luxury Moisturiser',
    price: 849, mrp: 1199,
    handle: '@beautyreel.in',
    image: '/products/moisturizer.jpeg',
    benefit: 'Plump Glow',
    description: 'See the glow difference in just 7 days. Real results, real ingredients.',
    stars: 4.9, reviews: 148,
  },
]

const TOTAL       = REELS.length
const INTERVAL_MS = 2000

/* ── Scale map: index 0 = center, larger index = further from center ── */
const SCALE_MAP = [0.80, 0.87, 0.93, 0.97, 1.0]

export default function ShoppableReels() {
  const [active,  setActive]  = useState(Math.floor(TOTAL / 2))
  const [popup,   setPopup]   = useState<Reel | null>(null)
  const [hovered, setHovered] = useState(false)
  const [progKey, setProgKey] = useState(0)   // increments to restart progress CSS anim
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchX      = useRef(0)
  const { addItem, openCart } = useCart()

  const goNext = useCallback(() => {
    setActive(p => (p + 1) % TOTAL)
    setProgKey(k => k + 1)
  }, [])

  const goPrev = useCallback(() => {
    setActive(p => (p - 1 + TOTAL) % TOTAL)
    setProgKey(k => k + 1)
  }, [])

  const goTo = (i: number) => { setActive(i); setProgKey(k => k + 1) }

  /* Auto-advance */
  useEffect(() => {
    if (hovered || popup) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(goNext, INTERVAL_MS)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [hovered, popup, goNext])

  /* Keyboard nav */
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'Escape')     setPopup(null)
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [goNext, goPrev])

  /* Touch swipe */
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current
    if (dx < -40) goNext()
    if (dx >  40) goPrev()
  }

  /* Card position styles */
  const cardStyle = (i: number): React.CSSProperties => {
    let dist = i - active
    if (dist >  TOTAL / 2) dist -= TOTAL
    if (dist < -TOTAL / 2) dist += TOTAL
    const abs = Math.abs(dist)
    const scale    = SCALE_MAP[Math.min(abs, 4)]
    const rotateY  = dist * 9
    const tx       = dist * 148
    const zIndex   = 20 - abs
    const opacity  = abs > 3 ? 0 : abs === 3 ? 0.35 : 1
    return {
      transform: `translateX(${tx}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex,
      opacity,
      pointerEvents: abs > 3 ? 'none' : 'auto',
    }
  }

  const handleAddToBag = (reel: Reel) => {
    addItem({ id: reel.id, title: reel.product, price: reel.price, img: reel.image })
    setPopup(null)
    openCart()
  }

  return (
    <>
      <section
        className="sr-section"
        id="shoppable-reels"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Shoppable Reels"
      >
        <div className="sr-bg-glow"  aria-hidden="true" />
        <div className="sr-bg-noise" aria-hidden="true" />

        {/* ── Header ── */}
        <div className="container-os sr-header">
          <div className="sr-eyebrow">
            <Sparkles size={11} />
            <span>Shop the Reels</span>
          </div>
          <h2 className="sr-heading">
            See It. Love It. <em>Own It.</em>
          </h2>
          <p className="sr-sub">Tap any reel to explore and shop the product.</p>
        </div>

        {/* ── Coverflow stage ── */}
        <div className="sr-stage">
          <div className="sr-perspective">
            {REELS.map((reel, i) => {
              const style  = cardStyle(i)
              const isAct  = i === active
              return (
                <div
                  key={reel.id + i}
                  className={`sr-card${isAct ? ' sr-card-active' : ''}`}
                  style={style}
                  onClick={() => setPopup(reel)}
                  tabIndex={style.opacity === 0 ? -1 : 0}
                  onKeyDown={e => e.key === 'Enter' && setPopup(reel)}
                  role="button"
                  aria-label={`Open reel: ${reel.product}`}
                >
                  <img src={reel.image} alt={reel.product} className="sr-thumb" loading="lazy" />
                  <div className="sr-grad"   aria-hidden="true" />

                  {/* Play icon */}
                  <div className="sr-play"   aria-hidden="true">
                    <Play size={22} fill="white" strokeWidth={0} />
                  </div>

                  {/* Handle */}
                  <span className="sr-handle">{reel.handle}</span>

                  {/* Shoppable tag */}
                  <div className="sr-shop-tag">
                    <Tag size={11} className="sr-tag-icon" />
                    <div className="sr-tag-info">
                      <span className="sr-tag-name">{reel.product}</span>
                      <span className="sr-tag-price">₹{reel.price}</span>
                    </div>
                    <ShoppingBag size={12} />
                  </div>

                  {/* Badge */}
                  {reel.badge && <span className="sr-badge">{reel.badge}</span>}

                  {/* Active ring pulse */}
                  {isAct && <div className="sr-active-ring" aria-hidden="true" />}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="container-os sr-controls">
          <button className="sr-arrow" onClick={goPrev} aria-label="Previous reel">
            <ChevronLeft size={18} />
          </button>

          <div className="sr-dots" role="tablist">
            {REELS.map((_, i) => (
              <button
                key={i}
                className={`sr-dot${i === active ? ' sr-dot-active' : ''}`}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to reel ${i + 1}`}
              />
            ))}
          </div>

          <button className="sr-arrow" onClick={goNext} aria-label="Next reel">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* ── Progress bar ── */}
        <div className="sr-progress-track" aria-hidden="true">
          <div
            key={progKey}
            className={`sr-progress-fill${hovered || popup ? ' sr-progress-paused' : ''}`}
          />
        </div>
      </section>

      {/* ── Popup modal ── */}
      {popup && (
        <div
          className="sr-modal-backdrop"
          onClick={() => setPopup(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Reel: ${popup.product}`}
        >
          <div className="sr-modal" onClick={e => e.stopPropagation()}>

            <button className="sr-modal-close" onClick={() => setPopup(null)} aria-label="Close">
              <X size={16} />
            </button>

            {/* Left: reel preview */}
            <div className="sr-modal-reel">
              <img src={popup.image} alt={popup.product} className="sr-modal-img" />
              <div className="sr-modal-grad"    aria-hidden="true" />
              <div className="sr-modal-play-wrap" aria-hidden="true">
                <div className="sr-modal-play-btn">
                  <Play size={28} fill="white" strokeWidth={0} />
                </div>
                <span className="sr-modal-play-label">Tap to Play</span>
              </div>
              <span className="sr-modal-creator">{popup.handle}</span>
              {popup.badge && <span className="sr-modal-badge">{popup.badge}</span>}
            </div>

            {/* Right: product info */}
            <div className="sr-modal-info">
              <span className="sr-modal-benefit">{popup.benefit}</span>
              <h3 className="sr-modal-title">{popup.product}</h3>

              {/* Stars */}
              <div className="sr-modal-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    fill={i < Math.floor(popup.stars) ? '#F6C453' : 'none'}
                    stroke={i < Math.floor(popup.stars) ? '#F6C453' : 'rgba(255,255,255,0.2)'}
                    strokeWidth={1.5}
                  />
                ))}
                <span className="sr-modal-rating">{popup.stars} ({popup.reviews} reviews)</span>
              </div>

              <p className="sr-modal-desc">{popup.description}</p>

              {/* Price */}
              <div className="sr-modal-price-row">
                <span className="sr-modal-price">₹{popup.price}</span>
                <span className="sr-modal-mrp">₹{popup.mrp}</span>
                <span className="sr-modal-off">{Math.round((1 - popup.price / popup.mrp) * 100)}% off</span>
              </div>

              <button
                className="btn-primary sr-modal-cta"
                onClick={() => handleAddToBag(popup)}
              >
                <ShoppingBag size={15} />
                Add to Bag
              </button>

              <p className="sr-modal-note">
                Free delivery on orders above ₹499 · Easy returns
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
