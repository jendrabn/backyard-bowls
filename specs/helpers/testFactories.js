/* eslint-disable import/prefer-default-export */
import FavoriteButtonInitiator from '../../src/scripts/utils/favorite-button-initiator';

export const createFavoriteButtonWithRestaurant = async (restaurant) => {
  await FavoriteButtonInitiator.init({ button: document.querySelector('.btn-favorite-wrapper'), restaurant });
};
