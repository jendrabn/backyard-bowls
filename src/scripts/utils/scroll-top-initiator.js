const ScrollTopInitiator = {
  init(element) {
    this._element = element;
    this._setEvent();
  },
  _setEvent() {
    const scrollTop = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    window.addEventListener('scroll', () => {
      const navbarHeight = document.querySelector('nav.navbar').clientHeight;
      if (pageYOffset > navbarHeight) {
        this._element.classList.add('show');
      } else {
        this._element.classList.remove('show');
      }
    });
    this._element.addEventListener('click', () => scrollTop());
  },
};

export default ScrollTopInitiator;
