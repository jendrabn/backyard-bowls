class NavbarComponent extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <header class="site-header">
          <nav class="navbar container">
              <a href="/" class="nav-logo">Backyard<span>Bowls.</span></a>
              <button class="nav-toggle" aria-label="navigation-menu">
                  <span class="nav-toggle__bar"></span>
                  <span class="nav-toggle__bar"></span>
                  <span class="nav-toggle__bar"></span>
              </button>
              <ul class="nav-menu">
                  <li class="nav-item">
                      <a href="/home" class="nav-link">Home</a>
                  </li>
                  <li class="nav-item">
                      <a href="/favorite" class="nav-link">Favorite</a>
                  </li>
                  <li class="nav-item">
                      <a href="https://github.com/jendrabn" class="nav-link" target="_blank" rel="noreferrer">About
                          Me</a>
                  </li>
              </ul>
          </nav>
      </header>`;
  }
}

customElements.define('navbar-component', NavbarComponent);
