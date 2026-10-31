import assert from 'node:assert';
import { describe, it } from 'node:test';
import { codigoReporte } from '../lib/codigo-reporte.js';

describe('codigoReporte', () => {
  it('forma AR-<jur>-<numero> (3 letras de la jurisdicción)', () => {
    const c = codigoReporte('Buenos Aires');
    assert.match(c, /^AR-BUE-\d{4}$/);
  });

  it('jurisdicción vacía usa AR', () => {
    const c = codigoReporte('');
    assert.match(c, /^AR-AR-\d{4}$/);
  });

  it('jurisdicción con caracteres especiales los filtra a 3 letras', () => {
    const c = codigoReporte('Ciudad Autónoma de Buenos Aires');
    assert.match(c, /^AR-CIU-\d{4}$/);
  });

  it('devuelve strings distintos en llamadas sucesivas (aleatorio)', () => {
    const a = codigoReporte('CABA');
    const b = codigoReporte('CABA');
    assert.notStrictEqual(a, b);
  });
});
