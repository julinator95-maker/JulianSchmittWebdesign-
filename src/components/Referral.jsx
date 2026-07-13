import Reveal from './fx/Reveal'
import SplitWords from './fx/SplitWords'
import TiltCard from './fx/TiltCard'

// Empfehlungsprogramm aus dem Dienstleistungsvertrag (§6):
// drei Stufen, aufsteigend inszeniert wie ein Treppchen.
const TIERS = [
  {
    name: 'Silber',
    metal: '#C7CBD1',
    count: 3,
    benefit: '3 Monate Standard-Betreuung kostenfrei',
    note: 'Wartung, Updates und Pflege gehen aufs Haus.',
  },
  {
    name: 'Gold',
    metal: '#D9B36C',
    count: 4,
    benefit: '50 % der Website-Kosten zurück',
    note: 'Die Hälfte Ihrer Erstellungskosten wird erstattet.',
  },
  {
    name: 'Diamant',
    metal: '#BCE3F0',
    count: 5,
    benefit: 'Ihre Website komplett kostenfrei',
    note: 'Die restlichen 50 % gibt es zurück. Sie zahlen nichts mehr.',
    highlight: true,
  },
]

function Tier({ tier, index }) {
  return (
    <Reveal delay={index * 0.12} className={index === 1 ? 'md:mt-8' : index === 0 ? 'md:mt-16' : ''}>
      <TiltCard className="h-full" glow={`${tier.metal}33`}>
        <div
          className={`relative flex h-full flex-col p-6 md:p-7 bg-white/[0.04] ${
            tier.highlight ? 'border border-white/25' : 'border border-white/10'
          }`}
        >
          {/* Metallische Kopflinie */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${tier.metal}, transparent)` }}
          />

          <p
            className="text-xs font-medium tracking-[0.3em] uppercase mb-6"
            style={{ color: tier.metal }}
          >
            {tier.name}
          </p>

          <div className="mb-2 flex items-baseline gap-3">
            <span className="text-6xl font-extralight tracking-tight text-ivory tabular-nums">
              {tier.count}
            </span>
            <span className="text-ivory/45 text-sm font-light">Empfehlungen</span>
          </div>

          <p className="text-ivory text-lg font-light leading-snug mb-3">{tier.benefit}</p>
          <p className="text-ivory/40 text-sm font-light leading-relaxed">{tier.note}</p>
        </div>
      </TiltCard>
    </Reveal>
  )
}

export default function Referral() {
  return (
    <section id="empfehlen" className="bg-accent-deep py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 md:mb-16 max-w-2xl">
          <Reveal>
            <p className="text-accent-bright text-xs font-medium tracking-[0.2em] uppercase mb-6">
              Empfehlungsprogramm
            </p>
          </Reveal>
          <h2 className="text-ivory text-3xl md:text-4xl font-light leading-snug tracking-tight">
            <SplitWords text="Gute Arbeit spricht sich rum." className="block" />
            <SplitWords text="Und zahlt sich aus." className="block font-editorial italic" delay={0.12} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 text-ivory/50 text-base font-light leading-relaxed">
              Wenn Sie zufrieden sind, erzählen Sie es weiter. Und ich bedanke
              mich dafür, Stufe für Stufe.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 md:items-end">
          {TIERS.map((tier, i) => (
            <Tier key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-ivory/30 text-xs font-light">
            Eine Empfehlung zählt, sobald die empfohlene Person einen schriftlichen
            Auftrag unterzeichnet hat. Details stehen im Dienstleistungsvertrag.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
