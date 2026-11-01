// Punto de entrada de la app: conecta estado, router y vistas.

import { S } from './data.js';
import { state, update, subscribe } from './store.js';
import { iniciarRouter, leerHash, pantallaValida } from './router.js';
import { layout } from './layout.js';
import { conectarEventos } from './actions.js';
import { scrollArriba } from './ui.js';

import { vistaInicio } from './views/inicio.js';
import { vistaTest } from './views/revision.js';
import { vistaAprender, vistaArticulo } from './views/aprender.js';
import { vistaSospecho } from './views/sospecho.js';
import { vistaAlerta } from './views/alerta.js';
import { vistaListo, vistaReporte, vistaReportes } from './views/reportes.js';
import { vistaMas, vistaPrivacidad } from './views/mas.js';
import { vistaPlagas, vistaPlaga } from './views/plagas.js';
import { vistaPalmeras, vistaPalmera } from './views/palmeras.js';
import { vistaRecorrido } from './views/recorrido.js';
import { vistaDrArbol } from './views/drarbol.js';
import { recordatoriosVencidos } from '../../lib/palmeras.js';

const VISTAS = {
  inicio: vistaInicio,
  test: vistaTest,
  aprender: vistaAprender,
  articulo: vistaArticulo,
  sospecho: vistaSospecho,
  alerta: vistaAlerta,
  listo: vistaListo,
  reporte: vistaReporte,
  reportes: vistaReportes,
  mas: vistaMas,
  privacidad: vistaPrivacidad,
  plagas: vistaPlagas,
  plaga: vistaPlaga,
  palmeras: vistaPalmeras,
  palmera: vistaPalmera,
  recorrido: vistaRecorrido,
  drarbol: vistaDrArbol,
};

const TITULOS = {
  inicio: 'Inicio',
  test: 'Test de 4 pasos',
  aprender: 'Aprender',
  articulo: 'Biblioteca',
  sospecho: '¿Qué hago si sospecho?',
  alerta: 'Enviar una alerta',
  listo: 'Reporte generado',
  reporte: 'Reporte',
  reportes: 'Mis reportes',
  mas: 'Más',
  privacidad: 'Privacidad',
  plagas: 'Otras plagas',
  plaga: 'Ficha comparativa',
  palmeras: 'Mi palmera',
  palmera: 'Mi palmera',
  recorrido: 'Reconocer el picudo',
  drarbol: 'Consultar a Dr. Árbol',
};

function render() {
  const vista = VISTAS[state.pantalla] || vistaInicio;
  const app = document.getElementById('app');
  if (!app) return;
  // Conserva el foco y el cursor del campo que se está escribiendo (cada cambio redibuja la pantalla).
  const foco = document.activeElement && document.activeElement.id ? document.activeElement : null;
  const sel = foco && typeof foco.selectionStart === 'number' ? [foco.selectionStart, foco.selectionEnd] : null;
  const html = document.documentElement;
  html.dataset.escala = state.ajustes.escala || 'estandar';
  html.dataset.contraste = state.ajustes.contraste ? 'si' : 'no';
  app.innerHTML = layout(vista(state.parametro));
  if (foco && foco.id !== 'contenido') {
    const nuevo = document.getElementById(foco.id);
    if (nuevo) {
      nuevo.focus({ preventScroll: true });
      if (sel && typeof nuevo.setSelectionRange === 'function') { try { nuevo.setSelectionRange(sel[0], sel[1]); } catch (e) { /* tipo sin cursor */ } }
    }
  }
  document.title = (TITULOS[state.pantalla] || 'Inicio') + ' · Alerta Picudo Rojo';
}

function route() {
  const { pantalla, parametro } = leerHash();
  update({ pantalla: pantallaValida(pantalla), parametro }, { render: false });
  render();
  scrollArriba();
}

// Recordatorios vencidos: notificación si el permiso está dado; si no, el aviso aparece en Mi palmera.
function avisarRecordatorios() {
  const vencidas = recordatoriosVencidos(state.palmeras, Date.now());
  if (!vencidas.length || typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
  try {
    new Notification('Alerta Picudo Rojo', { body: 'Es momento de volver a revisar: ' + vencidas.map((p) => p.apodo || p.especie).join(', ') + '.', icon: 'assets/icon-192.png' });
  } catch (e) { /* algunos navegadores solo notifican desde el service worker: queda el aviso en pantalla */ }
}

async function init() {
  try {
    const [palmeras, reportes] = await Promise.all([S.leerPalmeras(), S.leerReportes()]);
    update({
      reportes: Array.isArray(reportes) ? reportes : [],
      palmeras: Array.isArray(palmeras) ? palmeras : [],
    }, { render: false });
  } catch (e) {
    update({ reportes: [], palmeras: [] }, { render: false });
  }

  avisarRecordatorios();
  conectarEventos();
  subscribe(render);
  iniciarRouter(route);
}

init();

// Modo sin conexión (sw.js). Si el navegador no lo soporta, la app funciona igual con señal.
if ('serviceWorker' in navigator) {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
