// Datos y constantes compartidas de la app.
// Los módulos clásicos (contenido.js y almacenamiento.js) se cargan antes que este entry.

export const C = window.APR_CONTENIDO;
export const S = window.APR_STORE;

if (!C || !S) {
  throw new Error('No se cargaron contenido.js / almacenamiento.js antes de la app.');
}

export const NAV = [
  { id: 'inicio', label: 'Inicio', href: '#/inicio' },
  { id: 'test', label: 'Test', href: '#/test' },
  { id: 'aprender', label: 'Aprender', href: '#/aprender' },
  { id: 'reportes', label: 'Alertas', href: '#/reportes' },
  { id: 'mas', label: 'Más', href: '#/mas' },
];

export const FOTO_SINTOMA = {
  centrales: 'dano-corona-picudo',
  corona: 'dano-corona-picudo',
  cogollo: 'dano-corona-picudo',
  base: 'dano-corona-picudo',
  fibras: 'dano-corona-picudo',
  mordidas: 'signos-tempranos-picudo',
  caida: 'signos-avanzados-comparacion',
  orificios: 'dano-estipe-picudo-negro',
  tejido: 'dano-base-strategus',
  aserrin: 'dano-base-strategus',
  larvas: 'larva-picudo-rojo',
  insectos: 'picudo-rojo-recorte',
};

export const IMG_ART = {
  que: 'picudo-rojo-adulto-uno',
  dana: 'dano-corona-picudo',
  dificil: 'signos-tempranos-picudo',
  prevencion: 'palmera-limpia',
  tempranos: 'signos-tempranos-picudo',
  intermedios: 'signos-intermedios-antes-despues',
  avanzados: 'signos-avanzados-comparacion',
  mitos: 'larva-picudo-rojo',
  faq: 'partes-palmera',
  especies: 'partes-datilera',
  dispersa: 'picudo-rojo-recorte',
};
