import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { PHONE_DISPLAY, EMAIL, ADDRESS } from '../config'

// Rechtstexte als Overlay. Impressum trägt die Anbieterkennzeichnung nach
// § 5 TMG plus den § 19 UStG-Hinweis. Datenschutz ist ein knapper,
// ehrlicher Grundtext — vor dem echten Livegang juristisch prüfen lassen.
function ImpressumBody() {
  return (
    <div className="space-y-6 text-sm font-light leading-relaxed text-ink/80">
      <div>
        <h4 className="text-ink font-medium mb-1">Angaben gemäß § 5 TMG</h4>
        <p>
          Julian Schmitt
          <br />
          Julian Schmitt Webdesign
          <br />
          {ADDRESS}
        </p>
      </div>
      <div>
        <h4 className="text-ink font-medium mb-1">Kontakt</h4>
        <p>
          Telefon: {PHONE_DISPLAY}
          <br />
          E-Mail: {EMAIL}
        </p>
      </div>
      <div>
        <h4 className="text-ink font-medium mb-1">Umsatzsteuer</h4>
        <p>
          Als Kleinunternehmer im Sinne von § 19 UStG wird keine Umsatzsteuer
          berechnet und ausgewiesen.
        </p>
      </div>
      <div>
        <h4 className="text-ink font-medium mb-1">Verantwortlich für den Inhalt</h4>
        <p>Julian Schmitt, {ADDRESS}</p>
      </div>
    </div>
  )
}

function DatenschutzBody() {
  return (
    <div className="space-y-6 text-sm font-light leading-relaxed text-ink/80">
      <div>
        <h4 className="text-ink font-medium mb-1">Verantwortlicher</h4>
        <p>
          Julian Schmitt, {ADDRESS}
          <br />
          E-Mail: {EMAIL}
        </p>
      </div>
      <div>
        <h4 className="text-ink font-medium mb-1">Hosting und Server-Logdaten</h4>
        <p>
          Diese Website wird bei der Vercel Inc. gehostet. Beim Aufruf werden
          technisch notwendige Server-Logdaten (z. B. IP-Adresse, Zeitpunkt des
          Zugriffs, aufgerufene Seite, Browsertyp) verarbeitet, um den Betrieb
          und die Sicherheit der Seite zu gewährleisten. Rechtsgrundlage ist das
          berechtigte Interesse an einem sicheren Betrieb (Art. 6 Abs. 1 lit. f
          DSGVO). Dabei kann eine Übermittlung in die USA stattfinden.
        </p>
      </div>
      <div>
        <h4 className="text-ink font-medium mb-1">Cookies, Tracking und Schriften</h4>
        <p>
          Diese Website setzt keine Cookies, verwendet keine Analyse- oder
          Tracking-Dienste und bindet keine Werbenetzwerke ein. Alle Schriftarten
          werden vom eigenen Server geladen; es besteht dabei keine Verbindung zu
          Google-Servern.
        </p>
      </div>
      <div>
        <h4 className="text-ink font-medium mb-1">Kontaktaufnahme</h4>
        <p>
          Ihre Anfrage nutze ich ausschließlich zur Bearbeitung und gebe sie nicht
          an Dritte weiter. Die Schaltflächen auf dieser Seite öffnen lediglich Ihr
          eigenes E-Mail- oder WhatsApp-Programm; es werden dabei keine Daten
          automatisch an mich übertragen. Wenn Sie den Kontakt über WhatsApp
          wählen, gelten zusätzlich die Datenschutzbestimmungen der WhatsApp
          Ireland Ltd.
        </p>
      </div>
      <div>
        <h4 className="text-ink font-medium mb-1">Ihre Rechte</h4>
        <p>
          Sie haben jederzeit das Recht auf Auskunft, Berichtigung und Löschung
          Ihrer gespeicherten Daten. Wenden Sie sich dafür an die oben genannte
          E-Mail-Adresse.
        </p>
      </div>
    </div>
  )
}

export default function LegalModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-night/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-ivory p-8 md:p-12 rounded-t-2xl sm:rounded-2xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Schließen"
              className="absolute top-5 right-5 text-muted hover:text-ink text-2xl leading-none font-light"
            >
              ×
            </button>

            <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-6">
              {open === 'datenschutz' ? 'Datenschutz' : 'Impressum'}
            </p>
            {open === 'datenschutz' ? <DatenschutzBody /> : <ImpressumBody />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
