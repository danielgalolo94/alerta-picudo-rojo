// Recorrido "Reconocer el picudo en 5 minutos": cuatro tarjetas (contenido en js/contenido.js, RECORRIDO).

import { C } from '../data.js';
import { esc, ico } from '../ui.js';

export function vistaRecorrido(param) {
  const total = C.RECORRIDO.length;
  const n = Math.min(Math.max(parseInt(param, 10) || 1, 1), total);
  const r = C.RECORRIDO[n - 1];
  const ultimo = n === total;
  return `
  <div class="pagina-angosta recorrido">
    <a class="volver" href="#/aprender">← Aprender</a>
    <p class="eyebrow">Reconocer el picudo · en 5 minutos</p>
    <div class="progreso" role="progressbar" aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="${n}" aria-label="Tarjeta ${n} de ${total}">
      ${C.RECORRIDO.map((_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}
    </div>
    <article class="panel marco">
      <p class="eyebrow">${esc(r.kicker)}</p>
      <h1>${esc(r.titulo)}</h1>
      ${r.img ? `<figure class="recorrido-img"><img src="assets/images/${esc(r.img)}.webp" alt="${esc(r.alt || '')}"></figure>` : ''}
      <ul class="recorrido-puntos ${r.no ? 'no' : ''}">
        ${r.puntos.map((p) => `<li><span aria-hidden="true">${r.no ? '✕' : '✓'}</span>${esc(p)}</li>`).join('')}
      </ul>
    </article>
    <div class="test-nav">
      ${ultimo
        ? `<button type="button" class="btn btn-verde" data-action="empezar-test">Revisar mi palmera ${ico('flecha')}</button>`
        : `<a class="btn btn-verde" href="#/recorrido/${n + 1}">Siguiente ${ico('flecha')}</a>`}
      ${n > 1 ? `<a class="btn btn-outline" href="#/recorrido/${n - 1}">← Anterior</a>` : ''}
    </div>
  </div>`;
}
