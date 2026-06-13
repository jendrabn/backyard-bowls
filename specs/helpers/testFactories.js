import FavoriteButtonInitiator from '../../src/scripts/utils/favorite-button-initiator';

export const createFavoriteButtonContainer = () => {
  document.body.innerHTML = `
    <div class="btn-favorite-wrapper"></div>
    <div class="toast-container bottom-left"></div>
  `;
};

export const createFavoriteButtonWithRestaurant = async (restaurant) => {
  await FavoriteButtonInitiator.init({
    button: document.querySelector('.btn-favorite-wrapper'),
    restaurant,
  });
};
