# Alerta Picudo Rojo — constitución del proyecto

PWA estática (sin build) para que cualquier persona revise las señales del picudo rojo en su palmera y genere una alerta para Dr. Árbol o el Senasa. Orientación ciudadana, no diagnóstico. Hecho por DG Soluciones IT.

## Stack y comandos
- HTML + CSS + JavaScript (módulos ES), sin dependencias ni paso de build. Publicada en GitHub Pages desde `main` (raíz).
- Tests: `npm test` (node --test, Node 20+). Corren en GitHub Actions en cada push.
- Probar local: `python -m http.server 8770` en la raíz y abrir http://127.0.0.1:8770/

## Estructura
- `index.html` carga el contenido y después `src/app/main.js`.
- `js/contenido.js` y `js/sintomas-por-especie.js`: **contenido editable** (textos, especies, síntomas y pesos, señales y fotos por especie). Es la única fuente de esos datos.
- `src/app/`: la app, un archivo por tema (`store`, `router`, `actions`, `selectors`, `layout`, `ui`, `almacenamiento`) y una vista por pantalla en `views/`.
- `lib/`: lógica pura con tests (`evaluador`, `senales`, `validaciones`, `codigo-reporte`, `ubicacion`). Reciben los datos por parámetro; no copian el contenido.
- `sw.js`: modo sin conexión (red primero). Todo JS nuevo se suma a `ESQUELETO`; `tests/sw.test.js` avisa si falta.
- `assets/`: imágenes (`images/`), fuentes e íconos.

## Siempre
- Test que falla primero, después el código. `npm test` en verde antes de cada commit.
- Probar en el navegador en 390×844, 820×1180 y 1180×820, con la consola limpia.
- JS modular: un archivo por pantalla o tema; reutilizar lo que ya está en `lib/`.
- Una foto o croquis que falta se muestra como "pendiente": nunca la foto de otra especie.

## Preguntar antes
- Publicar (merge/push a `main`), cambiar pesos o cortes del cálculo, sumar dependencias o servicios externos.

## Nunca
- Subir claves o datos personales reales. Borrar un test que falla para "pasar".
- Presentar el resultado como diagnóstico: los pesos son estimaciones pendientes de validación técnica.
