// Estado de los permisos del navegador, en palabras de la app. Lógica pura: recibe la lista
// (C.PERMISOS) y la API (navigator.permissions) por parámetro.
const ESTADOS = { granted: 'concedido', denied: 'denegado', prompt: 'sin-pedir' };

export async function leerPermisos(lista, api) {
  const r = {};
  for (const p of lista) {
    if (!p.api) { r[p.id] = 'no-aplica'; continue; }
    try {
      const { state } = await api.query({ name: p.api });
      r[p.id] = ESTADOS[state] || 'desconocido';
    } catch {
      r[p.id] = 'desconocido';
    }
  }
  return r;
}
