export default function About() {
  return (
    <section id="ueber-mich" className="bg-ivory py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-6xl mx-auto max-w-2xl">
        <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-6">
          Über mich
        </p>
        <h2 className="text-ink text-3xl md:text-4xl font-light leading-snug tracking-tight mb-8">
          Kein Team, kein&nbsp;Overhead.
          <br />
          Nur ich und Ihre Website.
        </h2>
        <div className="space-y-4 text-muted text-base font-light leading-relaxed mb-10">
          <p>
            Ich bin Julian Schmitt, freier Webdesigner aus Trier. Ich arbeite
            ausschließlich solo — das bedeutet keine Agentur-Bürokratie, kein
            Durchreichen, keine überraschenden Aufschläge.
          </p>
          <p>
            Sie sprechen direkt mit der Person, die Ihre Website baut. Das spart
            Zeit, schafft Vertrauen und führt zu besseren Ergebnissen.
          </p>
          <p>
            Ich verstehe die Anforderungen lokaler Betriebe — und ich baue Websites,
            die bei echten Menschen auf echten Smartphones funktionieren. Schlüsselfertig
            übergeben, wie ein neu gebautes Haus.
          </p>
        </div>

        <div className="pt-10 border-t border-border grid grid-cols-3 gap-6 max-w-sm">
          {[
            ['Solo', 'Kein Overhead'],
            ['Trier', 'Vor Ort'],
            ['Direkt', 'Persönlich'],
          ].map(([label, sub]) => (
            <div key={label}>
              <div className="text-ink text-base font-medium mb-1">{label}</div>
              <div className="text-muted text-xs font-light">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
