// Estado único de la app. Las vistas leen; las acciones escriben con update().

import { S } from './data.js';

export const state = {
  pantalla: 'inicio',
  parametro: null,
  paso: 1,
  especie: '',
  sintomas: [],
  vioAdulto: false,
  fotos: {},
  resultado: null,
  ajustes: S.leerAjustes(),
  reportes: [],
  palmeras: [],
  palmeraDestino: null,  // la palmera que se está revisando de nuevo (desde su ficha)
  palmeraGuardada: null, // a dónde se guardó el resultado actual
  ultimo: null,
  ubicacion: null,
  ubicacionError: '',
  tabSospecho: 'hacer',
  form: {
    email: '',
    nombre: '',
    telefono: '',
    municipio: '',
    cantidad: '1',
    motivo: 'Sospecha',
    comentarios: '',
    consent: false,
    especie: '',
  },
  errores: [],
  modal: null,
};

const listeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  for (const fn of listeners) fn();
}

export function update(patch, { render = true } = {}) {
  const next = typeof patch === 'function' ? patch(state) : patch;
  Object.assign(state, next);
  if (render) emit();
}

export function resetTest({ render = true } = {}) {
  Object.assign(state, {
    paso: 1,
    especie: '',
    sintomas: [],
    vioAdulto: false,
    fotos: {},
    resultado: null,
    palmeraDestino: null,
    palmeraGuardada: null,
    ubicacion: null,
    ubicacionError: '',
    errores: [],
    form: { ...state.form, especie: '' },
  });
  if (render) emit();
}

export function setForm(campo, valor) {
  state.form[campo] = valor;
}

export function setJurisdiccion(id) {
  state.ajustes.jurisdiccion = id;
  state.ajustes.localidad = '';
  state.form.municipio = '';
  S.guardarAjustes(state.ajustes);
  emit();
}
