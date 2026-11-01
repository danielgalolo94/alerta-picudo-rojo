// Acciones de usuario: navegación del test, formulario, fotos, ubicación y reportes.

import { C, S, SENALES } from './data.js';
import { senalesDe } from '../../lib/senales.js';
import { state, update, resetTest, setForm, setJurisdiccion } from './store.js';
import { ir } from './router.js';
import { toast, scrollArriba } from './ui.js';
import { armarReporte, textoResultado } from './selectors.js';
import { evaluar } from '../../lib/evaluador.js';
import { validarFormulario } from '../../lib/validaciones.js';

function alternarSintoma(id) {
  if (id === 'ninguno') {
    update({ sintomas: state.sintomas.includes('ninguno') ? [] : ['ninguno'], vioAdulto: false });
    return;
  }
  const sinNinguno = state.sintomas.filter((x) => x !== 'ninguno');
  const sintomas = sinNinguno.includes(id) ? sinNinguno.filter((x) => x !== id) : [...sinNinguno, id];
  const conInsecto = C.AVISOS.senasa.sintomasQueDisparan.some((x) => sintomas.includes(x));
  update({ sintomas, vioAdulto: conInsecto && state.vioAdulto });
}

async function pedirUbicacion() {
  toast('Buscando tu ubicación…');
  try {
    const u = await S.ubicacionActual();
    update({ ubicacion: u, ubicacionError: '' });
    toast('Ubicación agregada');
  } catch (e) {
    update({ ubicacionError: e.message || 'No se pudo obtener la ubicación.' });
  }
}

async function compartirTexto(titulo, texto) {
  if (navigator.share) {
    try {
      await navigator.share({ title: titulo, text: texto });
      return;
    } catch (e) {
      if (e && e.name === 'AbortError') return;
    }
  }
  try {
    await navigator.clipboard.writeText(texto);
    toast('Texto copiado. Ya lo podés pegar donde quieras.');
  } catch (e) {
    update({ modal: { titulo, texto } });
  }
}

async function compartirReporte(rep) {
  if (!rep) return;
  const r = await S.compartirReporte(rep);
  if (r && r.ok) {
    toast(r.via === 'share' ? 'Reporte compartido' : 'Texto copiado');
  } else if (r && r.texto) {
    update({ modal: { titulo: 'Reporte ' + rep.codigo, texto: r.texto } });
  } else if (r && r.via === 'cancelado') {
    toast('No se compartió');
  } else {
    toast('No se pudo compartir en este navegador', 'error');
  }
}

async function borrarDatos() {
  if (!window.confirm('Se van a borrar todos los reportes y palmeras guardados en este teléfono. ¿Continuar?')) return;
  const ok = (await Promise.all([S.guardarReportes([]), S.guardarPalmeras([])])).every(Boolean);
  resetTest({ render: false });
  update({ reportes: [], palmeras: [], ultimo: null });
  toast(ok ? 'Datos borrados de este dispositivo' : 'No se pudo borrar lo guardado en este navegador', ok ? undefined : 'error');
}

