// Test de 4 pasos y resultado.

import { C, FOTO_SINTOMA } from '../data.js';
import { state } from '../store.js';
import { esc, ico } from '../ui.js';

function pasoEspecie() {
  return `
  <p class="panel-intro">Elegí la que más se parezca. Si no sabés, no pasa nada: se puede identificar con fotos.</p>
  <div class="opciones-especie">
    ${C.ESPECIES.map((e) => `
      <button type="button" class="opcion ${state.especie === e.id ? 'sel' : ''}" data-especie="${e.id}" aria-pressed="${state.especie === e.id}">
        <span class="opcion-nombre">${esc(e.comun)}</span>
        <span class="opcion-cien">${esc(e.cientifico)}</span>
        ${e.riesgo === 2 ? '<span class="tag tag-rojo">Especie susceptible</span>' : ''}
      </button>`).join('')}
  </div>`;
}

function pasoSintomas() {
  return `
  <p class="panel-intro">Marcá todas las señales que puedas ver. Si no ves ninguna, elegí “Ninguno de estos”.</p>
  <div class="sintomas">
    ${C.SINTOMAS.map((s) => {
      const on = state.sintomas.includes(s.id);
      const foto = FOTO_SINTOMA[s.id];
      return `
        <button type="button" class="sintoma" data-sintoma="${s.id}" aria-pressed="${on}">
          ${foto
            ? `<img src="assets/images/${foto}.webp" alt="" loading="lazy">`
            : `<span class="sintoma-sin" aria-hidden="true">${s.id === 'ninguno' ? '✓' : '·'}</span>`}
          <span class="sintoma-label">${esc(s.label)}</span>
          <span class="check" aria-hidden="true">${on ? ico('check') : ''}</span>
        </button>`;
    }).join('')}
  </div>`;
}

function pasoFotos() {
  const cantidad = Object.keys(state.fotos).length;
  return `
  <p class="panel-intro">Las fotos ayudan a preevaluar. Son opcionales: podés seguir sin sacar ninguna. Se reducen en tu teléfono antes de guardarse.</p>
  <div class="fotos">
    ${C.TOMAS.map((t) => {
      const f = state.fotos[t.id];
      if (f) {
        return `
        <div class="foto">
          <img class="foto-preview" src="${f.dataUrl}" alt="Foto: ${esc(t.nombre)}">
          <div class="foto-pie"><span>${esc(t.nombre)} · ${window.APR_STORE.pesoLegible(f.bytes)}</span><button type="button" data-quitar-foto="${t.id}">Quitar</button></div>
        </div>`;
      }
      return `
      <div class="foto">
        <label class="foto-vacia">
          <input type="file" accept="image/*" capture="environment" data-foto="${t.id}" aria-label="Agregar foto de ${esc(t.nombre)}">
          ${ico('camara')}
          <strong>${esc(t.nombre)}</strong>
          <span>${esc(t.guia)}</span>
        </label>
      </div>`;
    }).join('')}
  </div>
  <p class="nota-fotos">${cantidad} de ${C.TOMAS.length} fotos agregadas. No se envían solas: quedan dentro del reporte que decidas compartir.</p>`;
}

