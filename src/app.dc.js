
const V = { bg:'#f4f4f2', ink:'#1a1c1a', green:'#0f2e22', g700:'#2a4c39', g400:'#3f6450', g100:'#e9f0ea', surf:'#ecefe9', amber:'#8a5a12', amberDark:'#6b4610', amberBg:'#f6efe0', brick:'#8f2f21', brickBg:'#f6ece9' };
const HATCH = 'repeating-linear-gradient(45deg,rgba(26,28,26,.08) 0 1px,transparent 1px 8px)';

const ACCESOS = [
  { id:'aprender', titulo:'Aprender sobre el picudo rojo', sub:'Biblioteca, ciclo biológico, mitos', color:'#2a4c39', icono:'M4 5.5A1.5 1.5 0 015.5 4H10a2 2 0 012 2v14H4zM20 5.5A1.5 1.5 0 0018.5 4H14a2 2 0 00-2 2v14h8z' },
  { id:'sospecho', titulo:'¿Qué hago si sospecho?', sub:'Qué hacer y qué no hacer', color:'#8a5a12', icono:'M12 3l9 16H3zM12 9v5M12 16.5v.5' },
  { id:'alerta', titulo:'Enviar una alerta', sub:'Reportar una palmera sospechosa', color:'#2a4c39', icono:'M12 4a5 5 0 00-5 5c0 4-2 5-2 5h14s-2-1-2-5a5 5 0 00-5-5zM10 18a2 2 0 004 0' },
  { id:'drarbol', titulo:'Consultar a un profesional', sub:'Evaluación profesional y prevención', color:'#2a4c39', icono:'M12 3c3 2 4.5 4.5 4.5 7a4.5 4.5 0 11-9 0c0-2.5 1.5-5 4.5-7zM12 21v-7' },
];

const CANALES = [
  { id:'whatsapp', label:'Escribir por WhatsApp', clase:'btn btn-primary', icono:'M20.5 12a8.5 8.5 0 01-12.4 7.5L4 20.5l1.1-4A8.5 8.5 0 1120.5 12z' },
  { id:'email', label:'Enviar un email', clase:'btn btn-secondary', icono:'M3 5h18v14H3zM3 6l9 7 9-7' },
  { id:'llamada', label:'Llamar', clase:'btn btn-secondary', icono:'M5 4h4l2 5-3 2a10 10 0 005 5l2-3 5 2v4c-8 0-15-7-15-15z' },
  { id:'visita', label:'Solicitar una visita técnica', clase:'btn btn-secondary', icono:'M4 5h16v15H4zM4 10h16M9 3v4M15 3v4' },
];

// assets/etapa-huevo.webp → var(--i-etapa-huevo): la ruta vive en el CSS del
// helmet, que es lo que el empaquetador sabe incrustar.
function leerRecordatorios() {
  try { return JSON.parse(localStorage.getItem('apr_recordatorios') || '{}'); } catch (e) { return {}; }
}
function guardarRecordatorios(r) {
  try { localStorage.setItem('apr_recordatorios', JSON.stringify(r)); } catch (e) { /* sin almacenamiento */ }
}

function imagenVar(ruta) {
  return 'var(--i-' + ruta.replace('assets/', '').replace(/\.(jpg|png|webp)$/, '') + ')';
}

function abrir(url) {
  try { window.open(url, '_blank', 'noopener'); } catch (e) { window.location.href = url; }
}

const NAV = [
  { id:'home', label:'Inicio', icono:'M4 11l8-7 8 7v9H4z' },
  { id:'revisar', label:'Test', icono:'M11 4a7 7 0 107 7 7 7 0 00-7-7zm5.5 12.5L21 21' },
  { id:'aprender', label:'Aprender', icono:'M4 5.5A1.5 1.5 0 015.5 4H10a2 2 0 012 2v14H4zM20 5.5A1.5 1.5 0 0018.5 4H14a2 2 0 00-2 2v14h8z' },
  { id:'alerta', label:'Alertas', icono:'M12 4a5 5 0 00-5 5c0 4-2 5-2 5h14s-2-1-2-5a5 5 0 00-5-5zM10 18a2 2 0 004 0' },
  { id:'palmera', label:'Mi palmera', icono:'M12 21V10m0 0c0-3 2-5 5-5m-5 5c0-3-2-5-5-5' },
  { id:'mas', label:'Más', icono:'M5 12h.5M11.75 12h.5M18.5 12h.5' },
];

const TITULOS = {
  recorrido:['Reconocer el picudo','En 5 minutos'],
  revisarIntro:['Revisar mi palmera','Orientación ciudadana'],
  paso1:['Paso 1 de 4','Especie'], paso2:['Paso 2 de 4','Signos observados'],
  paso3:['Paso 3 de 4','Fotografías'], resultado:['Resultado','Nivel de alerta'],
  aprender:['Aprender','Biblioteca educativa'], articulo:['Aprender','Biblioteca educativa'],
  ciclo:['Ciclo del picudo','Huevo · larva · pupa · adulto'],
  plagas:['Diferencial','Otras plagas y causas'], plagaDetalle:['Ficha comparativa','Diferencial'],
  sospecho:['¿Qué hago si sospecho?','Guía de acción'],
  alerta:['Reportar una palmera sospechosa','Alerta ciudadana'], alertaEnviada:['Reporte generado','Alerta ciudadana'],
  pendientes:['Mis reportes','Cola de envío'],
  drarbol:['Consultar a Dr. Árbol','Asistencia profesional'],
  palmera:['Mi palmera','Ejemplares registrados'], palmeraDetalle:['Ejemplar','Historial de inspecciones'],
  mas:['Más','Ajustes y privacidad'],
  institucional:['Dr. Árbol',''],
  privacidad:['Privacidad','Datos y permisos'],
  legal:['Privacidad y términos','Texto legal'],
  sensores:['Sensores y monitoreo','Herramientas'],
  prevencion:['Cómo proteger mi palmera','Prevención'],
};

const TAB_DE = { home:'home', revisarIntro:'revisar', paso1:'revisar', paso2:'revisar', paso3:'revisar', resultado:'revisar',
  aprender:'aprender', articulo:'aprender', ciclo:'aprender', plagas:'aprender', plagaDetalle:'aprender', sensores:'aprender', sospecho:'aprender',
  alerta:'alerta', alertaEnviada:'alerta', pendientes:'alerta', drarbol:'mas', palmera:'palmera', palmeraDetalle:'palmera',
  mas:'mas', institucional:'mas', privacidad:'mas', legal:'mas', prevencion:'home', recorrido:'aprender' };

// Miniatura de cada síntoma del paso 2: fotos que ya usan las fichas de plagas.
const FOTO_SINTOMA = {
  centrales:'dano-corona-picudo', corona:'dano-corona-picudo', cogollo:'dano-corona-picudo', base:'dano-corona-picudo', fibras:'dano-corona-picudo',
  mordidas:'signos-tempranos-picudo', caida:'signos-avanzados-comparacion',
  orificios:'dano-estipe-picudo-negro', tejido:'dano-base-strategus', aserrin:'dano-base-strategus',
  larvas:'larva-picudo-rojo', insectos:'picudo-rojo-recorte',
};

