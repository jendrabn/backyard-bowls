const DrawerInitiator = {
  init({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._overlay = this._createOverlay();

    button.addEventListener('click', (event) => {
      this._toggleDrawer(event);
    });

    this._overlay.addEventListener('click', () => {
      this._closeDrawer();
    });

    content.addEventListener('click', () => {
      this._closeDrawer();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this._drawer.classList.contains('active')) {
        this._closeDrawer();
      }
    });
  },

  _createOverlay() {
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      document.body.appendChild(overlay);
    }
    return overlay;
  },

  _toggleDrawer(event) {
    event.stopPropagation();
    this._drawer.classList.toggle('active');
    this._button.classList.toggle('active');
    this._overlay.classList.toggle('active');
    document.body.style.overflow = this._drawer.classList.contains('active') ? 'hidden' : '';
  },

  _closeDrawer() {
    this._drawer.classList.remove('active');
    this._button.classList.remove('active');
    this._overlay.classList.remove('active');
    document.body.style.overflow = '';
  },
};

export default DrawerInitiator;
