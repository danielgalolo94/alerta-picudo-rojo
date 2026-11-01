// Pantallas informativas: prevención, Dr. Árbol (institucional) y términos de uso.

import { C } from '../data.js';
import { esc } from '../ui.js';

export function vistaPrevencion() {
  const P = C.PREVENCION;
  return `
  <div class="pagina-angosta">
    <a class="volver" href="#/inicio">← Inicio</a>
    <p class="eyebrow">Prevención</p>
    <h1>Cómo proteger mi palmera</h1>
    <p class="lead-oscuro">${esc(P.intro)}</p>

    <ol class="acciones">
      ${P.pasos.map((x) => `
        <li>
          <span class="accion-ico" aria-hidden="true">✓</span>
          <div><h3>${esc(x.titulo)}</h3><p>${esc(x.texto)}</p></div>
        </li>`).join('')}
    </ol>

    <div class="resultado-acciones">
      <button type="button" class="btn btn-verde" data-action="consulta-motivo" data-motivo="${esc(P.motivo)}">Pedir una evaluación preventiva</button>
      <a class="btn btn-outline" href="#/palmeras">Registrar mi palmera</a>
    </div>
    <p class="nota-test">Orientación ciudadana: no reemplaza la evaluación de un profesional habilitado.</p>
  </div>`;
}

export function vistaInstitucional() {
  const I = C.INSTITUCIONAL;
  return `
  <div class="pagina-angosta">
    <a class="volver" href="#/mas">← Más</a>
    <p class="eyebrow">Quiénes somos</p>
    <h1>Dr. Árbol</h1>
    <p class="lead-oscuro">${esc(I.queHace)}</p>

    <div class="panel marco">
      <h2>La iniciativa</h2>
      <p class="panel-intro">${esc(I.iniciativa)}</p>
      ${I.historia ? `<p class="panel-intro">${esc(I.historia)}</p>` : ''}
    </div>

    <div class="panel marco">
      <h2>Contacto</h2>
      <div class="contacto-linea"><strong>WhatsApp</strong><a href="${esc(C.enlaceWhatsapp('Hola Dr. Árbol, quiero consultar por una palmera.'))}" target="_blank" rel="noopener">${esc(C.CONTACTO.whatsappLegible)}</a></div>
      <div class="contacto-linea"><strong>Email</strong><a href="mailto:${esc(C.CONTACTO.email)}">${esc(C.CONTACTO.email)}</a></div>
      ${C.APP.url ? `<div class="contacto-linea"><strong>Sitio</strong><a href="${esc(C.APP.url)}" target="_blank" rel="noopener">${esc(C.APP.url.replace(/^https?:\/\/(www\.)?/, ''))}</a></div>` : ''}
    </div>

    <div class="resultado-acciones">
      <a class="btn btn-verde" href="#/drarbol">Consultar a Dr. Árbol</a>
      <a class="btn btn-outline" href="#/prevencion">Cómo proteger mi palmera</a>
    </div>
    <p class="nota">${esc(I.donacion)} <a href="https://www.instagram.com/dgsolucionesok/" target="_blank" rel="noopener">@dgsolucionesok</a></p>
  </div>`;
}

export function vistaTerminos() {
  const L = C.LEGAL;
  return `
  <div class="pagina-angosta">
    <a class="volver" href="#/mas">← Más</a>
    <p class="eyebrow">Términos de uso</p>
    <h1>Condiciones de uso</h1>
    <p class="lead-oscuro">Usar la app implica aceptar estas condiciones. Las escribimos en lenguaje simple.</p>

    ${L.secciones.map((s) => `
      <div class="panel marco">
        <h2>${esc(s.titulo)}</h2>
        <p class="panel-intro">${esc(s.texto)}</p>
      </div>`).join('')}

    <p class="nota">Última actualización: ${esc(L.actualizado)}. Ante cualquier duda, escribinos a <a href="mailto:${esc(C.CONTACTO.email)}">${esc(C.CONTACTO.email)}</a>.</p>
    <div class="resultado-acciones">
      <a class="btn btn-outline" href="#/privacidad">Privacidad y datos</a>
      <a class="btn btn-verde" href="#/inicio">Volver al inicio</a>
    </div>
  </div>`;
}
