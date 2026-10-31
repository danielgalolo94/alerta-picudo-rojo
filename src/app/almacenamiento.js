import { codigoReporte } from '../../lib/codigo-reporte.js';
import { gradosALegible, aproximar } from '../../lib/ubicacion.js';

// Persistencia y APIs del dispositivo para Alerta Picudo Rojo.
// Funciona en cualquier navegador moderno y dentro de un WebView (Capacitor / Android) sin cambios.
// Lo que es lógica pura (código de reporte, coordenadas) viene de lib/, con sus tests.

const DB_NAME = 'alerta-picudo-rojo';
const DB_VER = 1;
const STORE = 'kv';
const AJUSTES_KEY = 'apr.ajustes.v1';

let dbPromise = null;

function abrir() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return reject(new Error('IndexedDB no disponible'));
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

async function leer(clave, porDefecto) {
  try {
    const db = await abrir();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(clave);
      req.onsuccess = () => resolve(req.result === undefined ? porDefecto : req.result);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    return porDefecto;
  }
}

async function escribir(clave, valor) {
  try {
    const db = await abrir();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(valor, clave);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    return true;
  } catch (e) {
    return false;
  }
}

/* ── Ajustes (livianos: van a localStorage para leerse de forma sincrónica) ── */

const AJUSTES_POR_DEFECTO = {
  jurisdiccion: '',
  escala: 'grande',
  contraste: false,
  permisos: { ubicacion: false, camara: false, notificaciones: false },
  consentimientoLegal: false,
};

function leerAjustes() {
  try {
    const raw = localStorage.getItem(AJUSTES_KEY);
    if (!raw) return { ...AJUSTES_POR_DEFECTO };
    const guardado = JSON.parse(raw);
    return { ...AJUSTES_POR_DEFECTO, ...guardado, permisos: { ...AJUSTES_POR_DEFECTO.permisos, ...(guardado.permisos || {}) } };
  } catch (e) {
    return { ...AJUSTES_POR_DEFECTO };
  }
}

function guardarAjustes(ajustes) {
  try {
    localStorage.setItem(AJUSTES_KEY, JSON.stringify(ajustes));
    return true;
  } catch (e) {
    return false;
  }
}

/* ── Palmeras y reportes (pesados: IndexedDB, incluyen fotos) ── */

const leerPalmeras = () => leer('palmeras', []);
const guardarPalmeras = (lista) => escribir('palmeras', lista);
const leerReportes = () => leer('reportes', []);
const guardarReportes = (lista) => escribir('reportes', lista);

function nuevoId(prefijo) {
  return prefijo + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/* ── Fotografías: compresión en el dispositivo ── */

function comprimirImagen(file, maxLado = 1280, calidad = 0.72) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type || file.type.indexOf('image/') !== 0) return reject(new Error('El archivo no es una imagen'));
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const escala = Math.min(1, maxLado / Math.max(img.width, img.height));
      const w = Math.round(img.width * escala);
      const h = Math.round(img.height * escala);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      const dataUrl = canvas.toDataURL('image/jpeg', calidad);
      resolve({
        dataUrl, ancho: w, alto: h,
        bytes: Math.round((dataUrl.length - 'data:image/jpeg;base64,'.length) * 0.75),
        original: file.size, nombre: file.name || 'foto.jpg', ts: Date.now(),
      });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('No se pudo leer la imagen')); };
    img.src = url;
  });
}

function pesoLegible(bytes) {
  if (!bytes) return '0 kB';
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' kB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/* ── Ubicación ── */

function ubicacionActual(opciones) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('Este dispositivo no informa ubicación.'));
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(aproximar({
        lat: pos.coords.latitude, lon: pos.coords.longitude,
        precision: Math.round(pos.coords.accuracy || 0), ts: pos.timestamp,
      })),
      (err) => {
        const msgs = {
          1: 'Permiso de ubicación denegado. Podés marcar el punto a mano.',
          2: 'No se pudo obtener la ubicación en este momento.',
          3: 'La ubicación tardó demasiado. Probá de nuevo.',
        };
        reject(new Error(msgs[err.code] || 'No se pudo obtener la ubicación.'));
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 60000, ...(opciones || {}) }
    );
  });
}

/* ── Compartir: siempre por acción de la persona (no hay envío automático a ningún servidor) ── */

function textoParaCompartir(reporte) {
  const lineas = [
    'ALERTA PICUDO ROJO — reporte ciudadano ' + reporte.codigo,
    'Fecha: ' + new Date(reporte.creado).toLocaleString('es-AR'),
    'Jurisdicción: ' + reporte.jurisdiccion + (reporte.municipio ? ' · ' + reporte.municipio : ''),
    'Especie: ' + (reporte.especie || 'a identificar'),
    'Cantidad de palmeras: ' + reporte.cantidad,
    'Nivel de alerta según signos observados: ' + reporte.nivel,
    'Signos: ' + (reporte.sintomas.length ? reporte.sintomas.join(', ') : 'ninguno marcado'),
    reporte.ubicacion ? 'Ubicación aproximada: ' + gradosALegible(reporte.ubicacion.lat, reporte.ubicacion.lon) + ' (±' + reporte.ubicacion.precision + ' m)' : 'Ubicación: no informada',
    'Contacto: ' + reporte.email + (reporte.telefono ? ' · ' + reporte.telefono : ''),
    reporte.comentarios ? 'Comentarios: ' + reporte.comentarios : '',
    reporte.fotos.length ? 'Fotos tomadas: ' + reporte.fotos.length + ' (si no llegaron adjuntas, las mando aparte)' : '',
    '',
    'Este reporte constituye una alerta u orientación ciudadana y no reemplaza una identificación o diagnóstico oficial.',
  ];
  return lineas.filter(Boolean).join('\n');
}

async function fotosComoArchivos(reporte) {
  try {
    return await Promise.all(reporte.fotos.map(async (f, i) => {
      const blob = await (await fetch(f.dataUrl)).blob();
      return new File([blob], reporte.codigo + '-' + (i + 1) + '.jpg', { type: blob.type || 'image/jpeg' });
    }));
  } catch (e) {
    return [];
  }
}

async function compartirReporte(reporte) {
  const texto = textoParaCompartir(reporte);
  if (navigator.share) {
    try {
      const datos = { title: 'Alerta Picudo Rojo ' + reporte.codigo, text: texto };
      // Las fotos viajan adjuntas cuando el teléfono lo permite (WhatsApp, mail desde el menú de compartir).
      const files = await fotosComoArchivos(reporte);
      if (files.length && navigator.canShare && navigator.canShare({ files })) datos.files = files;
      await navigator.share(datos);
      return { ok: true, via: 'share' };
    } catch (e) {
      if (e && e.name === 'AbortError') return { ok: false, via: 'cancelado' };
    }
  }
  try {
    await navigator.clipboard.writeText(texto);
    return { ok: true, via: 'portapapeles' };
  } catch (e) {
    return { ok: false, via: 'no-disponible', texto };
  }
}

export const S = { AJUSTES_POR_DEFECTO, leerAjustes, guardarAjustes, leerPalmeras, guardarPalmeras, leerReportes, guardarReportes, nuevoId, codigoReporte, comprimirImagen, pesoLegible, ubicacionActual, gradosALegible, textoParaCompartir, compartirReporte };