function vistaResultado() {
  const r = state.resultado;
  const info = C.NIVELES[r.nivel] || C.NIVELES.bajo;
  const esp = C.ESPECIES.find((e) => e.id === state.especie);
  const signos = C.SINTOMAS.filter((s) => state.sintomas.includes(s.id) && s.peso > 0);
  const consejos = {
    bajo: [
      'Volvé a revisar la palmera en unas semanas, siempre en las mismas zonas.',
      'Registrá fotos con fecha para poder comparar la evolución.',
      'Si aparece un signo nuevo, repetí el test.',
    ],
    moderado: [
      'Observá la palmera durante los próximos días y registrá cambios.',
      'No podés ni perfores el tronco para buscar larvas.',
      'Si los signos aumentan, enviá una alerta con fotos.',
    ],
    alto: [
      'No muevas hojas, restos ni la palmera.',
      'Enviá la alerta con fotos para que Dr. Árbol pueda preevaluarla.',
      'Consultá al organismo oficial de tu provincia.',
    ],
  }[r.nivel];

  const extra = r.enlaces.includes('strategus')
    ? '<p class="aviso-extra">Los orificios y el aserrín en la base también pueden corresponder al escarabajo rinoceronte. Por eso conviene una evaluación profesional.</p>'
    : r.enlaces.includes('plagas')
      ? '<p class="aviso-extra">Ver un insecto solo no confirma picudo rojo: hay otras especies parecidas. La evaluación profesional lo define.</p>'
      : '';

  return `
  <div class="test">
    <div class="test-head">
      <a class="volver" href="#/inicio">← Inicio</a>
      <p class="eyebrow">Resultado orientativo</p>
      <h1>Tu nivel de alerta</h1>
      <div class="progreso" role="progressbar" aria-valuemin="1" aria-valuemax="4" aria-valuenow="4" aria-label="Test completo">
        ${[1, 2, 3, 4].map(() => '<i class="on"></i>').join('')}
      </div>
      <div class="paso-meta"><span>Paso 4 de 4 · Listo</span><span>100%</span></div>
    </div>

    <div class="resultado resultado-${r.nivel} marco">
      <span class="nivel nivel-${r.nivel}">${ico('alerta')} ${esc(info.titulo)}</span>
      <p class="resultado-resumen">${esc(info.resumen)}</p>
      <dl class="resultado-datos">
        <div><dt>Palmera</dt><dd>${esp ? esc(esp.comun) : 'Sin identificar'}</dd></div>
        <div><dt>Signos marcados</dt><dd>${signos.length}</dd></div>
        <div><dt>Fotos</dt><dd>${Object.keys(state.fotos).length}</dd></div>
      </dl>
      <ul class="razones">
        ${r.razones.map((z) => `<li class="razon"><span class="razon-texto">${esc(z.texto)}</span><span class="razon-peso">${esc(z.peso)}</span></li>`).join('')}
      </ul>
      ${extra}
      <div class="resultado-acciones">
        <button type="button" class="btn btn-rojo" data-action="ir-alerta">Enviar alerta a Dr. Árbol</button>
        <button type="button" class="btn btn-outline" data-action="compartir-resultado">Compartir resultado</button>
      </div>
      <div class="resultado-secundario">
        <button type="button" class="link" data-action="reiniciar-test">Volver a hacer el test</button>
        <span aria-hidden="true"> · </span>
        <a href="#/sospecho">Qué hacer ahora</a>
      </div>
    </div>

    <div class="panel marco recomendaciones">
      <h2>Qué conviene hacer</h2>
      <ol class="lista-num">${consejos.map((c) => `<li>${esc(c)}</li>`).join('')}</ol>
    </div>

    <p class="nota-test">Este resultado es una orientación ciudadana. No reemplaza una identificación ni un diagnóstico profesional.</p>
  </div>`;
}

export function vistaTest() {
  if (state.paso === 4) return vistaResultado();

  const titulos = ['¿Qué palmera tenés?', '¿Qué signos ves?', 'Sumá fotos (opcional)'];
  const ayudas = ['Elegí la especie', 'Marcá todo lo que veas', 'Ayudan a preevaluar'];
  const puedeSeguir = state.paso === 1 ? !!state.especie : state.paso === 2 ? state.sintomas.length > 0 : true;

  return `
  <div class="test">
    <div class="test-head">
      <a class="volver" href="#/inicio">← Inicio</a>
      <p class="eyebrow">Test de 4 pasos</p>
      <h1>${titulos[state.paso - 1]}</h1>
      <div class="progreso" role="progressbar" aria-valuemin="1" aria-valuemax="4" aria-valuenow="${state.paso}" aria-label="Paso ${state.paso} de 4">
        ${[1, 2, 3, 4].map((n) => `<i class="${n <= state.paso ? 'on' : ''}"></i>`).join('')}
      </div>
      <div class="paso-meta"><span>Paso ${state.paso} de 4 · ${ayudas[state.paso - 1]}</span><span>${state.paso}/4</span></div>
    </div>

    <div class="panel marco">
      ${state.paso === 1 ? pasoEspecie() : state.paso === 2 ? pasoSintomas() : pasoFotos()}
    </div>

    <div class="test-nav">
      ${state.paso > 1
        ? '<button type="button" class="btn btn-outline" data-action="atras-paso">← Atrás</button>'
        : '<a class="btn btn-outline" href="#/inicio">Cancelar</a>'}
      ${state.paso < 3
        ? `<button type="button" class="btn btn-verde" data-action="siguiente-paso" ${puedeSeguir ? '' : 'disabled'}>Siguiente ${ico('flecha')}</button>`
        : `<button type="button" class="btn btn-rojo" data-action="ver-resultado">Ver mi resultado ${ico('flecha')}</button>`}
    </div>
    <p class="nota-test">Orientación ciudadana. No reemplaza una identificación ni un diagnóstico profesional.</p>
  </div>`;
}
