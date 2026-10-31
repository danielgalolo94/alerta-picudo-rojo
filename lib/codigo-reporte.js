// Genera el código de reporte: AR-<jur>-<numero aleatorio 4 dígitos>.
// Lógica pura (la usa src/app/almacenamiento.js).

function codigoReporte(jurNombre) {
  const j = (jurNombre || 'AR').replace(/[^A-Za-zÁÉÍÓÚÑ]/g, '').slice(0, 3).toUpperCase();
  const n = Math.floor(1000 + Math.random() * 9000);
  return 'AR-' + j + '-' + n;
}

export { codigoReporte };
