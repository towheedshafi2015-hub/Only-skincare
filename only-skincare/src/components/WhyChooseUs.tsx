import { useEffect, useRef } from 'react'
import {
  ArrowRight,
  Check,
  FlaskConical,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsDown,
  X,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WhyChooseUs() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    // GSAP ScrollTrigger timeline to reveal all elements smoothly on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // Header reveal
    tl.fromTo(
      '.wcu-header-reveal',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    // Side-by-side comparison cards reveal
    tl.fromTo(
      '.wcu-cards-reveal',
      { opacity: 0, y: 40, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15 },
      '-=0.5'
    )

    // Image banner reveal
    tl.fromTo(
      '.wcu-banner-reveal',
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )

    // Benefit rows reveal (staggered)
    tl.fromTo(
      '.wcu-benefit-row',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12 },
      '-=0.4'
    )

    // CTA reveal
    tl.fromTo(
      '.wcu-cta-reveal',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    )
  }, [])

  return (
    <section ref={rootRef} className="wcu-section-replica">
      <div className="wcu-container">
        
        {/* ── HEADER BLOCK ── */}
        <div className="wcu-header-reveal wcu-header-new">
          <div className="wcu-badge">
            <Sparkles className="size-3.5 text-gold animate-pulse" />
            <span className="wcu-badge-text">Why Choose Us</span>
          </div>
          <h2 className="wcu-title-new">
            <span>Not Features. </span>
            <em className="text-sage font-serif italic">Benefits.</em>
          </h2>
          <p className="wcu-subtitle-new">
            Skincare that treats the cause, not the symptom. Here is exactly how we compare to what everyone else is selling.
          </p>
        </div>

        {/* ── COMPARISON CARDS (Grid Row) ── */}
        <div className="wcu-grid-new">
          
          {/* Card 1: Traditional Brands */}
          <div className="wcu-cards-reveal wcu-card-item card-traditional">
            <div className="wcu-card-header-new">
              <div className="wcu-avatar-bg">
                <ThumbsDown className="size-4 text-neutral-500" />
              </div>
              <div className="wcu-card-titles">
                <h3 className="wcu-card-title-main">Traditional Brands</h3>
                <span className="wcu-card-desc-sub">The old way of doing skincare.</span>
              </div>
            </div>
            <div className="wcu-card-content-new">
              <div className="wcu-card-bullet">
                <div className="wcu-bullet-icon icon-red">
                  <X className="size-3 text-red-600" />
                </div>
                <span className="wcu-bullet-text strike-through text-neutral-500">Harsh Chemicals</span>
              </div>
              <div className="wcu-card-bullet">
                <div className="wcu-bullet-icon icon-red">
                  <X className="size-3 text-red-600" />
                </div>
                <span className="wcu-bullet-text strike-through text-neutral-500">Temporary Results</span>
              </div>
              <div className="wcu-card-bullet">
                <div className="wcu-bullet-icon icon-red">
                  <X className="size-3 text-red-600" />
                </div>
                <span className="wcu-bullet-text strike-through text-neutral-500">Generic Ingredients</span>
              </div>
              <div className="wcu-card-bullet">
                <div className="wcu-bullet-icon icon-red">
                  <X className="size-3 text-red-600" />
                </div>
                <span className="wcu-bullet-text strike-through text-neutral-500">No Proven Track Record</span>
              </div>
            </div>
          </div>

          {/* Card 2: Your Brand (Only Skincare) */}
          <div className="wcu-cards-reveal wcu-card-item card-onlyskincare">
            <div className="wcu-recommended-tag">
              <Star className="size-2.5 fill-gold text-gold" />
              Recommended
            </div>
            <div className="wcu-card-header-new">
              <div className="wcu-avatar-bg premium-gold-bg">
                <ShieldCheck className="size-4 text-white" />
              </div>
              <div className="wcu-card-titles">
                <h3 className="wcu-card-title-main text-white">Only Skincare</h3>
                <span className="wcu-card-desc-sub text-white/70">Science-backed, skin-first care.</span>
              </div>
            </div>
            <div className="wcu-card-content-new">
              <div className="wcu-card-bullet">
                <div className="wcu-bullet-icon premium-icon-check">
                  <Check className="size-3 text-white" />
                </div>
                <span className="wcu-bullet-text font-medium text-white">Clinical Ingredients</span>
              </div>
              <div className="wcu-card-bullet">
                <div className="wcu-bullet-icon premium-icon-check">
                  <Check className="size-3 text-white" />
                </div>
                <span className="wcu-bullet-text font-medium text-white">Long-Term Results</span>
              </div>
              <div className="wcu-card-bullet">
                <div className="wcu-bullet-icon premium-icon-check">
                  <Check className="size-3 text-white" />
                </div>
                <span className="wcu-bullet-text font-medium text-white">Dermatologist Approved</span>
              </div>
              <div className="wcu-card-bullet">
                <div className="wcu-bullet-icon premium-icon-check">
                  <Check className="size-3 text-white" />
                </div>
                <span className="wcu-bullet-text font-medium text-white">Track Record 98%</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── LIFESTYLE STATS BANNER ── */}
        <div className="wcu-banner-reveal wcu-banner-card">
          <img
            src="https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
            alt="Glowing skin portrait model"
            className="wcu-banner-img"
          />
          <div className="wcu-banner-overlay" />
          <div className="wcu-banner-content">
            <div className="wcu-banner-stats">
              <span className="wcu-stats-num">98%</span>
              <span className="wcu-stats-text">saw visible results in 4 weeks</span>
            </div>
            <div className="wcu-banner-social">
              <div className="wcu-social-avatars">
                <div className="wcu-avatar avatar-1" />
                <div className="wcu-avatar avatar-2" />
                <div className="wcu-avatar avatar-3" />
              </div>
              <span className="wcu-social-text">Trusted by 50,000+ people</span>
            </div>
          </div>
        </div>

        {/* ── BENEFITS LIST ROWS ── */}
        <div className="wcu-benefits-list">
          
          <div className="wcu-benefit-row">
            <div className="wcu-benefit-icon-box">
              <FlaskConical className="size-4.5 text-sage" />
            </div>
            <div className="wcu-benefit-row-text">
              <span className="wcu-benefit-row-title">Clinically Proven</span>
              <span className="wcu-benefit-row-desc">Every formula laboratory tested and certified for maximum real-skin efficacy.</span>
            </div>
          </div>

          <div className="wcu-benefit-row">
            <div className="wcu-benefit-icon-box">
              <Leaf className="size-4.5 text-sage" />
            </div>
            <div className="wcu-benefit-row-text">
              <span className="wcu-benefit-row-title">Clean Ingredients</span>
              <span className="wcu-benefit-row-desc">Strictly zero synthetic fillers, sulfates, or parabens. Organic plant extracts only.</span>
            </div>
          </div>

          <div className="wcu-benefit-row">
            <div className="wcu-benefit-icon-box">
              <HeartHandshake className="size-4.5 text-sage" />
            </div>
            <div className="wcu-benefit-row-text">
              <span className="wcu-benefit-row-title">Derm Approved</span>
              <span className="wcu-benefit-row-desc">Formulated and verified in collaboration with premier Indian dermatological boards.</span>
            </div>
          </div>

        </div>

        {/* ── CALL TO ACTION ACTION BLOCK ── */}
        <div className="wcu-cta-reveal wcu-cta-block">
          <button 
            className="btn-primary wcu-btn-discover"
            onClick={() => {
              const el = document.getElementById('featured-collection-section')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span>Discover the Difference</span>
            <ArrowRight className="size-4" />
          </button>
          <span className="wcu-cta-note">
            30-day money-back guarantee — results or your money back.
          </span>
        </div>

      </div>
    </section>
  )
}
