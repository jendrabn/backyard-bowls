import { Workbox } from 'workbox-window';

const swRegister = () => {
  if ('serviceWorker' in navigator) {
    new Workbox('../sw.js')
      .register()
      .then(() => console.info('Service worker registered'));

    return;
  }

  console.info('Service worker not supported in this browser');
};

export default swRegister;
