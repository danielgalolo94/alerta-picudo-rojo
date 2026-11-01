// Estructura visual: encabezado, contenido, pie, navegación y modal.

import { NAV } from './data.js';
import { state } from './store.js';
import { esc, ico } from './ui.js';

function navActivo() {
  const p = state.pantalla;
  if (p === 'test') return 'test';
  if (['aprender', 'articulo', 'sospecho', 'plagas', 'plaga'].includes(p)) return 'aprender';
  if (['alerta', 'listo', 'reporte', 'reportes'].includes(p)) return 'reportes';
  if (['mas', 'privacidad'].includes(p)) return 'mas';
  return 'inicio';
}

function modalHTML() {
  return `
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
    <div class="modal-caja">
      <h2 id="modal-titulo">${esc(state.modal.titulo)}</h2>
      <textarea id="modal-texto" readonly>${esc(state.modal.texto)}</textarea>
      <div class="modal-acciones">
        <button type="button" class="btn btn-verde" data-action="copiar-modal">Copiar texto</button>
        <button type="button" class="btn btn-outline" data-action="cerrar-modal">Cerrar</button>
      </div>
    </div>
  </div>`;
}

export function layout(contenido) {
  const activo = navActivo();

  return `
  <div class="shell">
    <header class="topbar">
      <div class="topbar-inner">
        <a class="marca" href="#/inicio" aria-label="Alerta Picudo Rojo, ir al inicio">
          <img class="marca-logo" src="assets/logo.webp" alt="">
          <span class="marca-txt">Alerta Picudo <em>Rojo</em></span>
        </a>
        <nav class="nav-top" aria-label="Navegación principal">
          ${NAV.map((n) => `<a href="${n.href}" class="${activo === n.id ? 'on' : ''}"${activo === n.id ? ' aria-current="page"' : ''}>${n.label}</a>`).join('')}
        </nav>
        <a class="nav-alerta" href="#/alerta">Enviar alerta</a>
      </div>
    </header>

    <main id="contenido" class="contenido vista" tabindex="-1">
      ${contenido}
    </main>

    <footer class="pie">
      <div class="pie-inner">
        <p class="pie-marca"><span class="dg-mark" aria-hidden="true">DG</span> Hecho por <strong>DG Soluciones IT</strong></p>
        <p class="pie-apoyo">Apoyamos la iniciativa de Dr. Árbol para cuidar las palmeras.</p>
      </div>
    </footer>

    <nav class="nav-bottom" aria-label="Navegación inferior">
      ${NAV.map((n) => `<a href="${n.href}" class="${activo === n.id ? 'on' : ''}"${activo === n.id ? ' aria-current="page"' : ''}>${ico(n.id)}<span>${n.label}</span></a>`).join('')}
    </nav>

    ${state.modal ? modalHTML() : ''}
  </div>`;
}
