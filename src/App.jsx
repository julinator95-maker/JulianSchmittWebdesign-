import Nav from './components/Nav'
import Hero from './components/Hero'
import StatsStrip from './components/StatsStrip'
import About from './components/About'
import TextStrip from './components/TextStrip'
import AudienceStrip from './components/AudienceStrip'
import Process from './components/Process'
import Services from './components/Services'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollProgress from './components/fx/ScrollProgress'
import SpotlightCursor from './components/fx/SpotlightCursor'
import Grain from './components/fx/Grain'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <SpotlightCursor />
      <Grain />
      <Nav />
      <main>
        <Hero />
        <StatsStrip />
        <About />
        <TextStrip />
        <AudienceStrip />
        <Process />
        <Services />
        <FAQ />
        <Contact />
      </main>
      <WhatsAppButton />
    </>
  )
}
