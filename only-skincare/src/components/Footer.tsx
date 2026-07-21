import { useState } from 'react'
import {
  Mail, ArrowRight, Leaf, Heart, ShieldCheck,
} from 'lucide-react'
import { getAssetUrl } from '../lib/assets'
import '../footer.css'

/* ── Inline SVG social icons (lucide-react has no brand icons) ── */
const IgIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)
const YtIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
)
const WaIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
)

/* ── Data ── */
const NAV_COLS = {
  Shop: [
    'Nourishing Cleansing Oil',
    'Clarifying Toner',
    'Luxury Moisturiser',
    'SPF 50 PA++++',
    'View All Products',
  ],
  Brand: [
    'Our Story',
    'Ingredients',
    'Certifications',
    'Press & Media',
    'Blog',
  ],
  Support: [
    'FAQ',
    'Shipping Info',
    'Returns & Refunds',
    'Contact Us',
    'WhatsApp Us',
  ],
} as const

const SOCIALS = [
  { Icon: IgIcon,  label: 'Instagram', href: '#' },
  { Icon: YtIcon,  label: 'YouTube',   href: '#' },
  { Icon: WaIcon,  label: 'WhatsApp',  href: '#' },
]

const CERTS = [
  { Icon: ShieldCheck, label: 'FDA Compliant' },
  { Icon: Leaf,        label: 'Paraben Free'  },
  { Icon: Heart,       label: 'Cruelty Free'  },
  { Icon: Leaf,        label: '100% Vegan'    },
  { Icon: ShieldCheck, label: 'ISO Certified' },
  { Icon: ShieldCheck, label: 'GMP Certified' },
  { Icon: ShieldCheck, label: 'Clinically Tested' },
]

const POLICIES = ['Privacy Policy', 'Terms of Use', 'Refund Policy', 'Shipping Policy']
const PAYMENTS  = ['UPI', 'Visa', 'Mastercard', 'RuPay', 'COD', 'Net Banking']

/* ── Component ── */
export default function Footer() {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) { setError(true); return }
    setError(false)
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer id="footer" className="ft-footer" aria-label="Site footer">
      <div className="ft-bg"   aria-hidden="true" />
      <div className="ft-dust" aria-hidden="true" />

      {/* ═══════════════════════════════════════════
          TOP: Newsletter CTA card
      ═══════════════════════════════════════════ */}
      <div className="container-os ft-cta-outer">
        <div className="ft-cta">

          {/* Left: copy + form */}
          <div className="ft-cta-left">
            <span className="ft-cta-eyebrow">Exclusive Members Only</span>

            <h2 className="ft-cta-heading">
              Start Your<br />
              <em>Glow Journey</em>
            </h2>

            <p className="ft-cta-sub">
              Get <strong>10% off</strong> your first order + a free
              Skin Guide PDF. No spam. Unsubscribe anytime.
            </p>

            {!submitted ? (
              <form className="ft-form" onSubmit={handleSubmit} noValidate>
                <div className={`ft-input-row${error ? ' ft-input-error' : ''}`}>
                  <Mail size={14} className="ft-input-icon" aria-hidden="true" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(false) }}
                    placeholder="your@email.com"
                    className="ft-email-input"
                    aria-label="Email for 10% off"
                    required
                  />
                </div>
                {error && (
                  <p className="ft-error-msg">Please enter a valid email address.</p>
                )}
                <button type="submit" className="ft-cta-btn">
                  <span>Claim My 10% Off</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <div className="ft-success-msg" role="alert">
                ✓ Welcome to the Only Skincare family! Check your inbox.
              </div>
            )}

            <p className="ft-form-note">
              12,000+ members · No spam · Unsubscribe anytime
            </p>
          </div>

          {/* Right: product image */}
          <div className="ft-cta-right" aria-hidden="true">
            <img
              src={getAssetUrl('/products/moisturizer.jpeg')}
              alt=""
              className="ft-cta-img"
            />
            <div className="ft-cta-img-veil" />
            <div className="ft-cta-badge">
              <span className="ft-badge-pct">10%</span>
              <span className="ft-badge-lbl">OFF</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MIDDLE: Brand + nav columns
      ═══════════════════════════════════════════ */}
      <div className="container-os ft-main">

        {/* Brand */}
        <div className="ft-brand">
          <div className="ft-logo" aria-label="Only Skincare">
            <span className="ft-logo-circle" aria-hidden="true">○</span>
            <span className="ft-logo-name">Only Skincare</span>
          </div>
          <p className="ft-tagline">
            Luxury actives,<br />
            formulated for Indian skin.
          </p>
          <div className="ft-socials" aria-label="Social media">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="ft-social-btn"
                aria-label={`Follow us on ${label}`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Nav cols */}
        {Object.entries(NAV_COLS).map(([col, links]) => (
          <nav key={col} className="ft-col" aria-label={`${col} links`}>
            <span className="ft-col-head">{col}</span>
            <ul className="ft-col-list">
              {links.map(link => (
                <li key={link}>
                  <a href="#" className="ft-nav-link">{link}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          CERTIFICATIONS strip
      ═══════════════════════════════════════════ */}
      <div className="container-os ft-certs-strip" aria-label="Certifications">
        {CERTS.map(({ Icon, label }) => (
          <div key={label} className="ft-cert-chip">
            <Icon size={10} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          BOTTOM bar
      ═══════════════════════════════════════════ */}
      <div className="container-os ft-bottom">
        <span className="ft-copy">
          © 2025 Only Skincare™&nbsp;·&nbsp;Made with love in India 🇮🇳
        </span>

        <nav className="ft-policies" aria-label="Legal policies">
          {POLICIES.map((p, i) => (
            <span key={p} className="ft-policy-group">
              <a href="#" className="ft-policy-link">{p}</a>
              {i < POLICIES.length - 1 && (
                <span className="ft-sep" aria-hidden="true">·</span>
              )}
            </span>
          ))}
        </nav>

        <div className="ft-payments" aria-label="Accepted payment methods">
          {PAYMENTS.map(p => (
            <span key={p} className="ft-pay-chip">{p}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
