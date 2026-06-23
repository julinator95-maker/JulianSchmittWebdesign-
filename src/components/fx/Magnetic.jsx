import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

// Magnetischer Hover: das Element zieht sich sanft zum Mauszeiger.
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.5 })

  if (reduce) return <span className={className}>{children}</span>

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.span>
  )
}
