// Formato de coordenadas a texto legible.
// Lógica pura (la usa src/app/almacenamiento.js).

function gradosALegible(lat, lon) {
  return (
    Math.abs(lat).toFixed(5) + (lat < 0 ? '° S' : '° N') +
    ', ' + Math.abs(lon).toFixed(5) + (lon < 0 ? '° O' : '° E')
  );
}

// Ubicación aproximada (~100 m): alcanza para ubicar la palmera en la zona sin guardar la casa exacta.
function aproximar(u) {
  const r = (n) => Math.round(n * 1000) / 1000;
  return { ...u, lat: r(u.lat), lon: r(u.lon), precision: Math.max(100, Math.round(u.precision || 0)) };
}

export { gradosALegible, aproximar };
