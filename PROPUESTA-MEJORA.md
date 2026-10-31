# PROPUESTA PARA Alerta Picudo Rojo — Dr. Árbol

**Fecha:** 31 de octubre de 2026  
**Preparado por:** Daniel Garrido — DG Soluciones IT  
**Proyecto:** Alerta Picudo Rojo (asistente ciudadano para detectar picudo rojo en palmeras)  
**Versión actual:** fuentes extraídas 26/10/2026 (sin versión publicada)

---

## Cabecera de servicios DG

Soporte técnico · Backups · Redes · Integración IA · M365 y Google Workspace

---

## ¿Qué proponemos?

Mejorar la aplicación "Alerta Picudo Rojo": una PWA (web instalable, sin tiendas de apps) que ayuda a cualquier persona a revisar su palmera en busca de signos de picudo rojo, registrar ejemplares, generar reportes y derivarlos al organismo correspondiente (Senasa / provincia).

La app ya funciona como asistente orientativo. La propuesta la lleva a un nivel de calidad profesional: código probado, diseño para celular y tablet/PC, y trazabilidad de cambios.

---

## Qué está bien hoy (no se tira nada)

| Punto | Estado |
|-------|--------|
| PWA instalable | ✅ Service worker, manifest, ícono Apple Touch, tema color |
| Funciona offline | ✅ Todo local: fotos, reportes y palmeras en el teléfono |
| Compresión de imágenes | ✅ Las fotos se reducen en el dispositivo antes de guardarse |
| Test guiado de 4 pasos | ✅ Especie → síntomas → fotos → resultado, con nivel de alerta |
| Diferencial de plagas | ✅ Compara picudo rojo vs picudo negro vs paysandisia vs vaquita vs strategus vs causas no bióticas |
| Canales de reporte | ✅ Email, WhatsApp, Senasa, endpoint configurable, cola con reintento |
| Recordatorios | ✅ Notificaciones para revisar palmeras cada 30 días |
| Escalas de texto y contraste | ✅ Accesibilidad básica |

---

## Qué hay que mejorar (propuesta de cambio)

| Área | Problema | Cómo se arregla |
|------|----------|-----------------|
| Arquitectura | Toda la lógica en `app.dc.js` (840+ líneas), sin separación | Extraer lógica pura a `lib/` (módulos uno por responsabilidad) |
| Tests | Cero tests. No hay evidencia de que nada funcione | TDD: tests con `node --test` para cada módulo de `lib/` |
| Diseño | Solo layout celular. No se ve bien en tablet ni PC | Dos layouts: celular (pestañas abajo) y tablet/PC (menú lateral, dos columnas) |
| Build | Archivos sueltos, sin bundler, sin minificación | Mantener archivos estáticos listos para GitHub Pages |
| Branding DG | Falta pie "Hecho por DG Soluciones IT" | Agregar pie en la app y en entregables |
| Privacidad | Sin texto de privacidad marcado "a revisar por un abogado" | Agregar aviso de privacidad y datos personales |
| Ledger | No hay `progress.md` ni lista de tareas | Crear y mantener `progress.md` con estado por etapa |

---

## Plan por etapas (con resultado)

| Etapa | Qué se hace | Resultado |
|-------|-------------|-----------|
| 0. Ideación | Posicionamiento y 3 diferenciales | App única: PWA gratuita, sin tiendas, todo local, diferencial de plagas |
| 1. Descubrir | Validar UX con usuarios reales | UX Discovery Doc aprobado |
| 2. Alcance | Este documento firmado | Alcance aprobado, decisiones tomadas |
| 3. Diseñar | Dos layouts, detección de dispositivo | CSS responsive probado en 390×844, 820×1180, 1180×820 |
| 4. Planificar | `progress.md`, tareas, archivos exactos | Plan con tests primero, nunca en `main` |
| 5. Construir | Refactor a `lib/`, tests TDD | Lógica pura probada, 36 tests verdes |
| 6. Analizar | Code review, suite completa | Evidencia de que todo corre |
| 7. Deploy | GitHub Pages desde `main` | URL en vivo, chequeo de humo |
| 8. Cierre | Resumen, vault actualizado | Próximo paso definido |

---

## Cómo trabajamos

- **TDD:** ningún código de producción sin un test que falló primero.
- **Evidencia:** no decimos que algo anda sin haber corrido el comando que lo prueba.
- **Datos sensibles:** no se copian DNI, mails ni teléfonos a entregables ni demos. La app guarda todo en el teléfono del usuario.
- **Nunca trabajamos en `main`:** cada tarea en su rama.
- **Preguntamos antes de:** deploy, merge, acciones destructivas, seguridad o gasto.

---

## Fuera de alcance

- Diagnóstico médico o fitosanitario oficial (la app es orientativa, no diagnostica).
- Backend propio: los reportes quedan en el teléfono o se envían por email/WhatsApp; no hay servidor de recepción configurado.
- Publicación en tiendas de app (Google Play / App Store): es PWA, se instala desde el navegador.
- Datos de terceros: no se copian a entregables ni demos.

---

## Decisiones que necesitamos de Dr. Árbol

- [ ] ¿Aprobar el alcance y el plan por etapas?
- [ ] ¿Agregar el pie "Hecho por DG Soluciones IT" en la app?
- [ ] ¿Validar el texto de privacidad con un abogado antes de publicar?
- [ ] ¿Autorizar deploy a GitHub Pages?
- [ ] ¿Endpoint de recepción de reportes (si se quiere servidor propio)?

---

## Contacto DG Soluciones IT

Teléfono / WhatsApp: +54 9 11 4536-7458  
Email: danielga@msn.com  
Instagram: @dgsolucionesok  
Hashtag: #DGSolucionesIT

---

**Pie:** Hecho por DG Soluciones IT
