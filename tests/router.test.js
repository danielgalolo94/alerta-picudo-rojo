import assert from 'node:assert';
import { test } from 'node:test';
import { partirHash } from '../src/app/router.js';

test('hash normal: pantalla y parámetro decodificados', () => {
  assert.deepStrictEqual(partirHash('#/reporte/rep%20uno'), { pantalla: 'reporte', parametro: 'rep uno' });
  assert.deepStrictEqual(partirHash(''), { pantalla: 'inicio', parametro: null });
});

test('hash mal formado (link cortado) no rompe la app', () => {
  assert.deepStrictEqual(partirHash('#/reporte/%E0'), { pantalla: 'reporte', parametro: '%E0' });
});
