import { motion, useReducedMotion } from 'motion/react'
import SplitWords from './fx/SplitWords'
import Reveal from './fx/Reveal'

const STATS = [
  { value: 'Solo', label: 'Keine Agentur, kein Overhead — nur direkte Arbeit.' },
  { value: 'Direkt', label: 'Sie sprechen immer mit mir persönlich. Kein Durchreichen.' },
  { value: 'Trier', label: 'Vor Ort für lokale Betriebe. Nah dran, auch nach dem Launch.' },
]

const panelContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}
const panelItem = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function About() {
  const reduce = useReducedMotion()

  return (
    <section id="ueber-mich" className="bg-ivory py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Links: Text */}
          <div>
            <Reveal>
              <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-6">
                Über mich
              </p>
            </Reveal>
            <h2 className="text-ink text-3xl md:text-4xl font-light leading-snug tracking-tight mb-8">
              <SplitWords text="Kein Team, kein Overhead." className="block" />
              <SplitWords text="Nur ich und Ihre Website." className="block" delay={0.15} />
            </h2>
            <div className="space-y-4 text-muted text-base font-light leading-relaxed">
              <Reveal delay={0.05}>
                <p>
                  Ich bin Julian Schmitt, freier Webdesigner aus Trier. Ich arbeite
                  ausschließlich solo — das bedeutet keine Agentur-Bürokratie, kein
                  Durchreichen, keine überraschenden Aufschläge.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p>
                  Sie sprechen direkt mit der Person, die Ihre Website baut. Das spart
                  Zeit, schafft Vertrauen und führt zu besseren Ergebnissen.
                </p>
              </Reveal>
              <Reveal delay={0.19}>
                <p>
                  Ich verstehe die Anforderungen lokaler Betriebe — und ich baue Websites,
                  die bei echten Menschen auf echten Smartphones funktionieren. Schlüsselfertig
                  übergeben, wie ein neu gebautes Haus.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Rechts: dunkles Stat-Panel */}
          <motion.div
            className="bg-accent-deep h-full min-h-[340px] p-10 flex flex-col justify-between"
            variants={panelContainer}
            initial={reduce ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-12%' }}
          >
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={value}
                variants={reduce ? undefined : panelItem}
                className={`py-7 ${i !== 0 ? 'border-t border-white/10' : ''}`}
              >
                <div className="text-3xl font-light italic text-accent-bright mb-2">
                  {value}
                </div>
                <div className="text-white/45 text-sm font-light leading-relaxed">
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
