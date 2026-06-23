import { waLink } from '../config'

const CHECK_ICON = (
  <svg className="w-4 h-4 shrink-0 text-accent" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CHECK_LIGHT = (
  <svg className="w-4 h-4 shrink-0 text-ivory/60" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
    ],
    highlight: false,
  },
]

const hausmeisterTiers = [
  {
    name: 'Basic',
    price: '59',
    features: [
      'Technische Updates & Sicherheitspflege',
      'Monatliche Backups',
      'Reaktionszeit innerhalb 48 Std.',
    ],
    highlight: false,
  },
  {
    name: 'Standard',
    price: '89',
    features: [
      'Alles aus Basic',
      'Texte & Bilder aktualisieren',
      'Öffnungszeiten, Preise, Angebote anpassen',
      'Reaktionszeit innerhalb 24 Std.',
    ],
    highlight: true,
  },
  {
    name: 'Premium',
    price: '129',
    features: [
      'Alles aus Standard',
      'Monatlicher Performance-Bericht',
      'SEO-Monitoring & Optimierung',
      'Priorität — ich bin Ihr fester Ansprechpartner',
    ],
    highlight: false,
  },
]

export default function Services() {
  return (
    <section id="leistungen" className="bg-stone py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Website-Pakete */}
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
                      <span className="mt-0.5">{CHECK_LIGHT}</span>
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
                href={waLink(
                  `Hallo Julian, ich interessiere mich für Paket ${pkg.id} (${pkg.name}, ${pkg.price} €).`
                )}
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

        {/* Hausmeister-Trennlinie */}
        <div className="mt-24 mb-16 border-t border-border pt-20">
          <div className="max-w-2xl">
            <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-6">
              Betreuung & Wartung
            </p>
            <h2 className="text-ink text-3xl md:text-4xl font-light leading-snug tracking-tight mb-6">
              Was braucht ein schlüsselfertiges Haus?
              <br />
              <span className="italic">Einen Hausmeister.</span>
            </h2>
            <p className="text-muted text-base font-light leading-relaxed">
              Ihre Website ist fertig — und genau jetzt fängt die eigentliche Arbeit an.
              Sicherheitslücken, veraltete Inhalte, technische Probleme: Das alles kostet
              Sie Zeit und Vertrauen, wenn niemand hinschaut. Ich übernehme das für Sie —
              zuverlässig, monatlich, ohne Aufwand auf Ihrer Seite. Rundum sorglos.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {hausmeisterTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col p-7 md:p-8 ${
                tier.highlight
                  ? 'bg-accent-deep text-ivory'
                  : 'bg-ivory text-ink border border-border'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-ivory/10 text-ivory text-xs font-medium tracking-widest uppercase">
                  Empfohlen
                </div>
              )}

              <div className="mb-6">
                <div
                  className={`text-xs font-medium tracking-[0.2em] uppercase mb-3 ${
                    tier.highlight ? 'text-ivory/50' : 'text-muted'
                  }`}
                >
                  Hausmeister
                </div>
                <div
                  className={`text-base font-medium mb-4 ${
                    tier.highlight ? 'text-ivory' : 'text-ink'
                  }`}
                >
                  {tier.name}
                </div>
                <div
                  className={`text-4xl font-light tracking-tight ${
                    tier.highlight ? 'text-ivory' : 'text-ink'
                  }`}
                >
                  {tier.price}&nbsp;<span className="text-2xl">€</span>
                </div>
                <div
                  className={`text-sm mt-1 font-light ${
                    tier.highlight ? 'text-ivory/50' : 'text-muted'
                  }`}
                >
                  pro Monat, monatlich kündbar
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    {tier.highlight ? (
                      <span className="mt-0.5">{CHECK_LIGHT}</span>
                    ) : (
                      <span className="mt-0.5">{CHECK_ICON}</span>
                    )}
                    <span
                      className={`text-sm font-light leading-snug ${
                        tier.highlight ? 'text-ivory/80' : 'text-muted'
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={waLink(
                  `Hallo Julian, ich interessiere mich für das Hausmeister-Paket ${tier.name} (${tier.price} €/Monat).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center text-sm font-medium py-3.5 transition-colors ${
                  tier.highlight
                    ? 'bg-ivory text-accent-deep hover:bg-ivory/90'
                    : 'bg-accent text-ivory hover:bg-accent/90'
                }`}
              >
                Jetzt absichern
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 text-muted text-xs font-light text-center">
          Alle Betreuungspakete sind monatlich kündbar. Keine Vertragslaufzeit, kein Risiko.
        </p>

      </div>
    </section>
  )
}
