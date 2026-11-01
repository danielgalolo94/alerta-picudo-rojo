import assert from 'node:assert';
import { test } from 'node:test';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { imagen } from '../lib/rutas.js';
import { cargarContenido } from './helpers/contenido.js';

test('"assets/x.webp" del contenido apunta a assets/images/x.webp; vacío = null', () => {
  assert.strictEqual(imagen('assets/etapa-huevo.webp'), 'assets/images/etapa-huevo.webp');
  assert.strictEqual(imagen('assets/images/ya.webp'), 'assets/images/ya.webp');
  assert.strictEqual(imagen(''), null);
  assert.strictEqual(imagen(undefined), null);
});

test('toda imagen nombrada en el contenido existe en el repo (si no, se vería rota)', () => {
  const { C, SENALES } = cargarContenido();
  const rutas = [
    ...C.ETAPAS.map((e) => e.imagen),
    ...C.PLAGAS.flatMap((p) => [p.miniatura, ...p.fotos.map((f) => f.img)]),
    ...Object.values(SENALES).flatMap((e) => [e.croquis, ...e.sintomas.flatMap((s) => s.fotos ?? [])]),
  ].map(imagen).filter(Boolean);
  const raiz = fileURLToPath(new URL('../', import.meta.url));
  const faltan = [...new Set(rutas)].filter((r) => !existsSync(raiz + r));
  assert.deepStrictEqual(faltan, []);
});
