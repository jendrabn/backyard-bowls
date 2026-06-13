import FavoriteRestaurantService from '../src/scripts/services/favorite-restaurant-idb.service';

describe('FavoriteRestaurantService (IndexedDB)', () => {
  const sampleRestaurant = { id: 'r1', name: 'Resto A', city: 'Bandung' };

  afterEach(async () => {
    const all = await FavoriteRestaurantService.list();
    await Promise.all(all.map((r) => FavoriteRestaurantService.delete(r.id)));
  });

  it('should return empty list when no favorites exist', async () => {
    const list = await FavoriteRestaurantService.list();

    expect(list).toEqual([]);
  });

  it('should add a restaurant to favorites', async () => {
    await FavoriteRestaurantService.put(sampleRestaurant);

    const result = await FavoriteRestaurantService.detail(sampleRestaurant.id);
    expect(result).toEqual(sampleRestaurant);
  });

  it('should return a restaurant by id', async () => {
    await FavoriteRestaurantService.put(sampleRestaurant);

    const result = await FavoriteRestaurantService.detail(sampleRestaurant.id);
    expect(result).toEqual(sampleRestaurant);
  });

  it('should return undefined for a non-existent restaurant id', async () => {
    const result = await FavoriteRestaurantService.detail('non-existent');
    expect(result).toBeUndefined();
  });

  it('should remove a restaurant from favorites', async () => {
    await FavoriteRestaurantService.put(sampleRestaurant);
    await FavoriteRestaurantService.delete(sampleRestaurant.id);

    const result = await FavoriteRestaurantService.detail(sampleRestaurant.id);
    expect(result).toBeUndefined();
  });

  it('should list all favorited restaurants', async () => {
    await FavoriteRestaurantService.put(sampleRestaurant);
    await FavoriteRestaurantService.put({ id: 'r2', name: 'Resto B' });

    const list = await FavoriteRestaurantService.list();
    expect(list.length).toBe(2);
    expect(list.map((r) => r.id)).toEqual(['r1', 'r2']);
  });
});
