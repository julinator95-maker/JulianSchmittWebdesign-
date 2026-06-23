import { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'

// Weicher Lichtschein, der dem Mauszeiger folgt (nur Desktop / feiner Zeiger).
// mix-blend-screen lässt ihn vor allem auf dunklen Flächen aufleuchten.
export default function SpotlightCursor() {
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.5 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  const background = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(177,69,82,0.12), transparent 72%)`

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 hidden mix-blend-screen md:block"
      style={{ background }}
    />
  )
}
