const ModalInitiator = {
  init({
    openButton, closeButton, modal, onClose, onShow,
  }) {
    this._openButton = openButton;
    this._closeButton = closeButton;
    this._modal = modal;
    this._onShow = onShow;
    this._onClose = onClose;

    this._initModal();
  },
  close() {
    this._modal.style.display = 'none';
    if (this._onClose) {
      this._onClose();
    }
  },
  show() {
    this._modal.style.display = 'block';
    if (this.onShow) {
      this._onShow();
    }
  },
  _initModal() {
    this._openButton.addEventListener('click', () => {
      this.show();
    });

    this._closeButton.addEventListener('click', () => {
      this.close();
    });

    window.addEventListener('click', (event) => {
      if (event.target === this._modal) {
        this.close();
      }
    });
  },

};

export default ModalInitiator;
