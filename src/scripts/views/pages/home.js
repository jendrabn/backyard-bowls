import restaurantService from "../../services/restaurant.service";
import { renderLoading, renderError } from "../../utils/helpers";

const Home = {
  async render() {
    document.title = "Home — Backyard Bowls";
    return `
      <hero-component></hero-component>
      <div class="container">
          <div class="search ">
              <div><button aria-label="show-restaurants" role="button" class="btn-search" type="button">Show all restaurants</button></div>
              <div class="search-bar">
                  <span><i class="fas fa-search"></i></span>
                  <input type="text" class="search-input" placeholder="Search restaurants" aria-label="search-restaurant">
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
      </div>
    `;
  },
  async afterRender() {
    await this._renderContent();
    const searchInput = document.querySelector(".search-input");

    document
      .querySelector(".btn-search")
      .addEventListener("click", async () => {
        searchInput.value = "";
        await this._renderContent();
      });

    searchInput.addEventListener("input", (event) => {
      setTimeout(async () => {
        const { value } = event.target;
        await this._renderContent(value);
      }, 500);
    });
  },
  async _renderContent(keyword = "") {
    const container = document.getElementById("mainContent");
    renderLoading(container);
    try {
      if (keyword && keyword.length > 0) {
        const { restaurants } = await restaurantService.search(keyword);
        this._renderRestaurants(container, restaurants);
      } else {
        const { restaurants } = await restaurantService.list();
        this._renderRestaurants(container, restaurants);
      }
    } catch (error) {
      renderError(container, error.message || error);
    }
  },
  _renderRestaurants(container, restaurants) {
    if (restaurants && restaurants.length > 0) {
      container.innerHTML = '<div class="card-list" id="restaurantList"></div>';
      const restaurantContainer = document.getElementById("restaurantList");
      restaurants.forEach((restaurant) => {
        const card = document.createElement("restaurant-item");
        card.restaurant = restaurant;
        restaurantContainer.appendChild(card);
      });
    } else {
      throw Error("Data restoran tidak ditemukan");
    }
  },
};

export default Home;
