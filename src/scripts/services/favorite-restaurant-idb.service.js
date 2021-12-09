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

const favoriteRestaurantService = {
  async getAll() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async getById(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async put(restaurant) {
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async delete(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default favoriteRestaurantService;
