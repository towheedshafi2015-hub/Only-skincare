import HeroSection from './components/HeroSection'
import SocialProofStrip from './components/SocialProofStrip'
import FeaturedCollection from './components/FeaturedCollection'
import WhyChooseUs from './components/WhyChooseUs'
import CartDrawer from './components/CartDrawer'
import { CartProvider } from './context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <div className="app">
        
        {/* ── SECTION 1: Hero ── */}
        <HeroSection />

        {/* ── SECTION 2: Social Proof Strip ── */}
        <SocialProofStrip />

        {/* ── SECTION 3: Featured Collection ── */}
        <FeaturedCollection />

        {/* ── SECTION 4: Why Choose Us (Comparison) ── */}
        <WhyChooseUs />

        {/* ── Global Cart Slide-in Panel ── */}
        <CartDrawer />

      </div>
    </CartProvider>
  )
}
