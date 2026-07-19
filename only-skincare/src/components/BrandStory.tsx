import Lanyard from './Lanyard'
import founderFront from '../assets/founder/founder.png'
import founderBack from '../assets/founder/Founder 2.png'
import { ShieldCheck, Heart, Compass, Sparkles, ArrowRight } from 'lucide-react'
import '../brand-story.css'

export default function BrandStory() {
  return (
    <section className="brand-story-section" id="brand-story">
      {/* Subtle background layers */}
      <div className="bs-bg-glow" aria-hidden="true" />
      <div className="bs-noise" aria-hidden="true" />

      <div className="container-os bs-inner">

        {/* ── LEFT: Brand / Founder Content ── */}
        <div className="bs-left">

          <div className="bs-eyebrow">
            <Sparkles size={11} className="text-gold" />
            <span>The Soul of Only Skincare</span>
          </div>

          <h2 className="bs-heading">
            A Founder's<br />
            <em>Promise.</em>
          </h2>

          <blockquote className="bs-quote">
            "Skincare has been overcomplicated by corporations selling temporary fixes. We set out to change that."
          </blockquote>

          <p className="bs-body">
            Founded by 20-year-old visionary <strong>Owais Khan</strong>, Only Skincare was born from a simple frustration — a lack of transparency and clinical efficacy in standard products. We fuse advanced Korean dermatological actives with native Indian botanical wisdom.
          </p>

          {/* Pillars */}
          <div className="bs-pillars">
            <div className="bs-pillar">
              <span className="bs-pillar-icon">
                <ShieldCheck size={16} />
              </span>
              <div>
                <span className="bs-pillar-title">Clinical Efficacy</span>
                <span className="bs-pillar-desc">Korean research standards adapted for Indian skin.</span>
              </div>
            </div>

            <div className="bs-pillar">
              <span className="bs-pillar-icon">
                <Heart size={16} />
              </span>
              <div>
                <span className="bs-pillar-title">Skin First</span>
                <span className="bs-pillar-desc">Clean, vegan formulations that repair the skin barrier.</span>
              </div>
            </div>

            <div className="bs-pillar">
              <span className="bs-pillar-icon">
                <Compass size={16} />
              </span>
              <div>
                <span className="bs-pillar-title">Total Transparency</span>
                <span className="bs-pillar-desc">Every active ingredient concentration disclosed.</span>
              </div>
            </div>
          </div>

          {/* Signature + CTA */}
          <div className="bs-footer-row">
            <div className="bs-signature">
              <span className="bs-sig-name">Owais Khan</span>
              <span className="bs-sig-title">Founder, Only Skincare · Age 20</span>
            </div>
            <button className="btn-primary bs-cta" type="button">
              Our Story <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* ── RIGHT: 3D Founder Lanyard Card ── */}
        <div className="bs-right">
          {/* Glow behind the canvas */}
          <div className="bs-card-glow" aria-hidden="true" />

          {/* Interaction hint */}
          <div className="bs-badge">
            <span className="bs-pulse-dot" />
            <span className="bs-badge-text">Drag to Swing &amp; Spin</span>
          </div>

          {/* Label above */}
          <div className="bs-card-label">
            <span className="bs-card-label-eyebrow">Founder ID</span>
            <span className="bs-card-label-name">Owais Khan</span>
          </div>

          {/* 3D Canvas */}
          <div className="bs-lanyard-wrap">
            <Lanyard
              position={[0, 0, 14]}
              gravity={[0, -45, 0]}
              fov={20}
              frontImage={founderFront}
              backImage={founderBack}
              imageFit="cover"
              lanyardWidth={0.8}
            />
          </div>
        </div>

      </div>
    </section>
  )
}
