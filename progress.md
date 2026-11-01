# Alerta Picudo Rojo — ledger

## 31/10/2026 — arreglo de la versión que dejó otra herramienta
**Estado previo (verificado):** el sitio publicado (commit b46b71f) abría en blanco: dependía de un runtime de diseño (`dc-runtime`) que no funciona fuera de su entorno (errores `DCLogic undefined` y `bad module specifier`). Las fuentes originales del 26/10 tampoco traían un `index.html` que anduviera solo. El ledger anterior marcaba todo "✔️" sin prueba en vivo.

**Base elegida:** la versión modular (`src/app`), que sí funciona: test, resultado, alerta con código AR-XXX-0000, reportes y modo sin conexión.

**Hecho (rama `arreglo/version-modular`):**
- Paso 2 del test: vuelve a mostrar las señales, fotos, descripciones y croquis **de cada especie** (la versión modular usaba fotos de otras especies). `lib/senales.js` + tests.
- Una sola fuente de datos: el cálculo (`lib/evaluador.js`) usa los datos de `js/contenido.js` (antes había dos copias que se iban a desfasar). Tests sobre el contenido real + chequeo de que cada señal por especie existe en el cálculo.
- `almacenamiento` pasó a módulo y reutiliza `lib/` (sin funciones duplicadas).
- Borrado el código muerto del runtime viejo (React, dc-runtime, shims, estilos y HTML sin uso).
- Modo sin conexión (`sw.js`) probado cortando la red; íconos PWA 192/512/maskable y favicon.
- Títulos: los acentos y la "¿" ya no se pisan; ícono de la pestaña Alertas.
- `AGENTS.md`, `LEEME.md`, GitHub Actions con `npm test`.
- Probado en 390×844, 820×1180 y 1180×820 sin scroll horizontal ni errores de consola.

**Revisión independiente (antes de publicar), corregido:**
- Borrar los datos con el test terminado colgaba la pantalla del test.
- La alerta siguiente heredaba fotos, síntomas, ubicación y consentimiento de la anterior.
- "Guardado" aunque el navegador no dejara guardar: ahora avisa.
- Un link con hash roto dejaba la app en blanco; un reporte inexistente mostraba otro.
- Ubicación: se guarda aproximada (~100 m), como dice la pantalla.
- Las fotos van adjuntas al compartir cuando el teléfono lo permite.
- Borrado el código de envío a un servidor que no se usaba (nada sale sin acción de la persona).
- Red lenta: después de 4 s se usa la copia guardada.

**Pendientes menores de la revisión:** ~~cambiar la especie en el formulario no recalcula el nivel~~ (resuelto 01/11); ~~al redibujar se pierde el foco~~ (resuelto 01/11); queda: los enlaces mailto muy largos pueden cortarse en algunos clientes.

## Pendiente — funciones del diseño original que la versión modular no trae (tanda 2)
El diseño viejo está en el historial (`git show 6335605:src/app.dc.js` y `src/body-renderizado.html`).
- [x] "Vi un insecto adulto" → avisar primero al Senasa (email, WhatsApp, teléfono) desde el resultado.
- [x] Enlaces del resultado a las fichas de plagas parecidas (`strategus`, `plagas`): hoy el cálculo los devuelve pero no hay pantalla.
- [x] Diferencial de plagas y otras causas, con ficha comparativa (`PLAGAS`, `OTRAS_CAUSAS`).
- [x] Ciclo del picudo (lámina huevo · larva · pupa · adulto) y recorrido "Reconocer el picudo en 5 minutos".
- [x] Mi palmera: registrar ejemplares, historial de inspecciones y recordatorio a 30 días.
- [ ] Prevención ("Cómo proteger mi palmera") y pantalla institucional de Dr. Árbol.
- [ ] Privacidad: permisos (ubicación, cámara, notificaciones) y texto legal (a revisar por un abogado).
- [x] Accesibilidad: tamaño de letra y alto contraste; búsqueda de localidad.
- [x] Zoom de la foto de cada señal en el paso 2; eliminar un reporte (reintentar no aplica: nada se envía a un servidor).

## Decisiones
- Pesos y cortes del nivel: estimaciones pendientes de validación técnica (no cambiar sin Dr. Árbol).

## 01/11/2026 — tanda 2, cierre de accesibilidad y reportes
- Más → Lectura: tamaño de texto (estándar, grande, muy grande) y alto contraste; se guardan en los ajustes. El tamaño por defecto pasa a "estándar".
- Paso 2: lupa sobre cada foto, que la abre grande. El foco va a "Cerrar" y vuelve a la lupa; también cierra con Escape. La lupa tiene un área táctil de 44 px.
- Reporte: "Eliminar este reporte del teléfono", con confirmación.
- Formulario: cambiar la especie recalcula el nivel (canaria 8 → washingtonia 7 con los mismos signos).
- Al redibujar se conservan el foco y el cursor del campo que se está escribiendo.
- Probado en el navegador en 390×844, 820×1180 y 1180×820: sin scroll horizontal y sin errores (quedan 2 avisos de Chrome por campos sin id/name, que no vienen de esta tanda).
- Sin test nuevo: son cambios de interfaz (DOM). La lógica que se reusa (`evaluar`) ya tiene tests.
