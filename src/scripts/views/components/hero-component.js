class HeroComponent extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
    <div class="hero">
        <picture>
            <source type="image/webp" srcset="./images/hero-small.webp" media="(max-width: 600px) ">
            <source type="image/webp" srcset="./images/hero-large.webp" media="(min-width: 601px)">
            <img class="lazyload" src="./images/hero-placeholder.jpg" width="500" height="250"
                srcset="./images/hero-small.jpg 480w, ./images/hero-large.jpg 800w" sizes="(max-width: 600px) 480px, 800px"
                alt="Hero">
        </picture>
        <div class="inner-hero">
            <h1>Backyard Bowls</h1>
            <p>Temukan makanan & minuman terbaik di sekitar Anda</p>
        </div>
    </div>
    `;
  }
}

customElements.define('hero-component', HeroComponent);
