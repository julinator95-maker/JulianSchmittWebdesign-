import julian from '../assets/julian-about.webp'

export default function About() {
  return (
    <section id="ueber-mich" className="bg-ivory py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Foto */}
          <div className="order-1">
            <div className="relative">
              <div className="absolute -left-4 top-8 bottom-8 w-1 bg-accent rounded-full" />
              <img
                src={julian}
                alt="Julian Schmitt, Webdesigner aus Trier"
                className="w-full max-w-sm mx-auto md:mx-0 rounded-sm shadow-lg"
                loading="lazy"
                draggable="false"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-2">
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

            <div className="mt-10 pt-10 border-t border-border grid grid-cols-3 gap-6">
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

        </div>
      </div>
    </section>
  )
}
