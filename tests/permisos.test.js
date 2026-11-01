import assert from 'node:assert';
import { test } from 'node:test';
import { leerPermisos } from '../lib/permisos.js';

const LISTA = [
  { id: 'ubicacion', api: 'geolocation' },
  { id: 'notificaciones', api: 'notifications' },
  { id: 'camara', api: null },
];

const falsa = (estados) => ({
  query: async ({ name }) => {
    if (estados[name] instanceof Error) throw estados[name];
    return { state: estados[name] };
  },
});

test('traduce los estados del navegador', async () => {
  const r = await leerPermisos(LISTA, falsa({ geolocation: 'granted', notifications: 'denied' }));
  assert.deepStrictEqual(r, { ubicacion: 'concedido', notificaciones: 'denegado', camara: 'no-aplica' });
});

test('"prompt" = todavía no se pidió', async () => {
  const r = await leerPermisos(LISTA, falsa({ geolocation: 'prompt', notifications: 'prompt' }));
  assert.strictEqual(r.ubicacion, 'sin-pedir');
  assert.strictEqual(r.notificaciones, 'sin-pedir');
});

test('navegador sin la API de permisos, o que falla en uno: no rompe', async () => {
  assert.deepStrictEqual(await leerPermisos(LISTA, undefined), { ubicacion: 'desconocido', notificaciones: 'desconocido', camara: 'no-aplica' });
  const r = await leerPermisos(LISTA, falsa({ geolocation: new TypeError('no soportado'), notifications: 'granted' }));
  assert.strictEqual(r.ubicacion, 'desconocido');
  assert.strictEqual(r.notificaciones, 'concedido');
});
