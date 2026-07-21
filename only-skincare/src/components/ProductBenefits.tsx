import { useEffect, useRef } from 'react'
import { Shield, Droplets, Sun, ShieldCheck, type LucideIcon } from 'lucide-react'
import { getAssetUrl } from '../lib/assets'
import '../product-benefits.css'

interface Benefit {
  side: 'left' | 'right'
  icon: LucideIcon
  ingredient: string
  chain: string[]
  outcome: string
  iconBg: string
  iconBorder: string
  iconColor: string
}

const BENEFITS: Benefit[] = [
  {
    side: 'left',
    icon: Shield,
    ingredient: 'Niacinamide',
    chain: ['Reduces Acne', 'Clears Marks'],
    outcome: 'Better Confidence',
    iconBg: 'rgba(76,175,125,0.14)',
    iconBorder: 'rgba(76,175,125,0.28)',
    iconColor: '#4CAF7D',
  },
  {
    side: 'left',
    icon: Droplets,
    ingredient: 'Hyaluronic Acid',
    chain: ['Deep Hydration', 'Plump Skin'],
    outcome: 'Youthful Glow',
    iconBg: 'rgba(96,165,250,0.14)',
    iconBorder: 'rgba(96,165,250,0.28)',
    iconColor: '#60A5FA',
  },
  {
    side: 'right',
    icon: Sun,
    ingredient: 'Vitamin C',
    chain: ['Brightens Tone', 'Fades Dark Spots'],
    outcome: 'Radiant Skin',
    iconBg: 'rgba(246,196,83,0.14)',
    iconBorder: 'rgba(246,196,83,0.28)',
    iconColor: '#F6C453',
  },
  {
    side: 'right',
    icon: ShieldCheck,
    ingredient: 'SPF 50 PA++++',
    chain: ['Blocks UV Rays', 'Prevents Ageing'],
    outcome: 'Youth Preserved',
    iconBg: 'rgba(249,115,22,0.14)',
    iconBorder: 'rgba(249,115,22,0.28)',
    iconColor: '#F97316',
  },
]

export default function ProductBenefits() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('pb-visible')
            observer.disconnect()
          }
        })
      },
      { threshold: 0.18 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const leftBenefits  = BENEFITS.filter((b) => b.side === 'left')
  const rightBenefits = BENEFITS.filter((b) => b.side === 'right')

  return (
    <section className="pb-section" ref={sectionRef} id="product-benefits">
      {/* Background layers */}
      <div className="pb-bg-glow"  aria-hidden="true" />
      <div className="pb-bg-noise" aria-hidden="true" />

      <div className="container-os pb-inner">

        {/* Section header */}
        <header className="pb-header">
          <span className="eyebrow">Ingredient · Impact</span>
          <h2 className="pb-heading">
            What It Does <em>For You</em>
          </h2>
          <p className="pb-subline">
            Every active earns its place — traced from molecule to moment.
          </p>
        </header>

        {/* Three-column orbit grid */}
        <div className="pb-grid">

          {/* ── LEFT ── */}
          <div className="pb-col pb-col-left">
            {leftBenefits.map((b, i) => (
              <div
                key={b.ingredient}
                className="pb-node pb-node-left"
                style={{ '--pb-delay': `${i * 0.14}s` } as React.CSSProperties}
              >
                <BenefitCard b={b} />
                <span className="pb-arm pb-arm-left" aria-hidden="true">
                  <span className="pb-arm-dot" />
                </span>
              </div>
            ))}
          </div>

          {/* ── CENTER: product orbit ── */}
          <div className="pb-center" aria-hidden="false">
            <div className="pb-orbit pb-orbit-1" aria-hidden="true" />
            <div className="pb-orbit pb-orbit-2" aria-hidden="true" />
            <div className="pb-orbit pb-orbit-3" aria-hidden="true" />
            <div className="pb-center-glow" aria-hidden="true" />
            <div className="pb-product-wrap">
              <img
                src={getAssetUrl('/products/moisturizer.jpeg')}
                alt="Only Skincare Moisturiser"
                className="pb-product-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="pb-col pb-col-right">
            {rightBenefits.map((b, i) => (
              <div
                key={b.ingredient}
                className="pb-node pb-node-right"
                style={{ '--pb-delay': `${(i + 2) * 0.14}s` } as React.CSSProperties}
              >
                <span className="pb-arm pb-arm-right" aria-hidden="true">
                  <span className="pb-arm-dot" />
                </span>
                <BenefitCard b={b} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

function BenefitCard({ b }: { b: Benefit }) {
  const Icon = b.icon
  return (
    <div className="pb-card">
      <div
        className="pb-card-icon"
        style={{
          background: b.iconBg,
          border: `1px solid ${b.iconBorder}`,
          color: b.iconColor,
        }}
      >
        <Icon size={17} strokeWidth={1.8} />
      </div>
      <div className="pb-card-body">
        <span className="pb-ing">{b.ingredient}</span>
        <div className="pb-chain">
          {b.chain.map((step) => (
            <span key={step} className="pb-step">
              <span className="pb-arrow">↓</span>
              {step}
            </span>
          ))}
        </div>
        <span className="pb-outcome">{b.outcome}</span>
      </div>
    </div>
  )
}
