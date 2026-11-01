// Datos y constantes compartidas de la app.
// El contenido editable (js/contenido.js y js/sintomas-por-especie.js) son scripts clásicos que se cargan antes que este entry.

export { S } from './almacenamiento.js';
export const C = window.APR_CONTENIDO;

if (!C) {
  throw new Error('No se cargó js/contenido.js antes de la app.');
}

export const NAV = [
  { id: 'inicio', label: 'Inicio', href: '#/inicio' },
  { id: 'test', label: 'Test', href: '#/test' },
  { id: 'aprender', label: 'Aprender', href: '#/aprender' },
  { id: 'reportes', label: 'Alertas', href: '#/reportes' },
  { id: 'palmeras', label: 'Palmeras', href: '#/palmeras' },
  { id: 'mas', label: 'Más', href: '#/mas' },
];

// Señales del paso 2 por especie (contenido editable en js/sintomas-por-especie.js).
export const SENALES = window.APR_SENALES?.SENALES ?? {};

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
