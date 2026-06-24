import { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, animate } from 'motion/react'

// Weicher Lichtschein: auf Desktop folgt er dem Cursor, auf Mobile driftet er
// autonom und springt zum Touch-Punkt.
export default function SpotlightCursor() {
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.5 })

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches

    if (isFinePointer) {
      const onMove = (e) => { x.set(e.clientX); y.set(e.clientY) }
      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    }

    // Mobile: auto-drift + touch follow
    let active = true
    let isTouching = false

    x.set(window.innerWidth * 0.5)
    y.set(window.innerHeight * 0.4)

    const doDrift = () => {
      if (!active || isTouching) return
      const tx = window.innerWidth * (0.15 + Math.random() * 0.7)
      const ty = window.innerHeight * (0.15 + Math.random() * 0.65)
      const dur = 4 + Math.random() * 3

      animate(x, tx, { duration: dur, ease: 'easeInOut' })
      animate(y, ty, { duration: dur * 0.85, ease: 'easeInOut' }).then(() => {
        if (active && !isTouching) doDrift()
      })
    }
    doDrift()

    const onTouchMove = (e) => {
      isTouching = true
      x.set(e.touches[0].clientX)
      y.set(e.touches[0].clientY)
    }
    const onTouchEnd = () => {
      isTouching = false
      if (active) doDrift()
    }

    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      active = false
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [x, y])

  const background = useMotionTemplate`radial-gradient(380px circle at ${sx}px ${sy}px, rgba(177,69,82,0.14), transparent 72%)`

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 mix-blend-screen"
      style={{ background }}
    />
  )
}
