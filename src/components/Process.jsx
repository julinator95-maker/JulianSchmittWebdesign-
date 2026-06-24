import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import Reveal from './fx/Reveal'
import SplitWords from './fx/SplitWords'

const STEPS = [
  {
    num: '01',
    title: 'Gespräch',
    desc: 'Kostenlos, unverbindlich, persönlich. Ich lerne Ihren Betrieb kennen — was fehlt, was soll besser werden, was muss die Website leisten.',
  },
  {
    num: '02',
    title: 'Konzept',
    desc: 'Struktur, Design-Richtung, Texte — alles aus einer Hand. Kein Agentur-Ping-Pong. Das Konzept liegt innerhalb von 7 Tagen vor.',
  },
  {
    num: '03',
    title: 'Umsetzung',
    desc: 'Saubere Entwicklung, mobiloptimiert, schnell geladen. Sie sehen den Fortschritt jederzeit und bekommen regelmäßige Updates.',
  },
  {
    num: '04',
    title: 'Übergabe',
    desc: 'Schlüsselfertig: Domain, Hosting, Launch. Ich übergebe eine fertige Website — Sie müssen sich um nichts kümmern.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-18%' })
  const reduce = useReducedMotion()

  return (
    <section id="prozess" className="bg-ivory py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24">
          <Reveal>
            <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-6">
              Wie ich arbeite
            </p>
          </Reveal>
          <h2 className="text-ink text-3xl md:text-4xl font-light leading-snug tracking-tight">
            <SplitWords text="Vier Schritte." className="block" />
            <SplitWords text="Kein Overhead." className="block" delay={0.12} />
          </h2>
        </div>

        <div ref={ref} className="relative">
          {/* Verbindungslinie — Desktop horizontal */}
          {!reduce && (
            <div className="hidden md:block absolute top-[22px] left-[22px] right-[22px] h-px bg-border overflow-hidden">
              <motion.div
                className="h-full bg-accent origin-left"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              />
            </div>
          )}

          {/* Verbindungslinie — Mobile vertikal */}
          {!reduce && (
            <div className="md:hidden absolute top-[22px] bottom-[22px] left-[22px] w-px bg-border overflow-hidden">
              <motion.div
                className="w-full bg-accent origin-top"
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              />
            </div>
          )}

          <div className="grid md:grid-cols-4 gap-12 md:gap-8">
            {STEPS.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.2 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-row md:flex-col gap-5 md:gap-0"
              >
                {/* Nummerierter Kreis */}
                <div className="relative z-10 shrink-0 w-11 h-11 rounded-full bg-ivory border border-accent flex items-center justify-center">
                  <span className="text-accent text-xs font-medium tabular-nums">{num}</span>
                </div>

                <div className="md:mt-7 flex-1">
                  <h3 className="text-ink text-base font-light mb-2">{title}</h3>
                  <p className="text-muted text-sm font-light leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
