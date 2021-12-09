const TabInitiator = {
  init({ tabLink, tabContent, tabOpen }) {
    this._tabLink = tabLink;
    this._tabContent = tabContent;
    this._tabOpen = tabOpen;
    this._initTab();
  },
  _initTab() {
    this._tabLink.forEach((element) => {
      this._tabLinkEvent(element);
    });

    this._tabOpen.click();
  },
  _tabLinkEvent(tabLink) {
    tabLink.addEventListener('click', (event) => {
      this._tabContent.forEach((element) => {
        element.style.display = 'none';
      });

      this._tabLink.forEach((element) => {
        element.className = element.className.replace('active', '');
      });
      const { target } = event.target.dataset;
      document.getElementById(target).style.display = 'block';
      event.target.className += ' active';
    });
  },
};

export default TabInitiator;
