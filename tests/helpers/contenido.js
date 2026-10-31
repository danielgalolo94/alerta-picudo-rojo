// Carga el contenido real (js/contenido.js y js/sintomas-por-especie.js) como lo hace el navegador,
// para que los tests prueben los datos que se publican y no una copia.
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const raiz = new URL('../../', import.meta.url);

export function cargarContenido() {
  const window = {};
  for (const f of ['js/contenido.js', 'js/sintomas-por-especie.js']) {
    runInNewContext(readFileSync(new URL(f, raiz), 'utf8'), { window, encodeURIComponent, URL });
  }
  return { C: window.APR_CONTENIDO, SENALES: window.APR_SENALES.SENALES };
}
