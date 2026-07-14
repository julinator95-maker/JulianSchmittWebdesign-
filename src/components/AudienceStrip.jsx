import {
  Wrench,
  Wine,
  UtensilsCrossed,
  Scissors,
  Coffee,
  Grape,
  Croissant,
  Sparkles,
  Store,
  Users,
} from 'lucide-react'
import Reveal from './fx/Reveal'
import Marquee from './fx/Marquee'

const ROW1 = [
  { icon: Wrench, label: 'Handwerker' },
  { icon: Wine, label: 'Winzer' },
  { icon: UtensilsCrossed, label: 'Restaurants' },
  { icon: Scissors, label: 'Friseure' },
  { icon: Coffee, label: 'Cafés' },
]

const ROW2 = [
  { icon: Grape, label: 'Weingüter' },
  { icon: Croissant, label: 'Bäckereien' },
  { icon: Sparkles, label: 'Kosmetik' },
  { icon: Store, label: 'Hofläden' },
  { icon: Users, label: 'Vereine' },
]

function Chip({ icon: Icon, label }) {
  return (
    <div className="mx-2.5 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 transition-colors hover:border-accent-bright/40">
      <Icon className="h-5 w-5 shrink-0 text-accent-bright" strokeWidth={1.5} aria-hidden="true" />
      <span className="whitespace-nowrap text-lg font-light text-ivory/85 md:text-xl">
        {label}
      </span>
    </div>
  )
}

function buildRow(items) {
  return items.map((it, i) => <Chip key={i} icon={it.icon} label={it.label} />)
}

export default function AudienceStrip() {
  return (
    <section className="relative overflow-hidden bg-night py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-6xl px-6 md:px-12">
        <Reveal>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            Für wen ich baue
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="max-w-2xl text-3xl font-light leading-snug tracking-tight text-ivory md:text-4xl">
            Für die Betriebe, die Trier ausmachen.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-ivory/50">
            Vom Weingut an der Mosel bis zum Friseursalon in der City. Ich baue
            Websites, die zu lokalen Betrieben passen und bei echten Kunden ankommen.
          </p>
        </Reveal>
      </div>

      {/* Gewerke als Icon-Chips */}
      <div className="space-y-4">
        <Marquee items={buildRow(ROW1)} direction="left" duration={32} />
        <Marquee items={buildRow(ROW2)} direction="right" duration={36} />
      </div>

      {/* Sanfte Kanten links/rechts */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-night to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-night to-transparent md:w-32" />
    </section>
  )
}
