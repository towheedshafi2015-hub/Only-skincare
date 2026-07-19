import { useState } from 'react'
import {
  ShieldCheck, RefreshCw, Lock, Truck, Package,
  ChevronDown, MessageCircle, Sparkles,
} from 'lucide-react'
import '../faq-guarantee.css'

/* ── Guarantee data ── */
const GUARANTEES = [
  {
    icon: ShieldCheck, title: '30-Day Money Back',
    desc: 'Full refund, no questions asked. Try it completely risk-free.',
    color: '#4CAF7D',
  },
  {
    icon: RefreshCw,   title: 'Free & Easy Returns',
    desc: 'Free pickup from your door. Refund in 5–7 business days.',
    color: '#60A5FA',
  },
  {
    icon: Lock,        title: 'Secure Checkout',
    desc: '256-bit SSL encryption protects every transaction.',
    color: '#D4B06A',
  },
  {
    icon: Package,     title: 'Cash on Delivery',
    desc: 'COD available pan-India. No prepayment required.',
    color: '#A78BFA',
  },
  {
    icon: Truck,       title: 'Free Shipping',
    desc: 'Free delivery on orders above ₹499, across India.',
    color: '#FB7185',
  },
]

/* ── FAQ data ── */
const FAQS = [
  {
    q: 'Is it safe for all skin types?',
    a: 'Yes. Every Only Skincare product is dermatologist-tested and formulated without parabens, sulphates, or any harmful chemicals. Specifically designed for Indian skin across all types, tones, and conditions.',
  },
  {
    q: 'Does it work on sensitive or reactive skin?',
    a: 'Absolutely. Our formulations use the minimum effective concentration of actives — delivering real results without triggering sensitivity. Each product is patch-tested and free from all known irritants. Thousands of our sensitive-skin customers love the results.',
  },
  {
    q: 'Is it safe to use during pregnancy?',
    a: "We always recommend consulting your dermatologist during pregnancy since every situation is individual. Our Cleansing Oil and Moisturiser use clean, generally pregnancy-safe ingredients. For the Toner (AHA/BHA) and SPF, we advise extra caution — please check with your doctor.",
  },
  {
    q: 'How do I initiate a return?',
    a: "If you're not 100% satisfied within 30 days, email us at support@onlyskincare.in. We'll arrange a free pickup from your address and process your full refund within 5–7 business days — no forms, no fine print, no hassle.",
  },
  {
    q: 'When will I receive my order?',
    a: 'Standard delivery takes 3–5 business days across India. Metro cities (Mumbai, Delhi, Bengaluru, Hyderabad) typically receive orders in 2–3 days. You will receive a tracking link via SMS and email the moment your order ships.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'We accept all major payment options — UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery. All online payments are protected with 256-bit SSL encryption.',
  },
]

export default function FaqGuarantee() {
  const [open, setOpen] = useState<number | null>(0)

  const toggle = (i: number) => setOpen(prev => prev === i ? null : i)

  return (
    <section id="faq-guarantee" className="fq-section" aria-label="FAQ and Guarantee">
      <div className="fq-bg"      aria-hidden="true" />
      <div className="fq-bg-grid" aria-hidden="true" />

      {/* ── Section header ── */}
      <div className="container-os fq-header">
        <div className="fq-eyebrow-row">
          <Sparkles size={11} className="fq-gold" />
          <span className="fq-eyebrow">Confidence. Guaranteed.</span>
          <Sparkles size={11} className="fq-gold" />
        </div>
        <h2 className="fq-heading">
          No Risk.<br /><em>Just Results.</em>
        </h2>
        <p className="fq-sub">
          Every purchase is backed by our full commitment —<br />
          and every question, answered honestly.
        </p>
      </div>

      {/* ── Split body ── */}
      <div className="container-os fq-body">

        {/* LEFT: Sticky guarantee panel */}
        <aside className="fq-left" aria-label="Our promises to you">
          <p className="fq-panel-label">Our Promises to You</p>
          <div className="fq-guarantees">
            {GUARANTEES.map((g) => {
              const Icon = g.icon
              return (
                <div
                  key={g.title}
                  className="fq-g-card"
                  style={{ '--gc': g.color } as React.CSSProperties}
                >
                  <div className="fq-g-icon" aria-hidden="true">
                    <Icon size={15} />
                  </div>
                  <div className="fq-g-body">
                    <span className="fq-g-title">{g.title}</span>
                    <span className="fq-g-desc">{g.desc}</span>
                  </div>
                  {/* Accent bar */}
                  <div className="fq-g-bar" aria-hidden="true" />
                </div>
              )
            })}
          </div>

          {/* Trust badge row */}
          <div className="fq-trust-strip">
            <span>🔒 SSL Secured</span>
            <span>•</span>
            <span>🇮🇳 Made in India</span>
            <span>•</span>
            <span>🌿 Clean Beauty</span>
          </div>
        </aside>

        {/* RIGHT: FAQ accordion */}
        <div className="fq-right">
          <p className="fq-panel-label">Frequently Asked Questions</p>

          <div className="fq-accordion" role="list">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`fq-item${open === i ? ' fq-item-open' : ''}`}
                role="listitem"
              >
                <button
                  className="fq-q-btn"
                  onClick={() => toggle(i)}
                  aria-expanded={open === i}
                  aria-controls={`fq-ans-${i}`}
                  id={`fq-q-${i}`}
                >
                  <span className="fq-q-text">{faq.q}</span>
                  <span className="fq-chevron" aria-hidden="true">
                    <ChevronDown size={16} />
                  </span>
                </button>

                {/* Grid trick for smooth height animation */}
                <div
                  className="fq-ans-wrap"
                  id={`fq-ans-${i}`}
                  role="region"
                  aria-labelledby={`fq-q-${i}`}
                >
                  <div className="fq-ans-inner">
                    <p className="fq-ans-text">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still unsure CTA */}
          <div className="fq-still-unsure">
            <div className="fq-unsure-text">
              <span className="fq-unsure-head">Still have a question?</span>
              <span className="fq-unsure-sub">Our skin experts reply within 2 hours.</span>
            </div>
            <a
              href="mailto:support@onlyskincare.in"
              className="fq-contact-btn"
              aria-label="Email our support team"
            >
              <MessageCircle size={13} />
              <span>Chat with Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
