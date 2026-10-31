// Router por hash. Sin dependencias de vistas ni de estado.

const PANTALLAS = new Set([
  'inicio', 'test', 'aprender', 'articulo', 'sospecho', 'alerta',
  'listo', 'reporte', 'reportes', 'mas', 'privacidad',
]);

export function leerHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const partes = raw.split('/');
  return {
    pantalla: decodeURIComponent(partes[0] || 'inicio'),
    parametro: partes[1] ? decodeURIComponent(partes.slice(1).join('/')) : null,
  };
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
