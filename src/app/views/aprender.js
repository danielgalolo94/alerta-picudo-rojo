// Biblioteca educativa y detalle de artículos.

import { C, IMG_ART } from '../data.js';
import { esc } from '../ui.js';
import { imagen } from '../../../lib/rutas.js';

export function vistaAprender() {
  const grupos = [...new Set(C.ARTICULOS.map((a) => a.kicker))];
  let n = 0;

  return `
  <div class="pagina">
    <p class="eyebrow">Biblioteca</p>
    <h1>Aprender</h1>
    <p class="lead-oscuro">Qué es el picudo rojo, cómo daña la palmera, qué signos buscar y qué hacer ante una duda. Contenido para leer y volver cuando lo necesites.</p>
    <a class="panel marco destacado-plagas" href="#/recorrido/1">
      <strong>Reconocer el picudo en 5 minutos</strong>
      <span>Cuatro tarjetas: qué es, dónde mirar, qué señales buscar y qué no hacer.</span>
    </a>
    <a class="panel marco destacado-plagas" href="#/plagas">
      <strong>Diferencial: otras plagas y causas</strong>
      <span>Picudo negro, paysandisia, vaquita, escarabajo rinoceronte y daños que no son plagas.</span>
    </a>
    <div class="articulos">
      ${grupos.map((g) => `
        <section class="grupo">
          <h2>${esc(g)}</h2>
          ${C.ARTICULOS.filter((a) => a.kicker === g).map((a) => {
            n += 1;
            return `
            <a class="articulo-item" href="#/articulo/${a.id}">
              <span class="num">${String(n).padStart(2, '0')}</span>
              <span class="tit">${esc(a.titulo)}</span>
              ${a.pendiente ? '<span class="tag">En preparación</span>' : ''}
              <span class="flecha" aria-hidden="true">→</span>
            </a>`;
          }).join('')}
        </section>`).join('')}
    </div>
  </div>`;
}

export function vistaArticulo(id) {
  const a = C.ARTICULOS.find((x) => x.id === id) || C.ARTICULOS[0];
  const img = IMG_ART[a.id];
  const esCiclo = a.id === 'ciclo';
  const esSensores = a.id === 'sensores';

  return `
  <article class="articulo">
    <a class="volver" href="#/aprender">← Aprender</a>
    <p class="eyebrow">${esc(a.kicker)}</p>
    <h1>${esc(a.titulo)}</h1>
    <div class="prosa">
      ${(a.cuerpo || []).map((p) => `<p>${esc(p)}</p>`).join('')}
    </div>
    ${img ? `
      <figure class="articulo-img marco">
        <img src="assets/images/${img}.webp" alt="${esc(a.titulo)}" loading="lazy">
        <figcaption>${esc(a.titulo)} · material educativo de Dr. Árbol</figcaption>
      </figure>` : ''}
    ${esCiclo ? `
      <div class="etapas">
        ${C.ETAPAS.map((e) => `
          <article class="etapa">
            <span class="etapa-num">${esc(e.num)}</span>
            <h3>${esc(e.nombre)}</h3>
            <p>${esc(e.nota)}</p>
            ${e.imagen ? `<img src="${esc(imagen(e.imagen))}" alt="${esc(e.imagenAlt || e.nombre)}" loading="lazy">` : ''}
            ${e.imagenPie ? `<p class="etapa-pie">${esc(e.imagenPie)}</p>` : ''}
            ${(e.puntos || []).length ? `<dl class="etapa-puntos">${e.puntos.map((x) => `<div><dt>${esc(x.rotulo)}</dt><dd>${esc(x.texto)}</dd></div>`).join('')}</dl>` : ''}
          </article>`).join('')}
      </div>` : ''}
    ${esSensores ? `
      <div class="panel marco">
        <h2>Qué puede aportar el monitoreo</h2>
        <p>Los sensores acústicos y las trampas de monitoreo ayudan a detectar actividad en zonas de riesgo, pero no reemplazan la inspección visual ni la evaluación profesional. La decisión de instalar un equipo y cómo interpretarlo corresponde a un técnico.</p>
      </div>` : ''}
    <div class="panel marco">
      <h2>¿Viste algo parecido?</h2>
      <p class="panel-intro">Hacé el test de 4 pasos o enviá una alerta con fotos.</p>
      <div class="resultado-acciones">
        <a class="btn btn-verde" href="#/test">Hacer el test</a>
        <a class="btn btn-outline" href="#/alerta">Enviar una alerta</a>
      </div>
    </div>
  </article>`;
}
