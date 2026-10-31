import { test } from 'node:test';
import assert from 'node:assert/strict';
import { senalesDe } from '../lib/senales.js';

const SINTOMAS = [
  { id: 'centrales', label: 'Hojas centrales caídas', peso: 3 },
  { id: 'orificios', label: 'Orificios', peso: 3 },
  { id: 'caida', label: 'Caída anormal de hojas', peso: 1 },
  { id: 'ninguno', label: 'Ninguno de estos', peso: 0 },
];
const SENALES = {
  canariensis: { comun: 'Palmera canaria', croquis: 'assets/partes-palmera.webp', sintomas: [
    { id: 'centrales', mostrar: true, titulo: 'Hojas centrales caídas', descripcion: 'Las del medio cuelgan.', fotos: ['assets/a.webp'] },
    { id: 'orificios', mostrar: false, titulo: 'Orificios', descripcion: 'x', fotos: [''] },
    { id: 'caida', mostrar: true, titulo: 'Caída de hojas', descripcion: 'Se caen.', fotos: [''] },
  ] },
  nose: { comun: 'No sé', croquis: 'assets/partes-palmera.webp', croquisNota: 'Ejemplo en una palmera canaria.', sinFotos: true, sintomas: [] },
  pindo: { comun: 'Pindó', croquis: '', sinFotos: true, sintomas: [
    { id: 'centrales', mostrar: true, titulo: 'Hojas centrales caídas', descripcion: 'd', fotos: ['assets/b.webp'] },
  ] },
};

test('señales de la especie: respeta mostrar, título y descripción propios, y el peso del cálculo', () => {
  const r = senalesDe('canariensis', SENALES, SINTOMAS);
  assert.deepEqual(r.senales.map(s => s.id), ['centrales', 'caida', 'ninguno'], 'oculta orificios y agrega "ninguno" al final');
  assert.deepEqual(r.senales[0], { id: 'centrales', titulo: 'Hojas centrales caídas', descripcion: 'Las del medio cuelgan.', peso: 3, foto: 'assets/images/a.webp' });
  assert.equal(r.senales[1].foto, null, 'foto vacía = pendiente, nunca una foto de otra especie');
  assert.equal(r.croquis, 'assets/images/partes-palmera.webp');
  assert.equal(r.sinFotos, false);
});

test('especie sin fotos: no muestra fotos aunque estén cargadas; croquis vacío = pendiente', () => {
  const r = senalesDe('pindo', SENALES, SINTOMAS);
  assert.equal(r.sinFotos, true);
  assert.equal(r.senales[0].foto, null);
  assert.equal(r.croquis, null);
});

test('sin especie elegida o desconocida: la lista general del test', () => {
  const r = senalesDe(null, SENALES, SINTOMAS);
  assert.deepEqual(r.senales.map(s => [s.id, s.titulo]), [['centrales', 'Hojas centrales caídas'], ['orificios', 'Orificios'], ['caida', 'Caída anormal de hojas'], ['ninguno', 'Ninguno de estos']]);
  assert.equal(r.croquis, null);
});

test('rutas: "assets/x.webp" del archivo de contenido apunta a assets/images/x.webp', () => {
  const r = senalesDe('canariensis', SENALES, SINTOMAS);
  assert.equal(r.croquis, 'assets/images/partes-palmera.webp');
  assert.equal(r.senales[0].foto, 'assets/images/a.webp');
  const s2 = { canariensis: { ...SENALES.canariensis, croquis: 'assets/images/ya-bien.webp' } };
  assert.equal(senalesDe('canariensis', s2, SINTOMAS).croquis, 'assets/images/ya-bien.webp', 'no duplica images/');
});

test('nota del croquis: se pasa cuando la especie la trae, si no queda vacía', () => {
  assert.equal(senalesDe('nose', SENALES, SINTOMAS).croquisNota, 'Ejemplo en una palmera canaria.');
  assert.equal(senalesDe('canariensis', SENALES, SINTOMAS).croquisNota, '');
});
