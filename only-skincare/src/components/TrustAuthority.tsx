import { useEffect, useRef, useState, useCallback } from 'react'
import { ShieldCheck, Award, FlaskConical, BadgeCheck, Leaf, Heart, Sparkles, Check } from 'lucide-react'
import { getAssetUrl } from '../lib/assets'
import '../trust-authority.css'

/* ─── Data ──────────────────────────────────────────── */
const STATS = [
  { end: 12000, suffix: '+', label: 'Customers Trusted',      decimals: 0 },
  { end: 4.9,   suffix: '★', label: 'Average Rating',         decimals: 1 },
  { end: 94,    suffix: '%', label: 'Results in 30 Days',      decimals: 0 },
  { end: 100,   suffix: '%', label: 'Ingredient Transparency', decimals: 0 },
]

const CERTS = [
  {
    src: '/trust/certificate-excellence.jpeg',
    label: 'Certificate of Excellence',
    issuer: 'Industry Regulatory Body',
    year: '2024',
    baseTilt: '-5deg',
    glowColor: 'rgba(212,176,106,0.45)',
    delay: '0s',
  },
  {
    src: '/trust/regulatory-seals.jpeg',
    label: 'Regulatory & Safety Standards',
    issuer: 'National Safety Authority',
    year: '2024',
    baseTilt: '0deg',
    glowColor: 'rgba(15,93,82,0.6)',
    delay: '0.14s',
  },
  {
    src: '/trust/certificate-2.jpeg',
    label: 'Quality Assurance Certificate',
    issuer: 'International Standards Board',
    year: '2024',
    baseTilt: '5deg',
    glowColor: 'rgba(212,176,106,0.45)',
    delay: '0.28s',
  },
]

const BADGES = [
  { icon: ShieldCheck,  label: 'FDA Compliant',         color: '#60A5FA' },
  { icon: Award,        label: 'ISO 9001 Certified',     color: '#D4B06A' },
  { icon: FlaskConical, label: 'GMP Certified',          color: '#4CAF7D' },
  { icon: FlaskConical, label: 'Clinically Tested',      color: '#A78BFA' },
  { icon: BadgeCheck,   label: 'Dermatologist Approved', color: '#34D399' },
  { icon: Leaf,         label: 'Paraben Free',            color: '#86EFAC' },
  { icon: Heart,        label: 'Cruelty Free',            color: '#FB7185' },
  { icon: Sparkles,     label: '100% Vegan',              color: '#FDE68A' },
]

/* ─── Animated counter hook ─────────────────────────── */
function useCounter(end: number, decimals: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(parseFloat((end * eased).toFixed(decimals)))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, end, decimals, duration])
  return val
}

function StatItem({ s, active }: { s: typeof STATS[0]; active: boolean }) {
  const val = useCounter(s.end, s.decimals, active)
  return (
    <div className="ta-stat">
      <span className="ta-stat-value">{val.toLocaleString()}{s.suffix}</span>
      <span className="ta-stat-label">{s.label}</span>
    </div>
  )
}

/* ─── Certificate card with 3D mouse-tilt ───────────── */
function CertCard({ cert }: { cert: typeof CERTS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const r  = el.getBoundingClientRect()
    const x  = (e.clientX - r.left)  / r.width  - 0.5
    const y  = (e.clientY - r.top)   / r.height - 0.5
    el.style.setProperty('--rx', `${-y * 22}deg`)
    el.style.setProperty('--ry', `${x  * 22}deg`)
  }, [])

  const onLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.removeProperty('--rx')
    el.style.removeProperty('--ry')
  }, [])

  return (
    <div
      className="ta-cert-outer"
      style={{
        '--cert-delay': cert.delay,
        '--base-tilt':  cert.baseTilt,
      } as React.CSSProperties}
    >
      <div
        ref={cardRef}
        className="ta-cert-card"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ '--glow-color': cert.glowColor } as React.CSSProperties}
      >
        <img src={getAssetUrl(cert.src)} alt={cert.label} className="ta-cert-img" loading="lazy" />
        <div className="ta-cert-sheen" aria-hidden="true" />
        <div className="ta-cert-info">
          <span className="ta-cert-label">{cert.label}</span>
          <span className="ta-cert-meta">{cert.issuer} · {cert.year}</span>
        </div>

        {/* Verified stamp — animates in when section is visible */}
        <div
          className="ta-stamp"
          style={{ '--stamp-delay': `calc(${cert.delay} + 0.5s)` } as React.CSSProperties}
          aria-label="Verified"
        >
          <Check size={14} strokeWidth={3} />
          <span>VERIFIED</span>
        </div>
      </div>

      {/* Glow blob under card */}
      <div
        className="ta-cert-glow"
        style={{ background: `radial-gradient(circle, ${cert.glowColor}, transparent 70%)` }}
        aria-hidden="true"
      />
    </div>
  )
}

/* ─── Main section ──────────────────────────────────── */
export default function TrustAuthority() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="trust-authority"
      className={`ta-section${visible ? ' ta-visible' : ''}`}
      aria-label="Trust and Authority"
    >
      {/* Layered background */}
      <div className="ta-bg-radial" aria-hidden="true" />
      <div className="ta-bg-grid"   aria-hidden="true" />
      <div className="ta-dust"      aria-hidden="true" />

      {/* ── Header ── */}
      <div className="container-os ta-header">
        <div className="ta-eyebrow">
          <ShieldCheck size={11} />
          <span>Trust &amp; Authority</span>
        </div>
        <h2 className="ta-heading">
          Every Claim.<br />
          <em>Independently Verified.</em>
        </h2>
        <p className="ta-sub">
          We don't ask you to trust us — we show you the proof.
        </p>
      </div>

      {/* ── Animated stat counters ── */}
      <div className="container-os ta-stats">
        {STATS.map(s => <StatItem key={s.label} s={s} active={visible} />)}
      </div>

      {/* ── Certificate showcase ── */}
      <div className="container-os ta-certs" aria-label="Our certificates">
        {CERTS.map(c => <CertCard key={c.label} cert={c} />)}
      </div>

      {/* ── Certification badge grid ── */}
      <div className="container-os ta-badges-section">
        <p className="ta-badges-title">Our Certifications &amp; Standards</p>
        <div className="ta-badges" role="list">
          {BADGES.map((b, i) => {
            const Icon = b.icon
            return (
              <div
                key={b.label}
                className="ta-badge"
                role="listitem"
                style={{
                  '--badge-color': b.color,
                  '--badge-delay': `${i * 0.07}s`,
                } as React.CSSProperties}
              >
                <Icon size={14} style={{ color: b.color }} aria-hidden="true" />
                <span>{b.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Media mentions ── */}
      <div className="container-os ta-media-section">
        <div className="ta-media-header">
          <span className="ta-media-eyebrow">As Seen In</span>
          <div className="ta-media-rule" aria-hidden="true" />
        </div>
        <div className="ta-media-frame">
          <img
            src={getAssetUrl('/trust/media-mentions.jpeg')}
            alt="Only Skincare featured in media"
            className="ta-media-img"
            loading="lazy"
          />
          <div className="ta-media-vignette" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
