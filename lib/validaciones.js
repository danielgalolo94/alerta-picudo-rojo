// Validaciones puras del formulario de alerta.
// Extraída de app.dc.js (validar()). Sin dependencias de DOM.

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validarEmail(email) {
  return EMAIL_REGEX.test(String(email || '').trim());
}

function validarFormulario(form, ajustes, consent) {
  const errores = [];
  if (!validarEmail(form.email)) {
    errores.push('Un email válido para poder responderte.');
  }
  if (!ajustes || !ajustes.jurisdiccion) {
    errores.push('La provincia: elegila en Inicio o en Más.');
  }
  const localidad = (form.municipio || (ajustes && ajustes.localidad) || '').trim();
  if (!localidad) {
    errores.push('El barrio, partido o localidad.');
  }
  if (!consent) {
    errores.push('La confirmación de que entendés el alcance del reporte.');
  }
  return errores;
}

export { validarEmail, validarFormulario };
