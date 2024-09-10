import FavoriteRestaurantService from '../../services/favorite-restaurant-idb.service';
import { renderLoading, renderError } from '../../utils/helpers';

const Favorite = {
  async render() {
    document.title = 'My Favorite — Backyard Bowls';
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
    const mainContent = document.getElementById('mainContent');

    try {
      renderLoading(mainContent);
      const favoriteRestaurants = await FavoriteRestaurantService.list();

      if (favoriteRestaurants.length > 0) {
        mainContent.innerHTML = '<div class="card-list" id="restaurantList"></div>';
        const restaurantList = document.getElementById('restaurantList');
        favoriteRestaurants.forEach((restaurant) => {
          const restaurantCard = document.createElement('restaurant-item');
          restaurantCard.restaurant = restaurant;
          restaurantList.appendChild(restaurantCard);
        });
      } else {
        renderError(mainContent, 'No favorite restaurants found');
      }
    } catch (error) {
      renderError(mainContent, error.message);
    }
  },
};

export default Favorite;
