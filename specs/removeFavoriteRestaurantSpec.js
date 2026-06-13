import {
  createFavoriteButtonContainer,
  createFavoriteButtonWithRestaurant,
} from './helpers/testFactories';
import FavoriteRestaurantService from '../src/scripts/services/favorite-restaurant-idb.service';

describe('Remove favorite restaurant from IndexedDB', () => {
  beforeEach(async () => {
    createFavoriteButtonContainer();
    await FavoriteRestaurantService.put({ id: 1 });
  });

  afterEach(async () => {
    const restaurants = await FavoriteRestaurantService.list();
    await Promise.all(restaurants.map((r) => FavoriteRestaurantService.delete(r.id)));
  });

  it('should display unfavorite button when the restaurant has been favorited', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });

    expect(
      document.querySelector('button.un[aria-label="remove from favorites"]'),
    ).toBeTruthy();
  });

  it('should not display favorite button when the restaurant has been favorited', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });

    expect(
      document.querySelector('button.add[aria-label="add to favorites"]'),
    ).toBeFalsy();
  });

  it('should be able to remove favorited restaurant from the list', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });

    document.querySelector('button.btn-favorite').dispatchEvent(new Event('click'));

    const list = await FavoriteRestaurantService.list();
    expect(list).toEqual([]);
  });

  it('should not throw error if the unfavorited restaurant is not in the list', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });
    await FavoriteRestaurantService.delete(1);

    document.querySelector('button.btn-favorite').dispatchEvent(new Event('click'));

    const list = await FavoriteRestaurantService.list();
    expect(list).toEqual([]);
  });
});
