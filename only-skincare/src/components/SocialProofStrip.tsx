import { Star, Shield, Award, Sparkles, Heart } from 'lucide-react'

const CREATORS = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=240&h=240',
    size: 'w-20 h-20 md:w-24 md:h-24',
    pos: 'top-[8%] left-[6%] md:left-[12%]',
    delay: '0s',
    stat: { label: '4.9 ★ Rating', sub: '50k+ Reviews', pos: 'bottom-[-10px] left-[-20px]' },
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240&h=240',
    size: 'w-14 h-14 md:w-18 md:h-18',
    pos: 'top-[36%] left-[4%] md:left-[8%]',
    delay: '0.4s',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=240&h=240',
    size: 'w-18 h-18 md:w-22 md:h-22',
    pos: 'bottom-[12%] left-[8%] md:left-[16%]',
    delay: '0.2s',
    stat: { icon: Heart, label: '70,000+', sub: 'Happy Skins', pos: 'top-[-8px] right-[-30px]' },
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=240&h=240',
    size: 'w-20 h-20 md:w-26 md:h-26',
    pos: 'top-[8%] right-[6%] md:right-[12%]',
    delay: '0.6s',
    stat: { icon: Sparkles, label: '500+ Creators', sub: 'Trust Only', pos: 'bottom-[-10px] right-[-20px]' },
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=240&h=240',
    size: 'w-14 h-14 md:w-18 md:h-18',
    pos: 'top-[36%] right-[4%] md:right-[8%]',
    delay: '0.8s',
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=240&h=240',
    size: 'w-18 h-18 md:w-22 md:h-22',
    pos: 'bottom-[12%] right-[8%] md:right-[16%]',
    delay: '0.3s',
    stat: { icon: Award, label: '15M+ Views', sub: 'TikTok & Insta', pos: 'top-[-8px] left-[-35px]' },
  },
]

export default function SocialProofStrip() {
  return (
    <section className="sp-section">
      
      {/* ── Background Editorial Accents ── */}
      <div className="sp-bg-light" aria-hidden="true" />
      <div className="sp-bg-noise" aria-hidden="true" />

      {/* ── Main Canvas (Fixed 700px frame) ── */}
      <div className="sp-canvas-wrapper container-os">
        
        {/* Center Editorial Card Stack (z-index 10) */}
        <div className="sp-center-stack">
          
          {/* Trust Badge */}
          <div className="sp-badge-wrap">
            <span className="sp-badge-icon">
              <Shield size={12} strokeWidth={2.5} />
            </span>
            <span className="sp-badge-txt">100% Certified Clean</span>
          </div>

          {/* Heading */}
          <h2 className="sp-title">
            Science-Backed.<br />
            <em>Results-Driven.</em>
          </h2>

          {/* Subtitle */}
          <p className="sp-subtitle">
            Ditch the filters. Over 70,000+ customers have experienced the transition to healthy, glowing skin with our dermatologist-approved formulations.
          </p>

          {/* Stars & Rating Recap */}
          <div className="sp-stars-row">
            <div className="sp-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#D4B06A" stroke="none" />
              ))}
            </div>
            <span className="sp-rating-txt">4.9/5 Average Rating</span>
          </div>

          {/* Brand Buy CTA Button */}
          <div className="sp-cta-box">
            <button 
              className="btn-primary sp-buy-btn"
              onClick={() => alert('Navigate to collections')}
            >
              Shop Best Sellers — Buy Now
            </button>
            <p className="sp-cta-subtext">Free shipping & 30-Day Money-Back Guarantee</p>
          </div>

        </div>

        {/* ── Floating Avatars & Badges (Paywall style layout) ── */}
        <div className="sp-floating-group">
          {CREATORS.map((c) => {
            const Icon = c.stat?.icon
            return (
              <div
                key={c.id}
                className={`sp-creator-bubble ${c.size} ${c.pos}`}
                style={{ animationDelay: c.delay }}
              >
                <div className="sp-avatar-frame">
                  <img src={c.img} alt={`Verified User portrait ${c.id}`} className="sp-avatar-img" />
                </div>

                {c.stat && (
                  <div className={`sp-floating-tag ${c.stat.pos}`}>
                    <div className="sp-tag-body">
                      {Icon && <Icon size={11} className="text-gold fill-gold/10" />}
                      <div className="sp-tag-content">
                        <span className="sp-tag-val">{c.stat.label}</span>
                        <span className="sp-tag-lbl">{c.stat.sub}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>

    </section>
  )
}
