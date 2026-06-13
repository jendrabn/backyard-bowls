const ScrollTopInitiator = {
  init(element) {
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('nav.navbar');
      const shouldShow = pageYOffset > navbar.clientHeight;
      element.classList.toggle('show', shouldShow);
    });

    element.addEventListener('click', () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  },
};

export default ScrollTopInitiator;
