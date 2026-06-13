import toastr from 'toastr';
import createFavoriteButton from '../views/templates/create-favorite-button';
import FavoriteRestaurantService from '../services/favorite-restaurant-idb.service';

const FavoriteButtonInitiator = {
  async init({ button, restaurant }) {
    this._buttonContainer = button;
    this._restaurant = restaurant;
    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;
    const isFavorite = id && await this._isRestaurantExist(id);
    this._renderButtonContent(isFavorite);
  },

  _renderButtonContent(isFavorite) {
    this._buttonContainer.innerHTML = createFavoriteButton(!isFavorite);
    const btn = this._buttonContainer.querySelector('.btn-favorite');

    btn.addEventListener('click', async () => {
      try {
        if (isFavorite) {
          await FavoriteRestaurantService.delete(this._restaurant.id);
          toastr.success('Successfully removed from favorites', 'Success!');
        } else {
          await FavoriteRestaurantService.put(this._restaurant);
          toastr.success('Successfully added to favorites', 'Success!');
        }
        await this._renderButton();
      } catch (error) {
        toastr.error(error.message || error);
      }
    });
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantService.detail(id);
    return !!restaurant;
  },
};

export default FavoriteButtonInitiator;
