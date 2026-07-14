import { motion, useReducedMotion } from 'motion/react'
import SplitWords from './fx/SplitWords'
import Reveal from './fx/Reveal'

const STATS = [
  { value: 'Solo', label: 'Ich arbeite allein an Ihrem Projekt, ohne Agentur dahinter.' },
  { value: 'Direkt', label: 'Sie sprechen immer mit mir persönlich, nie mit einem Callcenter.' },
  { value: 'Trier', label: 'Aus Trier, für Trier. Auch nach dem Launch erreichbar.' },
]

const panelContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

const panelItemVariants = [
  {
    hidden: { opacity: 0, x: -40, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  },
  {
    hidden: { opacity: 0, x: 40, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  },
  {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  },
]

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
              <SplitWords text="Kein Team, keine Agentur." className="block" />
              <SplitWords text="Nur Ihre Website und ich." className="block font-editorial italic" delay={0.15} />
            </h2>
            <div className="space-y-4 text-muted text-base font-light leading-relaxed">
              <Reveal delay={0.05}>
                <p>
                  Ich bin Julian Schmitt, freier Webdesigner aus Trier. Ich arbeite
                  allein, ohne Agentur im Rücken. Das heißt für Sie: keine Bürokratie
                  und keine Rechnung, mit der Sie nicht gerechnet haben.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p>
                  Sie sprechen direkt mit der Person, die Ihre Website baut. Das spart
                  Zeit und schafft Vertrauen.
                </p>
              </Reveal>
              <Reveal delay={0.19}>
                <p>
                  Ich kenne die Anforderungen lokaler Betriebe und baue Seiten, die im
                  Alltag funktionieren: schnell, verständlich und auf dem Handy genauso
                  gut wie am Rechner. Am Ende übergebe ich alles fertig eingerichtet, so
                  wie man ein neu gebautes Haus bezieht.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Rechts: dunkles Stat-Panel — schwebt + Lichtschimmer */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="bg-accent-deep h-full min-h-[340px] p-10 flex flex-col justify-between relative overflow-hidden"
              variants={panelContainer}
              initial={reduce ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
            >
              {!reduce && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 w-[60%]"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)' }}
                  initial={{ x: '-100%' }}
                  animate={{ x: '250%' }}
                  transition={{ duration: 3.5, delay: 2.5, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
                />
              )}
              {STATS.map(({ value, label }, i) => (
                <motion.div
                  key={value}
                  variants={reduce ? undefined : panelItemVariants[i]}
                  className={`py-7 ${i !== 0 ? 'border-t border-white/10' : ''}`}
                >
                  <div className="text-3xl font-editorial font-light italic text-accent-bright mb-2">
                    {value}
                  </div>
                  <div className="text-white/45 text-sm font-light leading-relaxed">
                    {label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
