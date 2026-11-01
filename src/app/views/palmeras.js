// Mi palmera: ejemplares registrados en este teléfono, su historial de inspecciones y el recordatorio mensual.

import { state } from '../store.js';
import { esc, fecha, ico } from '../ui.js';
import { DIAS_RECORDATORIO } from '../../../lib/palmeras.js';

const nivelDe = (insp) => (insp && insp.nivelKey) || 'sin-evaluar';
const nombre = (p) => (p.apodo ? p.apodo + ' · ' : '') + p.especie;

export function vistaPalmeras() {
  const vencidas = state.palmeras.filter((p) => p.recordarEl && p.recordarEl <= Date.now());
  return `
  <div class="pagina">
    <p class="eyebrow">Ejemplares registrados</p>
    <h1>Mi palmera</h1>
    <p class="lead-oscuro">Guardá cada palmera que revisás y repetí el test una vez por mes, siempre en las mismas zonas. Comparar en el tiempo dice más que una sola mirada.</p>
    ${vencidas.length ? `<p class="aviso">Es momento de volver a revisar: ${vencidas.map((p) => esc(nombre(p))).join(', ')}.</p>` : ''}
    ${state.palmeras.length ? `
      <div class="lista-reportes">
        ${state.palmeras.map((p) => {
          const u = p.inspecciones[0];
          return `
          <a class="reporte-item marco" href="#/palmera/${encodeURIComponent(p.id)}">
            <div class="reporte-item-top">
              <span class="codigo">${esc(nombre(p))}</span>
              <span class="nivel-mini nivel-${esc(nivelDe(u))}">${esc(u ? u.nivel : '')}</span>
            </div>
            <p>${esc(p.id)}${p.jurisdiccion ? ' · ' + esc(p.jurisdiccion) : ''}</p>
            <p class="fecha">${p.inspecciones.length} inspección(es) · última ${esc(fecha(u.fecha))}${p.recordarEl ? ' · te avisamos el ' + esc(fecha(p.recordarEl)) : ''}</p>
          </a>`;
        }).join('')}
      </div>` : `
      <div class="vacio">
        <p>Todavía no registraste ninguna palmera. Hacé el test y, en el resultado, tocá “Guardar en Mi palmera”.</p>
        <a class="btn btn-verde" href="#/test">Hacer el test</a>
      </div>`}
  </div>`;
}

export function vistaPalmera(id) {
  const p = state.palmeras.find((x) => x.id === id);
  if (!p) return `<p class="aviso" style="margin:16px">No encontramos esa palmera en este dispositivo.</p>` + vistaPalmeras();
  const notif = typeof Notification === 'undefined' ? 'no' : Notification.permission;
  return `
  <div class="pagina-angosta">
    <a class="volver" href="#/palmeras">← Mi palmera</a>
    <p class="eyebrow">${esc(p.id)} · alta ${esc(fecha(p.creada))}</p>
    <h1>${esc(nombre(p))}</h1>
    <p class="lead-oscuro">${p.jurisdiccion ? esc(p.jurisdiccion) + '. ' : ''}${p.inspecciones.length} inspección(es) guardadas en este teléfono.</p>

    <div class="panel marco">
      <h2>Próxima revisión</h2>
      <p class="panel-intro">${p.recordarEl
        ? `Te vamos a avisar el <strong>${esc(fecha(p.recordarEl))}</strong>.${notif === 'granted' ? '' : ' Si no activás las notificaciones, el aviso aparece al abrir la app.'}`
        : `Conviene revisar cada ejemplar una vez por mes. Podemos recordártelo en ${DIAS_RECORDATORIO} días.`}</p>
      <div class="resultado-acciones">
        <button type="button" class="btn btn-outline" data-action="recordatorio" data-id="${esc(p.id)}">${p.recordarEl ? 'Cancelar el recordatorio' : `Recordarme en ${DIAS_RECORDATORIO} días`}</button>
        <button type="button" class="btn btn-verde" data-action="revisar-palmera" data-id="${esc(p.id)}">Revisarla ahora</button>
      </div>
    </div>

    <h2 class="historial-titulo">Historial</h2>
    <ol class="historial">
      ${p.inspecciones.map((i, n) => `
        <li class="nivel-${esc(nivelDe(i))}">
          <p class="fecha">${esc(fecha(i.fecha))} · ${n === p.inspecciones.length - 1 ? 'Alta del ejemplar' : 'Inspección'}</p>
          <p><strong>${esc(i.nivel)}</strong>. ${i.sintomas.length ? esc(i.sintomas.join(', ')) : 'Sin signos marcados'}.</p>
          ${i.fotos.length ? `<div class="historial-fotos">${i.fotos.map((f) => `<img src="${f.dataUrl}" alt="${esc(f.nombre)}">`).join('')}</div>` : ''}
        </li>`).join('')}
    </ol>

    <button type="button" class="link peligro" data-action="eliminar-palmera" data-id="${esc(p.id)}">Eliminar esta palmera del teléfono</button>
  </div>`;
}

// Panel del resultado del test: guardar la revisión como palmera nueva o sumarla a una existente.
export function guardarEnPalmera() {
  if (state.palmeraGuardada) {
    return `<div class="panel marco"><p class="panel-intro">${ico('check')} Guardada en <a href="#/palmera/${encodeURIComponent(state.palmeraGuardada)}">Mi palmera</a>.</p></div>`;
  }
  const destino = state.palmeraDestino && state.palmeras.find((p) => p.id === state.palmeraDestino);
  return `
  <div class="panel marco">
    <h2>Guardar en Mi palmera</h2>
    <p class="panel-intro">Así podés comparar en la próxima revisión. Queda solo en este teléfono.</p>
    <div class="resultado-acciones">
      ${destino ? `<button type="button" class="btn btn-verde" data-action="guardar-palmera" data-id="${esc(destino.id)}">Sumar a ${esc(nombre(destino))}</button>` : ''}
      <button type="button" class="btn ${destino ? 'btn-outline' : 'btn-verde'}" data-action="guardar-palmera">Guardar como palmera nueva</button>
    </div>
    ${!destino && state.palmeras.length ? `
      <p class="nota">¿Es una que ya registraste? Sumala a su historial:</p>
      <div class="chips">${state.palmeras.map((p) => `<button type="button" class="chip" data-action="guardar-palmera" data-id="${esc(p.id)}">${esc(nombre(p))}</button>`).join('')}</div>` : ''}
  </div>`;
}

export const nombrePalmera = nombre;
