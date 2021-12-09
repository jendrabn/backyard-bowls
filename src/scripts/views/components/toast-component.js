class ToastComponent extends HTMLElement {
  set message(message) {
    this._message = message;
    this._render();
  }

  _render() {
    this.innerHTML = `
        <div>
          ${this._message}
        </div>
    `;
  }
}

customElements.define('toast-component', ToastComponent);
