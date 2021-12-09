/* eslint-disable linebreak-style */
import 'regenerator-runtime'; /* for async await transpile */
import '../scss/style.scss';
import App from './views/app';
import swRegister from './utils/sw-register';
import WebSocketInitiator from './utils/websocket-initiantor';
import CONFIG from './config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('.hamburger'),
  drawer: document.querySelector('.nav-menu'),
  content: document.querySelector('#app'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});
