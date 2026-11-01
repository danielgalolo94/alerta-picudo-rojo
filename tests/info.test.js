import assert from 'node:assert';
import { test } from 'node:test';
import { cargarContenido } from './helpers/contenido.js';
import { pantallaValida } from '../src/app/router.js';

const { C } = cargarContenido();

test('privacidad: no promete envíos ni estadísticas que la app no hace', () => {
  const textos = C.DATOS_PERSONALES.map((d) => d.uso).join(' ');
  assert.doesNotMatch(textos, /enviarse|se env[ií]a(n)? autom|agregada|an[oó]nima/i);
});

test('prevención: pasos con título y texto, y pide la evaluación con el motivo Prevención', () => {
  assert.ok(C.PREVENCION.pasos.length >= 3);
  for (const p of C.PREVENCION.pasos) assert.ok(p.titulo && p.texto, JSON.stringify(p));
  assert.ok(C.MOTIVOS.includes(C.PREVENCION.motivo));
});

test('institucional: dice qué hace Dr. Árbol y que la app es una donación de DG Soluciones IT', () => {
  assert.ok(C.INSTITUCIONAL.queHace.length > 0);
  assert.match(C.INSTITUCIONAL.donacion, /DG Soluciones IT/);
  assert.strictEqual(typeof C.INSTITUCIONAL.historia, 'string'); // vacío = la carga Dr. Árbol
});

test('términos: secciones con título y texto, incluida la de orientación (no diagnóstico)', () => {
  assert.ok(C.LEGAL.secciones.length >= 4);
  for (const s of C.LEGAL.secciones) assert.ok(s.titulo && s.texto, JSON.stringify(s));
  assert.ok(C.LEGAL.secciones.some((s) => /no reemplaza|no es un diagn[oó]stico/i.test(s.texto)));
  assert.match(C.LEGAL.actualizado, /^\d{2}\/\d{2}\/\d{4}$/);
});

test('permisos: ubicación y notificaciones con su nombre en el navegador; cámara sin permiso propio', () => {
  const porId = Object.fromEntries(C.PERMISOS.map((p) => [p.id, p]));
  assert.strictEqual(porId.ubicacion.api, 'geolocation');
  assert.strictEqual(porId.notificaciones.api, 'notifications');
  assert.strictEqual(porId.camara.api, null);
  for (const p of C.PERMISOS) assert.ok(p.nombre && p.para);
});

test('las pantallas nuevas son rutas válidas', () => {
  for (const p of ['prevencion', 'institucional', 'terminos']) assert.strictEqual(pantallaValida(p), p);
});