const RECORRIDO = [
  { kicker:'1 de 4 · Qué es', titulo:'Un gorgojo que daña desde adentro', img:'picudo-rojo-adulto-uno', tam:'contain', ratio:'540 / 619',
    alt:'Adulto de picudo rojo visto desde arriba: cuerpo rojizo con manchas negras en el dorso, élitros oscuros acanalados y pico largo y curvo',
    puntos:['Es un insecto rojizo de 2 a 4 cm, con un pico curvo.', 'El daño lo hace la larva, que vive y come dentro de la palmera.', 'Por eso la palmera puede estar afectada meses antes de que se note algo desde afuera.'] },
  { kicker:'2 de 4 · Dónde mirar', titulo:'Tres zonas de la palmera', img:'partes-palmera', tam:'contain', ratio:'4 / 5',
    alt:'Palmera con sus partes señaladas',
    puntos:['La corona, el conjunto de hojas: si pierde su forma pareja.', 'Las hojas del centro, donde crece la palmera (cogollo): si se inclinan o se caen.', 'La base de las hojas, donde se unen al tronco: fibras deshilachadas, orificios y restos masticados.'] },
  { kicker:'3 de 4 · Signos', titulo:'Qué señales buscar', img:'signos-tempranos-picudo', tam:'cover', ratio:'3 / 2',
    alt:'Signos tempranos de picudo rojo en una palmera',
    puntos:['Hojas con muescas o cortes regulares.', 'Fibras deshilachadas, aserrín húmedo y olor a fermento.', 'Hojas centrales caídas: es un signo avanzado.', 'Un signo solo no confirma nada. Varios juntos justifican avisarnos.'] },
  { kicker:'4 de 4 · Qué no hacer', titulo:'Ante una duda, no intervengas', img:'', puntos:['No podes la palmera.', 'No trasladés hojas, restos ni ejemplares.', 'No apliques productos por tu cuenta.', 'No abras ni perfores el tronco para buscar larvas.'], no:true },
];

const SCREENS = ['recorrido','legal','home','revisarIntro','paso1','paso2','paso3','resultado','aprender','articulo','ciclo','plagas','plagaDetalle','sospecho','alerta','alertaEnviada','pendientes','drarbol','palmera','palmeraDetalle','mas','institucional','privacidad','sensores','prevencion'];

class Component extends DCLogic {
  state = {
    C:null, S:null, listo:false,
    screen:'home', stack:[],
    especie:null, sintomas:[], fotos:{}, errorFoto:'',
    articulo:'que', etapa:'larva', plaga:'rojo', tab:'hacer', laminaAbierta:false, especiesAbierta:false, comparativaAbierta:false,
    locAbierta:false, locBusqueda:'', vioAdulto:false, zoomSintoma:null, recPaso:0, recordatorios:leerRecordatorios(),
    ajustes:{ jurisdiccion:'', localidad:'', escala:'grande', contraste:false, permisos:{ ubicacion:false, camara:false, notificaciones:false, analitica:false }, endpoint:'' },
    palmeras:[], reportes:[], palmeraSel:null,
    form:{ email:'', nombre:'', telefono:'', municipio:'', comentarios:'', cantidad:'1' },
    ubicacion:null, errorUbicacion:'', consent:false, erroresForm:[],
    enviando:false, ultimo:null, avisoCompartir:'', avisoConsulta:'',
    motivo:'Sospecha', online:true, fallaCarga:'', labelBorrar:'Borrar todos mis datos de este teléfono',
    almacenamiento:'',
  };

  async componentDidMount() {
    this._online = () => this.setState({ online: navigator.onLine !== false });
    window.addEventListener('online', this._online);
    window.addEventListener('offline', this._online);
    try {
      const [C, S] = await this.esperarModulos();
      const ajustes = S.leerAjustes();
      const [palmeras, reportes] = await Promise.all([S.leerPalmeras(), S.leerReportes()]);
      this.setState({ C, S, listo:true, ajustes, palmeras, reportes, online: navigator.onLine !== false,
        almacenamiento: 'Datos guardados en este dispositivo: ' + palmeras.length + ' palmera(s), ' + reportes.length + ' reporte(s).' });
      this.revisarRecordatorios();
    } catch (e) {
      this.setState({ fallaCarga:'No se pudo cargar el contenido de la app: ' + e.message });
    }
  }

