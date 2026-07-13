import { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'motion/react'

// Custom-Cursor: nur der leuchtende Pfeil, kein Ring.
// Wichtig: overflow visible auf dem SVG, sonst wird der Glow an der
// Viewport-Kante abgeschnitten und wirkt wie ein Viereck.
// Nur auf Geräten mit feinem Zeiger (Desktop); Touch bleibt unberührt.
export default function WindCursor() {
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  )
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('wind-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    // Über interaktiven Zielen leuchtet der Pfeil etwas stärker
    const onOver = (e) => {
      setHovering(Boolean(e.target.closest?.('a, button, [role="button"]')))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      document.documentElement.classList.remove('wind-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80]">
      <motion.svg
        className="absolute"
        style={{
          x,
          y,
          top: 0,
          left: 0,
          overflow: 'visible',
          filter: hovering
            ? 'drop-shadow(0 0 7px rgba(177,69,82,1)) drop-shadow(0 0 20px rgba(177,69,82,0.7))'
            : 'drop-shadow(0 0 5px rgba(177,69,82,0.9)) drop-shadow(0 0 14px rgba(177,69,82,0.5))',
          transition: 'filter 0.25s ease',
        }}
        width="26"
        height="30"
        viewBox="0 0 26 30"
        fill="none"
      >
        <path
          d="M4 2 L4 24 L10 18.5 L14 27 L18 25 L14 17 L22 16.5 Z"
          fill="#F9F7F4"
          stroke="rgba(58,14,18,0.85)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  )
}
