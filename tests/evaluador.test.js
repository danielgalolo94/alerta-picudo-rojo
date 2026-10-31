import assert from 'node:assert';
import { describe, it } from 'node:test';
import { evaluar, especiePorId, sintomaPorId, nivelInfo, ESPECIES, SINTOMAS, NIVELES } from '../lib/evaluador.js';

describe('evaluador — evaluar()', () => {
  it('sin síntomas devuelve nivel bajo y total 0', () => {
    const r = evaluar([], 'canariensis');
    assert.strictEqual(r.total, 0);
    assert.strictEqual(r.nivel, 'bajo');
    assert.ok(r.razones.length >= 1);
  });

  it('un síntoma de peso leve da nivel moderado (especie susceptible suma +1)', () => {
    const r = evaluar(['caida'], 'canariensis');
    assert.strictEqual(r.total, 2); // 1 (caida) + 1 (especie susceptible)
    assert.strictEqual(r.nivel, 'moderado');
  });

  it('larvas o cogollo fuerzan nivel alto', () => {
    const r1 = evaluar(['larvas'], 'canariensis');
    assert.strictEqual(r1.nivel, 'alto');
    const r2 = evaluar(['cogollo'], 'canariensis');
    assert.strictEqual(r2.nivel, 'alto');
  });

  it('especie susceptible suma +1 y razón', () => {
    const r = evaluar(['orificios'], 'canariensis'); // canariensis riesgo 2
    assert.strictEqual(r.total, 4); // 3 + 1
    assert.ok(r.razones.some((z) => z.texto.includes('susceptible')));
  });

  it('especie no susceptible no suma +1', () => {
    const r = evaluar(['orificios'], 'pindo'); // pindo riesgo 1
    assert.strictEqual(r.total, 3);
    assert.ok(!r.razones.some((z) => z.texto.includes('susceptible')));
  });

  it('solo orificios y aserrín da nivel moderado y enlace strategus', () => {
    const r = evaluar(['orificios', 'aserrin'], 'canariensis');
    assert.strictEqual(r.nivel, 'moderado');
    assert.ok(r.enlaces.includes('strategus'));
  });

  it('un solo insecto da nivel moderado y enlace plagas', () => {
    const r = evaluar(['insectos'], 'canariensis');
    assert.strictEqual(r.nivel, 'moderado');
    assert.ok(r.enlaces.includes('plagas'));
  });

  it('varios síntomas de peso alto suman y dan nivel alto', () => {
    const r = evaluar(['orificios', 'aserrin', 'larvas'], 'canariensis');
    assert.strictEqual(r.nivel, 'alto');
  });

  it('razones tienen texto, peso y grado', () => {
    const r = evaluar(['orificios'], 'canariensis');
    const razon = r.razones.find((z) => z.texto === 'Orificios');
    assert.ok(razon);
    assert.strictEqual(razon.peso, '+3');
    assert.strictEqual(razon.grado, 'alto');
  });
});

describe('evaluador — especiePorId / sintomaPorId / nivelInfo', () => {
  it('especiePorId devuelve la especie correcta', () => {
    const esp = especiePorId('canariensis');
    assert.strictEqual(esp.comun, 'Palmera canaria');
    assert.strictEqual(esp.cientifico, 'Phoenix canariensis');
  });

  it('especiePorId devuelve null si no existe', () => {
    assert.strictEqual(especiePorId('inexistente'), null);
  });

  it('sintomaPorId devuelve el síntoma correcto', () => {
    const s = sintomaPorId('orificios');
    assert.strictEqual(s.label, 'Orificios');
    assert.strictEqual(s.peso, 3);
  });

  it('nivelInfo devuelve info de nivel', () => {
    const bajo = nivelInfo('bajo');
    assert.strictEqual(bajo.titulo, 'Nivel de alerta bajo');
    const alto = nivelInfo('alto');
    assert.strictEqual(alto.titulo, 'Nivel de alerta alto');
  });
});

describe('evaluador — constantes', () => {
  it('ESPECIES tiene 6 especies', () => {
    assert.strictEqual(ESPECIES.length, 6);
  });

  it('SINTOMAS tiene 14 síntomas', () => {
    assert.strictEqual(SINTOMAS.length, 14);
  });

  it('NIVELES tiene bajo, moderado, alto', () => {
    assert.ok(NIVELES.bajo);
    assert.ok(NIVELES.moderado);
    assert.ok(NIVELES.alto);
  });
});
