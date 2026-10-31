# Alerta Picudo Rojo — Ledger de mejora (DG Software Factory)

## Estado del proyecto (inicio)
- PWA para detectar signos de picudo rojo en palmeras (iniciativa Dr. Árbol).
- Arquitectura: React 18 UMD + JS vanilla, sin bundler. Lógica toda en `app.dc.js` (840+ líneas).
- Persistencia: IndexedDB (palmeras, reportes, fotos) + localStorage (ajustes).
- Cero tests. Sin layout tablet/PC. Sin branding DG en la app.

## Etapa 4 — Planificar ✔️
- [x] Crear carpetas `lib/`, `tests/`, `public/`
- [x] Crear `progress.md`
- [x] Definir tareas chicas, archivos exactos e interfaces
- [ ] Revisar plan contra alcance y UX Discovery Doc (pendiente: validar con usuarios reales)

## Etapa 5 — Construir y probar ✔️ (suite completa verde: 36 tests, 8 suites, 0 fallos)
- [x] `lib/evaluador.js` — `evaluar()`, NIVELES, ESCALA, ESPECIES, SINTOMAS (de `contenido.js`)
- [x] `lib/codigo-reporte.js` — `codigoReporte()` (de `almacenamiento.js`)
- [x] `lib/ubicacion.js` — `gradosALegible()`
- [x] `lib/validaciones.js` — `validarEmail()`, `validarFormulario()` (de `app.dc.js`)
- [x] `lib/dispositivo.js` — `detectar(ancho, esTactil)`, `aplicarDispositivo()` (`data-device`, `?device=`)
- [x] `lib/puente-puro.js` — expone `window.APP_PURE` para que `app.dc.js` use los módulos puros
- [x] `public/index.html` — entry point público, rutas corregidas, carga puente antes de `app.dc.js`
- [x] `public/styles.css` — CSS base adaptado + reglas responsive (celular / tablet / PC)
- [x] Refactor `app.dc.js`: `evaluacion()`, `validar()`, `codigoReporte()`, `gradosALegible()`, `especiePorId()`, `nivelInfo()`, `SINTOMAS` ya consumen `window.APP_PURE`
- [x] Tests TDD con `node --test`: 36 tests verdes, evidencia corrida en este turno

## Etapa 3 — Diseñar ✔️ (esqueleto, pendiente validación visual en navegador)
- [x] Detección de dispositivo con `data-device` en `<html>` y `?device=` para forzar
- [x] Layout celular: una columna, inputs ≥16px (no zoom iOS), barra de pestañas abajo
- [x] Layout tablet/PC: menú lateral (260px), dos columnas, controles 48px
- [ ] Validar en 390×844, 820×1180, 1180×820 (pendiente: abrir navegador real)

## Etapa 2 — Alcance y propuesta ✔️
- [x] `PROPUESTA-MEJORA.md` con branding DG (cabecera, banda azul, tablas, decisiones con casillas, contacto)
- [x] Pie "Hecho por DG Soluciones IT" en `public/index.html`
- [ ] Decisiones que necesitamos del cliente (casillas en el documento, para firma)

## Etapa 7 — Deploy (listo para pushear, requiere cuenta GitHub conectada)
- [x] `public/` listo para GitHub Pages desde `main` (`.nojekyll` incluido)
- [ ] Pushear al repo y verificar sitio en vivo (requiere cuenta GitHub conectada a la sesión)
- [ ] Chequeo de humo con URL real

## Etapa 8 — Cierre (pendiente)
- [ ] Resumen corto: qué se entregó, dónde está, próximo paso
- [ ] Actualizar vault de Obsidian y copia local en `app/`

## Notas
- Lógica de dominio pendiente de validación técnica (pesos de síntomas, cortes de nivel). No publicar como criterio oficial.
- No hay endpoint de recepción configurado; los reportes quedan en cola local hasta que se configure.
- El HTML estático `src/body-renderizado.html` contiene blob: URLs rotas (referencia de Claude); no se usa en producción.
- `app.dc.js` aún depende de `C` y `S` (contenido/almacenamiento globales) para JURISDICCIONES, CONTACTO, SENASA, enlaceWhatsapp, enlaceEmail, textoParaCompartir. Pendiente: extraer esas dependencias en siguientes pasadas con validación en navegador.