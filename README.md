# Prototipo · estoicismo para baddies (poema hipervincular 3D)

Primer prototipo navegable. Arquitectura **desacoplada**: el mundo 3D solo decide
qué poema-superficie abrir; el hipertexto vive en un motor 2D data-driven.

## Archivos
- `index.html` — escena A-Frame (gateway, monolitos, waypoints, panel de cristal) + Script Vercel Analytics.
- `poemas.js` — **el rizoma como datos**. Aquí se editan los versos y los enlaces.
- `app.js` — motor de hipertexto, gateway, fallback 2D y navegación Street View.
- `style.css` — estética monocromática/brutalista.
- `assets/` — pon aquí `gato.webp`.

## Cómo probarlo en Local
Necesita servirse por HTTP (no `file://`) por las texturas/CORS de A-Frame:

```powershell
cd estoicismo-baddies
python -m http.server 8080
# abre http://localhost:8080