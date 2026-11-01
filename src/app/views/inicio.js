// Vista de inicio.

import { C } from '../data.js';
import { esc, ico } from '../ui.js';

function acceso(icono, titulo, sub, href, externo) {
  return `
  <a class="acceso marco" href="${esc(href)}"${externo ? ' target="_blank" rel="noopener"' : ''}>
    <span class="acceso-ico">${ico(icono)}</span>
    <span class="acceso-txt"><h3>${esc(titulo)}</h3><p>${esc(sub)}</p></span>
    <span class="acceso-flecha" aria-hidden="true">›</span>
  </a>`;
}

export function vistaInicio() {
  return `
  <section class="hero marco">
    <img class="hero-palma" src="assets/logo.webp" alt="" aria-hidden="true">
    <div class="hero-copy">
      <p class="eyebrow claro">Iniciativa Dr. Árbol · Orientación ciudadana</p>
      <h1>¿Tu palmera está en riesgo?</h1>
      <p class="lead">El picudo rojo se detecta mirando. Revisá las señales visibles en 4 pasos y, si algo no cierra, avisanos.</p>
      <div class="hero-acciones">
        <button type="button" class="btn btn-rojo" data-action="empezar-test">Hacer el test en 4 pasos ${ico('flecha')}</button>
        <a class="btn btn-linea-clara" href="#/recorrido/1">Aprender a reconocerlo</a>
      </div>
      <ul class="hero-datos"><li>4 pasos</li><li>2 minutos</li><li>Sin registro</li></ul>
    </div>
    <figure class="hero-fig marco">
      <img src="assets/images/picudo-rojo-adulto-uno.webp" alt="Adulto del picudo rojo: cuerpo rojizo, pico curvo y manchas oscuras en el dorso" fetchpriority="high">
      <figcaption><strong>Rhynchophorus ferrugineus</strong><span>Adulto · 2 a 4 cm</span></figcaption>
    </figure>
  </section>

  <section class="seccion">
    <div class="seccion-head">
      <p class="eyebrow">Empezá por acá</p>
      <h2>¿Qué necesitás hacer?</h2>
    </div>
    <div class="accesos">
      ${acceso('libro', 'Aprender sobre el picudo', 'Biblioteca, ciclo biológico y mitos', '#/aprender')}
      ${acceso('escudo', '¿Qué hago si sospecho?', 'Qué hacer y qué no hacer', '#/sospecho')}
      ${acceso('alerta', 'Enviar una alerta', 'Reportá una palmera sospechosa', '#/alerta')}
      ${acceso('arbol', 'Consultar a Dr. Árbol', 'Evaluación profesional y prevención', '#/drarbol')}
    </div>
  </section>

  <section class="banda seccion">
    <div class="banda-img marco">
      <img src="assets/images/signos-tempranos-picudo.webp" alt="Palmera con signos tempranos de picudo rojo: hojas con muescas y fibras dañadas" loading="lazy">
    </div>
    <div class="banda-copy">
      <p class="eyebrow">Lo que hay que mirar</p>
      <h2>Un signo solo no alcanza. Varios juntos, sí.</h2>
      <p>Hojas con muescas, fibras deshilachadas, aserrín húmedo u orificios en la base de las hojas. Si ves más de uno, hacé el test.</p>
      <ul class="lista-check">
        <li>Empezá por la corona y el cogollo.</li>
        <li>Mirá la base de las hojas, sin abrir el tronco.</li>
        <li>Sacá fotos con luz de día y compará en el tiempo.</li>
      </ul>
      <a class="btn btn-verde" href="#/test">Revisar mi palmera ${ico('flecha')}</a>
    </div>
  </section>

  <section class="seccion">
    <div class="seccion-head">
      <p class="eyebrow">Cómo funciona</p>
      <h2>Cuatro pasos, dos minutos</h2>
    </div>
    <ol class="como">
      <li><span class="como-num">01</span><h3>Elegí la especie</h3><p>Canaria, datilera, pindó, butiá o washingtonia. Si no sabés, se identifica con fotos.</p></li>
      <li><span class="como-num">02</span><h3>Marcá los signos</h3><p>Hojas caídas, orificios, aserrín, larvas. La combinación orienta el nivel de alerta.</p></li>
      <li><span class="como-num">03</span><h3>Sumá fotos</h3><p>Opcionales. Se reducen en tu teléfono y quedan guardadas en el reporte.</p></li>
      <li><span class="como-num">04</span><h3>Enviá la alerta</h3><p>Compartila con Dr. Árbol o el Senasa. Es orientación ciudadana, no un diagnóstico.</p></li>
    </ol>
  </section>

  <section class="cta-final marco">
    <div>
      <p class="eyebrow claro">Detección temprana</p>
      <h2>Detectar a tiempo cambia el final.</h2>
      <p>Una revisión de dos minutos puede evitar que el problema avance hacia las palmeras de toda la cuadra.</p>
    </div>
    <div class="cta-final-acciones">
      <button type="button" class="btn btn-rojo" data-action="empezar-test">Empezar el test</button>
      <a class="btn btn-linea-clara" href="#/alerta">Enviar una alerta</a>
    </div>
  </section>`;
}
