(function () {
  // Contenido educativo de Alerta Picudo Rojo.
  // Todo el texto marcado con `pendiente: true` requiere validación técnica o
  // normativa antes de publicarse. No agregar normativa, productos ni datos
  // científicos sin fuente oficial.

  const ESPECIES = [
    { id: 'canariensis', comun: 'Palmera canaria', cientifico: 'Phoenix canariensis', riesgo: 2 },
    { id: 'dactylifera', comun: 'Palmera datilera', cientifico: 'Phoenix dactylifera', riesgo: 2 },
    { id: 'pindo', comun: 'Pindó', cientifico: 'Syagrus romanzoffiana', riesgo: 1 },
    { id: 'butia', comun: 'Butiá o yatay', cientifico: 'Butia yatay', riesgo: 1 },
    { id: 'washingtonia', comun: 'Washingtonia', cientifico: 'Washingtonia spp.', riesgo: 1 },
    { id: 'nose', comun: 'No sé qué palmera tengo', cientifico: 'Se identifica con fotos', riesgo: 1 },
  ];

  const SINTOMAS = [
    { id: 'centrales', label: 'Hojas centrales caídas', peso: 3 },
    { id: 'corona', label: 'Corona desordenada', peso: 2 },
    { id: 'mordidas', label: 'Hojas cortadas o mordidas', peso: 2 },
    { id: 'orificios', label: 'Orificios', peso: 3 },
    { id: 'fibras', label: 'Fibras dañadas', peso: 2 },
    { id: 'tejido', label: 'Restos de tejido', peso: 2 },
    { id: 'olor', label: 'Olor anormal', peso: 3 },
    { id: 'larvas', label: 'Presencia de larvas', peso: 4 },
    { id: 'insectos', label: 'Presencia de insectos', peso: 3 },
    { id: 'aserrin', label: 'Aserrín o residuos', peso: 3 },
    { id: 'caida', label: 'Caída anormal de hojas', peso: 1 },
    { id: 'base', label: 'Síntomas en base de hojas', peso: 2 },
    { id: 'cogollo', label: 'Daños en cogollo', peso: 4 },
    { id: 'ninguno', label: 'Ninguno de estos', peso: 0 },
  ];

  const TOMAS = [
    // zona: recuadro sobre assets/partes-palmera.webp, en % (x, y, ancho, alto).
    { id: 'completa', nombre: 'Palmera completa', guia: 'Desde unos 10 metros, entera en el cuadro.', zona: [5, 3, 89, 95] },
    { id: 'corona', nombre: 'Corona', guia: 'Desde abajo, centrada, con luz de día.', zona: [6, 3, 88, 55] },
    { id: 'centrales', nombre: 'Hojas centrales', guia: 'El penacho del medio, donde crece la palmera.', zona: [37, 3, 26, 28] },
    { id: 'base', nombre: 'Base de hojas', guia: 'Donde la hoja se inserta en el tronco (estípite).', zona: [39, 35, 24, 12] },
    { id: 'estipe', nombre: 'Tronco (estípite)', guia: 'El tronco completo, de arriba hacia abajo.', zona: [39, 44, 22, 51] },
    { id: 'dano', nombre: 'Detalle del daño', guia: 'Lo más cerca que puedas, sin subirte a nada.', zona: [44, 37, 14, 8], detalle: true },
  ];

  const ARTICULOS = [
    { id: 'que', titulo: '¿Qué es el picudo rojo?', kicker: 'Fundamentos', cuerpo: [
      'El picudo rojo (Rhynchophorus ferrugineus) es un insecto perforador de palmeras. El adulto es un gorgojo de color rojizo con un pico curvo característico.',
      'El daño no lo produce el adulto sino la larva, que se desarrolla dentro de la palmera y consume los tejidos internos del cogollo y del tronco (estípite).',
      'Por eso la palmera puede estar afectada mucho antes de que se vea algo desde afuera. Cuando los síntomas son evidentes, el daño interno suele estar avanzado.',
      'Mide entre 2 y 4 cm. El cuerpo es rojizo con manchas oscuras en el dorso, detrás de la cabeza (pronoto), y el pico curvo lo distingue de otros escarabajos.'] },
    { id: 'ciclo', titulo: 'Ciclo biológico', kicker: 'Fundamentos', link: 'ciclo', cuerpo: [
      'Huevo, larva, pupa y adulto. Casi todo el ciclo ocurre dentro de la palmera, oculto a la vista.'] },
    { id: 'dana', titulo: 'Cómo daña la palmera', kicker: 'Fundamentos', cuerpo: [
      'Las larvas abren galerías en el tejido tierno. A medida que avanzan destruyen la zona de crecimiento de la palmera, el cogollo.',
      'La palmera no tiene capacidad de regenerar ese punto de crecimiento. Si el cogollo se destruye, el ejemplar no se recupera.',
      'El colapso de las hojas centrales, la corona que se desarma y la caída del penacho son consecuencias de ese daño interno.'] },
    { id: 'dificil', titulo: 'Por qué es difícil detectarlo temprano', kicker: 'Detección', cuerpo: [
      'El ataque suele comenzar en la corona, en la base de las hojas y tejidos tiernos. Desde allí, las larvas penetran y avanzan hacia el interior de la palmera, pudiendo alcanzar el cogollo.',
      'Los primeros signos son sutiles: hojas con muescas, fibras deshilachadas, restos de tejido, algún orificio pequeño.',
      'Revisar de forma periódica y sistemática, siempre las mismas zonas, detecta cambios que una mirada casual no registra.'] },
    { id: 'prevencion', titulo: 'Prevención y monitoreo', kicker: 'Detección', cuerpo: [
      'Cuanto antes se detecta actividad, más opciones de manejo existen y menor es el riesgo de dispersión hacia palmeras vecinas.',
      'La prevención combina inspección visual periódica, cuidado en las podas y consulta profesional ante cualquier duda.',
      'Registrar cada revisión con fecha y fotos permite comparar en el tiempo. Una palmera que cambia entre dos inspecciones dice más que una sola foto.',
      'No se recomiendan aplicaciones de productos fitosanitarios por cuenta propia. La selección y aplicación corresponde a un profesional habilitado.',
      'Una de las herramientas preventivas disponibles es la endoterapia: un profesional introduce el tratamiento directamente en el sistema vascular de la palmera, que lo distribuye por su interior. Se evalúa caso por caso según la especie, el tamaño, el estado y el riesgo del ejemplar, y solo en palmeras sin signos sospechosos. No garantiza una protección total y no reemplaza la revisión periódica.'] },
    { id: 'dispersa', titulo: 'Cómo se dispersa', kicker: 'Detección', pendiente: true, cuerpo: [
      'El adulto vuela y puede desplazarse por sus propios medios. A eso se suma el traslado involuntario de material vegetal infestado.',
      'El picudo rojo adulto suele desplazarse menos de 500 metros, pero en estudios de campo se lo ha registrado hasta 7 kilómetros del punto de liberación.'] },
    { id: 'especies', titulo: 'Qué palmeras pueden ser afectadas', kicker: 'Detección', pendiente: true, cuerpo: [
      'El género Phoenix, en especial la palmera canaria (Phoenix canariensis), se considera particularmente susceptible.',
      'También pueden ser afectadas otras palmeras presentes en nuestras ciudades, como la butiá o yatay, la pindó y la washingtonia.',
      'El listado completo de especies afectadas en Argentina y su nivel relativo de susceptibilidad debe tomarse de fuentes oficiales.'] },
    { id: 'tempranos', titulo: 'Signos tempranos', kicker: 'Reconocimiento', cuerpo: [
      'Muescas o cortes en las hojitas (folíolos), como si algo hubiera mordido la hoja de manera regular.',
      'Fibras deshilachadas en la base de las hojas, restos de tejido masticado, aserrín húmedo.',
      'Orificios pequeños en la base de las hojas o en el tronco (estípite), a veces con exudado.',
      'Ninguno de estos signos, por sí solo, confirma nada. Varios juntos justifican una consulta.'] },
    { id: 'intermedios', titulo: 'Signos intermedios', kicker: 'Reconocimiento', cuerpo: [
      'La corona empieza a perder simetría: hojas que se inclinan o quedan fuera del plano del resto.',
      'Aparecen restos de tejido y fibra acumulados en las axilas de las hojas.',
      'El cambio es más claro si se compara con una foto anterior del mismo ejemplar.'] },
    { id: 'avanzados', titulo: 'Signos avanzados', kicker: 'Reconocimiento', cuerpo: [
      'Hojas centrales caídas o inclinadas, corona que pierde su forma simétrica.',
      'Penacho que se desarma, hojas que se desprenden con facilidad, olor a fermento.',
      'En esta etapa el daño interno suele ser extenso. La consulta es urgente y el manejo del material debe seguir las indicaciones oficiales.'] },
    { id: 'mitos', titulo: 'Mitos y realidades', kicker: 'Reconocimiento', cuerpo: [
      '"Si la palmera está verde, está sana." No necesariamente: la copa puede verse verde mientras el cogollo ya está dañado.',
      '"Cualquier agujero es picudo." No: hay daños mecánicos, otras plagas y problemas nutricionales que producen síntomas parecidos.',
      '"Se soluciona cortando las hojas dañadas." Podar sin criterio puede abrir heridas y favorecer nuevas posturas. La poda de una palmera debe hacerse con indicación técnica y por profesionales habilitados.'] },
    { id: 'faq', titulo: 'Preguntas frecuentes', kicker: 'Reconocimiento', pendiente: true, cuerpo: [
      '¿Tengo obligación de denunciar? ¿Quién hace el tratamiento preventivo? ¿Puedo trasladar una palmera? ¿Qué pasa si mi vecino no hace nada?',
      'Las respuestas dependen de la normativa vigente en cada provincia y se completan con información oficial.',
      'Nos pueden consultar al 11 2577-2020 por WhatsApp.'] },
    { id: 'sensores', titulo: 'Sensores y monitoreo acústico', kicker: 'Herramientas', link: 'sensores', cuerpo: [
      '¿Se puede detectar actividad dentro de una palmera? Sí, con limitaciones.'] },
  ];

  const PLAGAS = [
    { id: 'rojo', comun: 'Picudo rojo', cientifico: 'Rhynchophorus ferrugineus', grupo: 'Insecto perforador', urgencia: 'Muy alta', destacado: true,
      urgNota: 'Ante signos compatibles, comunicate con el organismo competente.',
      miniatura: 'assets/picudo-rojo-recorte.webp',
      fotos: [
        { img: 'assets/picudo-rojo-recorte.webp', pie: 'Adulto. Cuerpo rojizo, pico curvo y manchas oscuras en el dorso, detrás de la cabeza (pronoto). Mide entre 2 y 4 cm.' },
        { img: 'assets/dano-corona-picudo.webp', pie: 'Daño en corona. Cavidad abierta en el centro, orificios en las bases de las hojas, fibra deshilachada y tejido masticado acumulado.' },
        { img: 'assets/larva-picudo-rojo.webp', ancho: true, proporcion: '1100 / 727', pie: 'Larva. Hasta unos 5 cm, blanquecina a crema, cuerpo segmentado sin patas visibles y cabeza (cápsula cefálica) marrón oscura. Vive dentro de la palmera perforando tejidos blandos.' },
      ],
      filas: [
        { rotulo: 'Tipo de daño', texto: 'Galerías internas abiertas por la larva en el cogollo y el tronco (estípite).' },
        { rotulo: 'Dónde se ve', texto: 'Base de las hojas, cogollo, corona. El daño empieza adentro.' },
        { rotulo: 'Signos', texto: 'Hojas con muescas, fibras deshilachadas, aserrín húmedo, orificios con exudado, olor a fermento, hojas centrales caídas.' },
        { rotulo: 'Adulto', texto: 'Gorgojo rojizo de pico curvo, de unos 2 a 4 cm. Se ve poco: pasa gran parte del tiempo dentro de la palmera.' },
        { rotulo: 'Larva', texto: 'Sin patas, cuerpo cremoso y cabeza (cápsula cefálica) oscura. Se encuentra dentro del tejido.' },
        { rotulo: 'Confusión', texto: 'El daño avanzado se confunde con pudriciones del cogollo y con daño por otros perforadores.' }] },
    { id: 'negro', comun: 'Picudo negro', cientifico: 'Rhynchophorus palmarum', grupo: 'Insecto perforador', urgencia: 'Alta', pendiente: true, destacado: true,
      urgNota: 'Su presencia y distribución en Argentina debe consultarse con información oficial.',
      miniatura: 'assets/picudo-negro.webp',
      fotos: [
        { img: 'assets/picudo-negro.webp', pie: 'Adulto. Negro uniforme y brillante, sin el tono rojizo del picudo rojo.' },
        { img: 'assets/larva-picudo-negro.webp', pie: 'Larva. Sin patas (ápoda), color crema y cabeza (cápsula cefálica) oscura, dentro de la galería que abrió en el tejido fibroso.' },
        { img: 'assets/dano-estipe-picudo-negro.webp', pie: 'Daño en el tronco (estípite). Orificios con exudado oscuro que escurre por el tronco y fibra saliente alrededor.' },
      ],
      filas: [
        { rotulo: 'Tipo de daño', texto: 'También perforador, con larvas que dañan tejidos internos.' },
        { rotulo: 'Dónde se ve', texto: 'Corona y tronco (estípite).' },
        { rotulo: 'Diferencia', texto: 'El adulto es negro, sin el tono rojizo ni las bandas oscuras del dorso (pronoto) del picudo rojo.' },
        { rotulo: 'Confusión', texto: 'Los síntomas en la palmera pueden ser muy similares. La diferencia clara está en el adulto.' },
        { rotulo: 'Larva', texto: 'Prácticamente indistinguible a simple vista de la del picudo rojo: sin patas (ápoda), crema y con cabeza (cápsula cefálica) oscura. Encontrar una larva no permite decidir de qué especie se trata.' }] },
    { id: 'paysandisia', comun: 'Paysandisia', cientifico: 'Paysandisia archon', grupo: 'Mariposa perforadora', urgencia: 'Alta', destacado: true,
      urgNota: 'Requiere identificación técnica: el manejo no es el mismo que para un picudo.',
      miniatura: 'assets/paysandisia-adulto.webp',
      fotos: [
        { img: 'assets/paysandisia-adulto.webp', pie: 'Adulto. Mariposa diurna grande: alas anteriores pardas y posteriores negras con banda naranja y manchas blancas.' },
        { img: 'assets/larva-paysandisia.webp', pie: 'Larva. Amarillenta con cabeza (cápsula cefálica) oscura, dentro de la galería que abre entre la fibra del tronco (estípite).' },
        { img: 'assets/danos-paysandisia.webp', ancho: true, proporcion: '1100 / 727', pie: 'Daño típico. Perforaciones y desgarros de bordes pardos repetidos a lo largo de los segmentos: la larva atraviesa la hoja mientras está plegada y, al abrirse el abanico, el patrón queda alineado.' },
      ],
      filas: [
        { rotulo: 'Tipo de daño', texto: 'La larva perfora el tronco (estípite) y la base de las hojas.' },
        { rotulo: 'Dónde se ve', texto: 'Tronco (estípite), base de hojas, hojas nuevas.' },
        { rotulo: 'Diferencia', texto: 'El adulto es una mariposa diurna grande de alas anaranjadas, no un gorgojo. Deja perforaciones alineadas en las hojas al desplegarse.' },
        { rotulo: 'Signos', texto: 'Orificios en el tronco (estípite) con fibra saliente, hojas con perforaciones en línea, deformación de hojas nuevas.' },
        { rotulo: 'Confusión', texto: 'Puede confundirse con picudo por los orificios y la fibra, pero el patrón de perforación en la hoja es distinto.' }] },
    { id: 'vaquita', comun: 'Vaquita de la palmera', cientifico: 'Coraliomela quadrimaculata', grupo: 'Insecto defoliador', urgencia: 'Media', pendiente: true, destacado: true,
      urgNota: 'Nombre común de uso local.',
      miniatura: 'assets/vaquita-palmera.webp',
      fotos: [
        { img: 'assets/vaquita-palmera.webp', pie: 'Adulto. Élitros rojos con manchas negras y cabeza oscura. No tiene pico.' },
        { img: 'assets/dano-vaquita-palmera.webp', pie: 'Daño. Raspado superficial del nervio central de la hoja (raquis): manchas claras de bordes irregulares sobre el tejido verde, sin orificios ni galerías.' },
        { img: 'assets/larva-vaquita-palmera.webp', pie: 'Larva. Ovalada y aplanada, crema, con patas cortas visibles y borde festoneado. No se parece a la larva sin patas (ápoda) de un picudo.' },
      ],
      filas: [
        { rotulo: 'Tipo de daño', texto: 'Raspado superficial del tejido verde en el nervio central (raquis) y las hojitas (folíolos). No abre galerías.' },
        { rotulo: 'Dónde se ve', texto: 'Hojitas (folíolos) y hojas expuestas.' },
        { rotulo: 'Diferencia', texto: 'No abre galerías internas ni destruye el cogollo. El daño es visible desde afuera y no compromete el punto de crecimiento.' },
        { rotulo: 'Larva', texto: 'Ovalada, aplanada y con patas cortas visibles. La larva de un picudo, en cambio, no tiene patas (es ápoda) y de cuerpo grueso: es la diferencia más clara si se encuentra una.' },
        { rotulo: 'Confusión', texto: 'Las hojas mordidas pueden hacer pensar en picudo, pero la corona se mantiene firme y ordenada.' }] },
    { id: 'strategus', comun: 'Escarabajo rinoceronte', cientifico: 'Strategus aloeus', grupo: 'Escarabajo', urgencia: 'Media', pendiente: true,
      urgNota: '',
      miniatura: 'assets/strategus-macho.webp',
      fotos: [
        { img: 'assets/strategus-macho.webp', pie: 'Macho. Tres cuernos largos y curvos en la cabeza y el dorso (pronoto).' },
        { img: 'assets/strategus-hembra.webp', pie: 'Hembra. Un solo cuerno corto; cuerpo castaño rojizo y brillante.' },
        { img: 'assets/dano-base-strategus.webp', ancho: true, proporcion: '1 / 1', pie: 'Daño en la base. Perforación ancha a nivel del suelo, con tejido claro expuesto y fibra masticada acumulada alrededor. La corona de la planta puede seguir verde.' },
      ],
      filas: [
        { rotulo: 'Tipo de daño', texto: 'Daño en la base de la palmera y en raíces, con perforaciones amplias.' },
        { rotulo: 'Dónde se ve', texto: 'Base del tronco (estípite), a nivel del suelo.' },
        { rotulo: 'Diferencia', texto: 'El adulto tiene cuernos característicos y el daño se concentra abajo, no en la corona.' },
        { rotulo: 'Macho y hembra', texto: 'El macho lleva tres cuernos largos y curvos; la hembra, un solo cuerno corto. Ninguno de los dos tiene pico: eso lo separa de cualquier picudo.' },
        { rotulo: 'Confusión', texto: 'Los orificios en la base pueden alarmar; la ubicación del daño ayuda a distinguirlo.' }] },
    { id: 'otros', comun: 'Otras causas de daño', cientifico: 'Daño mecánico, nutrición, pudriciones, estrés hídrico', grupo: 'No biótico o fisiológico', urgencia: 'Variable',
      urgNota: 'Muchas consultas terminan en una de estas causas. Descartarlas evita intervenciones innecesarias.',
      miniatura: 'assets/pudricion-estipe.webp',
      fotos: [
        { img: 'assets/heridas-mecanicas.webp', pie: 'Daño mecánico. Corte de poda con bordes limpios y tejido claro expuesto. Sin galerías ni aserrín.' },
        { img: 'assets/clorosis-nutricional.webp', pie: 'Deficiencia nutricional. Amarilleo uniforme y simétrico en toda la hoja, sin perforaciones ni fibra deshilachada.' },
        { img: 'assets/estres-hidrico.webp', pie: 'Estrés hídrico. Las hojitas (folíolos) se secan desde la punta hacia adentro, con un borde de transición parejo.' },
        { img: 'assets/pudricion-estipe.webp', pie: 'Pudrición. Tejido blando y oscuro en la base del tronco (estípite), con exudado que escurre. Puede coexistir con daño de insectos.' },
      ],
      filas: [
        { rotulo: 'Daño mecánico', texto: 'Heridas de poda, roces, cortes. Bordes limpios, sin galerías ni tejido masticado.' },
        { rotulo: 'Nutrición', texto: 'Hojas cloróticas o con patrones de decoloración simétricos, sin orificios ni fibras deshilachadas.' },
        { rotulo: 'Pudriciones', texto: 'Tejido blando y oscuro, olor fuerte. Puede coexistir con daño de insectos.' },
        { rotulo: 'Estrés hídrico', texto: 'Hojas secas desde las puntas, de manera progresiva y uniforme.' },
        { rotulo: 'Clave', texto: 'La ausencia de aserrín, galerías y tejido masticado orienta hacia estas causas.' }] },
  ];

  // Lámina del ciclo larval. El pie cita la fuente técnica de la propia lámina.
  const CICLO_LAMINA = {
    imagen: 'assets/ciclo-larval-picudo.webp',
    ratio: '1055/1491',
    alt: 'Lámina del ciclo larval del picudo rojo en siete etapas, con fotografías de oviposición, larvas L1 a L7, capullo pupal, emergencia y adulto',
    pie: 'Las siete etapas con sus fotografías, claves diagnósticas y nota de duración.',
    fuente: 'Fuente citada en la lámina: EPPO (2021), PM 7/141 (1) Rhynchophorus ferrugineus.',
  };

  const ETAPAS = [
    { id: 'huevo', num: '01', nombre: 'Huevo', nota: 'Nada de esto se ve desde el suelo.',
      imagen: 'assets/etapa-huevo.webp', ratio: '1000 / 573',
      imagenAlt: 'Adulto de picudo rojo sobre la fibra de una palmera, con un huevo blanco depositado en una grieta del tejido',
      imagenPie: 'La hembra deposita el huevo en una grieta del tejido fibroso, donde queda protegido.',
      puntos: [
      { rotulo: 'Dónde', texto: 'La hembra deposita los huevos en heridas, axilas de hojas y tejido tierno.' },
      { rotulo: 'Qué ocurre', texto: 'Quedan protegidos dentro del tejido, fuera de la vista.' },
      { rotulo: 'Detección', texto: 'Prácticamente imposible a simple vista.' }] },
    { id: 'larva', num: '02', nombre: 'Larva', duracion: 'Etapa más larga del ciclo', nota: 'Esta es la etapa que destruye la palmera y la que permanece oculta.',
      imagen: 'assets/etapa-larva.webp', ratio: '1000 / 553',
      imagenAlt: 'Larva blanquecina con cabeza (cápsula cefálica) oscura dentro de una galería abierta en el tejido interno de la palmera',
      imagenPie: 'La larva dentro de la galería que abrió. Cuerpo cremoso sin patas y cabeza (cápsula cefálica) oscura.',
      puntos: [
      { rotulo: 'Dónde', texto: 'Dentro del tronco (estípite), del cogollo y de la base de las hojas.' },
      { rotulo: 'Qué consume', texto: 'Tejidos tiernos e internos, incluyendo la zona de crecimiento.' },
      { rotulo: 'Por qué se oculta', texto: 'Vive dentro de las galerías que abre; no sale al exterior.' },
      { rotulo: 'Cómo evoluciona', texto: 'A medida que crece amplía las galerías. El daño pasa de localizado a comprometer el cogollo.' }] },
    { id: 'pupa', num: '03', nombre: 'Pupa', nota: 'Los capullos de fibra son un hallazgo relevante durante una poda.',
      imagen: 'assets/etapa-pupa.webp', ratio: '1000 / 606',
      imagenAlt: 'Pupa de color pardo claro alojada dentro de un capullo de fibra entretejida en el interior de la palmera',
      imagenPie: 'Pupa dentro del capullo de fibra entretejida, en el interior de la palmera.',
      puntos: [
      { rotulo: 'Dónde', texto: 'Dentro de un capullo de fibra, en el interior de la palmera o entre las bases de las hojas.' },
      { rotulo: 'Qué ocurre', texto: 'La larva se transforma en adulto dentro del capullo.' },
      { rotulo: 'Detección', texto: 'Se encuentran capullos y restos al intervenir la palmera.' }] },
    { id: 'adulto', num: '04', nombre: 'Adulto', duracion: 'Semanas a meses', nota: 'Una palmera afectada puede sostener varias generaciones a la vez.',
      imagen: 'assets/etapa-adulto.webp', ratio: '1000 / 554',
      imagenAlt: 'Adulto de picudo rojo saliendo por un orificio abierto en el tronco (estípite), junto a la galería llena de tejido masticado',
      imagenPie: 'El adulto emerge por el orificio de salida. Al lado, la galería con tejido masticado.',
      puntos: [
      { rotulo: 'Qué hace', texto: 'Sale, vuela y busca nuevas palmeras donde reproducirse.' },
      { rotulo: 'Aspecto', texto: 'Gorgojo rojizo con pico curvo, de unos 2 a 4 cm.' },
      { rotulo: 'Por qué importa', texto: 'Es la etapa que dispersa el problema hacia otras palmeras.' }] },
  ];

  const QUE_HACER = [
    { titulo: 'Observá y registrá', texto: 'Sacá fotos de lo que ves y anotá la fecha. La evolución en el tiempo es información valiosa.' },
    { titulo: 'Consultanos', texto: 'Ante signos compatibles con el picudo rojo lo evaluamos y te ayudamos a derivarlo al organismo de tu provincia.' },
    { titulo: 'Mantené la palmera en su lugar', texto: 'Dejá el ejemplar y cualquier resto vegetal donde están hasta recibir indicación oficial.' },
    { titulo: 'Avisá a los vecinos y pasales esta app', texto: 'Si hay palmeras cercanas, que también las revisen. La detección temprana en la zona reduce el riesgo.' },
    { titulo: 'Pedí asistencia profesional', texto: 'Una evaluación técnica define qué corresponde hacer en tu caso concreto.' },
  ];

  const QUE_NO_HACER = [
    { titulo: 'No podes la palmera', texto: 'Las heridas de poda son puntos de entrada. Una poda sin criterio puede empeorar la situación.' },
    { titulo: 'No trasladés material vegetal', texto: 'Hojas, restos y ejemplares pueden trasladar el problema a otra zona.' },
    { titulo: 'No apliques productos por cuenta propia', texto: 'La elección y aplicación de un fitosanitario corresponde a un profesional habilitado.' },
    { titulo: 'No abras ni perfores el tronco (estípite)', texto: 'Buscar larvas abriendo la palmera genera daño adicional y no aporta un diagnóstico.' },
    { titulo: 'No des por hecho el diagnóstico', texto: 'Varios problemas producen síntomas parecidos. Confirmar corresponde a un profesional.' },
  ];

  const JURISDICCIONES = [
    { id: 'caba', nombre: 'CABA', largo: 'Ciudad Autónoma de Buenos Aires' },
    { id: 'bsas', nombre: 'Buenos Aires', largo: 'Provincia de Buenos Aires' },
    { id: 'er', nombre: 'Entre Ríos', largo: 'Provincia de Entre Ríos' },
    { id: 'sf', nombre: 'Santa Fe', largo: 'Provincia de Santa Fe' },
    { id: 'ctes', nombre: 'Corrientes', largo: 'Provincia de Corrientes' },
  ];

  // Barrios (CABA), partidos (Buenos Aires) y localidades principales (Entre Ríos, Santa Fe, Corrientes).
  const LOCALIDADES = {
    caba: { tipo: 'barrio', lista: ['Agronomía','Almagro','Balvanera','Barracas','Belgrano','Boedo','Caballito','Chacarita','Coghlan','Colegiales','Constitución','Flores','Floresta','La Boca','La Paternal','Liniers','Mataderos','Monserrat','Monte Castro','Nueva Pompeya','Núñez','Palermo','Parque Avellaneda','Parque Chacabuco','Parque Chas','Parque Patricios','Puerto Madero','Recoleta','Retiro','Saavedra','San Cristóbal','San Nicolás','San Telmo','Vélez Sarsfield','Versalles','Villa Crespo','Villa del Parque','Villa Devoto','Villa General Mitre','Villa Lugano','Villa Luro','Villa Ortúzar','Villa Pueyrredón','Villa Real','Villa Riachuelo','Villa Santa Rita','Villa Soldati','Villa Urquiza'] },
    bsas: { tipo: 'partido', lista: ['Adolfo Alsina','Adolfo Gonzales Chaves','Alberti','Almirante Brown','Arrecifes','Avellaneda','Ayacucho','Azul','Bahía Blanca','Balcarce','Baradero','Benito Juárez','Berazategui','Berisso','Bolívar','Bragado','Brandsen','Campana','Cañuelas','Capitán Sarmiento','Carlos Casares','Carlos Tejedor','Carmen de Areco','Castelli','Chacabuco','Chascomús','Chivilcoy','Colón','Coronel Dorrego','Coronel Pringles','Coronel Rosales','Coronel Suárez','Daireaux','Dolores','Ensenada','Escobar','Esteban Echeverría','Exaltación de la Cruz','Ezeiza','Florencio Varela','Florentino Ameghino','General Alvarado','General Alvear','General Arenales','General Belgrano','General Guido','General Juan Madariaga','General La Madrid','General Las Heras','General Lavalle','General Paz','General Pinto','General Pueyrredón (Mar del Plata)','General Rodríguez','General San Martín','General Viamonte','General Villegas','Guaminí','Hipólito Yrigoyen','Hurlingham','Ituzaingó','José C. Paz','Junín','La Costa','La Matanza','La Plata','Lanús','Laprida','Las Flores','Leandro N. Alem','Lezama','Lincoln','Lobería','Lobos','Lomas de Zamora','Luján','Magdalena','Maipú','Malvinas Argentinas','Mar Chiquita','Marcos Paz','Mercedes','Merlo','Monte','Monte Hermoso','Moreno','Morón','Navarro','Necochea','Nueve de Julio','Olavarría','Patagones','Pehuajó','Pellegrini','Pergamino','Pila','Pilar','Pinamar','Presidente Perón','Puán','Punta Indio','Quilmes','Ramallo','Rauch','Rivadavia','Rojas','Roque Pérez','Saavedra','Saladillo','Salliqueló','Salto','San Andrés de Giles','San Antonio de Areco','San Cayetano','San Fernando','San Isidro','San Miguel','San Nicolás','San Pedro','San Vicente','Suipacha','Tandil','Tapalqué','Tigre','Tordillo','Tornquist','Trenque Lauquen','Tres Arroyos','Tres de Febrero','Tres Lomas','Vicente López','Villa Gesell','Villarino','Zárate'] },
    er: { tipo: 'localidad', lista: ['Basavilbaso','Bovril','Ceibas','Chajarí','Colón','Concepción del Uruguay','Concordia','Crespo','Diamante','Federación','Federal','General Ramírez','Gualeguay','Gualeguaychú','Hasenkamp','Ibicuy','La Paz','Larroque','Libertador San Martín','Liebig','Los Charrúas','María Grande','Nogoyá','Oro Verde','Paraná','Pueblo General Belgrano','Rosario del Tala','San Benito','San Jaime de la Frontera','San José','San José de Feliciano','San Salvador','Santa Elena','Seguí','Ubajay','Urdinarrain','Viale','Victoria','Villa del Rosario','Villa Elisa','Villa Paranacito','Villaguay'] },
    sf: { tipo: 'localidad', lista: ['Armstrong','Arroyo Seco','Avellaneda','Cañada de Gómez','Capitán Bermúdez','Carcarañá','Casilda','Cayastá','Ceres','Coronda','El Trébol','Esperanza','Firmat','Fray Luis Beltrán','Funes','Gálvez','Granadero Baigorria','Helvecia','Laguna Paiva','Las Rosas','Pérez','Puerto General San Martín','Rafaela','Reconquista','Recreo','Roldán','Rosario','Rufino','San Carlos Centro','San Javier','San Jorge','San Justo','San Lorenzo','Santa Fe','Santo Tomé','Sauce Viejo','Sunchales','Tostado','Totoras','Venado Tuerto','Vera','Villa Constitución','Villa Gobernador Gálvez','Villa Ocampo'] },
    ctes: { tipo: 'localidad', lista: ['Alvear','Bella Vista','Berón de Astrada','Caá Catí','Concepción','Corrientes','Curuzú Cuatiá','Empedrado','Esquina','Goya','Gobernador Virasoro','Itá Ibaté','Itatí','Ituzaingó','La Cruz','Lavalle','Mburucuyá','Mercedes','Mocoretá','Monte Caseros','Paso de la Patria','Paso de los Libres','Perugorría','Saladas','San Cosme','San Luis del Palmar','San Miguel','San Roque','Santa Lucía','Santo Tomé','Sauce','Yapeyú'] },
  };

  const MOTIVOS = ['Diagnóstico', 'Sospecha', 'Prevención', 'Tratamiento'];

  // Recorrido "Reconocer el picudo en 5 minutos". img: nombre en assets/images (sin extensión), vacío = sin foto.
  // no: true marca la tarjeta de "qué no hacer" (cruces en vez de tildes).
  const RECORRIDO = [
    { kicker: '1 de 4 · Qué es', titulo: 'Un gorgojo que daña desde adentro', img: 'picudo-rojo-adulto-uno',
      alt: 'Adulto de picudo rojo visto desde arriba: cuerpo rojizo con manchas negras en el dorso y pico largo y curvo',
      puntos: ['Es un insecto rojizo de 2 a 4 cm, con un pico curvo.', 'El daño lo hace la larva, que vive y come dentro de la palmera.', 'Por eso la palmera puede estar afectada meses antes de que se note algo desde afuera.'] },
    { kicker: '2 de 4 · Dónde mirar', titulo: 'Tres zonas de la palmera', img: 'partes-palmera',
      alt: 'Palmera con sus partes señaladas',
      puntos: ['La corona, el conjunto de hojas: si pierde su forma pareja.', 'Las hojas del centro, donde crece la palmera (cogollo): si se inclinan o se caen.', 'La base de las hojas, donde se unen al tronco: fibras deshilachadas, orificios y restos masticados.'] },
    { kicker: '3 de 4 · Signos', titulo: 'Qué señales buscar', img: 'signos-tempranos-picudo',
      alt: 'Signos tempranos de picudo rojo en una palmera',
      puntos: ['Hojas con muescas o cortes regulares.', 'Fibras deshilachadas, aserrín húmedo y olor a fermento.', 'Hojas centrales caídas: es un signo avanzado.', 'Un signo solo no confirma nada. Varios juntos justifican avisarnos.'] },
    { kicker: '4 de 4 · Qué no hacer', titulo: 'Ante una duda, no intervengas', img: '', no: true,
      puntos: ['No podes la palmera.', 'No trasladés hojas, restos ni ejemplares.', 'No apliques productos por tu cuenta.', 'No abras ni perfores el tronco para buscar larvas.'] },
  ];

  // Canales para consultar a Dr. Árbol. tipo: whatsapp | email | llamada. El mensaje lleva el motivo elegido.
  const CANALES_CONSULTA = [
    { id: 'whatsapp', label: 'Escribir por WhatsApp', tipo: 'whatsapp', mensaje: 'Hola, escribo desde la app Alerta Picudo Rojo.' },
    { id: 'visita', label: 'Solicitar una visita técnica', tipo: 'whatsapp', mensaje: 'Hola, quiero solicitar una visita técnica para evaluar palmeras.' },
    { id: 'email', label: 'Enviar un email', tipo: 'email', asunto: 'Consulta desde la app', mensaje: 'Hola,\n\nCuento mi situación:\n\n\n(Adjunto las fotografías de la palmera.)' },
    { id: 'llamada', label: 'Llamar', tipo: 'llamada' },
  ];

  // Canal de contacto de la iniciativa. El WhatsApp va sin signos ni espacios,
  // con código de país y el 9 de celular que exige wa.me.
  const CONTACTO = {
    whatsapp: '5491125772020',
    whatsappLegible: '+54 9 11 2577-2020',
    telefono: '+5491125772020',
    telefonoLegible: '+54 9 11 2577-2020',
    email: 'picudorojoalerta@gmail.com',
    emailPendiente: false,
  };

  function enlaceWhatsapp(mensaje) {
    return 'https://wa.me/' + CONTACTO.whatsapp + '?text=' + encodeURIComponent(mensaje);
  }

  function enlaceEmail(asunto, cuerpo) {
    return 'mailto:' + CONTACTO.email + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
  }

  // Enlace público de la app. Mientras esté vacío, el botón de compartir manda
  // el mensaje sin link y avisa que falta publicarla.
  const APP = { url: 'https://www.picudorojoalerta.com.ar' };

  function mensajeCompartirApp() {
    const base = 'Te paso la app Alerta Picudo Rojo: sirve para reconocer los signos del picudo rojo en palmeras y saber cómo actuar. Es gratuita y no necesita cuenta.';
    return APP.url ? base + '\n\n' + APP.url : base;
  }

  function enlaceCompartirApp() {
    return 'https://wa.me/?text=' + encodeURIComponent(mensajeCompartirApp());
  }

  // Canales oficiales del Senasa (organismo nacional competente).
  // Verificar contra argentina.gob.ar/senasa antes de cada publicación.
  const SENASA = {
    email: 'dief@senasa.gob.ar',
    emailNota: 'Correo indicado por el Senasa para avisos de picudo rojo',
    whatsapp: '5491135859810',
    whatsappLegible: '+54 9 11 3585-9810',
    whatsappNota: 'WhatsApp federal #SenasaResponde · asistente 24 h, atención personalizada días hábiles de 9 a 17 h',
    telefono: '+541141215000',
    telefonoLegible: '(011) 4121-5000',
    gratuito: '08009992386',
    gratuitoLegible: '0800-999-2386',
    sitio: 'https://www.argentina.gob.ar/senasa',
    sitioNota: 'Formulario de denuncia y Geoportal con información oficial de la plaga',
    procedencia: 'Correo dief@senasa.gob.ar: comunicados del Senasa sobre picudo rojo. Consultado en septiembre de 2026 — reconfirmar antes de cada publicación.',
  };

  function enlaceSenasaEmail(asunto, cuerpo) {
    return 'mailto:' + SENASA.email + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
  }

  function enlaceSenasaWhatsapp(mensaje) {
    return 'https://wa.me/' + SENASA.whatsapp + '?text=' + encodeURIComponent(mensaje);
  }

  // Avisos del resultado del test. Todo es editable: cuándo se pide avisar primero al Senasa
  // y los textos que se muestran y se mandan. Los ids de síntomas son los de SINTOMAS.
  const AVISOS = {
    senasa: {
      // Cuándo el primer paso es el Senasa (y no Dr. Árbol):
      sintomasQueDisparan: ['larvas', 'insectos'], // alcanza con uno de estos
      pideVerAdulto: true,                         // además, que diga que vio el insecto adulto
      nivelesPrimero: ['moderado', 'alto'],        // y que el nivel sea uno de estos
      // Pregunta del paso 2 (aparece si marcó alguno de sintomasQueDisparan):
      preguntaAdulto: 'Vi el insecto adulto',
      preguntaAdultoAyuda: 'Un gorgojo rojizo de pico curvo, de 2 a 4 cm, en la palmera o cerca.',
      // Panel del resultado cuando corresponde avisar primero:
      tituloPrimero: 'Avisá al Senasa',
      textoPrimero: 'Marcaste larvas o insectos y viste el adulto: es el caso en que el organismo oficial tiene que enterarse primero. Después, si querés, mandanos la alerta.',
      // Panel desplegable para el resto de los casos (nivel en nivelesOpcional):
      nivelesOpcional: ['moderado', 'alto'],
      tituloOpcional: 'También podés avisar al Senasa',
      nota: 'El email y el WhatsApp se abren con los datos de tu revisión. Adjuntá las fotos antes de enviar.',
      // Texto que viaja en el email o WhatsApp:
      asunto: 'Aviso de posible picudo rojo',
      encabezado: 'Aviso de palmera con signos compatibles con picudo rojo.',
      lineaAdulto: 'Vi un insecto adulto en la palmera o cerca.',
      cierre: 'Aviso generado con la app Alerta Picudo Rojo (iniciativa educativa de Dr. Árbol). Es una observación ciudadana, no un diagnóstico.',
    },
  };

  const OTRAS_CAUSAS = ['Daños mecánicos', 'Problemas nutricionales', 'Pudriciones', 'Estrés hídrico', 'Daño por poda', 'Salinidad'];

  const DATOS_PERSONALES = [
    { dato: 'Ubicación', uso: 'Para saber a qué provincia derivar el reporte y mostrarte la información correspondiente. Se guarda aproximada.' },
    { dato: 'Fotografías', uso: 'Para la orientación inicial y la derivación. Se procesan en tu teléfono y se reducen antes de enviarse.' },
    { dato: 'Email', uso: 'Para responderte y darte seguimiento del reporte.' },
    { dato: 'Síntomas marcados', uso: 'Para calcular el nivel de alerta y, de forma agregada y anónima, conocer los síntomas más frecuentes por zona.' },
    { dato: 'Notificaciones', uso: 'Solo si las activás. Podés desactivarlas en cualquier momento.' },
  ];

  // IMPORTANTE: los pesos de SINTOMAS y los cortes de nivel son estimaciones
  // pendientes de validación técnica. No publicarlos como criterio oficial.
  const SOLO_BASE = ['orificios', 'aserrin']; // solo daño en la base: suele ser escarabajo rinoceronte

  // El cálculo del nivel vive en lib/evaluador.js y usa estos datos (una sola fuente).

  // El peso numérico queda solo en el cálculo: al ciudadano se le muestra una
  // etiqueta cualitativa, para que no se lea como una fórmula de diagnóstico.
  const GRADO_LABEL = { alto: 'señal de peso alto', medio: 'señal de peso medio', bajo: 'señal de peso leve' };

  const ESCALA = [
    { id: 'bajo', label: 'Bajo', nota: 'sin señales relevantes' },
    { id: 'moderado', label: 'Moderado', nota: 'conviene observar' },
    { id: 'alto', label: 'Alto', nota: 'te recomendamos avisarnos' },
  ];

  const NIVELES = {
    bajo: { titulo: 'Nivel de alerta bajo', resumen: 'No marcaste signos visibles. Esto no descarta el picudo rojo, que puede avanzar meses sin mostrarse. Volvé a revisar tu palmera en unas semanas.' },
    moderado: { titulo: 'Nivel de alerta moderado', resumen: 'Hay signos que ameritan una evaluación. No significa que la palmera tenga picudo rojo: varios problemas producen síntomas parecidos.' },
    alto: { titulo: 'Nivel de alerta alto', resumen: 'La combinación de signos que marcaste es compatible con actividad de un insecto perforador. Avisanos para que hagamos una preevaluación.' },
  };

  window.APR_CONTENIDO = { ESPECIES, SINTOMAS, TOMAS, ARTICULOS, PLAGAS, ETAPAS, QUE_HACER, QUE_NO_HACER, JURISDICCIONES, MOTIVOS, CONTACTO, enlaceWhatsapp, enlaceEmail, APP, mensajeCompartirApp, enlaceCompartirApp, CICLO_LAMINA, SENASA, enlaceSenasaEmail, enlaceSenasaWhatsapp, AVISOS, RECORRIDO, CANALES_CONSULTA, OTRAS_CAUSAS, DATOS_PERSONALES, SOLO_BASE, NIVELES, ESCALA, GRADO_LABEL, LOCALIDADES };
})();
