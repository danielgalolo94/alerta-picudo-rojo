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
