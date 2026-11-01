// Router por hash. Sin dependencias de vistas ni de estado.

const PANTALLAS = new Set([
  'inicio', 'test', 'aprender', 'articulo', 'sospecho', 'alerta',
  'listo', 'reporte', 'reportes', 'mas', 'privacidad', 'plagas', 'plaga', 'palmeras', 'palmera', 'recorrido', 'drarbol',
]);

// Un link cortado (ej. "%E0") no se puede decodificar: se usa tal cual en vez de romper la app.
const decodificar = (s) => { try { return decodeURIComponent(s); } catch { return s; } };

export function partirHash(hash) {
  const partes = hash.replace(/^#\/?/, '').split('/');
  return {
    pantalla: decodificar(partes[0] || 'inicio'),
    parametro: partes[1] ? decodificar(partes.slice(1).join('/')) : null,
  };
}

export function leerHash() {
  return partirHash(location.hash);
}

export function pantallaValida(pantalla) {
  return PANTALLAS.has(pantalla) ? pantalla : 'inicio';
}

export function ir(pantalla, parametro) {
  const hash = '#/' + pantalla + (parametro ? '/' + encodeURIComponent(parametro) : '');
  if (location.hash === hash) {
    window.dispatchEvent(new Event('hashchange'));
    return;
  }
  location.hash = hash;
}

export function iniciarRouter(onRoute) {
  window.addEventListener('hashchange', onRoute);
  if (!location.hash) history.replaceState(null, '', '#/inicio');
  onRoute();
}
