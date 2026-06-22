import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <WhatsAppButton />
    </>
  )
}
