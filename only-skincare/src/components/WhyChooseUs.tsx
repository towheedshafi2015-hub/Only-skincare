import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, X, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const COMPARISONS = [
  {
    topic: 'Formulation Base',
    traditional: 'Harsh synthetic chemicals & fillers',
    onlySkincare: 'Clean, clinical bio-active ingredients',
  },
  {
    topic: 'Targeted Action',
    traditional: 'Temporary surface fixes & cosmetic cover-ups',
    onlySkincare: 'Long-term cellular renewal & deep hydration',
  },
  {
    topic: 'Clinical Validation',
    traditional: 'Generic, unverified claims & self-testing',
    onlySkincare: 'Dermatologist tested & clinically approved',
  },
  {
    topic: 'Customer Success',
    traditional: 'Low repeat rates & inconsistent reviews',
    onlySkincare: '98% proven track record of visible results',
  },
]

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.from('.wcu-eyebrow', { opacity: 0, y: 15, duration: 0.6 })
      .from('.wcu-title', { opacity: 0, y: 25, duration: 0.7 }, '-=0.4')
      .from('.wcu-subtitle', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
      .from('.wcu-card-them', { opacity: 0, x: -30, duration: 0.8, ease: 'power2.out' }, '-=0.3')
      .from('.wcu-card-us', { opacity: 0, x: 30, duration: 0.8, ease: 'power2.out' }, '-=0.8')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={containerRef} className="wcu-section">
      <div className="container-os">
        
        {/* Header Stack */}
        <div className="wcu-header text-center">
          <span className="wcu-eyebrow eyebrow">The Comparison</span>
          <h2 className="wcu-title">
            Clinical Efficacy Over<br />
            <em>Marketing Hype.</em>
          </h2>
          <p className="wcu-subtitle">
            Most brands hide behind beautiful packaging. We prioritize dermatological science to bring you long-term, visible results.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="wcu-grid">
          
          {/* Card: Traditional Brands */}
          <div className="wcu-card wcu-card-them">
            <div className="wcu-card-header">
              <span className="wcu-card-alert-icon">
                <ShieldAlert size={18} />
              </span>
              <h3 className="wcu-card-title">Traditional Brands</h3>
              <p className="wcu-card-desc">Generic cosmetic shelf-fillers</p>
            </div>
            
            <div className="wcu-items">
              {COMPARISONS.map((item, i) => (
                <div key={i} className="wcu-item">
                  <span className="wcu-icon-bad">
                    <X size={14} />
                  </span>
                  <div className="wcu-item-text">
                    <span className="wcu-item-topic">{item.topic}</span>
                    <span className="wcu-item-value">{item.traditional}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Only Skincare (The Glow Card) */}
          <div className="wcu-card wcu-card-us">
            
            {/* Spotlight Accent */}
            <div className="wcu-card-spotlight" />

            <div className="wcu-card-header">
              <span className="wcu-card-success-icon">
                <ShieldCheck size={18} />
              </span>
              <h3 className="wcu-card-title">Only Skincare</h3>
              <p className="wcu-card-desc">Dermatologist-formulated science</p>
              
              {/* Premium Glow Tag */}
              <span className="wcu-glow-tag">
                <Sparkles size={10} className="inline mr-1" />
                Dermatologically Approved
              </span>
            </div>
            
            <div className="wcu-items">
              {COMPARISONS.map((item, i) => (
                <div key={i} className="wcu-item">
                  <span className="wcu-icon-good">
                    <Check size={14} />
                  </span>
                  <div className="wcu-item-text">
                    <span className="wcu-item-topic text-sage">{item.topic}</span>
                    <span className="wcu-item-value text-white">{item.onlySkincare}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
