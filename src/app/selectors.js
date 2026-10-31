// Selectores y armado de datos. Sin DOM: reciben el estado y devuelven datos.

import { C, S } from './data.js';

export function nivelKeyDeReporte(rep) {
  return rep && rep.nivelKey ? rep.nivelKey : 'sin-evaluar';
}

export function textoResultado(state) {
  const r = state.resultado;
  const info = (r && C.NIVELES[r.nivel]) || C.NIVELES.bajo;
  const esp = C.ESPECIES.find((e) => e.id === state.especie);
  const signos = C.SINTOMAS
    .filter((s) => state.sintomas.includes(s.id) && s.peso > 0)
    .map((s) => s.label);

  return [
    'ALERTA PICUDO ROJO — resultado orientativo del test',
    info.titulo,
    'Palmera: ' + (esp ? esp.comun + ' (' + esp.cientifico + ')' : 'sin identificar'),
    'Signos marcados: ' + (signos.length ? signos.join(', ') : 'ninguno'),
    '',
    info.resumen,
    '',
    'Hacé el test en la app: ' + location.origin + location.pathname,
    'Es una orientación ciudadana, no un diagnóstico.',
  ].join('\n');
}

export function armarReporte(state) {
  const jur = C.JURISDICCIONES.find((j) => j.id === state.ajustes.jurisdiccion);
  const esp = C.ESPECIES.find((e) => e.id === state.form.especie);
  const key = state.resultado ? state.resultado.nivel : 'sin-evaluar';
  const nivel = state.resultado
    ? (C.NIVELES[key] ? C.NIVELES[key].titulo : 'Nivel de alerta')
    : 'Sin evaluar (reporte directo)';
  const signos = C.SINTOMAS
    .filter((s) => state.sintomas.includes(s.id) && s.peso > 0)
    .map((s) => s.label);
  const fotos = C.TOMAS
    .filter((t) => state.fotos[t.id])
    .map((t) => ({ nombre: t.nombre, dataUrl: state.fotos[t.id].dataUrl }));

  return {
    id: S.nuevoId('rep'),
    codigo: S.codigoReporte(jur ? jur.nombre : ''),
    creado: Date.now(),
    jurisdiccion: jur ? (jur.largo || jur.nombre) : '',
    municipio: state.form.municipio.trim(),
    especie: esp ? esp.comun : '',
    especieId: esp ? esp.id : '',
    cantidad: Math.max(1, parseInt(state.form.cantidad, 10) || 1),
    motivo: state.form.motivo,
    nivelKey: key,
    nivel,
    sintomas: signos,
    fotos,
    ubicacion: state.ubicacion,
    email: state.form.email.trim(),
    nombre: state.form.nombre.trim(),
    telefono: state.form.telefono.trim(),
    comentarios: state.form.comentarios.trim(),
    enviado: false,
  };
}
