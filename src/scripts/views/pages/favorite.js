import favoriteRestaurantService from "../../services/favorite-restaurant-idb.service";
import { renderLoading, renderError } from "../../utils/helpers";

const Favorite = {
  async render() {
    document.title = "My Favorite — Backyard Bowls";
    return `
      <div class="container">
        <div class="content" style="margin-top: 20px;">
          <div class="content-header">
            <h2>Restoran Favorit Anda</h2>
            <p>Jelajahi daftar terpilih untuk restoran, kafe, dan bar terbaik di dan di sekitar Anda, berdasarkan tren</p>
          </div>
          <div class="content-body" id="mainContent">
          </div>
        </div>
      </div>`;
  },
  async afterRender() {
    const container = document.getElementById("mainContent");
    renderLoading(container);

    try {
      const restaurants = await favoriteRestaurantService.list();
      if (restaurants && restaurants.length > 0) {
        container.innerHTML =
          '<div class="card-list" id="restaurantList"></div>';
        const restaurantContainer = document.getElementById("restaurantList");
        restaurants.forEach((restaurant) => {
          const card = document.createElement("restaurant-item");
          card.restaurant = restaurant;
          restaurantContainer.appendChild(card);
        });
      } else {
        throw Error("Belum ada data restoran favorit");
      }
    } catch (error) {
      renderError(container, error.message || error);
    }
  },
};

export default Favorite;
