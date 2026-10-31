import assert from 'node:assert';
import { describe, it } from 'node:test';
import { gradosALegible } from '../lib/ubicacion.js';

describe('gradosALegible', () => {
  it('coordenadas negativas (Argentina) con S y O', () => {
    const s = gradosALegible(-34.6037, -58.3816);
    assert.strictEqual(s, '34.60370° S, 58.38160° O');
  });

  it('coordenadas positivas con N y E', () => {
    const s = gradosALegible(40.7128, -74.006);
    assert.strictEqual(s, '40.71280° N, 74.00600° O');
  });

  it('cero da 0.00000', () => {
    const s = gradosALegible(0, 0);
    assert.strictEqual(s, '0.00000° N, 0.00000° E');
  });
});

import { aproximar } from '../lib/ubicacion.js';

describe('aproximar (privacidad: no guardar la casa exacta)', () => {
  it('redondea a 3 decimales (~100 m) y la precisión nunca baja de 100 m', () => {
    assert.deepStrictEqual(aproximar({ lat: -34.603712, lon: -58.381598, precision: 8, ts: 1 }), { lat: -34.604, lon: -58.382, precision: 100, ts: 1 });
  });
  it('si el GPS ya era impreciso, conserva esa precisión', () => {
    assert.strictEqual(aproximar({ lat: 1, lon: 2, precision: 450 }).precision, 450);
  });
});
