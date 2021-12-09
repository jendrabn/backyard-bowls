import DrawerInitiator from '../utils/drawer-initiator';
import ScrollTopInitiator from '../utils/scroll-top-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

// Components
import './components/navbar-component';
import './components/footer-component';
import './components/hero-component';
import './components/restaurant-item';
import './components/toast-component';

export default class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
    ScrollTopInitiator.init(document.querySelector('.scroll-top'));
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}
