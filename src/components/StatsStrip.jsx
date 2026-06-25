import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

function useCountUp(target, active, reduce) {
  const [count, setCount] = useState(reduce ? target : 0)
  const done = useRef(false)

  useEffect(() => {
    if (reduce || !active || done.current) return
    done.current = true
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1400, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, reduce])

  return count
}

const STATS = [
  { prefix: '< ', value: 7, suffix: '', label: 'Tage bis zum ersten Konzept' },
  { prefix: '',   value: 100, suffix: '%', label: 'schlüsselfertig übergeben' },
  { prefix: '',   value: 1,   suffix: '', label: 'Ansprechpartner — immer ich' },
]

function StatItem({ prefix, value, suffix, label, inView, delay, reduce }) {
  const count = useCountUp(value, inView, reduce)
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center sm:items-start sm:text-left sm:px-10 first:sm:pl-0 last:sm:pr-0"
    >
      <div className="text-6xl md:text-7xl font-extralight tracking-tight text-ivory mb-3 tabular-nums">
        {prefix}<span className="text-accent-bright">{count}</span>{suffix}
      </div>
      <p className="text-xs font-light tracking-[0.12em] text-ivory/50 uppercase leading-relaxed">
        {label}
      </p>
    </motion.div>
  )
}

export default function StatsStrip() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="bg-night py-16 md:py-20 px-6 md:px-12 border-b border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 sm:divide-x divide-white/10">
        {STATS.map(({ prefix, value, suffix, label }, i) => (
          <StatItem
            key={i}
            prefix={prefix}
            value={value}
            suffix={suffix}
            label={label}
            inView={inView}
            delay={i * 0.15}
            reduce={reduce}
          />
        ))}
      </div>
    </section>
  )
}
