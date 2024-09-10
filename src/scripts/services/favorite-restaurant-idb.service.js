import { openDB } from 'idb';
import CONFIG from '../config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(db) {
    db.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: 'id',
    });
  },
});

class FavoriteRestaurantService {
  static async list() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  }

  static async detail(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  }

  static async put(restaurant) {
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  }

  static async delete(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  }
}

export default FavoriteRestaurantService;
