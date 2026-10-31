import assert from 'node:assert';
import { describe, it } from 'node:test';
import { detectar } from '../lib/dispositivo.js';

describe('dispositivo — detectar()', () => {
  it('ancho pequeño es celular', () => {
    assert.strictEqual(detectar(390, true), 'celular');
    assert.strictEqual(detectar(600, true), 'celular');
  });

  it('ancho medio es tablet', () => {
    assert.strictEqual(detectar(768, false), 'tablet');
    assert.strictEqual(detectar(820, false), 'tablet');
    assert.strictEqual(detectar(1024, false), 'tablet');
  });

  it('ancho grande es pc', () => {
    assert.strictEqual(detectar(1025, false), 'pc');
    assert.strictEqual(detectar(1180, false), 'pc');
    assert.strictEqual(detectar(1920, false), 'pc');
  });

  it('táctil no cambia el umbral de ancho', () => {
    assert.strictEqual(detectar(1180, true), 'pc');
    assert.strictEqual(detectar(390, false), 'celular');
  });
});
