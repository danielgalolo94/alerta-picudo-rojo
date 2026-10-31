// Lógica pura de evaluación del nivel de alerta — Alerta Picudo Rojo.
// Los datos (especies, síntomas con su peso y SOLO_BASE) se editan en un solo lugar, js/contenido.js,
// y llegan como parámetro: acá no hay copia. Los pesos y cortes son estimaciones pendientes de validación técnica.

// Devuelve { total, nivel, razones, enlaces }.
// total: puntaje numérico (solo interno, no se muestra como diagnóstico).
// nivel: 'bajo' | 'moderado' | 'alto'.
// razones: array de { texto, peso, grado }.
// enlaces: array de ids de plagas relacionadas (ej. 'strategus', 'plagas').
export function evaluar(sintomasIds, especieId, { ESPECIES, SINTOMAS, SOLO_BASE }) {
  const sel = SINTOMAS.filter((s) => sintomasIds.includes(s.id) && s.peso > 0);
  const ids = sel.map((s) => s.id);
  const esp = ESPECIES.find((e) => e.id === especieId);
  let total = sel.reduce((a, s) => a + s.peso, 0);
  const razones = sel.map((s) => ({ texto: s.label, peso: '+' + s.peso, grado: s.peso >= 3 ? 'alto' : s.peso === 2 ? 'medio' : 'bajo' }));
  if (esp && esp.riesgo === 2 && total > 0) {
    total += 1;
    razones.push({ texto: esp.comun + ' es una especie considerada susceptible', peso: '+1', grado: 'medio' });
  }
  if (!razones.length) razones.push({ texto: 'No marcaste ninguno de los signos listados', peso: '0', grado: 'bajo' });
  let nivel = total === 0 ? 'bajo' : total <= 4 ? 'moderado' : 'alto';
  const enlaces = [];
  // Reglas directas: se aplican antes que la suma de puntajes.
  if (ids.includes('larvas') || ids.includes('cogollo')) {
    nivel = 'alto';
  } else if (ids.length && ids.every((id) => SOLO_BASE.includes(id))) {
    // Solo daño en la base del tronco: suele ser escarabajo rinoceronte.
    nivel = 'moderado';
    enlaces.push('strategus');
  } else if (ids.length === 1 && ids[0] === 'insectos') {
    // Un insecto solo no alcanza: puede ser otra especie.
    nivel = 'moderado';
    enlaces.push('plagas');
  }
  return { total, nivel, razones, enlaces };
}
