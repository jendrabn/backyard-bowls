import toastr from 'toastr';
import createFavoriteButton from '../views/templates/create-favorite-button';
import favoriteRestaurantService from '../services/favorite-restaurant-idb.service';

const FavoriteButtonInitiator = {
  async init({ button, restaurant }) {
    this._button = button;
    this._restaurant = restaurant;
    await this._renderButton();
  },
  async _renderButton() {
    const { id } = this._restaurant;
    if (id && (await this._isRestaurantExist(id))) {
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
          toastr.success('Successfully added to favorites', 'Success!');
        } else {
          await favoriteRestaurantService.delete(this._restaurant.id);
          toastr.success('Successfully removed from favorites', 'Success!');
        }
        await this._renderButton();
      } catch (error) {
        toastr.error(error.message || error);
      }
    });
  },
  async _isRestaurantExist(id) {
    const restaurant = await favoriteRestaurantService.detail(id);
    return !!restaurant;
  },
};

export default FavoriteButtonInitiator;
