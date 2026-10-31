import assert from 'node:assert';
import { describe, it } from 'node:test';
import { evaluar } from '../lib/evaluador.js';
import { cargarContenido } from './helpers/contenido.js';

const { C, SENALES } = cargarContenido();
const ev = (sintomas, especie) => evaluar(sintomas, especie, C);

describe('evaluador — evaluar() con el contenido real', () => {
  it('sin síntomas devuelve nivel bajo y total 0', () => {
    const r = ev([], 'canariensis');
    assert.strictEqual(r.total, 0);
    assert.strictEqual(r.nivel, 'bajo');
    assert.ok(r.razones.length >= 1);
  });

  it('un síntoma de peso leve da nivel moderado (especie susceptible suma +1)', () => {
    const r = ev(['caida'], 'canariensis');
    assert.strictEqual(r.total, 2); // 1 (caida) + 1 (especie susceptible)
    assert.strictEqual(r.nivel, 'moderado');
  });

  it('larvas o cogollo fuerzan nivel alto', () => {
    assert.strictEqual(ev(['larvas'], 'canariensis').nivel, 'alto');
    assert.strictEqual(ev(['cogollo'], 'pindo').nivel, 'alto');
  });

  it('especie susceptible suma +1 y razón', () => {
    const r = ev(['orificios'], 'canariensis'); // canariensis riesgo 2
    assert.strictEqual(r.total, 4); // 3 + 1
    assert.ok(r.razones.some((z) => z.texto.includes('susceptible')));
  });

  it('especie no susceptible no suma +1', () => {
    const r = ev(['orificios'], 'pindo'); // pindo riesgo 1
    assert.strictEqual(r.total, 3);
    assert.ok(!r.razones.some((z) => z.texto.includes('susceptible')));
  });

  it('solo orificios y aserrín da nivel moderado y enlace strategus', () => {
    const r = ev(['orificios', 'aserrin'], 'canariensis');
    assert.strictEqual(r.nivel, 'moderado');
    assert.ok(r.enlaces.includes('strategus'));
  });

  it('un solo insecto da nivel moderado y enlace plagas', () => {
    const r = ev(['insectos'], 'canariensis');
    assert.strictEqual(r.nivel, 'moderado');
    assert.ok(r.enlaces.includes('plagas'));
  });

  it('varios síntomas de peso alto suman y dan nivel alto', () => {
    assert.strictEqual(ev(['orificios', 'aserrin', 'larvas'], 'canariensis').nivel, 'alto');
  });

  it('"ninguno" no suma y deja el nivel bajo', () => {
    const r = ev(['ninguno'], 'canariensis');
    assert.strictEqual(r.total, 0);
    assert.strictEqual(r.nivel, 'bajo');
  });

  it('razones tienen texto, peso y grado', () => {
    const razon = ev(['orificios'], 'canariensis').razones.find((z) => z.texto === 'Orificios');
    assert.ok(razon);
    assert.strictEqual(razon.peso, '+3');
    assert.strictEqual(razon.grado, 'alto');
  });
});

describe('evaluador — usa los datos que recibe (una sola fuente: js/contenido.js)', () => {
  it('si el contenido cambia un peso, el cálculo lo sigue', () => {
    const C2 = { ...C, SINTOMAS: C.SINTOMAS.map((s) => (s.id === 'caida' ? { ...s, peso: 5 } : s)) };
    assert.strictEqual(evaluar(['caida'], 'pindo', C2).total, 5);
    assert.strictEqual(evaluar(['caida'], 'pindo', C2).nivel, 'alto');
  });
});

describe('contenido — integridad', () => {
  it('trae especies, síntomas con peso, niveles y SOLO_BASE', () => {
    assert.ok(C.ESPECIES.length >= 1);
    assert.ok(C.SINTOMAS.every((s) => s.id && s.label && Number.isFinite(s.peso)));
    for (const n of ['bajo', 'moderado', 'alto']) assert.ok(C.NIVELES[n]?.titulo);
    assert.ok(C.SOLO_BASE.every((id) => C.SINTOMAS.some((s) => s.id === id)));
  });

  it('cada señal por especie usa un id de síntoma que existe (si no, no suma en el cálculo)', () => {
    const ids = new Set(C.SINTOMAS.map((s) => s.id));
    for (const [esp, e] of Object.entries(SENALES)) {
      assert.ok(C.ESPECIES.some((x) => x.id === esp), `especie desconocida: ${esp}`);
      for (const s of e.sintomas) assert.ok(ids.has(s.id), `${esp}: señal sin síntoma "${s.id}"`);
    }
  });
});
