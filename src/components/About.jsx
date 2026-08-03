import { User, MessageCircle, MapPin } from 'lucide-react'
import SplitWords from './fx/SplitWords'
import Reveal from './fx/Reveal'
import Portrait from './Portrait'
import WindBackground from './WindBackground'

const STATS = [
  {
    icon: User,
    color: 'bg-accent',
    value: 'Solo',
    label: 'Ich arbeite allein an Ihrem Projekt, ohne Agentur dahinter.',
  },
  {
    icon: MessageCircle,
    color: 'bg-accent-bright',
    value: 'Direkt',
    label: 'Sie sprechen immer mit mir persönlich, nie mit einem Callcenter.',
  },
  {
    icon: MapPin,
    color: 'bg-accent-deep',
    value: 'Trier',
    label: 'Aus Trier, für Trier. Auch nach dem Launch erreichbar.',
  },
]

// Dunkles Rot wie im Hero — die beiden Sektionen gehen farblich ineinander über.
export default function About() {
  return (
    <section id="ueber-mich" className="relative overflow-hidden bg-night py-24 md:py-36 px-6 md:px-12">
      <WindBackground minimal />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night via-transparent to-night" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Links: Portrait, freistehend ohne Rahmen */}
          <Portrait />

          {/* Rechts: Text */}
          <div>
            <Reveal>
              <p className="text-accent-label text-xs font-medium tracking-[0.2em] uppercase mb-6">
                Über mich
              </p>
            </Reveal>
            <h2 className="text-ivory text-3xl md:text-4xl font-light leading-snug tracking-tight mb-8">
              <SplitWords text="Kein Team, keine Agentur." className="block" />
              <SplitWords text="Nur Ihre Website und ich." className="block font-editorial italic text-accent-bright" delay={0.15} />
            </h2>
            <div className="space-y-4 text-ivory/55 text-base font-light leading-relaxed">
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

        </div>

        {/* Drei Merkmale — farbige Icon-Badges auf dunklen Karten */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {STATS.map(({ icon: Icon, color, value, label }, i) => (
            <Reveal key={value} delay={i * 0.1}>
              <div className="h-full bg-white/[0.04] border border-white/10 p-6 md:p-7">
                <div className={`mb-5 flex h-11 w-11 items-center justify-center ${color}`}>
                  <Icon className="h-5 w-5 text-ivory" strokeWidth={1.75} />
                </div>
                <div className="text-ivory text-base font-medium mb-1.5">{value}</div>
                <p className="text-ivory/55 text-sm font-light leading-relaxed">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
