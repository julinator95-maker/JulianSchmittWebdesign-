import { motion, useScroll, useSpring } from 'motion/react'

// Dünner Fortschrittsbalken oben, der die Scroll-Position zeigt.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent via-accent-bright to-accent"
      style={{ scaleX }}
    />
  )
}
