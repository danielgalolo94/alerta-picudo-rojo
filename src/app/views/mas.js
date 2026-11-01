// Ajustes, contacto y privacidad.

import { C } from '../data.js';
import { state } from '../store.js';
import { esc } from '../ui.js';

export function vistaMas() {
  const jur = C.JURISDICCIONES.find((j) => j.id === state.ajustes.jurisdiccion);

  return `
  <div class="pagina">
    <p class="eyebrow">Ajustes</p>
    <h1>Más</h1>
    <p class="lead-oscuro">Tu zona, tus datos y los canales de contacto. La app funciona sin cuenta y sin registro.</p>

    <div class="grid-2">
      <section class="panel marco">
        <h2>Tu zona</h2>
        <p>La usamos para ordenar el reporte. Podés cambiarla cuando quieras.</p>
        <select data-campo="jurisdiccion" aria-label="Provincia">
          <option value="">Sin elegir</option>
          ${C.JURISDICCIONES.map((j) => `<option value="${j.id}" ${state.ajustes.jurisdiccion === j.id ? 'selected' : ''}>${esc(j.largo || j.nombre)}</option>`).join('')}
        </select>
        <p style="margin-top:12px">${jur ? 'Provincia elegida: <strong>' + esc(jur.largo || jur.nombre) + '</strong>' : 'Todavía no elegiste provincia.'}</p>
      </section>

      <section class="panel marco">
        <h2>Contacto Dr. Árbol</h2>
        <p>Consultas, evaluación profesional y prevención.</p>
        <div class="contacto-linea"><strong>WhatsApp</strong><a href="${esc(C.enlaceWhatsapp('Hola Dr. Árbol, quiero consultar por una palmera.'))}" target="_blank" rel="noopener">${esc(C.CONTACTO.whatsappLegible)}</a></div>
        <div class="contacto-linea"><strong>Email</strong><a href="mailto:${esc(C.CONTACTO.email)}">${esc(C.CONTACTO.email)}</a></div>
        <a class="btn btn-outline btn-chico" href="#/drarbol">Elegir motivo y canal</a>
      </section>

      <section class="panel marco">
        <h2>Lectura</h2>
        <p>Tamaño del texto</p>
        <div class="chips" role="radiogroup" aria-label="Tamaño del texto">
          ${[['estandar', 'Estándar'], ['grande', 'Grande'], ['muy', 'Muy grande']].map(([id, label]) => `<button type="button" class="chip ${state.ajustes.escala === id ? 'on' : ''}" role="radio" aria-checked="${state.ajustes.escala === id}" data-action="escala" data-escala="${id}">${label}</button>`).join('')}
        </div>
        <button type="button" class="pregunta-adulto contraste" data-action="contraste" aria-pressed="${!!state.ajustes.contraste}">
          <span class="check" aria-hidden="true">${state.ajustes.contraste ? '✓' : ''}</span>
          <span><strong>Alto contraste</strong><small>Textos más oscuros y bordes más marcados.</small></span>
        </button>
      </section>

      <section class="panel marco">
        <h2>Privacidad</h2>
        <p>Los reportes, fotos y datos de contacto se guardan solo en este dispositivo. La app no los envía a ningún servidor: vos elegís cuándo compartirlos.</p>
        <a class="btn btn-outline btn-chico" href="#/privacidad">Leer el detalle</a>
      </section>

      <section class="panel marco">
        <h2>Datos guardados</h2>
        <p>${state.reportes.length} reporte(s) en este teléfono. Podés borrarlos cuando quieras.</p>
        <button type="button" class="btn btn-outline btn-chico" data-action="borrar-datos">Borrar todos mis datos</button>
      </section>
    </div>

    <div class="panel marco" style="margin-top:12px">
      <h2>Instalar la app</h2>
      <p class="panel-intro">En el celular, abrí el menú del navegador y elegí <strong>Agregar a pantalla de inicio</strong>. Queda como una app y funciona aunque la conexión sea lenta.</p>
      <p class="nota">Alerta Picudo Rojo · versión 2.0 · Hecho por <a href="https://www.instagram.com/dgsolucionesok/" target="_blank" rel="noopener">DG Soluciones IT</a> para la iniciativa de Dr. Árbol.</p>
    </div>
  </div>`;
}

export function vistaPrivacidad() {
  return `
  <div class="pagina-angosta">
    <a class="volver" href="#/mas">← Más</a>
    <p class="eyebrow">Privacidad y datos</p>
    <h1>Qué hacemos con tus datos</h1>
    <p class="lead-oscuro">Esta app es una herramienta de orientación ciudadana. No tiene cuentas, no pide registro y no envía información por su cuenta.</p>

    <div class="panel marco">
      <h2>Dónde quedan los datos</h2>
      <p class="panel-intro">Los reportes, las fotos y los datos de contacto se guardan en el almacenamiento local de tu navegador (IndexedDB y localStorage). Si borrás los datos del navegador o usás otro dispositivo, no se recuperan.</p>
      <ul class="datos-lista">
        ${C.DATOS_PERSONALES.map((d) => `<li><strong>${esc(d.dato)}</strong><span>${esc(d.uso)}</span></li>`).join('')}
      </ul>
    </div>

    <div class="panel marco">
      <h2>Cuándo se comparte</h2>
      <p>Cuando tocás “Compartir reporte”, “Enviar por WhatsApp” o “Enviar por email”, el texto se abre en la app que elijas. Ahí empieza el envío y se aplican las condiciones de ese servicio. La app no manda nada antes.</p>
    </div>

    <div class="panel marco">
      <h2>Ubicación y fotos</h2>
      <p>La ubicación es opcional y se guarda aproximada. Las fotos se reducen en el teléfono antes de guardarse. Podés quitar una foto antes de generar el reporte y borrar todos tus datos desde Más.</p>
    </div>

    <div class="resultado-acciones">
      <a class="btn btn-verde" href="#/inicio">Volver al inicio</a>
      <a class="btn btn-outline" href="#/mas">Ir a Más</a>
    </div>
  </div>`;
}
