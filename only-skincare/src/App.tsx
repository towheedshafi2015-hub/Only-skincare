import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HeroSection from './components/HeroSection'
import SocialProofStrip from './components/SocialProofStrip'
import FeaturedCollection from './components/FeaturedCollection'
import WhyChooseUs from './components/WhyChooseUs'
import BrandStory from './components/BrandStory'
import ProductBenefits from './components/ProductBenefits'
import CustomerResults from './components/CustomerResults'
import ShoppableReels from './components/ShoppableReels'
import TrustAuthority from './components/TrustAuthority'
import HowItWorks from './components/HowItWorks'
import FaqGuarantee from './components/FaqGuarantee'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import { CartProvider } from './context/CartContext'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  return (
    <CartProvider>
      <div className="app">
        
        {/* ── Navbar & Announcement Bar ── */}
        <Navbar />
        
        {/* ── SECTION 1: Hero ── */}
        <HeroSection />

        {/* ── SECTION 2: Social Proof Strip ── */}
        <SocialProofStrip />

        {/* ── SECTION 3: Featured Collection ── */}
        <FeaturedCollection />

        {/* ── SECTION 4: Why Choose Us (Comparison) ── */}
        <WhyChooseUs />

        {/* ── SECTION 5: Brand Story ── */}
        <BrandStory />

        {/* ── SECTION 6: Product Benefits ── */}
        <ProductBenefits />

        {/* ── SECTION 7: Customer Results ── */}
        <CustomerResults />

        {/* ── SECTION 8: Shoppable Reels ── */}
        <ShoppableReels />

        {/* ── SECTION 9: Trust & Authority ── */}
        <TrustAuthority />

        {/* ── SECTION 10: How It Works ── */}
        <HowItWorks />

        {/* ── SECTION 11: FAQ + Guarantee ── */}
        <FaqGuarantee />

        {/* ── FOOTER ── */}
        <Footer />

        {/* ── Global Cart Slide-in Panel ── */}
        <CartDrawer />

      </div>
    </CartProvider>
  )
}
