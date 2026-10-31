// Formato de coordenadas a texto legible.
// Extraída de js/almacenamiento.js. Lógica pura.

function gradosALegible(lat, lon) {
  return (
    Math.abs(lat).toFixed(5) + (lat < 0 ? '° S' : '° N') +
    ', ' + Math.abs(lon).toFixed(5) + (lon < 0 ? '° O' : '° E')
  );
}

export { gradosALegible };
