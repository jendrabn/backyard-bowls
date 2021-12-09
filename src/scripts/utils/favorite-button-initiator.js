import createFavoriteButton from '../views/templates/create-favorite-button';
import favoriteRestaurantService from '../services/favorite-restaurant-idb.service';
import Toast from './toast-initiator';

const FavoriteButtonInitiator = {
  async init({ button, restaurant }) {
    this._button = button;
    this._restaurant = restaurant;
    await this._renderButton();
  },
  async _renderButton() {
    const { id } = this._restaurant;
    if (id && await this._isRestaurantExist(id)) {
      this._renderFavoriteButton(false);
    } else {
      this._renderFavoriteButton(true);
    }
  },
  _renderFavoriteButton(add = false) {
    this._button.innerHTML = createFavoriteButton(add);
    const btnFavorite = document.querySelector('.btn-favorite');

    btnFavorite.addEventListener('click', async () => {
      try {
        if (add) {
          await favoriteRestaurantService.put(this._restaurant);
          Toast.show('Successfully added to favorites');
        } else {
          await favoriteRestaurantService.delete(this._restaurant.id);
          Toast.show('Successfully removed from favorites');
        }
        await this._renderButton();
      } catch (error) {
        Toast.show(error.message || error);
      }
    });
  },
  async _isRestaurantExist(id) {
    const restaurant = await favoriteRestaurantService.getById(id);
    return !!restaurant;
  },
};

export default FavoriteButtonInitiator;
