import { useState, useEffect, useRef } from 'react'
import { Sun, Moon, Clock, Check, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react'
import { getAssetUrl } from '../lib/assets'
import '../how-it-works.css'

type Mode = 'am' | 'pm'

interface Step {
  number: string
  name: string
  action: string
  product: string
  image: string
  time: string
  benefits: string[]
  ingredient: string
  color: string
}

/* ─── Data ────────────────────────────────────────── */
const AM: Step[] = [
  {
    number: '01', name: 'Clean', action: 'Double Cleanse',
    product: 'Nourishing Cleansing Oil',
    image: '/products/cleansing-oil.jpeg', time: '~30 sec',
    benefits: ['Melts SPF & makeup residue', 'Deeply purifies every pore', 'Leaves skin perfectly balanced'],
    ingredient: 'Jojoba Oil', color: '#4CAF7D',
  },
  {
    number: '02', name: 'Refine', action: 'Tone & Exfoliate',
    product: 'Clarifying Toner',
    image: '/products/toner.jpeg', time: '~45 sec',
    benefits: ['Refines & minimises pores', 'Balances skin pH instantly', 'Primes skin for actives'],
    ingredient: 'AHA / BHA Complex', color: '#A78BFA',
  },
  {
    number: '03', name: 'Hydrate', action: 'Deep Moisturise',
    product: 'Luxury Moisturiser',
    image: '/products/moisturizer.jpeg', time: '~30 sec',
    benefits: ['72-hour deep hydration', 'Visibly plumps & firms skin', 'Strengthens the skin barrier'],
    ingredient: 'Hyaluronic Acid', color: '#D4B06A',
  },
  {
    number: '04', name: 'Protect', action: 'Seal & Shield',
    product: 'SPF 50 PA++++',
    image: '/products/sunscreen.jpeg', time: '~30 sec',
    benefits: ['Blocks full-spectrum UV rays', 'Zero white cast on all tones', 'Locks in your full routine'],
    ingredient: 'Zinc Oxide PA++++', color: '#60A5FA',
  },
]

const PM: Step[] = [
  {
    number: '01', name: 'Cleanse', action: 'Remove the Day',
    product: 'Nourishing Cleansing Oil',
    image: '/products/cleansing-oil.jpeg', time: '~45 sec',
    benefits: ['Removes every trace of makeup', 'Unclogs congested pores', 'Soothes & calms the skin'],
    ingredient: 'Jojoba Oil', color: '#4CAF7D',
  },
  {
    number: '02', name: 'Exfoliate', action: 'Overnight Reset',
    product: 'Clarifying Toner',
    image: '/products/toner.jpeg', time: '~30 sec',
    benefits: ['Clears dead skin overnight', 'Stimulates rapid cell renewal', 'Preps skin for repair actives'],
    ingredient: 'Lactic Acid', color: '#A78BFA',
  },
  {
    number: '03', name: 'Repair', action: 'Barrier Recovery',
    product: 'Luxury Moisturiser',
    image: '/products/moisturizer.jpeg', time: '~45 sec',
    benefits: ['Fades dark spots overnight', 'Restores the skin barrier', 'Nourishes deep skin layers'],
    ingredient: 'Niacinamide 5%', color: '#D4B06A',
  },
  {
    number: '04', name: 'Recover', action: 'Sleep & Glow',
    product: 'Nighttime Recovery Cream',
    image: '/products/night-cream.jpeg', time: '~1 min',
    benefits: ['Active repair while you sleep', 'Restores lost skin elasticity', 'Wake up visibly glowing'],
    ingredient: 'Peptide Complex', color: '#818CF8',
  },
]

/* ─── Component ───────────────────────────────────── */
export default function HowItWorks() {
  const [mode,   setMode]   = useState<Mode>('am')
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const seqRef     = useRef<ReturnType<typeof setInterval> | null>(null)
  const hasSeq     = useRef(false)

  const steps = mode === 'am' ? AM : PM
  const step  = steps[active]

  /* clear running sequence */
  const clearSeq = () => { if (seqRef.current) { clearInterval(seqRef.current); seqRef.current = null } }

  const goTo = (i: number) => { clearSeq(); setActive(i) }
  const goNext = () => goTo((active + 1) % steps.length)
  const goPrev = () => goTo((active - 1 + steps.length) % steps.length)

  const changeMode = (m: Mode) => { clearSeq(); setMode(m); setActive(0) }

  /* auto-sequence on first scroll into view */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !hasSeq.current) {
        hasSeq.current = true
        setVisible(true)
        let i = 0
        seqRef.current = setInterval(() => {
          i++
          if (i >= AM.length) { clearSeq(); setActive(0) }
          else setActive(i)
        }, 680)
      }
    }, { threshold: 0.18 })
    obs.observe(el)
    return () => { obs.disconnect(); clearSeq() }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* keyboard navigation */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft')  goPrev()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }) // no dep array intentional — always reads latest active

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={`hiw-section${visible ? ' hiw-visible' : ''}`}
      aria-label="How It Works — The Ritual"
    >
      {/* Layered backgrounds */}
      <div className="hiw-bg-base"  aria-hidden="true" />
      <div
        className="hiw-bg-glow"
        style={{ '--step-color': step.color } as React.CSSProperties}
        aria-hidden="true"
      />

      {/* ── TOP: header + toggle ── */}
      <div className="container-os hiw-top">
        <div className="hiw-header">
          <div className="hiw-eyebrow">
            <Sparkles size={11} />
            <span>How It Works</span>
          </div>
          <h2 className="hiw-heading">The Ritual</h2>
          <p className="hiw-sub">
            A 3-minute routine that transforms your skin — morning and night.
          </p>
        </div>

        {/* AM / PM toggle */}
        <div className="hiw-toggle" role="group" aria-label="Routine time">
          {(['am', 'pm'] as Mode[]).map(m => (
            <button
              key={m}
              className={`hiw-toggle-btn${mode === m ? ' hiw-toggle-active' : ''}`}
              onClick={() => changeMode(m)}
              aria-pressed={mode === m}
            >
              {m === 'am' ? <Sun size={13} /> : <Moon size={13} />}
              <span>{m === 'am' ? 'Morning' : 'Night'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── STEP CONNECTOR ── */}
      <div className="container-os hiw-connector-area">
        <div className="hiw-steps-row" role="tablist" aria-label="Ritual steps">
          {/* Background track */}
          <div className="hiw-track" aria-hidden="true">
            <div
              className="hiw-track-fill"
              style={{
                transform: `scaleX(${active / (steps.length - 1)})`,
                '--line-color': step.color,
              } as React.CSSProperties}
            />
          </div>

          {steps.map((s, i) => (
            <button
              key={`${mode}-step-${i}`}
              className={[
                'hiw-step-btn',
                i === active ? 'hiw-step-active' : '',
                i < active  ? 'hiw-step-done'   : '',
              ].join(' ')}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Step ${s.number}: ${s.name}`}
              style={{ '--step-color': s.color } as React.CSSProperties}
            >
              <span className="hiw-step-circle">
                {i < active
                  ? <Check size={14} strokeWidth={3} />
                  : <span className="hiw-step-num-txt">{s.number}</span>
                }
              </span>
              <span className="hiw-step-lbl">{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN: image + detail ── */}
      <div className="container-os hiw-main">

        {/* Image */}
        <div className="hiw-img-wrap">
          <div
            className="hiw-img-frame"
            style={{ '--accent': step.color } as React.CSSProperties}
          >
            <img
              key={`${mode}-img-${active}`}
              src={getAssetUrl(step.image)}
              alt={step.product}
              className="hiw-img"
              loading="lazy"
            />
            <div className="hiw-img-grad" aria-hidden="true" />

            {/* Watermark step number */}
            <span className="hiw-img-watermark" aria-hidden="true">{step.number}</span>

            {/* Time badge */}
            <div className="hiw-time-chip">
              <Clock size={10} />
              <span>{step.time}</span>
            </div>

            {/* Mode chip */}
            <div className="hiw-mode-chip">
              {mode === 'am' ? <Sun size={10} /> : <Moon size={10} />}
              <span>{mode === 'am' ? 'AM Routine' : 'PM Routine'}</span>
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div
          key={`${mode}-detail-${active}`}
          className="hiw-detail"
          style={{ '--accent': step.color } as React.CSSProperties}
        >
          <div className="hiw-detail-meta">
            <span className="hiw-detail-step-num">{step.number}</span>
            <div className="hiw-detail-meta-text">
              <span className="hiw-detail-action">{step.action}</span>
              <span className="hiw-detail-product">{step.product}</span>
            </div>
          </div>

          <h3 className="hiw-detail-name">{step.name}</h3>

          <div className="hiw-sep" aria-hidden="true" />

          {/* Benefits */}
          <ul className="hiw-benefits" aria-label="Step benefits">
            {step.benefits.map((b, i) => (
              <li
                key={b}
                className="hiw-benefit"
                style={{ '--bd': `${i * 0.12}s`, '--accent': step.color } as React.CSSProperties}
              >
                <span className="hiw-benefit-icon" aria-hidden="true">
                  <Check size={11} strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          {/* Ingredient pill */}
          <div
            className="hiw-ingredient"
            style={{ '--accent': step.color } as React.CSSProperties}
          >
            <span className="hiw-ing-pre">Powered by</span>
            <span className="hiw-ing-name">{step.ingredient}</span>
          </div>

          {/* Navigation */}
          <div className="hiw-nav">
            <button className="hiw-nav-prev" onClick={goPrev} aria-label="Previous step">
              <ChevronLeft size={14} />
              <span>Prev</span>
            </button>

            <div className="hiw-dots" aria-hidden="true">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`hiw-dot${i === active ? ' hiw-dot-active' : ''}`}
                  style={i === active ? { background: step.color } : undefined}
                />
              ))}
            </div>

            <button
              className="hiw-nav-next"
              onClick={goNext}
              aria-label="Next step"
              style={{ '--accent': step.color } as React.CSSProperties}
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
