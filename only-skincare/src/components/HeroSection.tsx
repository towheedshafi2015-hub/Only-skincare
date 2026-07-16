import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShieldCheck, Leaf, FlaskConical, RotateCcw } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const USPs = [
  { icon: FlaskConical, label: 'Dermatologist Tested', sub: 'Clinically Proven' },
  { icon: Leaf, label: 'Cruelty Free', sub: '100% Ethical' },
  { icon: ShieldCheck, label: 'Made in Korea for Indian Skin', sub: 'K-Beauty Science' },
  { icon: RotateCcw, label: '30-Day Money-Back Guarantee', sub: 'Zero Risk Promise' },
]

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const video = videoRef.current
    if (!wrapper || !video) return

    // ── 1. CACHE GEOMETRY TO PREVENT REFLOWS ───────────────────
    let wrapTop = 0
    let wrapH = 0
    let viewH = 0
    let videoDuration = 5.17

    const updateGeometry = () => {
      const rect = wrapper.getBoundingClientRect()
      wrapTop = rect.top + window.scrollY
      wrapH = wrapper.offsetHeight
      viewH = window.innerHeight
      if (video.duration) {
        videoDuration = video.duration
      }
    }

    // Initialize geometry
    updateGeometry()
    window.addEventListener('resize', updateGeometry, { passive: true })

    // ── 2. SMOOTH LERP PLAYBACK LOOP ─────────────────────────
    let targetTime = 0
    let rafId = 0
    let running = true

    const tick = () => {
      if (!running) return

      const currentTime = video.currentTime
      const diff = targetTime - currentTime

      // Only seek if there is a meaningful difference and the browser isn't already seeking
      if (Math.abs(diff) > 0.005 && !video.seeking) {
        // Lerp step: 0.15 (15% closer to target per frame) for butter-smooth progress
        video.currentTime = currentTime + diff * 0.15
      }

      rafId = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      const scrolled = Math.max(0, window.scrollY - wrapTop)
      const progress = Math.min(1, scrolled / (wrapH - viewH))
      targetTime = progress * videoDuration
    }

    const startVideo = () => {
      video.pause()
      video.currentTime = 0
      videoDuration = video.duration || 5.17
      tick()
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    if (video.readyState >= 2) {
      startVideo()
    } else {
      video.addEventListener('canplay', startVideo, { once: true })
    }

    // ── 3. PROGRESSIVE CONTENT REVEAL ON SCROLL ──────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: '+=180vh',
        scrub: 1.2,
      },
    })

    // Left column story elements
    tl.from('.h-eyebrow', { opacity: 0, y: 24, ease: 'power2.out', duration: 0.12 }, 0.00)
      .from('.h-line1', { opacity: 0, y: 48, ease: 'power3.out', duration: 0.16 }, 0.08)
      .from('.h-line2', { opacity: 0, y: 48, ease: 'power3.out', duration: 0.16 }, 0.20)
      .from('.h-sub', { opacity: 0, y: 24, ease: 'power2.out', duration: 0.12 }, 0.34)
      .from('.h-ctas', { opacity: 0, y: 20, ease: 'power2.out', duration: 0.12 }, 0.46)
      .from('.h-micro', { opacity: 0, duration: 0.10 }, 0.56)

    // Right column USPs stagger from right
      .from('[data-usp="0"]', { opacity: 0, x: 48, ease: 'power2.out', duration: 0.12 }, 0.06)
      .from('[data-usp="1"]', { opacity: 0, x: 48, ease: 'power2.out', duration: 0.12 }, 0.17)
      .from('[data-usp="2"]', { opacity: 0, x: 48, ease: 'power2.out', duration: 0.12 }, 0.28)
      .from('[data-usp="3"]', { opacity: 0, x: 48, ease: 'power2.out', duration: 0.12 }, 0.39)

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updateGeometry)
      window.removeEventListener('scroll', onScroll)
      tl.scrollTrigger?.kill()
    }
  }, [])

  return (
    <div ref={wrapperRef} className="hero-wrapper">
      <div className="hero-sticky">

        {/* ── Video background ─────────────── */}
        <video
          ref={videoRef}
          className="hero-video"
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        {/* ── Gradient overlay ──────────────── */}
        <div className="hero-overlay" aria-hidden="true" />

        {/* ── Foreground ────────────────────── */}
        <div className="hero-fg container-os">

          {/* LEFT — story text */}
          <div className="hero-left">
            <p className="eyebrow h-eyebrow" aria-label="Brand tagline">
              Science · Nature · You
            </p>

            <h1 className="hero-headline">
              <span className="h-line1 hero-hl-block">Skincare That</span>
              <em className="h-line2 hero-hl-block">Actually&nbsp;Works.</em>
            </h1>

            <p className="hero-sub h-sub">
              Science-backed formulations trusted by{' '}
              <strong className="text-gold">50,000+</strong>{' '}
              customers for healthier, glowing skin.
            </p>

            <div className="hero-ctas h-ctas">
              <button className="btn-primary" id="hero-shop">Shop Best Sellers</button>
              <button className="btn-secondary" id="hero-quiz">Take Skin Quiz →</button>
            </div>

            <p className="hero-micro h-micro">
              Free shipping above ₹999 &nbsp;·&nbsp; Easy 30-day returns
            </p>
          </div>

          {/* RIGHT — USP glass pills */}
          <div className="hero-right" role="list" aria-label="Product certifications">
            {USPs.map(({ icon: Icon, label, sub }, i) => (
              <div key={label} className="hero-usp" data-usp={i} role="listitem">
                <span className="usp-icon-wrap">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <div className="usp-copy">
                  <span className="usp-name">{label}</span>
                  <span className="usp-tag">{sub}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Scroll hint ──────────────────── */}
        <div className="scroll-cue" aria-hidden="true">
          <span className="sc-text">Scroll</span>
          <div className="sc-bar" />
        </div>

      </div>
    </div>
  )
}
