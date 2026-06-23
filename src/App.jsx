import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import AudienceStrip from './components/AudienceStrip'
import Services from './components/Services'
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
        <About />
        <AudienceStrip />
        <Services />
        <Contact />
      </main>
      <WhatsAppButton />
    </>
  )
}