async function enviarFormulario(ev) {
  ev.preventDefault();
  const errores = validarFormulario(state.form, state.ajustes, state.form.consent);
  if (errores.length) {
    update({ errores });
    const caja = document.querySelector('.errores');
    if (caja) caja.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const rep = armarReporte(state);
  // guardarReportes devuelve false (no lanza) si el navegador no deja guardar: se avisa y se muestra igual.
  const ok = await S.guardarReportes([rep, ...state.reportes]);
  // La próxima alerta empieza limpia: se conservan solo los datos de contacto.
  resetTest({ render: false });
  update({
    reportes: [rep, ...state.reportes], ultimo: rep, errores: [],
    form: { ...state.form, especie: '', comentarios: '', cantidad: '1', consent: false },
  }, { render: false });
  if (ok) toast('Reporte generado y guardado en este dispositivo');
  else toast('No se pudo guardar en este teléfono: compartilo ahora', 'error');
  ir('listo', rep.id);
}

/* ───────────────────────── Eventos ───────────────────────── */

function onClick(ev) {
  const objetivo = ev.target.closest('[data-action], [data-especie], [data-sintoma], [data-tab], [data-quitar-foto]');
  if (!objetivo) return;

  if (objetivo.dataset.especie) {
    const especie = objetivo.dataset.especie;
    const visibles = new Set(senalesDe(especie, SENALES, C.SINTOMAS).senales.map((s) => s.id));
    update({ especie, sintomas: state.sintomas.filter((id) => visibles.has(id)), form: { ...state.form, especie } });
    return;
  }

  if (objetivo.dataset.sintoma) {
    alternarSintoma(objetivo.dataset.sintoma);
    return;
  }

  if (objetivo.dataset.tab) {
    update({ tabSospecho: objetivo.dataset.tab });
    return;
  }

  if (objetivo.dataset.quitarFoto) {
    const fotos = { ...state.fotos };
    delete fotos[objetivo.dataset.quitarFoto];
    update({ fotos });
    return;
  }

  switch (objetivo.dataset.action) {
    case 'empezar-test':
      resetTest({ render: false });
      ir('test');
      break;

    case 'siguiente-paso':
      if (state.paso === 1 && !state.especie) return;
      if (state.paso === 2 && !state.sintomas.length) return;
      update({ paso: Math.min(3, state.paso + 1) });
      scrollArriba();
      break;

    case 'atras-paso':
      update({ paso: Math.max(1, state.paso - 1) });
      scrollArriba();
      break;

    case 'ver-resultado':
      update({ resultado: evaluar(state.sintomas, state.especie, C), paso: 4 });
      scrollArriba();
      break;

    case 'vio-adulto':
      update({ vioAdulto: !state.vioAdulto });
      break;

    case 'reiniciar-test':
      resetTest();
      scrollArriba();
      break;

    case 'ir-alerta':
      ir('alerta');
      break;

    case 'compartir-resultado':
      compartirTexto('Resultado del test · Alerta Picudo Rojo', textoResultado(state));
      break;

    case 'usar-ubicacion':
      pedirUbicacion();
      break;

    case 'quitar-ubicacion':
      update({ ubicacion: null, ubicacionError: '' });
      break;

    case 'compartir-reporte': {
      const rep = state.reportes.find((x) => x.id === objetivo.dataset.id) || state.ultimo;
      compartirReporte(rep);
      break;
    }

    case 'borrar-datos':
      borrarDatos();
      break;

    case 'cerrar-modal':
      update({ modal: null });
      break;

    case 'copiar-modal': {
      const t = document.getElementById('modal-texto');
      if (t) {
        navigator.clipboard.writeText(t.value)
          .then(() => toast('Texto copiado'))
          .catch(() => {
            t.select();
            document.execCommand('copy');
            toast('Texto copiado');
          });
      }
      break;
    }

    default:
      break;
  }
}

function onInput(ev) {
  const campo = ev.target.dataset.campo;
  if (!campo || campo === 'consent' || campo === 'jurisdiccion') return;
  setForm(campo, ev.target.value);
}

function onChange(ev) {
  const fotoInput = ev.target.closest('[data-foto]');
  if (fotoInput && fotoInput.files && fotoInput.files[0]) {
    const id = fotoInput.dataset.foto;
    S.comprimirImagen(fotoInput.files[0])
      .then((f) => {
        update({ fotos: { ...state.fotos, [id]: f } });
        toast('Foto agregada');
      })
      .catch((e) => toast(e.message || 'No se pudo leer la imagen', 'error'));
    return;
  }

  const campo = ev.target.dataset.campo;
  if (!campo) return;

  if (campo === 'consent') {
    setForm('consent', ev.target.checked);
    return;
  }

  if (campo === 'jurisdiccion') {
    setJurisdiccion(ev.target.value);
    return;
  }

  setForm(campo, ev.target.value);
}

function onSubmit(ev) {
  if (ev.target.id === 'form-alerta') enviarFormulario(ev);
}

export function conectarEventos() {
  document.addEventListener('click', onClick);
  document.addEventListener('input', onInput);
  document.addEventListener('change', onChange);
  document.addEventListener('submit', onSubmit);
}
