import { WA_NUMBER } from '../config'

const CHECK_ICON = (
  <svg className="w-4 h-4 shrink-0 text-accent" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const packages = [
  {
    id: 'S',
    name: 'Start',
    price: '850',
    tagline: 'Der saubere Einstieg.',
    features: [
      'Bis zu 3 Unterseiten',
      'Mobil-optimiert',
      'Kontaktformular',
      'Google Maps Einbindung',
      'Lieferzeit ca. 2 Wochen',
    ],
    highlight: false,
  },
  {
    id: 'M',
    name: 'Mittel',
    price: '1.150',
    tagline: 'Für den professionellen Auftritt.',
    features: [
      'Bis zu 6 Unterseiten',
      'Alles aus Start',
      'Bildergalerie',
      'SEO-Grundlagen',
      'Google My Business Setup',
      'Lieferzeit ca. 3 Wochen',
    ],
    highlight: true,
  },
  {
    id: 'L',
    name: 'Komplett',
    price: '1.450',
    tagline: 'Vollständige Online-Präsenz.',
    features: [
      'Unbegrenzte Seiten',
      'Alles aus Mittel',
      'Blog / Neuigkeiten',
      'Mehrsprachigkeit (DE/EN)',
      '1 Monat Wartung inklusive',
      'Lieferzeit ca. 4 Wochen',
    ],
    highlight: false,
  },
]

export default function Services() {
  return (
    <section id="leistungen" className="bg-stone py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-6">
            Leistungen & Preise
          </p>
          <h2 className="text-ink text-3xl md:text-4xl font-light leading-snug tracking-tight max-w-lg">
            Transparente Preise.
            <br />
            Keine versteckten Kosten.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col p-7 md:p-8 ${
                pkg.highlight
                  ? 'bg-accent text-ivory'
                  : 'bg-ivory text-ink border border-border'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-ivory/15 text-ivory text-xs font-medium tracking-widest uppercase">
                  Beliebt
                </div>
              )}

              <div className="mb-6">
                <div
                  className={`text-xs font-medium tracking-[0.2em] uppercase mb-1 ${
                    pkg.highlight ? 'text-ivory/60' : 'text-muted'
                  }`}
                >
                  Paket {pkg.id}
                </div>
                <div
                  className={`text-base font-medium mb-4 ${
                    pkg.highlight ? 'text-ivory' : 'text-ink'
                  }`}
                >
                  {pkg.name}
                </div>
                <div
                  className={`text-4xl font-light tracking-tight ${
                    pkg.highlight ? 'text-ivory' : 'text-ink'
                  }`}
                >
                  {pkg.price}&nbsp;<span className="text-2xl">€</span>
                </div>
                <div
                  className={`text-sm mt-2 font-light ${
                    pkg.highlight ? 'text-ivory/60' : 'text-muted'
                  }`}
                >
                  {pkg.tagline}
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    {pkg.highlight ? (
                      <svg className="w-4 h-4 shrink-0 text-ivory/70 mt-0.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span className="mt-0.5">{CHECK_ICON}</span>
                    )}
                    <span
                      className={`text-sm font-light leading-snug ${
                        pkg.highlight ? 'text-ivory/80' : 'text-muted'
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                  `Hallo Julian, ich interessiere mich für Paket ${pkg.id} (${pkg.name}, ${pkg.price} €).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center text-sm font-medium py-3.5 transition-colors ${
                  pkg.highlight
                    ? 'bg-ivory text-accent hover:bg-ivory/90'
                    : 'bg-accent text-ivory hover:bg-accent/90'
                }`}
              >
                Paket anfragen
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 border border-border bg-ivory flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="text-ink text-sm font-medium mb-1">Wartung — optional</div>
            <div className="text-muted text-sm font-light">
              Updates, Sicherheitspflege und kleine Anpassungen — damit Ihre Website dauerhaft einwandfrei läuft.
              Monatlich kündbar, Preis auf Anfrage.
            </div>
          </div>
          <div className="shrink-0">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                'Hallo Julian, ich hätte Interesse an einem Wartungspaket für meine Website.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-sm font-medium hover:text-accent/70 transition-colors whitespace-nowrap"
            >
              Mehr erfahren →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