  // contenido.js y almacenamiento.js se cargan como scripts clásicos desde
  // <helmet>. Se esperan acá porque pueden no haber evaluado todavía.
  esperarModulos(intentos = 60) {
    return new Promise((resolve, reject) => {
      const mirar = (n) => {
        if (window.APR_CONTENIDO && window.APR_STORE) return resolve([window.APR_CONTENIDO, window.APR_STORE]);
        if (n <= 0) return reject(new Error('no se pudo cargar contenido.js / almacenamiento.js'));
        setTimeout(() => mirar(n - 1), 50);
      };
      mirar(intentos);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('online', this._online);
    window.removeEventListener('offline', this._online);
  }

  go = (s) => { this.setState(st => ({ screen:s, stack:[...st.stack, st.screen], avisoCompartir:'', avisoConsulta:'' })); window.scrollTo(0, 0); };
  back = () => { this.setState(st => { const q = st.stack.slice(); const prev = q.pop(); return { screen: prev || 'home', stack:q }; }); window.scrollTo(0, 0); };
  tabGo = (id) => { this.setState({ screen: id === 'revisar' ? 'revisarIntro' : id, stack: id === 'home' ? [] : ['home'], avisoCompartir:'' }); window.scrollTo(0, 0); };

  setAjuste = (parcial) => this.setState(st => {
    const ajustes = { ...st.ajustes, ...parcial };
    if (st.S) st.S.guardarAjustes(ajustes);
    return { ajustes };
  });

  togglePermiso = async (clave) => {
    const activo = !this.state.ajustes.permisos[clave];
    if (clave === 'ubicacion' && activo) {
      try { await this.state.S.ubicacionActual(); } catch (e) { this.setState({ errorUbicacion:e.message }); }
    }
    if (clave === 'notificaciones' && activo && 'Notification' in window) {
      try { await Notification.requestPermission(); } catch (e) { /* el usuario decide */ }
    }
    this.setAjuste({ permisos: { ...this.state.ajustes.permisos, [clave]: activo } });
  };

  // Imagen editable desde sintomas-por-especie.js. Usa la variable CSS del helmet
  // cuando existe (así se incrusta en el archivo compartido) y si no, la ruta.
  fondoRuta(ruta) {
    if (!ruta) return 'none';
    const nombre = ruta.replace(/^.*\//, '').replace(/\.\w+$/, '');
    return 'var(--i-' + nombre + ', url("' + ruta + '"))';
  }

  // Señales del paso 2 para la especie elegida (sintomas-por-especie.js).
  senales(especieId) {
    const B = window.APR_SENALES;
    const esp = B && B.SENALES[especieId || 'nose'];
    if (!esp) {
      const C = this.state.C;
      const lista = C ? C.SINTOMAS.filter(s => s.id !== 'ninguno').map(s => ({ id:s.id, titulo:s.label, descripcion:'' })) : [];
      return { esp:null, lista, sinFotos:true };
    }
    return { esp, lista: esp.sintomas.filter(s => s.mostrar !== false), sinFotos: !!esp.sinFotos };
  }

  toggleSintoma = (id) => this.setState(st => {
    if (id === 'ninguno') return { sintomas: st.sintomas.includes('ninguno') ? [] : ['ninguno'] };
    const base = st.sintomas.filter(x => x !== 'ninguno');
    return { sintomas: base.includes(id) ? base.filter(x => x !== id) : [...base, id] };
  });

  cargarFoto = async (tomaId, ev) => {
    const file = ev.target && ev.target.files && ev.target.files[0];
    if (!file || !this.state.S) return;
    this.setState({ errorFoto:'' });
    try {
      const foto = await this.state.S.comprimirImagen(file);
      this.setState(st => ({ fotos: { ...st.fotos, [tomaId]: foto } }));
      if (!this.state.ajustes.permisos.camara) this.setAjuste({ permisos: { ...this.state.ajustes.permisos, camara:true } });
    } catch (e) {
      this.setState({ errorFoto:'No se pudo procesar la imagen: ' + e.message });
    }
    if (ev.target) ev.target.value = '';
  };

  quitarFoto = (tomaId) => this.setState(st => { const f = { ...st.fotos }; delete f[tomaId]; return { fotos:f }; });

  pedirUbicacion = async () => {
    if (!this.state.S) return;
    this.setState({ errorUbicacion:'' });
    try {
      const u = await this.state.S.ubicacionActual();
      this.setState({ ubicacion:u });
      this.setAjuste({ permisos: { ...this.state.ajustes.permisos, ubicacion:true } });
    } catch (e) {
      this.setState({ errorUbicacion:e.message });
    }
  };

  evaluacion() {
    const { sintomas, especie } = this.state;
    if (!window.APP_PURE) return { total:0, nivel:'bajo', razones:[], enlaces:[] };
    return window.APP_PURE.evaluar(sintomas, especie);
  }

  jurActual() {
    const { C, ajustes } = this.state;
    if (!C || !window.APP_PURE) return { id:'', nombre:'Sin elegir', largo:'' };
    return window.APP_PURE.jurActual(C.JURISDICCIONES, ajustes.jurisdiccion);
  }

  // Avisa con una notificación cuando vence un recordatorio de revisión.
  revisarRecordatorios() {
    const r = { ...this.state.recordatorios };
    const ahora = Date.now();
    let cambio = false;
    Object.keys(r).forEach(id => {
      if (r[id] <= ahora) {
        try {
          if ('Notification' in window && Notification.permission === 'granted')
            new Notification('Alerta Picudo Rojo', { body:'Es momento de volver a revisar tu palmera ' + id + '.' });
        } catch (e) { /* el navegador no permite notificar desde acá */ }
        delete r[id]; cambio = true;
      }
    });
    if (cambio) { guardarRecordatorios(r); this.setState({ recordatorios:r }); }
  }

  programarRecordatorio = async () => {
    const id = this.state.palmeraSel || (this.state.palmeras[0] || {}).id;
    if (!id) return;
    const r = { ...this.state.recordatorios };
    if (r[id]) { delete r[id]; }
    else {
      if ('Notification' in window && Notification.permission === 'default') {
        try { await Notification.requestPermission(); } catch (e) { /* el usuario decide */ }
      }
      if ('Notification' in window && Notification.permission === 'granted')
        this.setAjuste({ permisos:{ ...this.state.ajustes.permisos, notificaciones:true } });
      r[id] = Date.now() + 30 * 24 * 3600 * 1000;
    }
    guardarRecordatorios(r);
    this.setState({ recordatorios:r });
  };

  fotosArray() {
    const { C, fotos } = this.state;
    if (!C) return [];
    return C.TOMAS.filter(t => fotos[t.id]).map(t => ({ toma:t.id, nombre:t.nombre, ...fotos[t.id] }));
  }

  registrarPalmera = async () => {
    const { C, S, especie, sintomas } = this.state;
    if (!S) return;
    const ev = this.evaluacion();
    const esp = window.APP_PURE.especiePorId(especie);
    const jur = this.jurActual();
    const inspeccion = {
      fecha: Date.now(), nivel: window.APP_PURE.nivelInfo(ev.nivel).titulo, puntaje: ev.total,
      sintomas: window.APP_PURE.SINTOMAS.filter(s => sintomas.includes(s.id)).map(s => s.label),
      fotos: this.fotosArray(), ubicacion: this.state.ubicacion,
    };
    const palmera = {
      id: 'PALM-' + String(this.state.palmeras.length + 1).padStart(4, '0'),
      especie: esp ? esp.comun : 'Especie a identificar',
      cientifico: esp ? esp.cientifico : '',
      jurisdiccion: jur.nombre, creada: Date.now(), inspecciones: [inspeccion],
    };
    const palmeras = [palmera, ...this.state.palmeras];
    await S.guardarPalmeras(palmeras);
    this.setState({ palmeras, palmeraSel:palmera.id, almacenamiento:'Datos guardados en este dispositivo: ' + palmeras.length + ' palmera(s), ' + this.state.reportes.length + ' reporte(s).' });
    this.setState({ screen:'palmeraDetalle', stack:['home','palmera'] });
    window.scrollTo(0, 0);
  };

  eliminarPalmera = async () => {
    const { S, palmeras, palmeraSel } = this.state;
    const lista = palmeras.filter(p => p.id !== palmeraSel);
    await S.guardarPalmeras(lista);
    this.setState({ palmeras:lista, screen:'palmera', stack:['home'] });
  };

  validar() {
    const { form, consent, ajustes } = this.state;
    if (!window.APP_PURE) return [];
    return window.APP_PURE.validarFormulario(form, ajustes, consent);
  }

  enviarAlerta = async () => {
    const errores = this.validar();
    if (errores.length) { this.setState({ erroresForm:errores }); return; }
    const { C, S, form, ajustes, sintomas, especie } = this.state;
    const ev = this.evaluacion();
    const jur = this.jurActual();
    const esp = window.APP_PURE.especiePorId(especie);
    const reporte = {
      id: S.nuevoId('rep'), codigo: window.APP_PURE.codigoReporte(jur.nombre), creado: Date.now(),
      email: form.email, nombre: form.nombre, telefono: form.telefono,
      jurisdiccion: jur.nombre, municipio: form.municipio || this.state.ajustes.localidad, cantidad: form.cantidad,
      especie: esp ? esp.comun : '', nivel: window.APP_PURE.nivelInfo(ev.nivel).titulo, puntaje: ev.total,
      sintomas: window.APP_PURE.SINTOMAS.filter(s => sintomas.includes(s.id)).map(s => s.label),
      comentarios: form.comentarios, ubicacion: this.state.ubicacion,
      fotos: this.fotosArray(), estado: 'pendiente',
    };
    this.setState({ enviando:true, erroresForm:[] });
    const res = await S.enviarReporte(reporte, ajustes.endpoint);
    reporte.estado = res.ok ? 'enviado' : (ajustes.endpoint ? 'pendiente' : 'en-el-telefono');
    reporte.motivo = res.motivo || '';
    const reportes = [reporte, ...this.state.reportes];
    await S.guardarReportes(reportes);
    this.setState({ reportes, ultimo:reporte, enviando:false, screen:'alertaEnviada', stack:['home'],
      almacenamiento:'Datos guardados en este dispositivo: ' + this.state.palmeras.length + ' palmera(s), ' + reportes.length + ' reporte(s).' });
    window.scrollTo(0, 0);
  };

  reintentar = async (id) => {
    const { S, ajustes } = this.state;
    const reportes = this.state.reportes.slice();
    const i = reportes.findIndex(r => r.id === id);
    if (i < 0) return;
    const res = await S.enviarReporte(reportes[i], ajustes.endpoint);
    reportes[i] = { ...reportes[i], estado: res.ok ? 'enviado' : (ajustes.endpoint ? 'pendiente' : 'en-el-telefono'), motivo: res.motivo || '' };
    await S.guardarReportes(reportes);
    this.setState({ reportes, avisoCompartir: res.ok ? 'Reporte enviado.' : (ajustes.endpoint ? 'No se pudo enviar todavía. Queda en cola.' : 'No hay endpoint configurado: el reporte queda en el teléfono. Podés compartirlo.') });
  };

  abrirCanal = (id) => {
    const { C, motivo } = this.state;
    if (!C) return;
    const jur = this.jurActual();
    const contexto = 'Motivo: ' + motivo + '. Provincia: ' + jur.nombre + '.';
    if (id === 'whatsapp') {
      abrir(C.enlaceWhatsapp('Hola, escribo desde la app Alerta Picudo Rojo. ' + contexto));
    } else if (id === 'visita') {
      abrir(C.enlaceWhatsapp('Hola, quiero solicitar una visita técnica para evaluar palmeras. ' + contexto));
    } else if (id === 'email') {
      abrir(C.enlaceEmail('Consulta desde la app — ' + motivo,
        'Hola,\n\n' + contexto + '\n\nCuento mi situación:\n\n\n(Adjunto las fotografías de la palmera.)\n'));
    } else if (id === 'llamada') {
      abrir('tel:' + C.CONTACTO.telefono);
    }
    this.setState({ avisoConsulta:'' });
  };

  // Aviso al organismo oficial. Si hay un reporte, viaja con todos sus datos;
  // si no, se arma con lo que haya en la revisión en curso.
  textoParaSenasa(intro) {
    const { C, S, ultimo, especie, sintomas, ubicacion } = this.state;
    if (ultimo) return S.textoParaCompartir(ultimo);
    if (!C || !window.APP_PURE) return '';
    const jur = this.jurActual();
    const ev = this.evaluacion();
    return window.APP_PURE.textoParaSenasaPuro(
      C, especie, sintomas, ubicacion, jur.nombre, ev.nivel, intro
    );
  }

  // Primer paso del flujo: el aviso llega a la iniciativa para preevaluación.
  compartirApp = () => {
    const { C } = this.state;
    if (!C) return;
    abrir(C.enlaceCompartirApp());
    if (!C.APP.url) this.setState({ avisoCompartir:'La app todavía no está publicada, así que el mensaje va sin el enlace. Cuando esté en Google Play se agrega solo.' });
  };

  avisarnos = () => {
    const { C } = this.state;
    if (!C) return;
    abrir(C.enlaceWhatsapp('Hola, quiero que revisen una palmera con signos sospechosos.\n\n' +
      this.textoParaSenasa('Solicito una preevaluación.') + '\n\nAdjunto las fotografías.'));
    this.setState({ avisoCompartir:'Se abrió WhatsApp con los datos de tu revisión. Adjuntá las fotos antes de enviarlo.' });
  };

  avisarSenasa = (canal) => {
    const { C } = this.state;
    if (!C) return;
    const jur = this.jurActual();
    if (canal === 'email') {
      abrir(C.enlaceSenasaEmail('Aviso de posible picudo rojo — ' + jur.nombre, this.textoParaSenasa()));
      this.setState({ avisoCompartir:'Se abrió tu email con el aviso al Senasa. Adjuntá las fotos y completá lo que falte antes de enviar.' });
    } else if (canal === 'whatsapp') {
      abrir(C.enlaceSenasaWhatsapp(this.textoParaSenasa()));
    } else if (canal === 'telefono') {
      abrir('tel:' + C.SENASA.telefono);
    } else if (canal === 'gratuito') {
      abrir('tel:' + C.SENASA.gratuito);
    } else if (canal === 'sitio') {
      abrir(C.SENASA.sitio);
    }
  };

  enviarPorEmail = (reporte) => {
    const { C, S } = this.state;
    if (!C || !S) return;
    abrir(C.enlaceEmail('Alerta ciudadana ' + reporte.codigo, S.textoParaCompartir(reporte) +
      '\n\n(Adjuntá las fotografías desde la galería antes de enviar.)\n'));
    this.setState({ avisoCompartir:'Se abrió tu aplicación de email con el reporte cargado. Adjuntá las fotos antes de enviarlo.' });
  };

  compartir = async (reporte) => {
    const res = await this.state.S.compartirReporte(reporte);
    const msg = res.ok
      ? (res.via === 'portapapeles' ? 'Reporte copiado al portapapeles.' : 'Reporte compartido.')
      : (res.via === 'cancelado' ? '' : 'Este navegador no permite compartir. El texto del reporte está en la cola.');
    this.setState({ avisoCompartir:msg });
  };

  eliminarReporte = async (id) => {
    const reportes = this.state.reportes.filter(r => r.id !== id);
    await this.state.S.guardarReportes(reportes);
    this.setState({ reportes });
  };

  borrarTodo = async () => {
    if (this.state.labelBorrar.indexOf('Confirmar') === 0) {
      await this.state.S.guardarPalmeras([]);
      await this.state.S.guardarReportes([]);
      this.state.S.guardarAjustes(this.state.S.AJUSTES_POR_DEFECTO);
      this.setState({ palmeras:[], reportes:[], ajustes:{ ...this.state.S.AJUSTES_POR_DEFECTO },
        fotos:{}, sintomas:[], especie:null, ubicacion:null, consent:false, ultimo:null,
        labelBorrar:'Datos borrados', almacenamiento:'Datos guardados en este dispositivo: 0 palmera(s), 0 reporte(s).' });
      setTimeout(() => this.setState({ labelBorrar:'Borrar todos mis datos de este teléfono' }), 2500);
    } else {
      this.setState({ labelBorrar:'Confirmar: borrar todo' });
      setTimeout(() => this.setState(st => st.labelBorrar.indexOf('Confirmar') === 0 ? { labelBorrar:'Borrar todos mis datos de este teléfono' } : {}), 4000);
    }
  };

  renderVals() {
    const st = this.state;
    const C = st.C;
    const scr = st.screen;
    const show = { header: scr !== 'home' };
    SCREENS.forEach(k => { show[k] = scr === k; });
    const t = TITULOS[scr] || ['', ''];
    const jur = this.jurActual();

    const sel = (on, dark) => on
      ? { bg: dark ? V.green : V.g100, bc: V.green, fg: dark ? V.bg : V.green }
      : { bg:'transparent', bc:'rgba(26,28,26,.2)', fg: V.ink };

    const ev = this.evaluacion();
    const marcoAdulto = st.sintomas.includes('larvas') || st.sintomas.includes('insectos');
    const senasaPrimero = marcoAdulto && st.vioAdulto && ev.nivel !== 'bajo';
    const nivelBase = C ? C.NIVELES[ev.nivel] : { titulo:'', resumen:'' };
    const nivelColor = { bajo:{ bg:V.surf, fg:V.g700 }, moderado:{ bg:V.amber, fg:'#f8f1e6' }, alto:{ bg:V.brick, fg:'#f8efed' } }[ev.nivel];
    const fotosCargadas = this.fotosArray();
    const pendientes = st.reportes.filter(r => r.estado !== 'enviado');

    const base = {
      show, titulo:t[0], subtitulo:t[1], jurNombre:jur.nombre,
      back:this.back, goHome:() => this.tabGo('home'), goAjustes:() => this.go('mas'),
      goRevisar:() => this.go('revisarIntro'), goPaso1:() => this.go('paso1'), goPaso2:() => this.go('paso2'),
      goPaso3:() => this.go('paso3'), goResultado:() => this.go('resultado'),
      goCiclo:() => this.go('ciclo'), goPlagas:() => this.go('plagas'),
      goSospecho:() => this.go('sospecho'), goAlerta:() => this.go('alerta'), goDrArbol:() => this.go('drarbol'),
      goPendientes:() => this.go('pendientes'),
      goPrevencion:() => this.go('prevencion'),
      prevSolicitar:() => { this.setState({ motivo:'Prevención' }); this.go('drarbol'); },
      prevDenunciar:() => this.avisarSenasa('sitio'),
      zoom: st.ajustes.escala === 'estandar' ? 1 : st.ajustes.escala === 'grande' ? 1.1 : 1.22,
      filtro: st.ajustes.contraste ? 'contrast(1.18) saturate(.92)' : 'none',
      sinConexion: !st.online,
      accesosHome: ACCESOS.map(a => ({ ...a, onClick:() => this.go(a.id === 'aprender' ? 'aprender' : a.id) })),
      hayPendientes: pendientes.length > 0,
      textoPendientes: pendientes.length === 1 ? '1 reporte esperando envío' : pendientes.length + ' reportes esperando envío',
      nav: NAV.map(n => {
        const on = TAB_DE[scr] === n.id;
        return { label:n.label, icono:n.icono, bg: on ? V.g100 : 'transparent', bar: on ? V.green : 'transparent',
          fg: on ? V.green : '#4f5a53', badge: n.id === 'alerta' && pendientes.length ? String(pendientes.length) : '',
          onClick:() => this.tabGo(n.id) };
      }),
      errorFoto: st.errorFoto || st.fallaCarga,
      fallaCarga: st.fallaCarga,
      escalas: [{ id:'estandar', label:'Estándar', fs:'14px' }, { id:'grande', label:'Grande', fs:'16px' }, { id:'muy', label:'Muy grande', fs:'18px' }].map(e => ({
        label:e.label, fs:e.fs, bg: st.ajustes.escala === e.id ? V.green : 'transparent',
        fg: st.ajustes.escala === e.id ? V.bg : V.ink, onClick:() => this.setAjuste({ escala:e.id }) })),
      contrasteBg: st.ajustes.contraste ? V.green : 'transparent',
      contrasteX: st.ajustes.contraste ? '24px' : '2px',
      contrasteKnob: st.ajustes.contraste ? V.bg : V.green,
      toggleContraste:() => this.setAjuste({ contraste: !st.ajustes.contraste }),
      endpointActual: st.ajustes.endpoint,
      onEndpoint:(e) => this.setAjuste({ endpoint: e.target.value.trim() }),
      labelBorrar: st.labelBorrar, borrarTodo: this.borrarTodo, goLegal: () => this.go('legal'), estadoAlmacenamiento: st.almacenamiento,
      enlaces: [
        { label:'Sobre Dr. Árbol', onClick:() => this.go('institucional') },
        { label:'Privacidad y datos', onClick:() => this.go('privacidad') },
        { label:'Mis reportes', onClick:() => this.go('pendientes') },
        { label:'Términos y condiciones', onClick:() => this.go('legal') },
        { label:'Contacto y soporte', onClick:() => this.go('drarbol') },
      ],
      tabs: st.tab === 'hacer'
        ? { hacerBg:V.g100, hacerBar:V.green, hacerFg:V.green, noBg:'transparent', noBar:'transparent', noFg:'#8f2f21' }
        : { hacerBg:'transparent', hacerBar:'transparent', hacerFg:V.g700, noBg:V.brickBg, noBar:V.brick, noFg:'#6d2418' },
      tabNoInactivoFg:'#8f2f21',
      tabHacer:() => this.setState({ tab:'hacer' }), tabNoHacer:() => this.setState({ tab:'no' }),
      avisoCompartir: st.avisoCompartir, avisoConsulta: st.avisoConsulta,
      onEmail:(e) => this.setState(s => ({ form:{ ...s.form, email:e.target.value.trim() } })),
      onNombre:(e) => this.setState(s => ({ form:{ ...s.form, nombre:e.target.value } })),
      onTelefono:(e) => this.setState(s => ({ form:{ ...s.form, telefono:e.target.value } })),
      onMunicipio:(e) => this.setState(s => ({ form:{ ...s.form, municipio:e.target.value } })),
      onComentarios:(e) => this.setState(s => ({ form:{ ...s.form, comentarios:e.target.value } })),
      consentBox: st.consent ? V.green : 'transparent', consentCheck: st.consent ? '✓' : '',
      toggleConsent:() => this.setState(s => ({ consent:!s.consent })),
      erroresForm: st.erroresForm, hayErroresForm: st.erroresForm.length > 0,
      labelEnviar: st.enviando ? 'Enviando…' : (st.ajustes.endpoint ? 'Enviar alerta' : 'Guardar y compartir el reporte'),
      enviarAlerta: this.enviarAlerta,
      pedirUbicacion: this.pedirUbicacion,
      hayUbicacion: !!st.ubicacion, sinUbicacion: !st.ubicacion,
      errorUbicacion: st.errorUbicacion,
      labelUbicacion: st.ubicacion ? 'Actualizar mi ubicación' : 'Usar mi ubicación',
      textoUbicacion: st.ubicacion ? (window.APP_PURE ? window.APP_PURE.gradosALegible(st.ubicacion.lat, st.ubicacion.lon) : '') + ' · ±' + st.ubicacion.precision + ' m' : '',
      cantidades: ['1','2 a 5','6 a 20','Más de 20'].map(q => ({ label:q, bg: st.form.cantidad === q ? V.green : 'transparent',
        fg: st.form.cantidad === q ? V.bg : V.ink, onClick:() => this.setState(s => ({ form:{ ...s.form, cantidad:q } })) })),
      registrarPalmera: this.registrarPalmera,
      labelGuardar: 'Guardar en Mi palmera',
      eliminarPalmera: this.eliminarPalmera,
      reiniciarRevision:() => this.setState({ especie:null, sintomas:[], fotos:{}, ubicacion:null }),
      hayRevisionEnCurso: !!(st.especie || st.sintomas.length || fotosCargadas.length),
      opPaso1: st.especie ? 1 : 0.55, opPaso2: st.sintomas.length ? 1 : 0.55,
      resumenFotos: fotosCargadas.length
        ? fotosCargadas.length + ' de 6 tomas cargadas · ' + (st.S ? st.S.pesoLegible(fotosCargadas.reduce((a, f) => a + f.bytes, 0)) : '') + ' después de comprimir'
        : 'Todavía no cargaste fotografías',
      compartirUltimo:() => st.ultimo && this.compartir(st.ultimo),
      codigoAlerta: st.ultimo ? st.ultimo.codigo : '',
      tituloEnviada: st.ultimo && st.ultimo.estado === 'enviado' ? 'Alerta enviada' : 'Reporte guardado',
      textoEnviada: st.ultimo && st.ultimo.estado === 'enviado'
        ? 'Guardá el código. Vas a poder seguir el estado del reporte y recibir una respuesta por email.'
        : 'El reporte quedó guardado en tu teléfono con su código. Compartilo ahora por WhatsApp o email, o dejalo en cola: la app reintenta cuando haya un canal configurado.',
      colaVacia: st.reportes.length === 0,
      textoColaCabecera: st.reportes.length
        ? 'Los reportes se guardan en tu teléfono. Los que no pudieron enviarse quedan en cola y podés reintentar o compartirlos.'
        : 'Acá van a aparecer los reportes que generes, con su código y su estado de envío.',
      textoEndpoint: st.ajustes.endpoint
        ? 'Endpoint configurado: ' + st.ajustes.endpoint
        : 'Todavía no hay servidor de recepción. Mientras no lo haya, cada reporte se envía por email a picudorojoalerta@gmail.com o se comparte por WhatsApp desde el teléfono.',
      reportes: st.reportes.map(r => ({
        codigo:r.codigo, nivel:r.nivel,
        meta: new Date(r.creado).toLocaleString('es-AR') + ' · ' + r.jurisdiccion + (r.municipio ? ' · ' + r.municipio : '') + ' · ' + r.fotos.length + ' foto(s)',
        estado: r.estado === 'enviado' ? 'Enviado' : r.estado === 'pendiente' ? 'Pendiente de envío' : 'En el teléfono',
        estadoBg: r.estado === 'enviado' ? V.g100 : V.amberBg, estadoFg: r.estado === 'enviado' ? V.green : V.amberDark,
        onReintentar:() => this.reintentar(r.id), onCompartir:() => this.compartir(r),
        onEmail:() => this.enviarPorEmail(r), onEliminar:() => this.eliminarReporte(r.id),
      })),
      palmeras: st.palmeras.map(p => {
        const ultima = p.inspecciones[0] || {};
        const grado = (ultima.puntaje || 0) === 0 ? 'bajo' : ultima.puntaje <= 4 ? 'moderado' : 'alto';
        return { id:p.id, especie:p.especie, nivel: ultima.nivel || 'Sin inspecciones',
          meta: p.jurisdiccion + ' · ' + p.inspecciones.length + ' inspección(es)',
          nivelBg: grado === 'bajo' ? V.g100 : grado === 'moderado' ? V.amberBg : V.brickBg,
          nivelFg: grado === 'bajo' ? V.green : grado === 'moderado' ? V.amberDark : '#6d2418',
          onClick:() => { this.setState({ palmeraSel:p.id }); this.go('palmeraDetalle'); } };
      }),
      sinPalmeras: st.palmeras.length === 0, conPalmeras: st.palmeras.length > 0,
      canales: CANALES.map(c => ({ ...c, onClick:() => this.abrirCanal(c.id) })),
      senasaEmail: C ? C.SENASA.email : '',
      procedenciaSenasa: C ? C.SENASA.procedencia : '',
      avisarSenasaEmail:() => this.avisarSenasa('email'),
      avisarnosWhatsapp:() => this.avisarnos('whatsapp'),
      compartirApp: this.compartirApp,
      appPendiente: C ? !C.APP.url : false,
      contacto: C ? { whatsapp:C.CONTACTO.whatsappLegible, telefono:C.CONTACTO.telefonoLegible, email:C.CONTACTO.email, emailPendiente:!!C.CONTACTO.emailPendiente } : { whatsapp:'', telefono:'', email:'', emailPendiente:false },
      enviarUltimoPorEmail:() => st.ultimo && this.enviarPorEmail(st.ultimo),
      semaforo: (C ? C.ESCALA : []).map((e, i) => {
        const on = ev.nivel === e.id;
        const tono = { bajo:'#2a4c39', moderado:'#c08a1e', alto:V.brick }[e.id];
        const fondo = { bajo:V.g100, moderado:V.amberBg, alto:V.brickBg }[e.id];
        return { label:e.label, nota:e.nota, borde:tono, fill: on ? tono : 'transparent',
          filaBg: on ? fondo : 'transparent', bordeTop: i === 0 ? 'none' : '1px solid rgba(26,28,26,.12)',
          marca: on ? 'TU CASO' : '' };
      }),
      nivel: { titulo:nivelBase.titulo, resumen:nivelBase.resumen,
        barra: { bajo:V.g700, moderado:V.amberDark, alto:V.brick }[ev.nivel],
        chipBg: { bajo:V.g100, moderado:V.amberBg, alto:V.brickBg }[ev.nivel] },
      razones: ev.razones.map(r => ({ texto:r.texto,
        grado: C ? C.GRADO_LABEL[r.grado] : '',
        color: r.grado === 'alto' ? V.brick : r.grado === 'medio' ? V.amberDark : V.g700 })),
      recomiendaAvisar: ev.nivel !== 'bajo' && !senasaPrimero,
      senasaPrimero,
      muestraCircuito: ev.nivel !== 'bajo',
      muestraPrevencion: ev.nivel === 'bajo',
      enlacesNivel: [],
      hayEnlacesNivel: false,
      goRecorrido:() => { this.setState({ recPaso:0 }); this.go('recorrido'); },
      ...(() => {
        const i = Math.min(st.recPaso, RECORRIDO.length - 1), r = RECORRIDO[i], ult = i === RECORRIDO.length - 1;
        return {
          rec: { kicker:r.kicker, titulo:r.titulo, puntos:r.puntos, conImagen:!!r.img, alt:r.alt || '',
            fondo: r.img ? 'var(--i-' + r.img + ')' : 'none', tam:r.tam || 'cover', ratio:r.ratio || '3 / 2',
            signo: r.no ? '✕' : '✓', color: r.no ? V.brick : V.green, fondoPunto: r.no ? V.brickBg : V.surf },
          recBarras: RECORRIDO.map((x, k) => ({ bg: k <= i ? V.green : 'rgba(26,28,26,.15)' })),
          recOpAnt: i === 0 ? .4 : 1,
          recAnterior:() => { if (i > 0) { this.setState({ recPaso:i - 1 }); window.scrollTo(0, 0); } },
          recSiguiente:() => { if (ult) this.go('revisarIntro'); else { this.setState({ recPaso:i + 1 }); window.scrollTo(0, 0); } },
          recLabelSig: ult ? 'Revisar mi palmera' : 'Siguiente',
        };
      })(),
      tituloProximos: ev.nivel === 'bajo' ? 'Qué podés hacer' : 'Próximo paso',
      secundarios: [
        { label:'Qué hacer y qué no hacer', onClick:() => this.go('sospecho') },
        ...(ev.nivel === 'bajo' ? [{ label:'Consultar a Dr. Árbol', onClick:() => this.go('drarbol') }] : []),
        { label:'Guardar en Mi palmera', onClick:this.registrarPalmera },
      ].concat(ev.nivel === 'bajo' ? [{ label:'Enviar mi caso igual', onClick:() => this.go('alerta') }] : []),
    };

    if (!C) {
      return { ...base, especies:[], sintomas:[], tomas:[], articulos:[], articulo:{ cuerpo:[] }, etapas:[], etapa:{ puntos:[] },
        plagas:[], plaga:{ filas:[], fotos:[] }, otrasCausas:[], acciones:[], jurisdicciones:[], locLista:[], locAbierta:false, motivos:[], datos:[], historial:[],
        palmeraSel:{}, textoEspecie:'', resumenSintomas:'' };
    }

    const art = C.ARTICULOS.find(a => a.id === st.articulo) || C.ARTICULOS[0];
    const pl = C.PLAGAS.find(p => p.id === st.plaga) || C.PLAGAS[0];
    const et = C.ETAPAS.find(e => e.id === st.etapa) || C.ETAPAS[1];
    const esp = C.ESPECIES.find(e => e.id === st.especie);
    const selSint = C.SINTOMAS.filter(s => st.sintomas.includes(s.id));
    const pSel = st.palmeras.find(p => p.id === st.palmeraSel) || st.palmeras[0] || null;

    return { ...base,
      especies: (window.APR_SENALES ? window.APR_SENALES.ORDEN : C.ESPECIES.map(e => e.id)).map(id => {
        const e = C.ESPECIES.find(x => x.id === id) || { id, comun:id };
        const on = st.especie === id; const s = sel(on);
        return { comun:(this.senales(id).esp || e).comun, bg:s.bg, bc:s.bc, fg:s.fg,
          dot: on ? V.green : 'rgba(26,28,26,.3)', dotFill: on ? V.green : 'transparent',
          dotShadow: on ? 'inset 0 0 0 3.5px ' + V.bg : 'none',
          onClick:() => this.setState(prev => {
            // Al cambiar de especie se descartan las señales que esa especie no muestra.
            const visibles = this.senales(id).lista.map(x => x.id);
            return { especie:id, sintomas: prev.sintomas.filter(x => x === 'ninguno' || visibles.includes(x)) };
          }) };
      }),
      especieDesconocida: st.especie === 'nose',
      ...(() => {
        const { esp, lista, sinFotos } = this.senales(st.especie);
        const [zid, zi] = String(st.zoomSintoma || '').split(':');
        const zs = lista.find(x => x.id === zid);
        const zruta = zs && zs.fotos ? zs.fotos[+zi] : '';
        const nOn = st.sintomas.includes('ninguno'), nc = sel(nOn);
        return {
          senalesEnTu: esp ? esp.enTu : 'tu palmera',
          croquis: {
            hay: !!(esp && esp.croquis), falta: !(esp && esp.croquis),
            fondo: this.fondoRuta(esp && esp.croquis),
            titulo: esp && !esp.sinFotos ? 'Las partes ' + (/^tu pindó$/.test(esp.enTu) ? 'del pindó' : 'de ' + esp.enTu.replace(/^tu /, 'la ')) : 'Las partes de la palmera',
            especie: esp ? esp.comun : '',
            alt: (esp && !esp.sinFotos ? esp.comun : 'Palmera canaria') + ' con sus partes señaladas: corona, cogollo, hojas centrales, base de hojas, tronco, base y suelo',
            conNota: !!(esp && esp.croquisNota), nota: (esp && esp.croquisNota) || '',
          },
          senalesSinFotos: !!sinFotos,
          notaSinFotos: st.especie && st.especie !== 'nose'
            ? 'Todavía no tenemos fotos verificadas de estas señales en esta especie. En el paso 3 cargás tus propias fotos.'
            : 'Como no sabés qué palmera es, no mostramos fotos de ejemplo: cada especie se ve distinta. En el paso 3 cargás tus propias fotos.',
          hayFotosSenal: !sinFotos && lista.some(x => (x.fotos || []).some(Boolean)),
          zoomAbierto: !!zruta,
          zoom: zruta ? { label:zs.titulo, alt:'Ejemplo en ' + esp.comun + ': ' + zs.titulo, foto:this.fondoRuta(zruta), fondo:'transparent' } : { label:'', alt:'', foto:'none', fondo:'transparent' },
          ninguno: { bg:nc.bg, bc:nc.bc, fg:nc.fg, dot: nOn ? V.green : 'rgba(26,28,26,.3)', box: nOn ? V.green : 'transparent', check: nOn ? '✓' : '' },
          ningunoClick:() => this.toggleSintoma('ninguno'),
          sintomas: lista.map(s => {
            const on = st.sintomas.includes(s.id); const c = sel(on);
            return { label:s.titulo, descripcion:s.descripcion, bg:c.bg, bc:c.bc, fg:c.fg,
              dot: on ? V.green : 'rgba(26,28,26,.3)', box: on ? V.green : 'transparent', check: on ? '✓' : '',
              conFotos: !sinFotos && s.id !== 'olor',
              fotos: (s.fotos || ['']).slice(0, 1).map((ruta, i) => ({
                hay: !!ruta, falta: !ruta, fondo: this.fondoRuta(ruta),
                label: 'Ver grande la foto: ' + s.titulo,
                onZoom:() => this.setState({ zoomSintoma: s.id + ':' + i }) })),
              onClick:() => this.toggleSintoma(s.id) };
          }),
        };
      })(),
      cerrarZoom:(e) => { if (e) e.stopPropagation(); this.setState({ zoomSintoma:null }); },
      preguntaAdulto: st.sintomas.includes('larvas') || st.sintomas.includes('insectos'),
      adulto: { bg: st.vioAdulto ? V.g100 : 'transparent', bc: st.vioAdulto ? V.green : 'rgba(26,28,26,.2)',
        box: st.vioAdulto ? V.green : 'transparent', check: st.vioAdulto ? '✓' : '' },
      toggleAdulto:() => this.setState(s => ({ vioAdulto:!s.vioAdulto })),
      tomas: C.TOMAS.map(tm => {
        const f = st.fotos[tm.id];
        const z = tm.zona || [0, 0, 100, 100];
        return { sinFoto: !f, zx: z[0] + '%', zy: z[1] + '%', zw: z[2] + '%', zh: z[3] + '%',
          zBorde: tm.detalle ? 'dashed' : 'solid',
          nombre:tm.nombre, estado: f ? Math.round(f.bytes / 1024) + ' kB · lista' : tm.guia,
          tieneFoto: !!f, bgImagen: f ? 'url("' + f.dataUrl + '")' : 'none',
          bg: f ? V.green : 'transparent', bc: f ? V.green : 'rgba(26,28,26,.22)', fg: f ? V.bg : V.g700,
          hatch: f ? 'none' : HATCH,
          rotuloBg: f ? 'rgba(15,46,34,.78)' : 'transparent', rotuloFg: f ? V.bg : V.g700,
          onFile:(e) => this.cargarFoto(tm.id, e), onQuitar:() => this.quitarFoto(tm.id) };
      }),
      articulos: C.ARTICULOS.map((a, i) => ({ num: String(i + 1).padStart(2, '0'), titulo:a.titulo, kicker:a.kicker,
        onClick:() => { if (a.link) this.go(a.link); else { this.setState({ articulo:a.id }); this.go('articulo'); } } })),
      articulo: { titulo:art.titulo, kicker:art.kicker, cuerpo:art.cuerpo, pendiente:!!art.pendiente,
        conFoto:!!art.foto, foto:art.foto || '',
        esQue: art.id === 'que', esDana: art.id === 'dana', esTempranos: art.id === 'tempranos', esIntermedios: art.id === 'intermedios', esFaq: art.id === 'faq', esAvanzados: art.id === 'avanzados', esDispersa: art.id === 'dispersa', esPrevencion: art.id === 'prevencion',
        imagenPie:art.imagenPie || '', imagenNota:art.imagenNota || '' },
      etapas: C.ETAPAS.map(e => {
        const on = st.etapa === e.id; const c = sel(on, true);
        return { num:e.num, nombre:e.nombre, bg:c.bg, bc:c.bc, fg:c.fg, onClick:() => this.setState({ etapa:e.id }) };
      }),
      etapa: { ...et, imagenBg: et.imagen ? imagenVar(et.imagen) : 'none' },
      especiesAbierta: st.especiesAbierta,
      abrirEspecies:() => this.setState({ especiesAbierta:true }),
      cerrarEspecies:() => this.setState({ especiesAbierta:false }),
      laminaAbierta: st.laminaAbierta,
      abrirLamina:() => this.setState({ laminaAbierta:true }),
      cerrarLamina:() => this.setState({ laminaAbierta:false }),
      plagas: C.PLAGAS.map(p => ({ comun:p.comun, cientifico:p.cientifico,
        fondo: p.miniatura ? imagenVar(p.miniatura) : HATCH,
        tamano: p.miniatura ? (p.miniatura.includes('recorte') ? 'contain' : 'cover') : '7px 7px',
        repeticion: p.miniatura ? 'no-repeat' : 'repeat',
        sinFoto: p.miniatura ? '' : 'FOTO',
        rol: p.miniatura ? 'img' : null,
        alt: p.miniatura ? 'Adulto de ' + p.comun : null,
        onClick:() => { this.setState({ plaga:p.id }); this.go('plagaDetalle'); } })),
      plaga: { ...pl,
        urgBg: V.surf, urgFg: V.g700,
        urgTitulo: 'Consultar a un especialista',
        fotos: pl.fotos.map(f => ({
          pie: f.img ? f.pie : f.pie + ' — fotografía pendiente',
          pieColor: f.img ? V.g700 : V.amberDark,
          fondo: f.img ? imagenVar(f.img) : HATCH,
          tamano: f.img ? (f.img.includes('recorte') ? 'contain' : 'cover') : '8px 8px',
          repeticion: f.img ? 'no-repeat' : 'repeat',
          rol: f.img ? 'img' : null,
          alt: f.img ? f.pie + ' — ' + pl.comun : null,
          oculto: f.img ? null : 'true',
          columna: f.ancho ? '1 / -1' : 'auto',
          proporcion: f.proporcion || '1',
        })) },
      otrasCausas: C.OTRAS_CAUSAS,
      comparativaAbierta: st.comparativaAbierta,
      abrirComparativa:() => this.setState({ comparativaAbierta:true }),
      cerrarComparativa:() => this.setState({ comparativaAbierta:false }),
      acciones: (st.tab === 'hacer' ? C.QUE_HACER : C.QUE_NO_HACER).map(a => ({ ...a,
        bg: st.tab === 'hacer' ? V.surf : V.brickBg, barra: st.tab === 'hacer' ? V.green : V.brick,
        signo: st.tab === 'hacer' ? '✓' : '✕' })),
      jurisdicciones: C.JURISDICCIONES.map(j => {
        const c = sel(st.ajustes.jurisdiccion === j.id, true);
        return { nombre:j.nombre, bg:c.bg, bc:c.bc, fg:c.fg, onClick:() => {
          if (st.ajustes.jurisdiccion !== j.id) {
            this.setAjuste({ jurisdiccion:j.id, localidad:'' });
            this.setState(s => ({ form:{ ...s.form, municipio:'' } }));
          }
          this.setState({ locAbierta:true, locBusqueda:'' });
        } };
      }),
      ...(() => {
        const L = C.LOCALIDADES[st.ajustes.jurisdiccion] || { tipo:'localidad', lista:[] };
        const actual = st.form.municipio || st.ajustes.localidad;
        const q = st.locBusqueda.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const lista = L.lista.filter(n => !q || n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(q));
        const elegir = (nombre) => {
          this.setAjuste({ localidad:nombre });
          this.setState(s => ({ locAbierta:false, locBusqueda:'', form:{ ...s.form, municipio:nombre } }));
        };
        const tipoLabel = { barrio:'Barrio', partido:'Partido', localidad:'Localidad' }[L.tipo];
        return {
          locAbierta: st.locAbierta,
          locTipo: L.tipo, locEtiqueta: tipoLabel,
          locJurLargo: jur.largo || jur.nombre,
          locActual: st.ajustes.jurisdiccion ? (actual || 'Tocá para elegir') : 'Primero elegí tu provincia',
          locBusqueda: st.locBusqueda,
          onLocBusqueda:(e) => this.setState({ locBusqueda:e.target.value }),
          locLista: lista.map(n => ({ nombre:n, onClick:() => elegir(n),
            bg: n === actual ? V.green : 'transparent', fg: n === actual ? V.bg : V.ink, check: n === actual ? '✓' : '' })),
          locSinResultados: !!q && lista.length === 0,
          locHayOtra: !!q && !L.lista.some(n => n.toLowerCase() === st.locBusqueda.trim().toLowerCase()),
          usarOtraLoc:() => elegir(st.locBusqueda.trim()),
          abrirLoc:() => this.setState({ locAbierta:true, locBusqueda:'' }),
          cerrarLoc:() => this.setState({ locAbierta:false }),
        };
      })(),
      motivos: C.MOTIVOS.map(m => {
        const c = sel(st.motivo === m, true);
        return { label:m, bg:c.bg, bc:c.bc, fg:c.fg, onClick:() => this.setState({ motivo:m }) };
      }),
      datos: C.DATOS_PERSONALES,
      permisos: [
        { k:'ubicacion', nombre:'Ubicación', para:'Para derivar el reporte a la provincia correcta. Se guarda aproximada.' },
        { k:'camara', nombre:'Cámara y galería', para:'Para sacar o elegir las fotos de la palmera. Se reducen en el teléfono.' },
        { k:'notificaciones', nombre:'Notificaciones', para:'Respuestas a consultas, recordatorios de inspección y campañas de tu zona.' },
        { k:'analitica', nombre:'Datos de uso anónimos', para:'Cantidad de revisiones y síntomas frecuentes por zona. Sin perfiles individuales.' },
      ].map(p => ({ nombre:p.nombre, para:p.para,
        bg: st.ajustes.permisos[p.k] ? V.green : 'transparent', x: st.ajustes.permisos[p.k] ? '24px' : '2px',
        knob: st.ajustes.permisos[p.k] ? V.bg : V.green, onClick:() => this.togglePermiso(p.k) })),
      textoEspecie: esp ? esp.comun + ' (' + esp.cientifico + ')' : 'Sin elegir todavía',
      resumenSintomas: selSint.length ? selSint.map(s => s.label).join(' · ') : 'Ninguno marcado todavía',
      palmeraSel: pSel ? { id:pSel.id, especie:pSel.especie, meta: pSel.jurisdiccion + ' · alta ' + new Date(pSel.creada).toLocaleDateString('es-AR') } : { id:'', especie:'', meta:'' },
      palmeraSinSignos: !!(pSel && pSel.inspecciones[0] && (pSel.inspecciones[0].puntaje || 0) === 0),
      ...(() => {
        const fecha = pSel && st.recordatorios[pSel.id];
        const notif = typeof Notification !== 'undefined' ? Notification.permission : 'unsupported';
        return {
          textoRecordatorio: fecha
            ? 'Te vamos a avisar el ' + new Date(fecha).toLocaleDateString('es-AR') + ' para que vuelvas a revisarla.' + (notif === 'granted' ? '' : ' Activá las notificaciones para recibir el aviso; mientras tanto lo vas a ver acá.')
            : 'Conviene revisar cada ejemplar una vez por mes, siempre en las mismas zonas.',
          labelRecordatorio: fecha ? 'Cancelar el recordatorio' : 'Recordarme en 30 días',
        };
      })(),
      programarRecordatorio: this.programarRecordatorio,
      historial: pSel ? pSel.inspecciones.map((i, idx) => ({
        fecha: new Date(i.fecha).toLocaleDateString('es-AR').toUpperCase(),
        titulo: idx === pSel.inspecciones.length - 1 ? 'Alta del ejemplar' : 'Inspección guiada',
        detalle: i.nivel + '. ' + (i.sintomas.length ? i.sintomas.length + ' signos: ' + i.sintomas.join(', ') : 'sin signos marcados') + '.',
        punto: (i.puntaje || 0) === 0 ? V.g700 : i.puntaje <= 4 ? V.amber : V.brick,
        tieneFotos: i.fotos.length > 0,
        fotos: i.fotos.map(f => ({ bgImagen:'url("' + f.dataUrl + '")', alt:f.nombre })),
      })) : [],
    };
  }
}
