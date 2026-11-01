// Botones para avisar al Senasa con el texto de la revisión ya armado. Se reusa en el resultado.

import { C } from '../data.js';
import { esc } from '../ui.js';

export function botonesSenasa(texto, asunto) {
  const ext = 'target="_blank" rel="noopener"';
  return `
  <div class="senasa-botones">
    <a class="btn btn-verde" href="${esc(C.enlaceSenasaEmail(asunto, texto))}">Email al Senasa</a>
    <a class="btn btn-outline" href="${esc(C.enlaceSenasaWhatsapp(texto))}" ${ext}>WhatsApp del Senasa</a>
    <a class="btn btn-outline" href="tel:${esc(C.SENASA.gratuito)}">Llamar gratis ${esc(C.SENASA.gratuitoLegible)}</a>
    <a class="btn btn-outline" href="${esc(C.SENASA.sitio)}" ${ext}>Formulario de denuncia</a>
  </div>
  <p class="nota">${esc(C.AVISOS.senasa.nota)}</p>`;
}
