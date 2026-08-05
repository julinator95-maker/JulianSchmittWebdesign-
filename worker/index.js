// Läuft vor der statischen Asset-Auslieferung: leitet www dauerhaft (301)
// auf die Apex-Domain um, damit Suchmaschinen keine doppelten Inhalte
// unter zwei Hostnamen sehen. Muss im Worker selbst passieren, weil
// Custom-Domain-Requests vor den zonenweiten Redirect Rules ausgeführt
// werden und diese sonst nie greifen.
const CANONICAL_HOST = "webdesign-schmitt-trier.com";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
