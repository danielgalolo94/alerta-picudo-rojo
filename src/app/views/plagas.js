// Diferencial: plagas y causas que se confunden con el picudo rojo, y la ficha comparativa de cada una.

import { C } from '../data.js';
import { imagen } from '../../../lib/rutas.js';
import { esc } from '../ui.js';

export function vistaPlagas() {
  return `
  <div class="pagina">
    <a class="volver" href="#/aprender">← Aprender</a>
    <p class="eyebrow">Diferencial</p>
    <h1>Otras plagas y causas</h1>
    <p class="lead-oscuro">Varios insectos y problemas de la palmera dejan señales parecidas. Compararlos ayuda a no alarmarse de más ni de menos. La identificación la confirma un profesional.</p>
    <div class="plagas-grid">
      ${C.PLAGAS.map((p) => `
        <a class="plaga-item marco" href="#/plaga/${esc(p.id)}">
          ${p.miniatura ? `<img src="${esc(imagen(p.miniatura))}" alt="" loading="lazy">` : '<span class="foto-pend">Foto pendiente</span>'}
          <span class="plaga-txt">
            <strong>${esc(p.comun)}</strong>
            <em>${esc(p.cientifico)}</em>
            <small>${esc(p.grupo)} · urgencia ${esc(p.urgencia.toLowerCase())}</small>
          </span>
        </a>`).join('')}
    </div>
    <div class="panel marco">
      <h2>Otras causas frecuentes</h2>
      <p class="panel-intro">No todo daño es una plaga:</p>
      <ul class="chips">${C.OTRAS_CAUSAS.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
    </div>
  </div>`;
}

export function vistaPlaga(id) {
  const p = C.PLAGAS.find((x) => x.id === id);
  if (!p) return vistaPlagas();
  return `
  <article class="pagina-angosta">
    <a class="volver" href="#/plagas">← Otras plagas</a>
    <p class="eyebrow">Ficha comparativa · ${esc(p.grupo)}</p>
    <h1>${esc(p.comun)}</h1>
    <p class="cientifico"><em>${esc(p.cientifico)}</em>${p.pendiente ? ' <span class="tag">Información en revisión</span>' : ''}</p>
    <div class="urgencia marco">
      <strong>Urgencia: ${esc(p.urgencia)}</strong>
      ${p.urgNota ? `<p>${esc(p.urgNota)}</p>` : ''}
    </div>
    <div class="plaga-fotos">
      ${p.fotos.map((f) => `
        <figure class="${f.ancho ? 'ancha' : ''}">
          ${f.img ? `<img src="${esc(imagen(f.img))}" alt="${esc(f.pie)}" loading="lazy">` : '<span class="foto-pend">Foto pendiente</span>'}
          <figcaption>${esc(f.pie)}</figcaption>
        </figure>`).join('')}
    </div>
    <dl class="plaga-filas">
      ${p.filas.map((f) => `<div><dt>${esc(f.rotulo)}</dt><dd>${esc(f.texto)}</dd></div>`).join('')}
    </dl>
    <div class="resultado-acciones">
      <a class="btn btn-verde" href="#/test">Hacer el test</a>
      <a class="btn btn-outline" href="#/plagas">Comparar con otra</a>
    </div>
  </article>`;
}
