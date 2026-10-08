# Emil Alvaro portfolio

Extract the ZIP and open `index.html`. The root `index.html` is the canonical static entry; the nested `html/inbio/index.html` entry also works. Both are synchronized. No build step, API keys or backend is required. To serve locally, run `python -m http.server 8000` from this folder and visit `http://localhost:8000`.

The interactive phone library supports project icons, category filters, page controls, horizontal touch swipes, screenshots, architecture and source references. Its actions depend on the verified registry: public product access, public source, a supported case study, or a request for details. Private repositories do not receive public source buttons.

Edit content in `html/inbio/assets/js/portfolio-data.js` and project evidence in `html/inbio/assets/data/project-registry.json`. Keep `html/inbio/assets/js/project-registry.js` synchronized with the JSON as `window.PROJECT_REGISTRY = <JSON>;`. Recheck a deployment before changing its status to `live`, and retain screenshot sources and dates. Pending project names require evidence before adding claims or launch actions.

Professional content comes from the supplied résumé. Actual product screenshots, corporate/technology logos, SVG architecture overviews and labeled concept covers are included. Verification details and asset provenance are in `docs/`.

The contact form opens an email draft and provides a copy fallback. The visitor sends it from their email app. This archive is ready for static hosting; it has not been published to a production URL by this update.

The supplied résumé PDF at `html/inbio/assets/docs/emil-alvaro-resume.pdf` is retained as the résumé source of truth. The project registry and `docs/canonical-url-registry.json` control URL/action status; unavailable, private and unverified URLs are not presented as live deployments.
