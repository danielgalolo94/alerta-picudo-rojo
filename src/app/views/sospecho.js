// Guía de acción ante una sospecha.

import { C } from '../data.js';
import { state } from '../store.js';
import { esc } from '../ui.js';

export function vistaSospecho() {
  const hacer = state.tabSospecho === 'hacer';
  const lista = hacer ? C.QUE_HACER : C.QUE_NO_HACER;

  return `
  <div class="pagina-angosta">
    <a class="volver" href="#/inicio">← Inicio</a>
    <p class="eyebrow">Guía de acción</p>
    <h1>¿Qué hago si sospecho?</h1>
    <p class="lead-oscuro">Ante una duda, primero observá y registrá. No intervengas la palmera por tu cuenta: una poda o una perforación pueden empeorar la situación.</p>

    <div class="tabs" role="tablist" aria-label="Qué hacer y qué no hacer">
      <button type="button" role="tab" aria-selected="${hacer}" class="${hacer ? 'on' : ''}" data-tab="hacer">Qué hacer</button>
      <button type="button" role="tab" aria-selected="${!hacer}" class="${!hacer ? 'on' : ''}" data-tab="no">Qué no hacer</button>
    </div>

    <ol class="acciones ${hacer ? '' : 'no'}">
      ${lista.map((x) => `
        <li>
          <span class="accion-ico" aria-hidden="true">${hacer ? '✓' : '✕'}</span>
          <div><h3>${esc(x.titulo)}</h3><p>${esc(x.texto)}</p></div>
        </li>`).join('')}
    </ol>

    <div class="panel marco contacto-oficial">
      <h2>Contacto oficial · Senasa</h2>
      <div class="contacto-linea"><strong>Email</strong><a href="mailto:${esc(C.SENASA.email)}">${esc(C.SENASA.email)}</a><small>${esc(C.SENASA.emailNota)}</small></div>
      <div class="contacto-linea"><strong>WhatsApp</strong><a href="https://wa.me/${esc(C.SENASA.whatsapp)}" target="_blank" rel="noopener">${esc(C.SENASA.whatsappLegible)}</a><small>${esc(C.SENASA.whatsappNota)}</small></div>
      <div class="contacto-linea"><strong>Teléfono</strong><a href="tel:${esc(C.SENASA.telefono)}">${esc(C.SENASA.telefonoLegible)}</a><small>Línea gratuita: ${esc(C.SENASA.gratuitoLegible)}</small></div>
      <div class="contacto-linea"><strong>Sitio</strong><a href="${esc(C.SENASA.sitio)}" target="_blank" rel="noopener">argentina.gob.ar/senasa</a><small>${esc(C.SENASA.sitioNota)}</small></div>
    </div>

    <div class="resultado-acciones">
      <button type="button" class="btn btn-verde" data-action="empezar-test">Hacer el test</button>
      <a class="btn btn-rojo" href="#/alerta">Enviar una alerta</a>
    </div>
    <p class="nota-test">La app no reemplaza al Senasa ni a un profesional. Ante una urgencia, usá los canales oficiales.</p>
  </div>`;
}
