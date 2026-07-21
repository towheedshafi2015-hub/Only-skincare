import { useState, useRef, type MouseEvent, type TouchEvent } from 'react'
import founderFront from '../assets/founder/founder.png'
import founderBack from '../assets/founder/Founder 2.png'
import { ShieldCheck, Heart, Compass, Sparkles, ArrowRight, RotateCw } from 'lucide-react'
import { getAssetUrl } from '../lib/assets'
import '../brand-story.css'

function FounderCard3D() {
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Smooth tilt angles (-12 to +12 deg)
    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12

    setTransform(`rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`)
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    })
  }

  const handleMouseLeave = () => {
    setTransform('rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || !e.touches[0]) return
    const touch = e.touches[0]
    const rect = cardRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    setTransform(`rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.3,
    })
  }

  return (
    <div className="bs-card-container">
      {/* ── Metallic Woven Lanyard Strap hanging from above ── */}
      <div className="bs-lanyard-strap" aria-hidden="true">
        <div className="bs-strap-fabric" />
        <div className="bs-strap-clip">
          <div className="bs-clip-ring" />
          <div className="bs-clip-hook" />
        </div>
      </div>

      {/* ── Interactive 3D Parallax Card ── */}
      <div
        ref={cardRef}
        className={`bs-card-3d ${isFlipped ? 'flipped' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ transform }}
        role="button"
        tabIndex={0}
        aria-label="Interactive 3D Founder ID Card - Click to Flip"
      >
        {/* Holographic Glare Sheen Overlay */}
        <div
          className="bs-card-glare"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}), transparent 60%)`,
          }}
          aria-hidden="true"
        />

        {/* FRONT FACE */}
        <div className="bs-card-face bs-card-front">
          <img
            src={getAssetUrl(founderFront)}
            alt="Owais Khan - Founder & CEO"
            className="bs-card-img"
            loading="eager"
          />

          {/* Top Gold Foil Header */}
          <div className="bs-card-top-bar">
            <span className="bs-card-brand">ONLY SKINCARE</span>
            <span className="bs-card-chip">ID: OS-2024-01</span>
          </div>

          {/* Bottom Info Veil */}
          <div className="bs-card-info-veil">
            <span className="bs-card-eyebrow">FOUNDER &amp; VISIONARY</span>
            <h3 className="bs-card-name">Owais Khan</h3>
            <div className="bs-card-meta">
              <span className="bs-card-tag">Age 20</span>
              <span className="bs-card-dot">•</span>
              <span className="bs-card-tag">Science &amp; Nature</span>
            </div>
          </div>

          {/* Holographic Watermark */}
          <div className="bs-card-holo" aria-hidden="true" />
        </div>

        {/* BACK FACE */}
        <div className="bs-card-face bs-card-back">
          <img
            src={getAssetUrl(founderBack)}
            alt="Owais Khan - Founder Back Card"
            className="bs-card-img"
            loading="lazy"
          />
          <div className="bs-card-info-veil">
            <span className="bs-card-eyebrow">THE PROMISE</span>
            <p className="bs-card-back-quote">
              "Clean, clinically proven formulations created for Indian skin."
            </p>
            <span className="bs-card-sig">— OWAIS KHAN</span>
          </div>
        </div>

        {/* Flip Icon Button */}
        <button
          className="bs-flip-btn"
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setIsFlipped(!isFlipped)
          }}
          aria-label="Flip Card"
        >
          <RotateCw size={12} />
          <span>Flip Card</span>
        </button>
      </div>
    </div>
  )
}

export default function BrandStory() {
  return (
    <section className="brand-story-section" id="brand-story">
      {/* Background ambient lighting */}
      <div className="bs-bg-glow" aria-hidden="true" />
      <div className="bs-noise" aria-hidden="true" />

      <div className="container-os bs-inner">

        {/* ── LEFT: Brand / Founder Content ── */}
        <div className="bs-left">

          <div className="bs-eyebrow">
            <Sparkles size={11} className="text-gold" />
            <span>The Soul of Only Skincare</span>
          </div>

          <h2 className="bs-heading">
            A Founder's<br />
            <em>Promise.</em>
          </h2>

          <blockquote className="bs-quote">
            "Skincare has been overcomplicated by corporations selling temporary fixes. We set out to change that."
          </blockquote>

          <p className="bs-body">
            Founded by 20-year-old visionary <strong>Owais Khan</strong>, Only Skincare was born from a simple frustration — a lack of transparency and clinical efficacy in standard products. We fuse advanced Korean dermatological actives with native Indian botanical wisdom.
          </p>

          {/* Pillars */}
          <div className="bs-pillars">
            <div className="bs-pillar">
              <span className="bs-pillar-icon">
                <ShieldCheck size={16} />
              </span>
              <div>
                <span className="bs-pillar-title">Clinical Efficacy</span>
                <span className="bs-pillar-desc">Korean research standards adapted for Indian skin.</span>
              </div>
            </div>

            <div className="bs-pillar">
              <span className="bs-pillar-icon">
                <Heart size={16} />
              </span>
              <div>
                <span className="bs-pillar-title">Skin First</span>
                <span className="bs-pillar-desc">Clean, vegan formulations that repair the skin barrier.</span>
              </div>
            </div>

            <div className="bs-pillar">
              <span className="bs-pillar-icon">
                <Compass size={16} />
              </span>
              <div>
                <span className="bs-pillar-title">Total Transparency</span>
                <span className="bs-pillar-desc">Every active ingredient concentration disclosed.</span>
              </div>
            </div>
          </div>

          {/* Signature + CTA */}
          <div className="bs-footer-row">
            <div className="bs-signature">
              <span className="bs-sig-name">Owais Khan</span>
              <span className="bs-sig-title">Founder, Only Skincare · Age 20</span>
            </div>
            <button className="btn-primary bs-cta" type="button">
              Our Story <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* ── RIGHT: 3D Parallax Founder ID Card ── */}
        <div className="bs-right">
          {/* Ambient Glow */}
          <div className="bs-card-glow" aria-hidden="true" />

          {/* Interaction hint */}
          <div className="bs-badge">
            <span className="bs-pulse-dot" />
            <span className="bs-badge-text">Hover &amp; Tilt · Click to Flip</span>
          </div>

          {/* Label above */}
          <div className="bs-card-label">
            <span className="bs-card-label-eyebrow">FOUNDER ID</span>
            <span className="bs-card-label-name">Owais Khan</span>
          </div>

          {/* 3D Liquid Parallax Card */}
          <FounderCard3D />
        </div>

      </div>
    </section>
  )
}
