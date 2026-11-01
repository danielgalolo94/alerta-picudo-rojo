// Reportes guardados y detalle de un reporte.

import { C, S } from '../data.js';
import { state } from '../store.js';
import { nivelKeyDeReporte } from '../selectors.js';
import { esc, fecha, ico } from '../ui.js';

function vistaDetalle(rep, nuevo) {
  const key = nivelKeyDeReporte(rep);

  return `
  <div class="pagina-angosta">
    <a class="volver" href="#/reportes">← Mis reportes</a>
    <div class="exito marco">
      <span class="exito-ico">${ico(nuevo ? 'check' : 'documento')}</span>
      <p class="eyebrow">${nuevo ? 'Reporte generado' : 'Reporte guardado'}</p>
      <h1>${esc(rep.codigo)}</h1>
      <p class="lead-oscuro">${nuevo
        ? 'Quedó guardado en este teléfono. Envialo a Dr. Árbol o al Senasa para que lo reciban.'
        : 'Este reporte está guardado en este dispositivo. Podés compartirlo cuando quieras.'}</p>
      <span class="nivel nivel-${esc(key)}">${esc(rep.nivel)}</span>

      <dl class="reporte-datos">
        <div><dt>Fecha</dt><dd>${esc(fecha(rep.creado))}</dd></div>
        <div><dt>Lugar</dt><dd>${esc(rep.jurisdiccion)}${rep.municipio ? ' · ' + esc(rep.municipio) : ''}</dd></div>
        <div><dt>Palmera</dt><dd>${rep.especie ? esc(rep.especie) : 'Sin identificar'}</dd></div>
        <div><dt>Signos</dt><dd>${rep.sintomas.length ? esc(rep.sintomas.join(' · ')) : 'Sin signos marcados'}</dd></div>
        <div><dt>Fotos</dt><dd>${rep.fotos.length}</dd></div>
        <div><dt>Cantidad</dt><dd>${esc(rep.cantidad)} palmera(s)</dd></div>
      </dl>

      <div class="reporte-acciones">
        <button type="button" class="btn btn-rojo" data-action="compartir-reporte" data-id="${esc(rep.id)}">Compartir reporte</button>
        <a class="btn btn-verde" href="${esc(C.enlaceWhatsapp(S.textoParaCompartir(rep)))}" target="_blank" rel="noopener">${ico('whatsapp')} Enviar por WhatsApp</a>
        <a class="btn btn-outline" href="${esc(C.enlaceEmail('Alerta Picudo Rojo ' + rep.codigo, S.textoParaCompartir(rep)))}">Enviar por email</a>
        <a class="btn btn-outline" href="${esc(C.enlaceSenasaEmail('Aviso de palmera con signos de picudo rojo ' + rep.codigo, S.textoParaCompartir(rep)))}">Avisar al Senasa</a>
      </div>
      <button type="button" class="link peligro" data-action="eliminar-reporte" data-id="${esc(rep.id)}">Eliminar este reporte del teléfono</button>
      <p class="nota">El reporte es una orientación ciudadana y no reemplaza una identificación o diagnóstico oficial. Guardá el código ${esc(rep.codigo)} para consultas.</p>
    </div>

    ${nuevo ? `
      <div class="panel marco">
        <h2>¿Qué sigue?</h2>
        <ol class="lista-num">
          <li><strong>Enviá el reporte</strong> por WhatsApp o email a Dr. Árbol. Ahí queda el código y los datos.</li>
          <li><strong>Guardá las fotos</strong> y volvé a revisar la palmera en unos días.</li>
          <li><strong>No muevas restos vegetales</strong> ni podés la palmera hasta recibir indicación profesional.</li>
        </ol>
      </div>` : ''}
  </div>`;
}

export function vistaListo(id) {
  const rep = state.reportes.find((x) => x.id === id) || (state.ultimo && state.ultimo.id === id ? state.ultimo : null);
  return rep ? vistaDetalle(rep, true) : vistaReportes(true);
}

export function vistaReporte(id) {
  const rep = state.reportes.find((x) => x.id === id);
  return rep ? vistaDetalle(rep, false) : vistaReportes(true);
}

export function vistaReportes(noEncontrado = false) {
  return `
  <div class="pagina">
    <p class="eyebrow">Tus reportes</p>
    <h1>Alertas guardadas</h1>
    <p class="lead-oscuro">Los reportes quedan en este dispositivo hasta que los borres. Envialos para que Dr. Árbol o el Senasa los reciban.</p>
    ${noEncontrado ? '<p class="aviso">No encontramos ese reporte en este dispositivo.</p>' : ''}
    ${state.reportes.length ? `
      <div class="lista-reportes">
        ${state.reportes.map((rep) => `
          <a class="reporte-item marco" href="#/reporte/${encodeURIComponent(rep.id)}">
            <div class="reporte-item-top">
              <span class="codigo">${esc(rep.codigo)}</span>
              <span class="nivel-mini nivel-${esc(nivelKeyDeReporte(rep))}">${esc(C.NIVELES[nivelKeyDeReporte(rep)] ? C.ESCALA.find((e) => e.id === nivelKeyDeReporte(rep))?.label ?? '' : 'Sin evaluar')}</span>
            </div>
            <p>${esc(rep.jurisdiccion)}${rep.municipio ? ' · ' + esc(rep.municipio) : ''}</p>
            <p class="fecha">${esc(fecha(rep.creado))} · ${rep.sintomas.length} signos · ${rep.fotos.length} fotos</p>
          </a>`).join('')}
      </div>` : `
      <div class="vacio">
        <p>Todavía no generaste ningún reporte. Podés hacer el test o enviar una alerta directamente.</p>
        <a class="btn btn-verde" href="#/test">Hacer el test</a>
      </div>`}
  </div>`;
}
