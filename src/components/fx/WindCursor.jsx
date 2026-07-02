import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// Custom-Cursor im Stil der Referenz: leuchtender Pfeil + nachziehender
// Ring mit Glut-Punkt — in den Markenfarben (Rosé-Glow auf Weinrot).
// Nur auf Geräten mit feinem Zeiger (Desktop); Touch bleibt unberührt.
export default function WindCursor() {
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  )
  const [hovering, setHovering] = useState(false)

  // Pfeil folgt exakt (kein Lag), Ring schwebt federnd hinterher
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 })

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('wind-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    // Interaktive Ziele lassen den Ring aufatmen
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
      {/* Nachziehender Ring mit Glut-Punkt */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          width: 44,
          height: 44,
          top: -22,
          left: -22,
          borderColor: 'rgba(177,69,82,0.45)',
        }}
        animate={{ scale: hovering ? 1.6 : 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="block rounded-full"
          style={{
            width: 5,
            height: 5,
            background: '#B14552',
            boxShadow: '0 0 8px 2px rgba(177,69,82,0.8)',
          }}
          animate={{ scale: hovering ? 1.5 : 1 }}
          transition={{ duration: 0.35 }}
        />
      </motion.div>

      {/* Leuchtender Pfeil — exakt am Mauspunkt */}
      <motion.svg
        className="absolute"
        style={{ x, y, top: 0, left: 0 }}
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
          style={{
            filter:
              'drop-shadow(0 0 5px rgba(177,69,82,0.95)) drop-shadow(0 0 14px rgba(177,69,82,0.55))',
          }}
        />
      </motion.svg>
    </div>
  )
}
