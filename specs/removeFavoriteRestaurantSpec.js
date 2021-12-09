import { createFavoriteButtonWithRestaurant } from './helpers/testFactories';
import favoriteRestaurantService from '../src/scripts/services/favorite-restaurant-idb.service';

describe('Remove favorite restaurant from IndexedDB', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = `
    <div class="btn-favorite-wrapper"></div>
    <div class="toast-container bottom-left"></div>
    `;
  };

  beforeEach(async () => {
    addFavoriteButtonContainer();
    await favoriteRestaurantService.put({ id: 1 });
  });

  afterEach(async () => {
    await favoriteRestaurantService.delete(1);
  });

  it('should display unfavorite button when the restaurant has been favorited', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });
    expect(document.querySelector('button.un[aria-label="remove from favorites"]')).toBeTruthy();
  });

  it('should not display favorite button when the restaurant has been favorited', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });
    expect(document.querySelector('button.add[aria-label="add to favorites"]')).toBeFalsy();
  });

  it('should be able to remove favorited restaurant from the list', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });
    document.querySelector('button.btn-favorite').dispatchEvent(new Event('click'));
    expect(await favoriteRestaurantService.getAll()).toEqual([]);
  });

  it('should not throw error if the unfavorite restaurant is not in the list', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });
    await favoriteRestaurantService.delete(1);
    document.querySelector('button.btn-favorite').dispatchEvent(new Event('click'));
    expect(await favoriteRestaurantService.getAll()).toEqual([]);
  });
});
