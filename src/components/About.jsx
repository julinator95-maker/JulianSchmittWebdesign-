export default function About() {
  return (
    <section id="ueber-mich" className="bg-ivory py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          <div className="order-2 md:order-1">
            <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-6">
              Über mich
            </p>
            <h2 className="text-ink text-3xl md:text-4xl font-light leading-snug tracking-tight mb-8">
              Kein Team, kein&nbsp;Overhead.
              <br />
              Nur ich und Ihre Website.
            </h2>
            <div className="space-y-4 text-muted text-base font-light leading-relaxed">
              <p>
                Ich bin Julian Schmitt, freier Webdesigner aus Trier. Ich
                arbeite ausschließlich solo — das bedeutet: keine
                Agentur-Bürokratie, kein Durchreichen zwischen Projektmanager
                und Entwickler, keine überraschenden Preisaufschläge.
              </p>
              <p>
                Sie sprechen direkt mit der Person, die Ihre Website baut. Das
                spart Zeit, schafft Vertrauen und führt zu besseren Ergebnissen.
              </p>
              <p>
                Meine Kunden sind lokale Betriebe aus der Region — Handwerker,
                Winzer, Restaurants, Friseure. Ich kenne die Anforderungen
                dieser Branchen und baue Websites, die bei echten Menschen auf
                echten Smartphones funktionieren.
              </p>
            </div>

            <div className="mt-10 pt-10 border-t border-border grid grid-cols-3 gap-6">
              {[
                ['Solo', 'Kein Team-Overhead'],
                ['Trier', 'Vor Ort erreichbar'],
                ['Direkt', 'Klare Kommunikation'],
              ].map(([label, sub]) => (
                <div key={label}>
                  <div className="text-ink text-base font-medium mb-1">{label}</div>
                  <div className="text-muted text-xs font-light">{sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="aspect-[4/5] bg-stone rounded-sm flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
              <span className="text-muted/40 text-sm font-light tracking-wide">
                Foto folgt
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
