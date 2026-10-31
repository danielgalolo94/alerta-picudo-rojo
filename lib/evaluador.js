// Lógica pura de evaluación de nivel de alerta — Alerta Picudo Rojo.
// Extraída de js/contenido.js. Sin dependencias de DOM ni de React.
// Los pesos y cortes son estimaciones pendientes de validación técnica.

const ESPECIES = [
  { id: 'canariensis', comun: 'Palmera canaria', cientifico: 'Phoenix canariensis', riesgo: 2 },
  { id: 'dactylifera', comun: 'Palmera datilera', cientifico: 'Phoenix dactylifera', riesgo: 2 },
  { id: 'pindo', comun: 'Pindó', cientifico: 'Syagrus romanzoffiana', riesgo: 1 },
  { id: 'butia', comun: 'Butiá o yatay', cientifico: 'Butia yatay', riesgo: 1 },
  { id: 'washingtonia', comun: 'Washingtonia', cientifico: 'Washingtonia spp.', riesgo: 1 },
  { id: 'nose', comun: 'No sé qué palmera tengo', cientifico: 'Se identifica con fotos', riesgo: 1 },
];

const SINTOMAS = [
  { id: 'centrales', label: 'Hojas centrales caídas', peso: 3 },
  { id: 'corona', label: 'Corona desordenada', peso: 2 },
  { id: 'mordidas', label: 'Hojas cortadas o mordidas', peso: 2 },
  { id: 'orificios', label: 'Orificios', peso: 3 },
  { id: 'fibras', label: 'Fibras dañadas', peso: 2 },
  { id: 'tejido', label: 'Restos de tejido', peso: 2 },
  { id: 'olor', label: 'Olor anormal', peso: 3 },
  { id: 'larvas', label: 'Presencia de larvas', peso: 4 },
  { id: 'insectos', label: 'Presencia de insectos', peso: 3 },
  { id: 'aserrin', label: 'Aserrín o residuos', peso: 3 },
  { id: 'caida', label: 'Caída anormal de hojas', peso: 1 },
  { id: 'base', label: 'Síntomas en base de hojas', peso: 2 },
  { id: 'cogollo', label: 'Daños en cogollo', peso: 4 },
  { id: 'ninguno', label: 'Ninguno de estos', peso: 0 },
];

const SOLO_BASE = ['orificios', 'aserrin'];

const GRADO_LABEL = { alto: 'señal de peso alto', medio: 'señal de peso medio', bajo: 'señal de peso leve' };

const ESCALA = [
  { id: 'bajo', label: 'Bajo', nota: 'sin señales relevantes' },
  { id: 'moderado', label: 'Moderado', nota: 'conviene observar' },
  { id: 'alto', label: 'Alto', nota: 'te recomendamos avisarnos' },
];

const NIVELES = {
  bajo: { titulo: 'Nivel de alerta bajo', resumen: 'No marcaste signos visibles. Esto no descarta el picudo rojo, que puede avanzar meses sin mostrarse. Volvé a revisar tu palmera en unas semanas.' },
  moderado: { titulo: 'Nivel de alerta moderado', resumen: 'Hay signos que ameritan una evaluación. No significa que la palmera tenga picudo rojo: varios problemas producen síntomas parecidos.' },
  alto: { titulo: 'Nivel de alerta alto', resumen: 'La combinación de signos que marcaste es compatible con actividad de un insecto perforador. Avisanos para que hagamos una preevaluación.' },
};

// Devuelve { total, nivel, razones, enlaces }.
// total: puntaje numérico (solo interno, no se muestra como diagnóstico).
// nivel: 'bajo' | 'moderado' | 'alto'.
// razones: array de { texto, peso, grado }.
// enlaces: array de ids de plagas relacionadas (ej. 'strategus', 'plagas').
function evaluar(sintomasIds, especieId) {
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

function especiePorId(id) {
  return ESPECIES.find((e) => e.id === id) || null;
}

function sintomaPorId(id) {
  return SINTOMAS.find((s) => s.id === id) || null;
}

function nivelInfo(nivel) {
  return NIVELES[nivel] || NIVELES.bajo;
}

export { evaluar, especiePorId, sintomaPorId, nivelInfo, ESPECIES, SINTOMAS, SOLO_BASE, GRADO_LABEL, ESCALA, NIVELES };
