// Funciones puras que dependen de C (contenido.js) pero no de S (almacenamiento).
// Extraídas de src/app.dc.js. Sin DOM, sin React, sin efectos secundarios.

// Busca una jurisdicción por id en la lista de C.JURISDICCIONES.
function jurActual(jurisdicciones, id) {
  const vacia = { id: '', nombre: 'Sin elegir', largo: '' };
  if (!jurisdicciones) return vacia;
  return jurisdicciones.find((j) => j.id === id) || vacia;
}

// Arma el texto del aviso al Senasa/organismo a partir de datos puros.
// Recibe: C (contenido), especieId, sintomasIds, ubicacion, jurNombre, nivel, intro.
// Devuelve string con saltos de línea. No usa S.textoParaCompartir.
function textoParaSenasaPuro(C, especieId, sintomasIds, ubicacion, jurNombre, nivel, intro) {
  const esp = C.ESPECIES.find((e) => e.id === especieId);
  const signos = C.SINTOMAS.filter((s) => sintomasIds.includes(s.id)).map((s) => s.label);
  const nivelInfo = C.NIVELES[nivel] || C.NIVELES.bajo;
  const u = ubicacion;
  const lineas = [
    intro || 'Aviso de palmera con síntomas compatibles con picudo rojo.',
    '',
    'Provincia: ' + jurNombre,
    'Especie: ' + (esp ? esp.comun + ' (' + esp.cientifico + ')' : 'a identificar'),
    'Signos observados: ' + (signos.length ? signos.join(', ') : '(completar)'),
    'Nivel de alerta según los signos observados: ' + nivelInfo.titulo,
    u
      ? 'Ubicación aproximada: ' +
        Math.abs(u.lat).toFixed(5) +
        (u.lat < 0 ? '° S' : '° N') +
        ', ' +
        Math.abs(u.lon).toFixed(5) +
        (u.lon < 0 ? '° O' : '° E') +
        ' (±' + u.precision + ' m)'
      : 'Ubicación: (completar dirección o referencia)',
    '',
    'Datos de contacto: (completar nombre y teléfono)',
    'Adjunto fotografías de la palmera.',
    '',
    'Aviso generado con la app Alerta Picudo Rojo (iniciativa educativa de Dr. Árbol). Es una observación ciudadana, no un diagnóstico.',
  ];
  return lineas.join('\n');
}

export { jurActual, textoParaSenasaPuro };
