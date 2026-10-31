import assert from 'node:assert';
import { describe, it } from 'node:test';
import { validarEmail, validarFormulario } from '../lib/validaciones.js';

describe('validarEmail', () => {
  it('email válido', () => {
    assert.strictEqual(validarEmail('juan@perez.com'), true);
  });

  it('email sin @ es inválido', () => {
    assert.strictEqual(validarEmail('juanperez.com'), false);
  });

  it('email vacío es inválido', () => {
    assert.strictEqual(validarEmail(''), false);
  });

  it('email con espacios se trimea', () => {
    assert.strictEqual(validarEmail('  juan@perez.com  '), true);
  });
});

describe('validarFormulario', () => {
  const ajustes = { jurisdiccion: 'bsas', localidad: 'La Plata' };

  it('formulario completo y con consent no da errores', () => {
    const r = validarFormulario({ email: 'a@b.com', municipio: 'La Plata' }, ajustes, true);
    assert.deepStrictEqual(r, []);
  });

  it('email inválido da error', () => {
    const r = validarFormulario({ email: 'no-email', municipio: 'La Plata' }, ajustes, true);
    assert.ok(r.some((e) => e.includes('email')));
  });

  it('sin jurisdicción da error', () => {
    const r = validarFormulario({ email: 'a@b.com', municipio: 'La Plata' }, { jurisdiccion: '' }, true);
    assert.ok(r.some((e) => e.includes('provincia')));
  });

  it('sin localidad da error', () => {
    const r = validarFormulario({ email: 'a@b.com', municipio: '' }, { jurisdiccion: 'bsas', localidad: '' }, true);
    assert.ok(r.some((e) => e.includes('barrio')));
  });

  it('sin consent da error', () => {
    const r = validarFormulario({ email: 'a@b.com', municipio: 'La Plata' }, ajustes, false);
    assert.ok(r.some((e) => e.includes('confirmación')));
  });
});
