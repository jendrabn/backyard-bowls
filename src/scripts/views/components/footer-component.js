class FooterComponent extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
            <footer>
                <div class="inner-footer container">
                    Copyright © 2021 All Rights Reserved by <a href="/">Backyard Bowls</a>
                </div>
            </footer>
            `;
  }
}

customElements.define('footer-component', FooterComponent);
