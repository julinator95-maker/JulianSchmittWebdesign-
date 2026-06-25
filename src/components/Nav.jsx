import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { WA_NUMBER, WA_MSG } from '../config'
import WhatsAppIcon from './WhatsAppIcon'
import Magnetic from './fx/Magnetic'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ivory/95 backdrop-blur-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className={`text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
            scrolled ? 'text-ink' : 'text-ivory/80'
          }`}
        >
          Julian Schmitt Webdesign
</a>

        <nav className="hidden md:flex items-center gap-8">
          {[
            ['#ueber-mich', 'Über mich'],
            ['#prozess', 'Prozess'],
            ['#leistungen', 'Leistungen'],
            ['#kontakt', 'Kontakt'],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={`text-sm transition-colors duration-300 ${
                scrolled
                  ? 'text-muted hover:text-ink'
                  : 'text-ivory/60 hover:text-ivory'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <Magnetic className="hidden md:inline-block">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 ${
              scrolled
                ? 'bg-accent text-ivory hover:bg-accent-bright'
                : 'bg-white/10 text-ivory hover:bg-white/20 border border-white/20'
            }`}
          >
            <WhatsAppIcon className="w-4 h-4" />
            Anfragen
          </a>
        </Magnetic>
      </div>
    </motion.header>
  )
}
