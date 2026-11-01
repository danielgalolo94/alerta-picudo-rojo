// Modo sin conexión de Alerta Picudo Rojo.
// Red primero: con señal siempre se ve la última versión publicada; sin señal, la copia guardada.
// El esqueleto se guarda al instalar; las fotos y demás archivos, la primera vez que se abren.
// Si se agrega un archivo de la app, sumarlo a ESQUELETO (tests/sw.test.js avisa si falta).
const CACHE = 'apr-v2';
const ESQUELETO = [
  './',
  'index.html',
  'app.css',
  'manifest.webmanifest',
  'js/contenido.js',
  'js/sintomas-por-especie.js',
  'src/app/main.js',
  'src/app/actions.js',
  'src/app/almacenamiento.js',
  'src/app/data.js',
  'src/app/layout.js',
  'src/app/router.js',
  'src/app/selectors.js',
  'src/app/store.js',
  'src/app/ui.js',
  'src/app/views/alerta.js',
  'src/app/views/aprender.js',
  'src/app/views/inicio.js',
  'src/app/views/mas.js',
  'src/app/views/palmeras.js',
  'src/app/views/plagas.js',
  'src/app/views/reportes.js',
  'src/app/views/revision.js',
  'src/app/views/senasa.js',
  'src/app/views/sospecho.js',
  'lib/aviso.js',
  'lib/codigo-reporte.js',
  'lib/evaluador.js',
  'lib/palmeras.js',
  'lib/rutas.js',
  'lib/senales.js',
  'lib/ubicacion.js',
  'lib/validaciones.js',
  'assets/logo.webp',
  'assets/favicon.png',
  'assets/icon-192.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ESQUELETO)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // no-cache: revalida con el servidor (ETag), así una versión nueva llega en la próxima carga.
  const red = fetch(req.mode === 'navigate' ? req.url : req, { cache: 'no-cache' }).then((res) => {
    if (res.ok) { const copia = res.clone(); caches.open(CACHE).then((c) => c.put(req, copia)).catch(() => {}); }
    return res;
  });
  red.catch(() => {}); // si gana la copia y la red falla después, que no quede un error suelto
  const guardada = () => caches.match(req, { ignoreSearch: true })
    .then((r) => r || (req.mode === 'navigate' ? caches.match('index.html') : undefined));
  // Señal débil: si la red tarda más de 4 s y hay copia guardada, se usa la copia (la red igual actualiza la caché).
  const lenta = new Promise((ok) => setTimeout(ok, 4000)).then(guardada).then((r) => r || red);
  e.respondWith(
    Promise.race([red, lenta])
      .catch(() => guardada().then((r) => r || Response.error())),
  );
});
