import { useState, useEffect } from 'react'
import { WA_NUMBER, WA_MSG } from '../config'
import WhatsAppIcon from './WhatsAppIcon'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`

  return (
    <header
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
          Julian Schmitt
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {[
            ['#ueber-mich', 'Über mich'],
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

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 ${
            scrolled
              ? 'bg-accent text-ivory hover:bg-accent-bright'
              : 'bg-white/10 text-ivory hover:bg-white/20 border border-white/20'
          }`}
        >
          <WhatsAppIcon className="w-4 h-4" />
          Anfragen
        </a>
      </div>
    </header>
  )
}
