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
};

function render() {
  const vista = VISTAS[state.pantalla] || vistaInicio;
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = layout(vista(state.parametro));
  document.title = (TITULOS[state.pantalla] || 'Inicio') + ' · Alerta Picudo Rojo';
}

function route() {
  const { pantalla, parametro } = leerHash();
  update({ pantalla: pantallaValida(pantalla), parametro }, { render: false });
  render();
  scrollArriba();
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

  conectarEventos();
  subscribe(render);
  iniciarRouter(route);
}

init();

// Modo sin conexión (sw.js). Si el navegador no lo soporta, la app funciona igual con señal.
if ('serviceWorker' in navigator) {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
