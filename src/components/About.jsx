import { motion, useReducedMotion } from 'motion/react'
import SplitWords from './fx/SplitWords'
import Reveal from './fx/Reveal'
import Portrait from './Portrait'

const STATS = [
  { value: 'Solo', label: 'Ich arbeite allein an Ihrem Projekt, ohne Agentur dahinter.' },
  { value: 'Direkt', label: 'Sie sprechen immer mit mir persönlich, nie mit einem Callcenter.' },
  { value: 'Trier', label: 'Aus Trier, für Trier. Auch nach dem Launch erreichbar.' },
]

export default function About() {
  const reduce = useReducedMotion()

  return (
    <section id="ueber-mich" className="bg-ivory py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-stretch">

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

          {/* Rechts: dunkles Panel mit freigestelltem Portrait */}
          <div className="relative bg-accent-deep overflow-hidden min-h-[420px] md:min-h-0 flex items-end justify-center">
            {/* leichter Lichtschimmer, der durchzieht */}
            {!reduce && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-[55%] z-10"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)' }}
                initial={{ x: '-120%' }}
                animate={{ x: '250%' }}
                transition={{ duration: 3.5, delay: 2.5, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
              />
            )}
            <Portrait />
          </div>

        </div>

        {/* Drei Merkmale als feine Zeile unter dem Ganzen */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x divide-border border-t border-border pt-12">
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={value}
              className="sm:px-10 first:sm:pl-0 last:sm:pr-0"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-2xl md:text-3xl font-editorial font-light italic text-accent mb-2">
                {value}
              </div>
              <div className="text-muted text-sm font-light leading-relaxed">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
