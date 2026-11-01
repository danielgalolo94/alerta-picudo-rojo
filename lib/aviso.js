// Aviso al organismo oficial (Senasa) armado con la revisión en curso. Lógica pura.
// La regla y los textos vienen de C.AVISOS.senasa (js/contenido.js), así se ajustan sin tocar código.
import { gradosALegible } from './ubicacion.js';

// ¿El primer paso es el Senasa? Según los síntomas que disparan, si se pide haber visto el adulto y el nivel.
export function senasaPrimero(A, { sintomas, vioAdulto, nivel }) {
  return A.sintomasQueDisparan.some((id) => sintomas.includes(id))
    && (!A.pideVerAdulto || !!vioAdulto)
    && A.nivelesPrimero.includes(nivel);
}

export function textoAviso(C, { especie, sintomas, ubicacion, jurNombre, nivel, vioAdulto }) {
  const A = C.AVISOS.senasa;
  const esp = C.ESPECIES.find((e) => e.id === especie);
  const signos = C.SINTOMAS.filter((s) => sintomas.includes(s.id) && s.peso > 0).map((s) => s.label);
  const info = C.NIVELES[nivel] || C.NIVELES.bajo;
  return [
    A.encabezado,
    '',
    'Provincia: ' + (jurNombre || '(completar)'),
    'Especie: ' + (esp ? esp.comun + ' (' + esp.cientifico + ')' : 'a identificar'),
    'Signos observados: ' + (signos.length ? signos.join(', ') : '(completar)'),
    vioAdulto ? A.lineaAdulto : null,
    'Nivel de alerta según los signos observados: ' + info.titulo,
    ubicacion
      ? 'Ubicación aproximada: ' + gradosALegible(ubicacion.lat, ubicacion.lon) + ' (±' + ubicacion.precision + ' m)'
      : 'Ubicación: (completar dirección o referencia)',
    '',
    'Datos de contacto: (completar nombre y teléfono)',
    'Adjunto fotografías de la palmera.',
    '',
    A.cierre,
  ].filter((l) => l !== null).join('\n');
}
