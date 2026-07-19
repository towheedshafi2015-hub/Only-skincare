import { Star, BadgeCheck, TrendingUp, Users, Award, Sparkles } from 'lucide-react'
import '../customer-results.css'

/* ── Stats ── */
const STATS = [
  { value: '12,000+', label: 'Happy Customers',       icon: Users      },
  { value: '4.9 ★',  label: 'Average Rating',         icon: Star       },
  { value: '94%',    label: 'Results in 30 Days',      icon: TrendingUp },
  { value: '500+',   label: 'Verified Reviews',        icon: Award      },
]

/* ── Testimonial data ── */
interface T {
  name: string; city: string; age: number
  skinType: string; rating: number; quote: string
  initials: string; gradient: string; tag: string
}

const ALL: T[] = [
  {
    name: 'Priya S.', city: 'Mumbai', age: 23, skinType: 'Oily',
    rating: 5,
    quote: "My acne marks faded in just 3 weeks. I have never felt this confident in my own skin.",
    initials: 'PS', gradient: 'linear-gradient(135deg,#4CAF7D,#0f5d52)', tag: 'Niacinamide',
  },
  {
    name: 'Aisha K.', city: 'Delhi', age: 27, skinType: 'Combination',
    rating: 5,
    quote: "The cleansing oil is magic. My skin has never been this balanced — even in summer.",
    initials: 'AK', gradient: 'linear-gradient(135deg,#D4B06A,#B98A44)', tag: 'Cleansing Oil',
  },
  {
    name: 'Rohit M.', city: 'Bangalore', age: 28, skinType: 'Normal',
    rating: 5,
    quote: "SPF with zero white cast? FINALLY. This is the only sunscreen I will ever use.",
    initials: 'RM', gradient: 'linear-gradient(135deg,#60A5FA,#3B82F6)', tag: 'SPF 50',
  },
  {
    name: 'Sneha T.', city: 'Pune', age: 22, skinType: 'Dry',
    rating: 5,
    quote: "Hyaluronic formula plumped my skin overnight. Worth every single rupee — and more.",
    initials: 'ST', gradient: 'linear-gradient(135deg,#F97316,#EA580C)', tag: 'Moisturiser',
  },
  {
    name: 'Meera J.', city: 'Chennai', age: 31, skinType: 'Sensitive',
    rating: 5,
    quote: "The toner cleared my pores in days. My dermatologist actually asked what I switched to.",
    initials: 'MJ', gradient: 'linear-gradient(135deg,#A78BFA,#7C3AED)', tag: 'Toner',
  },
  {
    name: 'Arjun P.', city: 'Hyderabad', age: 25, skinType: 'Normal',
    rating: 5,
    quote: "As a guy I was skeptical. Three months later — my skin looks better than it ever has.",
    initials: 'AP', gradient: 'linear-gradient(135deg,#34D399,#059669)', tag: 'Moisturiser',
  },
  {
    name: 'Zara Q.', city: 'Kolkata', age: 24, skinType: 'Combination',
    rating: 5,
    quote: "Before: dull, patchy skin. After: people are asking what filter I use. No filter.",
    initials: 'ZQ', gradient: 'linear-gradient(135deg,#F6C453,#D4B06A)', tag: 'Full Routine',
  },
  {
    name: 'Divya R.', city: 'Ahmedabad', age: 29, skinType: 'Sensitive',
    rating: 5,
    quote: "Zero parabens, zero irritation. My sensitive skin finally found its perfect match.",
    initials: 'DR', gradient: 'linear-gradient(135deg,#FB7185,#E11D48)', tag: 'Cleansing Oil',
  },
  {
    name: 'Kabir N.', city: 'Jaipur', age: 26, skinType: 'Oily',
    rating: 5,
    quote: "The sunscreen + toner combo completely transformed my skin texture in two weeks.",
    initials: 'KN', gradient: 'linear-gradient(135deg,#38BDF8,#0EA5E9)', tag: 'SPF 50',
  },
  {
    name: 'Tanvi M.', city: 'Surat', age: 21, skinType: 'Dry',
    rating: 5,
    quote: "I cannot believe this is made by a 20-year-old founder. The results speak louder.",
    initials: 'TM', gradient: 'linear-gradient(135deg,#C084FC,#9333EA)', tag: 'Moisturiser',
  },
]

const ROW1 = ALL.slice(0, 5)
const ROW2 = ALL.slice(5, 10)

export default function CustomerResults() {
  return (
    <section className="cr-section" id="customer-results">
      <div className="cr-bg-glow"  aria-hidden="true" />
      <div className="cr-bg-noise" aria-hidden="true" />

      {/* ── Header ── */}
      <div className="container-os cr-header">
        <div className="cr-eyebrow-row">
          <Sparkles size={11} className="cr-gold-icon" />
          <span className="eyebrow">Real People. Real Results.</span>
          <Sparkles size={11} className="cr-gold-icon" />
        </div>
        <h2 className="cr-heading">
          Trusted by <em>Thousands</em>
        </h2>
        <p className="cr-sub">
          Clinically formulated. Community‑verified. Here's what they're saying.
        </p>
      </div>

      {/* ── Stats bar ── */}
      <div className="container-os">
        <div className="cr-stats">
          {STATS.map((s) => {
            const Icon = s.icon
            return (
              <div className="cr-stat" key={s.label}>
                <div className="cr-stat-icon-wrap"><Icon size={15} /></div>
                <span className="cr-stat-value">{s.value}</span>
                <span className="cr-stat-label">{s.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Marquee rows ── */}
      <div className="cr-marquee-area">

        {/* Edge fade masks */}
        <div className="cr-fade-left"  aria-hidden="true" />
        <div className="cr-fade-right" aria-hidden="true" />

        {/* Row 1 → scrolls LEFT */}
        <div className="cr-row cr-row-1">
          <div className="cr-track cr-track-left">
            {[...ROW1, ...ROW1].map((t, i) => (
              <Card key={`r1-${i}`} t={t} />
            ))}
          </div>
        </div>

        {/* Row 2 → scrolls RIGHT */}
        <div className="cr-row cr-row-2">
          <div className="cr-track cr-track-right">
            {[...ROW2, ...ROW2].map((t, i) => (
              <Card key={`r2-${i}`} t={t} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

function Card({ t }: { t: T }) {
  return (
    <article className="cr-card" tabIndex={0} aria-label={`Review by ${t.name}`}>
      {/* Top row */}
      <div className="cr-card-head">
        <div className="cr-avatar" style={{ background: t.gradient }}>
          {t.initials}
        </div>
        <div className="cr-name-block">
          <span className="cr-name">
            {t.name}
            <BadgeCheck size={13} className="cr-check" aria-label="Verified purchase" />
          </span>
          <span className="cr-meta">{t.skinType} · {t.city}, {t.age}</span>
        </div>
        <span className="cr-tag">{t.tag}</span>
      </div>

      {/* Stars */}
      <div className="cr-stars" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="cr-quote">
        <span className="cr-q-glyph" aria-hidden="true">"</span>
        {t.quote}
      </blockquote>
    </article>
  )
}
