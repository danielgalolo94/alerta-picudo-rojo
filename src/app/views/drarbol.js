// Consultar a Dr. Árbol: motivo y canal (contenido en js/contenido.js: MOTIVOS, CANALES_CONSULTA, CONTACTO).

import { C } from '../data.js';
import { state } from '../store.js';
import { esc } from '../ui.js';

function enlace(canal, motivo, jur) {
  const contexto = 'Motivo: ' + motivo + '.' + (jur ? ' Provincia: ' + jur.nombre + '.' : '');
  if (canal.tipo === 'whatsapp') return C.enlaceWhatsapp(canal.mensaje + ' ' + contexto);
  if (canal.tipo === 'email') return C.enlaceEmail((canal.asunto || 'Consulta') + ' — ' + motivo, contexto + '\n\n' + (canal.mensaje || ''));
  return 'tel:' + C.CONTACTO.telefono;
}

export function vistaDrArbol() {
  const motivo = state.motivoConsulta || C.MOTIVOS[1] || C.MOTIVOS[0];
  const jur = C.JURISDICCIONES.find((j) => j.id === state.ajustes.jurisdiccion);
  return `
  <div class="pagina-angosta">
    <a class="volver" href="#/inicio">← Inicio</a>
    <p class="eyebrow">Asistencia profesional</p>
    <h1>Consultar a Dr. Árbol</h1>
    <p class="lead-oscuro">Evaluación profesional, prevención y tratamiento. Elegí el motivo y el canal: el mensaje sale con esos datos.</p>
    <div class="panel marco">
      <h2>Motivo</h2>
      <div class="chips" role="radiogroup" aria-label="Motivo de la consulta">
        ${C.MOTIVOS.map((m) => `<button type="button" class="chip ${m === motivo ? 'on' : ''}" role="radio" aria-checked="${m === motivo}" data-action="motivo-consulta" data-motivo="${esc(m)}">${esc(m)}</button>`).join('')}
      </div>
    </div>
    <div class="senasa-botones">
      ${C.CANALES_CONSULTA.map((c, i) => `<a class="btn ${i === 0 ? 'btn-verde' : 'btn-outline'}" href="${esc(enlace(c, motivo, jur))}"${c.tipo === 'whatsapp' ? ' target="_blank" rel="noopener"' : ''}>${esc(c.label)}</a>`).join('')}
    </div>
    <p class="nota">WhatsApp ${esc(C.CONTACTO.whatsappLegible)} · ${esc(C.CONTACTO.email)}. Si ya hiciste el test, mandá la alerta con fotos desde el resultado.</p>
  </div>`;
}
