const ModalInitiator = {
  init({
    openButton, closeButton, modal, onClose, onShow,
  }) {
    this._modal = modal;
    this._onShow = onShow;
    this._onClose = onClose;

    openButton.addEventListener('click', () => this.show());
    closeButton.addEventListener('click', () => this.close());

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        this.close();
      }
    });
  },

  show() {
    this._modal.style.display = 'block';
    if (typeof this._onShow === 'function') {
      this._onShow();
    }
  },

  close() {
    this._modal.style.display = 'none';
    if (typeof this._onClose === 'function') {
      this._onClose();
    }
  },
};

export default ModalInitiator;
