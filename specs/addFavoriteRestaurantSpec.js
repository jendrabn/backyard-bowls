import {
  createFavoriteButtonContainer,
  createFavoriteButtonWithRestaurant,
} from './helpers/testFactories';
import FavoriteRestaurantService from '../src/scripts/services/favorite-restaurant-idb.service';

describe('Add favorite restaurant to IndexedDB', () => {
  beforeEach(() => {
    createFavoriteButtonContainer();
  });

  afterEach(async () => {
    const restaurants = await FavoriteRestaurantService.list();
    await Promise.all(restaurants.map((r) => FavoriteRestaurantService.delete(r.id)));
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });

    expect(
      document.querySelector('button.add[aria-label="add to favorites"]'),
    ).toBeTruthy();
  });

  it('should not show the unfavorite button when the restaurant has not been favorited before', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });

    expect(
      document.querySelector('button.un[aria-label="remove from favorites"]'),
    ).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });

    document.querySelector('button.btn-favorite').dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantService.detail(1);
    expect(restaurant).toEqual({ id: 1 });
  });

  it('should not add a restaurant again when it is already favorited', async () => {
    await createFavoriteButtonWithRestaurant({ id: 1 });
    await FavoriteRestaurantService.put({ id: 1 });

    document.querySelector('button.btn-favorite').dispatchEvent(new Event('click'));

    const list = await FavoriteRestaurantService.list();
    expect(list).toEqual([{ id: 1 }]);
  });

  it('should not add a restaurant when it has no id', async () => {
    await createFavoriteButtonWithRestaurant({});

    document.querySelector('button.btn-favorite').dispatchEvent(new Event('click'));

    const list = await FavoriteRestaurantService.list();
    expect(list).toEqual([]);
  });
});
