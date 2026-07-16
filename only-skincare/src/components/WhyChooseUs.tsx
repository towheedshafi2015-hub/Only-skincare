import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, X, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: '01',
    topic: 'Formulation Base',
    traditional: {
      title: 'Harsh Chemicals',
      desc: 'Synthetic fillers, parabens, and sulfates that strip the skin barrier.',
    },
    onlySkincare: {
      title: 'Clinical Bio-Actives',
      desc: 'High-purity niacinamide, hyaluronic acids, and clean botanical synergy.',
    },
  },
  {
    number: '02',
    topic: 'Targeted Action',
    traditional: {
      title: 'Temporary Surface Fixes',
      desc: 'High-silicone cover-ups that create an illusion of glow while clogging pores.',
    },
    onlySkincare: {
      title: 'Cellular Renewal',
      desc: 'Long-term deep renewal that heals the dermis layers from within.',
    },
  },
  {
    number: '03',
    topic: 'Clinical Validation',
    traditional: {
      title: 'Generic Self-Claims',
      desc: 'Marketing hype and unverified self-testing parameters.',
    },
    onlySkincare: {
      title: 'Dermatologist Verified',
      desc: 'Rigorous third-party clinical patch tests proving zero irritation.',
    },
  },
  {
    number: '04',
    topic: 'Satisfaction Rate',
    traditional: {
      title: 'Inconsistent Results',
      desc: 'High returns and mixed reviews due to generic chemical formulations.',
    },
    onlySkincare: {
      title: '98% Track Record',
      desc: 'Proven visible skin improvements trusted by 50,000+ D2C consumers.',
    },
  },
]

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const prevStepRef = useRef(0)
  const lastSoundTimeRef = useRef(0)

  // ── Native Web Audio UI Tick Synthesizer with Throttle ──
  const playTick = () => {
    const now = Date.now()
    if (now - lastSoundTimeRef.current < 150) return
    lastSoundTimeRef.current = now

    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()

      osc.connect(gain)
      gain.connect(audioCtx.destination)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1100, audioCtx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(350, audioCtx.currentTime + 0.05)

      gain.gain.setValueAtTime(0.025, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05)

      osc.start()
      osc.stop(audioCtx.currentTime + 0.05)
    } catch (e) {
      console.warn('Audio gesture blocked or unsupported:', e)
    }
  }

  // ── Scroll to Step on Click ──
  const handleStepClick = (idx: number) => {
    const wrapper = containerRef.current
    if (!wrapper) return

    const rect = wrapper.getBoundingClientRect()
    const wrapperTop = rect.top + window.scrollY
    const viewH = window.innerHeight

    // The scroll range of ScrollTrigger is exactly 200vh.
    // Landing on the midpoint (idx + 0.5) of each step ensures stable trigger state.
    const targetProgress = (idx + 0.5) / 4
    const targetY = wrapperTop + targetProgress * (viewH * 2)

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=200vh',
      onUpdate(self) {
        const progress = self.progress
        let step = Math.floor(progress * 4)
        if (step > 3) step = 3

        if (step !== prevStepRef.current) {
          setActiveStep(step)
          prevStepRef.current = step
          playTick()
        }
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  // Smoothly animate details panel card transitions
  useEffect(() => {
    gsap.fromTo(
      '.wcu-detail-anim',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.06 }
    )
  }, [activeStep])

  return (
    <div ref={containerRef} className="wcu-wrapper">
      <div className="wcu-sticky">
        <div className="wcu-noise" />

        <div className="wcu-content container-os">
          
          {/* LEFT SIDE: Clickable Staircase */}
          <div className="wcu-left">
            <div className="wcu-staircase-canvas">
              {STEPS.map((step, idx) => {
                const isActive = idx === activeStep
                const isPassed = idx < activeStep
                return (
                  <button
                    key={step.number}
                    className={`wcu-stair-container stair-pos-${idx} ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                    onClick={() => handleStepClick(idx)}
                    aria-label={`Go to step ${step.number}: ${step.topic}`}
                  >
                    {/* The 3D Step Box */}
                    <div className="wcu-stair-block">
                      <div className="stair-face face-top">
                        <span className="stair-num">{step.number}</span>
                      </div>
                      <div className="stair-face face-front" />
                      <div className="stair-face face-side" />
                    </div>

                    {/* Step Label */}
                    <span className="wcu-stair-label">{step.topic}</span>
                  </button>
                )
              })}

              {/* Dashed background timeline */}
              <div className="wcu-climb-line" />
            </div>
          </div>

          {/* RIGHT SIDE: Dynamic Comparison Details */}
          <div className="wcu-right">
            
            <div className="wcu-detail-anim wcu-step-indicator">
              <span className="wcu-ind-num text-gold">STEP {STEPS[activeStep].number}</span>
              <span className="wcu-ind-divider">/</span>
              <span className="wcu-ind-total">04</span>
            </div>

            <h2 className="wcu-detail-anim wcu-step-topic">
              {STEPS[activeStep].topic}
            </h2>

            <div className="wcu-detail-anim wcu-comparison-stack">
              
              {/* Traditional (Them) */}
              <div className="wcu-comp-card card-them">
                <div className="wcu-comp-header">
                  <span className="wcu-comp-icon icon-bad">
                    <X size={12} />
                  </span>
                  <h3 className="wcu-comp-brand">Traditional Brands</h3>
                </div>
                <h4 className="wcu-comp-title">{STEPS[activeStep].traditional.title}</h4>
                <p className="wcu-comp-desc">{STEPS[activeStep].traditional.desc}</p>
              </div>

              {/* Only Skincare (Us) */}
              <div className="wcu-comp-card card-us">
                <div className="wcu-card-glow" />
                
                <div className="wcu-comp-header">
                  <span className="wcu-comp-icon icon-good">
                    <Check size={12} />
                  </span>
                  <h3 className="wcu-comp-brand text-sage">Only Skincare</h3>
                  <span className="wcu-verified-badge">
                    <Sparkles size={8} className="inline mr-1" />
                    Dermatologist Ok
                  </span>
                </div>
                <h4 className="wcu-comp-title text-white">{STEPS[activeStep].onlySkincare.title}</h4>
                <p className="wcu-comp-desc text-white/80">{STEPS[activeStep].onlySkincare.desc}</p>
              </div>

            </div>

            <div className="wcu-detail-anim wcu-step-cta">
              <button 
                className="btn-primary wcu-action-btn"
                onClick={() => alert('Add to cart / Buy Now')}
              >
                Buy Now — Shop Best Sellers
              </button>
              <p className="wcu-cta-sub">Tap to transition your skincare routine today.</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
