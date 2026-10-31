// Puente puro: expone los módulos de lib/ en window.APP_PURE
// para que app.dc.js (script clásico) pueda usarlos sin ser un módulo ES.
// Todas las funciones son puras: sin DOM, sin React, sin estado.

import { evaluar, especiePorId, sintomaPorId, nivelInfo, ESPECIES, SINTOMAS, NIVELES, ESCALA, SOLO_BASE, GRADO_LABEL } from './evaluador.js';
import { codigoReporte } from './codigo-reporte.js';
import { gradosALegible } from './ubicacion.js';
import { validarEmail, validarFormulario } from './validaciones.js';
import { jurActual, textoParaSenasaPuro } from './contenido-puro.js';

window.APP_PURE = {
  evaluar,
  especiePorId,
  sintomaPorId,
  nivelInfo,
  ESPECIES,
  SINTOMAS,
  NIVELES,
  ESCALA,
  SOLO_BASE,
  GRADO_LABEL,
  codigoReporte,
  gradosALegible,
  validarEmail,
  validarFormulario,
  jurActual,
  textoParaSenasaPuro,
};
