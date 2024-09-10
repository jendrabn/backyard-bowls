class NavbarComponent extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <header class="header">
          <nav class="navbar container">
              <a href="/" class="nav-logo">Backyard<span>Bowls.</span></a>
              <button class="hamburger" aria-label="navigation-menu">
                  <div>
                      <span class="bar"></span>
                      <span class="bar"></span>
                      <span class="bar"></span>
                  </div>
              </button>
              <ul class="nav-menu">
                  <li class="nav-item">
                      <a href="/#/home" class="nav-link">Home</a>
                  </li>
                  <li class="nav-item">
                      <a href="/#/favorite" class="nav-link">Favorite</a>
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
