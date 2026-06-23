import Marquee from './fx/Marquee'

const ROW1 = ['Handwerker', 'Winzer', 'Gastronomie', 'Friseure', 'Restaurants', 'Weingüter']
const ROW2 = ['Cafés', 'Bäckereien', 'Kosmetik', 'Hofläden', 'Metzgereien', 'Vereine']

function Dot() {
  return <span className="mx-7 h-2 w-2 shrink-0 rounded-full bg-accent-bright md:mx-12" />
}

function Word({ children, outline = false }) {
  return (
    <span
      className="text-4xl font-light tracking-tight md:text-6xl"
      style={
        outline
          ? { color: 'transparent', WebkitTextStroke: '1px rgba(249,247,244,0.28)' }
          : { color: 'rgba(249,247,244,0.92)' }
      }
    >
      {children}
    </span>
  )
}

function buildRow(words, outline) {
  return words.flatMap((w, i) => [
    <Word key={`w-${i}`} outline={outline}>
      {w}
    </Word>,
    <Dot key={`d-${i}`} />,
  ])
}

export default function AudienceStrip() {
  return (
    <section className="relative overflow-hidden bg-night py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-6xl px-6 md:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
          Für wen ich baue
        </p>
      </div>

      <div className="space-y-5 md:space-y-7">
        <Marquee items={buildRow(ROW1, false)} direction="left" duration={34} />
        <Marquee items={buildRow(ROW2, true)} direction="right" duration={40} />
      </div>

      {/* Sanfte Kanten links/rechts */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-night to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-night to-transparent md:w-40" />
    </section>
  )
}
