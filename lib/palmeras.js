// "Mi palmera": ejemplares registrados en el teléfono con su historial de inspecciones. Lógica pura e inmutable.

export const DIAS_RECORDATORIO = 30;

function siguienteId(lista) {
  const max = lista.reduce((m, p) => Math.max(m, Number(String(p.id).replace(/\D/g, '')) || 0), 0);
  return 'PALM-' + String(max + 1).padStart(4, '0');
}

export function nuevaPalmera(lista, { especie, jurisdiccion = '', apodo = '' }, inspeccion) {
  const palmera = {
    id: siguienteId(lista), especie: especie || 'Especie a identificar', jurisdiccion, apodo,
    creada: inspeccion.fecha, inspecciones: [inspeccion], recordarEl: null,
  };
  return [palmera, ...lista];
}

// La inspección nueva va primera y cumple el recordatorio pendiente.
export function sumarInspeccion(lista, id, inspeccion) {
  return lista.map((p) => (p.id === id ? { ...p, inspecciones: [inspeccion, ...p.inspecciones], recordarEl: null } : p));
}

export function quitarPalmera(lista, id) {
  return lista.filter((p) => p.id !== id);
}

// Activa el recordatorio a DIAS_RECORDATORIO días o, si ya había uno, lo cancela.
export function programarRecordatorio(lista, id, ahora) {
  return lista.map((p) => (p.id === id
    ? { ...p, recordarEl: p.recordarEl ? null : ahora + DIAS_RECORDATORIO * 86400000 }
    : p));
}

export function recordatoriosVencidos(lista, ahora) {
  return lista.filter((p) => p.recordarEl && p.recordarEl <= ahora);
}
