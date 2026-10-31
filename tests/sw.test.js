// El modo sin conexión precachea el "esqueleto" de la app: si se agrega un módulo y no se lista en sw.js,
// la app abre rota sin señal. Este test lo detecta.
import assert from 'node:assert';
import { test } from 'node:test';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('../', import.meta.url));
const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
const lista = JSON.parse(sw.match(/const ESQUELETO = (\[[\s\S]*?\]);/)[1].replace(/'/g, '"').replace(/,\s*\]/, ']'));
const js = (dir) => readdirSync(join(raiz, dir)).flatMap((f) => (statSync(join(raiz, dir, f)).isDirectory() ? js(`${dir}/${f}`) : f.endsWith('.js') ? [`${dir}/${f}`] : []));

test('cada archivo del esqueleto existe', () => {
  for (const f of lista) if (f !== './') assert.ok(existsSync(join(raiz, f)), `falta ${f}`);
});

test('el esqueleto incluye todo el JS de la app, el contenido y los estilos', () => {
  for (const f of [...js('src/app'), ...js('lib'), ...js('js'), 'index.html', 'app.css', 'manifest.webmanifest']) {
    assert.ok(lista.includes(f), `sw.js no precachea ${f}`);
  }
});
