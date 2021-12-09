const DrawerInitiator = {
  init({ button, drawer, content }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(button, event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(button, event, drawer);
    });
  },

  _toggleDrawer(button, event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('active');
    button.classList.toggle('active');
  },

  _closeDrawer(button, event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('active');
    button.classList.remove('active');
  },
};

export default DrawerInitiator;
