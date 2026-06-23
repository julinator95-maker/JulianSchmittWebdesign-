import { motion, useReducedMotion } from 'motion/react'

// Generischer Scroll-Reveal: sanftes Auftauchen mit Blur-Up.
export default function Reveal({
  children,
  className = '',
  y = 28,
  delay = 0,
  once = true,
  as = 'div',
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-12%' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}
