import assert from 'node:assert';
import { test } from 'node:test';
import { senasaPrimero, textoAviso } from '../lib/aviso.js';
import { cargarContenido } from './helpers/contenido.js';

const { C } = cargarContenido();
const A = C.AVISOS.senasa;

test('Senasa primero (con el contenido real): larvas o insectos + vio el adulto + nivel no bajo', () => {
  assert.strictEqual(senasaPrimero(A, { sintomas: ['insectos'], vioAdulto: true, nivel: 'moderado' }), true);
  assert.strictEqual(senasaPrimero(A, { sintomas: ['larvas', 'olor'], vioAdulto: true, nivel: 'alto' }), true);
  assert.strictEqual(senasaPrimero(A, { sintomas: ['insectos'], vioAdulto: false, nivel: 'alto' }), false);
  assert.strictEqual(senasaPrimero(A, { sintomas: ['olor'], vioAdulto: true, nivel: 'alto' }), false);
  assert.strictEqual(senasaPrimero(A, { sintomas: ['insectos'], vioAdulto: true, nivel: 'bajo' }), false);
});

test('la regla es parametrizable: síntomas que disparan, si pide el adulto y desde qué nivel', () => {
  const P = { ...A, sintomasQueDisparan: ['olor'], pideVerAdulto: false, nivelesPrimero: ['alto'] };
  assert.strictEqual(senasaPrimero(P, { sintomas: ['olor'], vioAdulto: false, nivel: 'alto' }), true);
  assert.strictEqual(senasaPrimero(P, { sintomas: ['olor'], vioAdulto: false, nivel: 'moderado' }), false);
  assert.strictEqual(senasaPrimero(P, { sintomas: ['larvas'], vioAdulto: true, nivel: 'alto' }), false);
});

test('texto del aviso: encabezado y cierre del contenido; datos de la revisión; lo que falta, para completar', () => {
  const t = textoAviso(C, { especie: 'canariensis', sintomas: ['olor', 'ninguno'], ubicacion: { lat: -34.604, lon: -58.382, precision: 100 }, jurNombre: 'CABA', nivel: 'alto', vioAdulto: true });
  assert.ok(t.startsWith(A.encabezado));
  assert.ok(t.endsWith(A.cierre));
  assert.match(t, /Especie: Palmera canaria \(Phoenix canariensis\)/);
  assert.match(t, /Signos observados: Olor anormal\n/);
  assert.match(t, /Nivel de alerta alto/);
  assert.match(t, /34\.60400° S, 58\.38200° O \(±100 m\)/);
  assert.ok(t.includes(A.lineaAdulto));
  const vacio = textoAviso(C, { especie: '', sintomas: [], ubicacion: null, jurNombre: '', nivel: 'bajo' });
  assert.match(vacio, /Especie: a identificar/);
  assert.match(vacio, /Provincia: \(completar\)/);
  assert.match(vacio, /Ubicación: \(completar/);
  assert.ok(!vacio.includes(A.lineaAdulto));
});
