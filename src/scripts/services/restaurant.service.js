import toastr from 'toastr';
import CONFIG from '../config';

const { BASE_URL, API_KEY } = CONFIG;

const handleResponse = (response) => response.json().then((data) => {
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;

    toastr.error(error);

    return Promise.reject(error);
  }
  return data;
});

class RestaurantService {
  static list() {
    return fetch(`${BASE_URL}/list`).then(handleResponse);
  }

  static detail(id) {
    return fetch(`${BASE_URL}/detail/${id}`).then(handleResponse);
  }

  static search(keyword) {
    return fetch(`${BASE_URL}/search?q=${keyword}`).then(handleResponse);
  }

  static addReview({ id, name, review }) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': API_KEY,
      },
      body: JSON.stringify({ id, name, review }),
    };

    return fetch(`${BASE_URL}/review`, requestOptions).then(handleResponse);
  }
}

export default RestaurantService;
