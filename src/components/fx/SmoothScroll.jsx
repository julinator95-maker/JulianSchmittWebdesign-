import { useEffect } from 'react'
import Lenis from 'lenis'

// Fixe Nav ist h-16 (64px) — Anker-Ziele bekommen diesen Versatz, sonst
// verschwindet die Sektionsüberschrift dahinter.
const NAV_OFFSET = 72

// Physikalisch sanftes Scrollen per Mausrad/Tastatur. Bewusst nur für die
// Maus: Touch bleibt komplett nativ (smoothTouch: false) — beste Performance
// und kein Risiko für neue Ruckler auf Mobile, wo wir das gerade erst
// (Partikelfeld-Freeze) sauber hinbekommen haben. Lenis bewegt den echten
// Dokument-Scroll (kein Transform-Hijack), bleibt also kompatibel mit
// IntersectionObserver, framer-motions useScroll und Nav-Anker-Links.
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Anker-Klicks (Nav, Hero-CTA "Pakete & Preise") sanft anfahren
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href').slice(1)
      const target = id && document.getElementById(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -NAV_OFFSET, duration: 1.2 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
