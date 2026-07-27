import { User, MessageCircle, MapPin } from 'lucide-react'
import SplitWords from './fx/SplitWords'
import Reveal from './fx/Reveal'
import Portrait from './Portrait'

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

export default function About() {
  return (
    <section id="ueber-mich" className="bg-ivory py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Links: Portrait, freistehend ohne Rahmen */}
          <Portrait />

          {/* Rechts: Text */}
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

        </div>

        {/* Drei Merkmale — farbige Icon-Badges statt dünner Textzeile */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {STATS.map(({ icon: Icon, color, value, label }, i) => (
            <Reveal key={value} delay={i * 0.1}>
              <div className="h-full bg-stone border border-border p-6 md:p-7">
                <div className={`mb-5 flex h-11 w-11 items-center justify-center ${color}`}>
                  <Icon className="h-5 w-5 text-ivory" strokeWidth={1.75} />
                </div>
                <div className="text-ink text-base font-medium mb-1.5">{value}</div>
                <p className="text-muted text-sm font-light leading-relaxed">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
