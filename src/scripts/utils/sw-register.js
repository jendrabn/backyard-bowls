import { Workbox } from 'workbox-window';

const swRegister = () => {
  if ('serviceWorker' in navigator) {
    const workbox = new Workbox('../sw.js');
    workbox.register();
  } else {
    console.log('Service worker not supported in this browser');
  }
};

export default swRegister;
