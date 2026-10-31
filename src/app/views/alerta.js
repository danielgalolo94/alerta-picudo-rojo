// Formulario de alerta ciudadana.

import { C, S } from '../data.js';
import { state } from '../store.js';
import { esc, ico } from '../ui.js';

export function vistaAlerta() {
  const jur = C.JURISDICCIONES.find((j) => j.id === state.ajustes.jurisdiccion);
  const localidades = jur ? ((C.LOCALIDADES[jur.id] || {}).lista || []) : [];
  const r = state.resultado;
  const esp = C.ESPECIES.find((e) => e.id === state.form.especie);

  return `
  <div class="pagina-angosta">
    <a class="volver" href="#/inicio">← Inicio</a>
    <p class="eyebrow">Alerta ciudadana</p>
    <h1>Reportar una palmera sospechosa</h1>
    <p class="lead-oscuro">Completá los datos. El reporte queda guardado en tu teléfono y después podés enviarlo a Dr. Árbol o al Senasa. No se envía solo.</p>

    ${r ? `
      <div class="resumen-test">
        <p><strong>Resultado del test:</strong> ${esc((C.NIVELES[r.nivel] || C.NIVELES.bajo).titulo)}${esp ? ' · ' + esc(esp.comun) : ''}</p>
        <div class="chips">
          ${C.SINTOMAS.filter((s) => state.sintomas.includes(s.id) && s.peso > 0).map((s) => `<span class="chip">${esc(s.label)}</span>`).join('') || '<span class="chip">Sin signos marcados</span>'}
          ${Object.keys(state.fotos).length ? `<span class="chip">${Object.keys(state.fotos).length} foto(s)</span>` : ''}
        </div>
      </div>` : ''}

    <form id="form-alerta" class="panel marco" novalidate>
      ${state.errores.length ? `
        <div class="errores" role="alert">
          <strong>Revisá estos datos:</strong>
          <ul>${state.errores.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
        </div>` : ''}

      <div class="form">
        <div class="campo">
          <label for="jur">Provincia *</label>
          <select id="jur" data-campo="jurisdiccion" required>
            <option value="">Elegí una provincia</option>
            ${C.JURISDICCIONES.map((j) => `<option value="${j.id}" ${state.ajustes.jurisdiccion === j.id ? 'selected' : ''}>${esc(j.largo || j.nombre)}</option>`).join('')}
          </select>
        </div>

        <div class="campo">
          <label for="mun">Localidad, partido o barrio *</label>
          <input id="mun" data-campo="municipio" list="lista-localidades" value="${esc(state.form.municipio)}" autocomplete="address-level2" placeholder="Ej. La Plata">
          <datalist id="lista-localidades">${localidades.map((n) => `<option value="${esc(n)}"></option>`).join('')}</datalist>
        </div>

        <div class="campo">
          <label for="esp">Especie</label>
          <select id="esp" data-campo="especie">
            <option value="">No sé / prefiero no indicar</option>
            ${C.ESPECIES.map((e) => `<option value="${e.id}" ${state.form.especie === e.id ? 'selected' : ''}>${esc(e.comun)}</option>`).join('')}
          </select>
        </div>

        <div class="campo">
          <label for="cant">Cantidad de palmeras</label>
          <input id="cant" type="number" min="1" max="999" inputmode="numeric" data-campo="cantidad" value="${esc(state.form.cantidad)}">
        </div>

        <div class="campo">
          <label for="motivo">Motivo</label>
          <select id="motivo" data-campo="motivo">
            ${C.MOTIVOS.map((m) => `<option value="${esc(m)}" ${state.form.motivo === m ? 'selected' : ''}>${esc(m)}</option>`).join('')}
          </select>
        </div>

        <div class="campo">
          <label for="email">Email *</label>
          <input id="email" type="email" inputmode="email" autocomplete="email" data-campo="email" value="${esc(state.form.email)}" placeholder="Para poder responderte">
        </div>

        <div class="campo">
          <label for="nombre">Nombre</label>
          <input id="nombre" autocomplete="name" data-campo="nombre" value="${esc(state.form.nombre)}">
        </div>

        <div class="campo">
          <label for="tel">Teléfono</label>
          <input id="tel" type="tel" inputmode="tel" autocomplete="tel" data-campo="telefono" value="${esc(state.form.telefono)}">
        </div>

        <div class="campo full">
          <label for="com">Comentarios</label>
          <textarea id="com" data-campo="comentarios" rows="4" placeholder="Qué viste, desde cuándo, si hay otras palmeras cerca…">${esc(state.form.comentarios)}</textarea>
        </div>

        <div class="campo full">
          <span class="label">Ubicación</span>
          <div class="ubicacion-linea">
            <button type="button" class="btn btn-outline btn-chico" data-action="usar-ubicacion">${ico('ubicacion')} ${state.ubicacion ? 'Actualizar ubicación' : 'Usar mi ubicación'}</button>
            ${state.ubicacion
              ? `<span class="ok">${esc(S.gradosALegible(state.ubicacion.lat, state.ubicacion.lon))} (±${esc(state.ubicacion.precision)} m)</span><button type="button" class="link" data-action="quitar-ubicacion">Quitar</button>`
              : '<span class="ayuda">Opcional. Se guarda aproximada.</span>'}
          </div>
          ${state.ubicacionError ? `<span class="error">${esc(state.ubicacionError)}</span>` : ''}
        </div>

        <div class="campo full">
          <label class="consent">
            <input type="checkbox" id="consent" name="consent" data-campo="consent" ${state.form.consent ? 'checked' : ''}>
            <span>Acepto que este reporte es una orientación ciudadana y no un diagnóstico oficial. Los datos quedan en este dispositivo hasta que yo los comparta. <a href="#/privacidad">Privacidad</a>.</span>
          </label>
        </div>
      </div>

      <div class="form-acciones">
        <button type="submit" class="btn btn-rojo">Generar reporte</button>
        <a class="btn btn-outline" href="#/test">Volver al test</a>
      </div>
    </form>
    <p class="nota-test">Si es una urgencia fitosanitaria, contactá directamente al Senasa. La app no envía datos por su cuenta.</p>
  </div>`;
}
