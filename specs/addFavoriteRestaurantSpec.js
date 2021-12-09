import { createFavoriteButtonWithRestaurant } from './helpers/testFactories';
import favoriteRestaurantService from '../src/scripts/services/favorite-restaurant-idb.service';

describe('Add favorite restaurant to IndexedDB', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = `
    <div class="btn-favorite-wrapper"></div>
    <div class="toast-container bottom-left"></div>
    `;
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });
    expect(document.querySelector('button.add[aria-label="add to favorites"]')).toBeTruthy();
  });

  it('should not show the unfavorite button when the restairant has not been favorited before', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });
    expect(document.querySelector('button.un[aria-label="remove from favorites"]')).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });
    document.querySelector('button.btn-favorite').dispatchEvent(new Event('click'));
    const restaurant = await favoriteRestaurantService.getById(1);
    expect(restaurant).toEqual({ id: 1 });
    favoriteRestaurantService.delete(1);
  });

  it('should not add a restaurant again when its already favorited', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });
    await favoriteRestaurantService.put({ id: 1 });
    document.querySelector('button.btn-favorite').dispatchEvent(new Event('click'));
    expect(await favoriteRestaurantService.getAll()).toEqual([{ id: 1 }]);
    favoriteRestaurantService.delete(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await createFavoriteButtonWithRestaurant({});
    document.querySelector('button.btn-favorite').dispatchEvent(new Event('click'));
    expect(await favoriteRestaurantService.getAll()).toEqual([]);
  });
});
