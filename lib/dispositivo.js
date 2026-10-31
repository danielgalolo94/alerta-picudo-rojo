// Detección pura de dispositivo para layout responsive.
// Recibe ancho de pantalla y si es táctil. Devuelve 'celular' | 'tablet' | 'pc'.
// Si la URL tiene ?device=celular|tablet|pc se respeta esa forcada.
// Marca data-device en <html> para que el CSS decida el layout.

const UMBRAL_TABLET = 768; // <= celular, > tablet/pc

function detectar(ancho, esTactil) {
  if (ancho <= 600) return 'celular';
  if (ancho <= 1024) return 'tablet';
  return 'pc';
}

function dispositivoDesdeUrl() {
  const m = /[?&]device=(celular|tablet|pc)(?:&|$)/.exec(window.location.search);
  return m ? m[1] : null;
}

function aplicarDispositivo(htmlEl = document.documentElement) {
  const forzado = dispositivoDesdeUrl();
  let d;
  if (forzado) {
    d = forzado;
  } else if (typeof window !== 'undefined' && window.screen) {
    d = detectar(window.screen.width, 'ontouchstart' in window || navigator.maxTouchPoints > 0);
  } else {
    d = 'pc';
  }
  htmlEl.setAttribute('data-device', d);
  htmlEl.classList.remove('device-celular', 'device-tablet', 'device-pc');
  htmlEl.classList.add('device-' + d);
  return d;
}

export { detectar, dispositivoDesdeUrl, aplicarDispositivo };
