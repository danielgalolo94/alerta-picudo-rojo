// Shim de DCLogic: clase base mínima para que app.dc.js no falle al definir
// la clase Component. app.dc.js extiende DCLogic; si no existe, la app se
// rompe antes de renderizar nada. Este shim provee setState y ciclos de vida
// básicos para que el componente pueda montarse.
window.DCLogic = window.DCLogic || class DCLogic {
  constructor() {
    this.state = {};
  }
  setState(updater) {
    const next = typeof updater === 'function' ? updater(this.state) : updater;
    this.state = { ...this.state, ...next };
    if (this.onRender) this.onRender();
  }
  componentDidMount() {}
  componentWillUnmount() {}
};
