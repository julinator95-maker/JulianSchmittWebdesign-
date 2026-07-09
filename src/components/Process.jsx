import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import Reveal from './fx/Reveal'
import SplitWords from './fx/SplitWords'

const STEPS = [
  {
    num: '01',
    title: 'Gespräch',
    desc: 'Wir setzen uns zusammen, kostenlos und unverbindlich. Ich höre mir an, wo der Schuh drückt: Was fehlt, was soll besser laufen, was muss die Website am Ende können.',
  },
  {
    num: '02',
    title: 'Konzept',
    desc: 'Struktur, Gestaltung und Texte kommen von mir, kein Hin und Her zwischen mehreren Ansprechpartnern. Das erste Konzept liegt nach spätestens 7 Tagen bei Ihnen.',
  },
  {
    num: '03',
    title: 'Umsetzung',
    desc: 'Ich entwickle sauber, für Handy und Desktop, mit kurzen Ladezeiten. Sie bleiben die ganze Zeit auf dem Laufenden und sehen den Fortschritt.',
  },
  {
    num: '04',
    title: 'Übergabe',
    desc: 'Spätestens zwei Wochen nach dem ersten Gespräch steht alles: Domain, Hosting, Launch. Um die Technik müssen Sie sich nicht kümmern.',
  },
]

function Step({ step, index }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const isLast = index === STEPS.length - 1

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Static border base — top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      {/* Accent line draws in on enter — top */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 h-px bg-accent"
        style={{ width: '100%', originX: 0 }}
        initial={reduce ? false : { scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Last step: also draw a line at the bottom */}
      {isLast && (
        <>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px bg-accent"
            style={{ width: '100%', originX: 0 }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </>
      )}

      {/* Ghost number — deutlich dezenter */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none tabular-nums leading-none font-black italic text-ink/[0.025]"
        style={{ fontSize: 'clamp(5rem, 11vw, 9rem)' }}
      >
        {step.num}
      </div>

      {/* Nummer · Titel · Beschreibung nebeneinander — schlanke Editorial-Zeile */}
      <div className="relative z-10 py-8 md:py-10 grid md:grid-cols-[3.5rem_1fr_1.5fr] gap-3 md:gap-12 items-baseline">
        <motion.p
          className="text-accent text-xs font-medium tracking-[0.3em] uppercase"
          initial={reduce ? false : { opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {step.num}
        </motion.p>

        <motion.h3
          className="text-ink font-extralight leading-none tracking-tight"
          style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)' }}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {step.title}
        </motion.h3>

        <motion.p
          className="text-muted text-sm md:text-[0.95rem] font-light leading-relaxed max-w-md"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {step.desc}
        </motion.p>
      </div>
    </div>
  )
}

export default function Process() {
  return (
    <section id="prozess" className="bg-ivory py-20 md:py-28 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <Reveal>
            <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-6">
              Wie ich arbeite
            </p>
          </Reveal>
          <h2 className="text-ink text-3xl md:text-4xl font-light leading-snug tracking-tight">
            <SplitWords text="Vier Schritte." className="block" />
            <SplitWords text="Ohne Umwege." className="block font-editorial italic" delay={0.12} />
          </h2>
        </div>

        {/* Steps */}
        <div>
          {STEPS.map((step, i) => (
            <Step key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
