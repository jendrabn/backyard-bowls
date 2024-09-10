import RestaurantService from '../../services/restaurant.service';
import debounce from '../../utils/debounce';
import { renderLoading, renderError } from '../../utils/helpers';

const Home = {
  async render() {
    document.title = 'Home — Backyard Bowls';
    return `
      <hero-component></hero-component>
      <div class="container">
          <div class="search ">
              <div><button aria-label="show-restaurants" role="button" id="btnShowAll" class="btn-search" type="button">Show all restaurants</button></div>
              <div class="search-bar">
                  <span><i class="fas fa-search"></i></span>
                  <input type="text" class="search-input" id="inputSearch" placeholder="Search Restaurant" aria-label="search-restaurant">
              </div>
          </div>
          <div class="content" style="margin-top: 20px;">
              <div class="content-header">
                  <h2>Semua Restoran</h2>
                  <p>Jelajahi daftar terpilih untuk restoran, kafe, dan bar terbaik di dan di sekitar Anda, berdasarkan tren
                  </p>
              </div>
              <div class="content-body" id="mainContent">
              </div>
          </div>
      </div>`;
  },
  async afterRender() {
    const inputSearch = document.getElementById('inputSearch');
    const btnShowAll = document.getElementById('btnShowAll');

    await this._renderContent();

    btnShowAll.addEventListener(
      'click',
      debounce(() => {
        inputSearch.value = '';
        this._renderContent();
      }, 300),
    );

    inputSearch.addEventListener(
      'input',
      debounce((event) => this._renderContent(event.target.value), 300),
    );
  },
  async _renderContent(searchKeyword = '') {
    const mainContentElement = document.getElementById('mainContent');
    try {
      renderLoading(mainContentElement);

      const { restaurants } = searchKeyword
        ? await RestaurantService.search(searchKeyword)
        : await RestaurantService.list();

      this._renderRestaurants(mainContentElement, restaurants);
    } catch (error) {
      renderError(mainContentElement, error.message || error);
    }
  },
  _renderRestaurants(container, restaurants) {
    if (restaurants.length > 0) {
      container.innerHTML = '<div class="card-list" id="restaurantList"></div>';
      const restaurantListElement = document.getElementById('restaurantList');

      restaurantListElement.innerHTML = '';

      restaurants.forEach((restaurant) => {
        const restaurantCard = document.createElement('restaurant-item');
        restaurantCard.restaurant = restaurant;
        restaurantListElement.appendChild(restaurantCard);
      });
    } else {
      renderError(container, 'No restaurants found');
    }
  },
};

export default Home;
