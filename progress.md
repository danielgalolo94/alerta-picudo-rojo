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

**Pendientes menores de la revisión:** si en el formulario se cambia la especie, el nivel no se recalcula; los enlaces mailto muy largos pueden cortarse en algunos clientes; al redibujar se pierde el foco del campo que se está escribiendo.

## Pendiente — funciones del diseño original que la versión modular no trae (tanda 2)
El diseño viejo está en el historial (`git show 6335605:src/app.dc.js` y `src/body-renderizado.html`).
- [ ] "Vi un insecto adulto" → avisar primero al Senasa (email, WhatsApp, teléfono) desde el resultado.
- [ ] Enlaces del resultado a las fichas de plagas parecidas (`strategus`, `plagas`): hoy el cálculo los devuelve pero no hay pantalla.
- [ ] Diferencial de plagas y otras causas, con ficha comparativa (`PLAGAS`, `OTRAS_CAUSAS`).
- [ ] Ciclo del picudo (lámina huevo · larva · pupa · adulto) y recorrido "Reconocer el picudo en 5 minutos".
- [ ] Mi palmera: registrar ejemplares, historial de inspecciones y recordatorio a 30 días.
- [ ] Prevención ("Cómo proteger mi palmera") y pantalla institucional de Dr. Árbol.
- [ ] Privacidad: permisos (ubicación, cámara, notificaciones) y texto legal (a revisar por un abogado).
- [ ] Accesibilidad: tamaño de letra y alto contraste; búsqueda de localidad.
- [ ] Zoom de la foto de cada señal en el paso 2; reintentar o eliminar un reporte.

## Decisiones
- Pesos y cortes del nivel: estimaciones pendientes de validación técnica (no cambiar sin Dr. Árbol).
