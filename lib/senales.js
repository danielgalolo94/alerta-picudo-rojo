// Señales del paso 2 del test según la especie elegida (contenido editable en js/sintomas-por-especie.js).
// Lógica pura: toma el título, la descripción, la foto y el croquis de ESA especie, y el peso del cálculo
// de js/contenido.js (los ids son los mismos). Una foto o un croquis vacío se devuelve null ("pendiente"):
// nunca se usa una foto de otra especie.

import { imagen as vacio } from './rutas.js';

export function senalesDe(especie, SENALES, SINTOMAS) {
  const peso = Object.fromEntries(SINTOMAS.map(s => [s.id, s.peso]));
  const ninguno = SINTOMAS.find(s => s.id === 'ninguno');
  const cola = ninguno ? [{ id: 'ninguno', titulo: ninguno.label, descripcion: '', peso: 0, foto: null }] : [];
  const e = especie && SENALES[especie];
  if (!e) {
    return {
      croquis: null, croquisNota: '', sinFotos: false,
      senales: [...SINTOMAS.filter(s => s.id !== 'ninguno').map(s => ({ id: s.id, titulo: s.label, descripcion: '', peso: s.peso, foto: null })), ...cola],
    };
  }
  const sinFotos = !!e.sinFotos;
  return {
    croquis: vacio(e.croquis), croquisNota: e.croquisNota ?? '', sinFotos,
    senales: [...e.sintomas.filter(s => s.mostrar !== false).map(s => ({
      id: s.id, titulo: s.titulo, descripcion: s.descripcion ?? '', peso: peso[s.id] ?? 0,
      foto: sinFotos ? null : vacio((s.fotos ?? [])[0]),
    })), ...cola],
  };
}
