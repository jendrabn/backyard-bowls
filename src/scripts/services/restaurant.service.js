import CONFIG from '../config';

const { BASE_URL, API_KEY } = CONFIG;

const handleResponse = (response) => response.text().then((text) => {
  const data = text && JSON.parse(text);
  if (!response.ok) {
    const error = data || response.statusText;
    return Promise.reject(error);
  }
  return data;
});

const restaurantService = {
  async getAll() {
    const response = await fetch(`${BASE_URL}/list`);
    const data = await handleResponse(response);
    return data;
  },
  async getById(id) {
    const response = await fetch(`${BASE_URL}/detail/${id} `);
    const data = await handleResponse(response);
    return data;
  },
  async search(keyword) {
    const response = await fetch(`${BASE_URL}/search?q=${keyword}`);
    const data = await handleResponse(response);
    return data;
  },
  async addReview({ id, name, review }) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': API_KEY,
      },
      body: JSON.stringify({
        id, name, review,
      }),
    };
    const response = await fetch(`${BASE_URL}/review`, requestOptions);
    const data = await handleResponse(response);
    return data;
  },
};

export default restaurantService;
