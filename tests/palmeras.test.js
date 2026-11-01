import assert from 'node:assert';
import { test } from 'node:test';
import { nuevaPalmera, sumarInspeccion, quitarPalmera, programarRecordatorio, recordatoriosVencidos, DIAS_RECORDATORIO } from '../lib/palmeras.js';

const insp = (fecha, nivel = 'bajo', sintomas = []) => ({ fecha, nivel, sintomas, fotos: [] });

test('alta de palmera: id correlativo que nunca choca con una palmera existente', () => {
  let lista = [];
  lista = nuevaPalmera(lista, { especie: 'Palmera canaria', jurisdiccion: 'CABA', apodo: 'La del frente' }, insp(1));
  lista = nuevaPalmera(lista, { especie: 'Pindó', jurisdiccion: 'CABA' }, insp(2));
  assert.deepStrictEqual(lista.map((p) => p.id), ['PALM-0002', 'PALM-0001']);
  assert.strictEqual(lista[1].apodo, 'La del frente');
  lista = quitarPalmera(lista, 'PALM-0001');
  lista = nuevaPalmera(lista, { especie: 'Butiá' }, insp(3));
  assert.deepStrictEqual(lista.map((p) => p.id), ['PALM-0003', 'PALM-0002']);
});

test('sumar inspección: queda primera (la más nueva arriba) y no toca las otras palmeras', () => {
  let lista = nuevaPalmera([], { especie: 'A' }, insp(1));
  lista = nuevaPalmera(lista, { especie: 'B' }, insp(2));
  const antes = lista[0];
  lista = sumarInspeccion(lista, 'PALM-0001', insp(9, 'alto', ['Olor anormal']));
  const p = lista.find((x) => x.id === 'PALM-0001');
  assert.deepStrictEqual(p.inspecciones.map((i) => i.fecha), [9, 1]);
  assert.strictEqual(lista.find((x) => x.id === 'PALM-0002'), antes);
});

test('recordatorio: a 30 días; volver a tocar lo cancela; vencidos se detectan por fecha', () => {
  let lista = nuevaPalmera([], { especie: 'A' }, insp(1));
  const ahora = 1_000_000;
  lista = programarRecordatorio(lista, 'PALM-0001', ahora);
  assert.strictEqual(lista[0].recordarEl, ahora + DIAS_RECORDATORIO * 86400000);
  assert.deepStrictEqual(recordatoriosVencidos(lista, ahora).map((p) => p.id), []);
  assert.deepStrictEqual(recordatoriosVencidos(lista, lista[0].recordarEl).map((p) => p.id), ['PALM-0001']);
  lista = programarRecordatorio(lista, 'PALM-0001', ahora);
  assert.strictEqual(lista[0].recordarEl, null);
});

test('una inspección nueva cumple el recordatorio pendiente', () => {
  let lista = programarRecordatorio(nuevaPalmera([], { especie: 'A' }, insp(1)), 'PALM-0001', 0);
  lista = sumarInspeccion(lista, 'PALM-0001', insp(5));
  assert.strictEqual(lista[0].recordarEl, null);
});
