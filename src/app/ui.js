// Utilidades de presentación: escape, fechas, iconos y avisos.

export const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[c]));

export const fecha = (ts) => new Date(ts).toLocaleDateString('es-AR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const ICONS = {
  inicio: '<path d="M4 11l8-7 8 7v9H4z"/>',
  test: '<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/>',
  aprender: '<path d="M4 5.5A1.5 1.5 0 015.5 4H10a2 2 0 012 2v14H4zM20 5.5A1.5 1.5 0 0018.5 4H14a2 2 0 00-2 2v14h8z"/>',
  alerta: '<path d="M12 4a5 5 0 00-5 5c0 4-2 5-2 5h14s-2-1-2-5a5 5 0 00-5-5zM10 18a2 2 0 004 0"/>',
  reportes: '<path d="M12 4a5 5 0 00-5 5c0 4-2 5-2 5h14s-2-1-2-5a5 5 0 00-5-5zM10 18a2 2 0 004 0"/>',
  palmeras: '<path d="M12 21V10m0 0c0-3 2-5 5-5m-5 5c0-3-2-5-5-5"/>',
  mas: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  flecha: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  lupa: '<circle cx="11" cy="11" r="6"/><path d="M15.5 15.5L20 20M11 8v6M8 11h6"/>',
  check: '<path d="M4 12.5l5 5L20 6.5"/>',
  libro: '<path d="M4 5.5A1.5 1.5 0 015.5 4H10a2 2 0 012 2v14H4zM20 5.5A1.5 1.5 0 0018.5 4H14a2 2 0 00-2 2v14h8z"/>',
  escudo: '<path d="M12 3l7 3v5c0 4.6-3 8.2-7 10-4-1.8-7-5.4-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  arbol: '<path d="M12 21v-6M12 15c0-3 2-5 5-5M12 12c0-3-2-5-5-5"/><path d="M12 4a4 4 0 014 4 3 3 0 011 5.8"/>',
  camara: '<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.2"/>',
  ubicacion: '<path d="M12 21s6-5.2 6-11a6 6 0 10-12 0c0 5.8 6 11 6 11z"/><circle cx="12" cy="10" r="2"/>',
  documento: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h4M9 13h6M9 17h6"/>',
  reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  whatsapp: '<path d="M20.5 12a8.5 8.5 0 01-12.5 7.5L4 20.5l1-4A8.5 8.5 0 1120.5 12z"/><path d="M9 9.5c.3 3 2.5 5.2 5.5 5.5"/>',
};

export const ico = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

let toastTimer = null;

export function toast(msg, tipo = '') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = 'visible' + (tipo === 'error' ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = ''; }, 3400);
}

export function scrollArriba() {
  window.scrollTo({ top: 0, behavior: 'auto' });
}
