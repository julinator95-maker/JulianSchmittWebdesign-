import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import AudienceStrip from './components/AudienceStrip'
import Process from './components/Process'
import Services from './components/Services'
import Growth from './components/Growth'
import Referral from './components/Referral'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollProgress from './components/fx/ScrollProgress'
import SpotlightCursor from './components/fx/SpotlightCursor'
import WindCursor from './components/fx/WindCursor'
import Grain from './components/fx/Grain'
import SmoothScroll from './components/fx/SmoothScroll'

export default function App() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <SpotlightCursor />
      <WindCursor />
      <Grain />
      <Nav />
      <main>
        <Hero />
        <About />
        <AudienceStrip />
        <Process />
        <Services />
        <Referral />
        <Growth />
        <FAQ />
        <Contact />
      </main>
      <WhatsAppButton />
    </>
  )
}
