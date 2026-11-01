// Rutas de imágenes del contenido. Las imágenes viven en assets/images/; el contenido editable
// las escribe como "assets/x.webp". Vacío = null ("pendiente"). Lógica pura.
export function imagen(ruta) {
  return ruta ? ruta.replace(/^assets\/(?!images\/)/, 'assets/images/') : null;
}
