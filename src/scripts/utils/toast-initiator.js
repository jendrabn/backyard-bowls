const Toast = {
  show(message = 'No message...') {
    this._container = document.querySelector('.toast-container');
    this._container.innerHTML = '';
    const ToastComponent = document.createElement('toast-component');
    ToastComponent.message = message;
    this._container.appendChild(ToastComponent);
    ToastComponent.classList.add('toast', 'show');

    setTimeout(() => {
      ToastComponent.classList.remove('show');
    }, 3000);
  },
};

export default Toast;
