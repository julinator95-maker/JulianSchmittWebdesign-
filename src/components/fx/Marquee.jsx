import { motion, useReducedMotion } from 'motion/react'

// Endlos laufendes Band. Inhalt wird verdoppelt für nahtlose Schleife.
export default function Marquee({
  items,
  direction = 'left',
  duration = 30,
  className = '',
}) {
  const reduce = useReducedMotion()
  const content = [...items, ...items]
  const from = direction === 'left' ? '0%' : '-50%'
  const to = direction === 'left' ? '-50%' : '0%'

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max items-center"
        animate={reduce ? {} : { x: [from, to] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {content.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
