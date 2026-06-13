import CONFIG from '../config';

const { BASE_URL, API_KEY } = CONFIG;

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error((data && data.message) || response.statusText);
  }
  return data;
}

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
    return fetch(`${BASE_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': API_KEY,
      },
      body: JSON.stringify({ id, name, review }),
    }).then(handleResponse);
  }
}

export default RestaurantService;
