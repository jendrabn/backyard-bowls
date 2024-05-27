import CONFIG from "../config";

const { BASE_URL, API_KEY } = CONFIG;

const handleResponse = (response) =>
  response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;

      return Promise.reject(error);
    }
    return data;
  });

// Function for fetch API
// https://www.dicoding.com/academies/163/tutorials/7358?from=7351
const restaurantService = {
  list() {
    return fetch(`${BASE_URL}/list`).then(handleResponse);
  },

  detail(id) {
    return fetch(`${BASE_URL}/detail/${id} `).then(handleResponse);
  },

  search(keyword) {
    return fetch(`${BASE_URL}/search?q=${keyword}`).then(handleResponse);
  },
  addReview({ id, name, review }) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": API_KEY,
      },
      body: JSON.stringify({ id, name, review }),
    };

    return fetch(`${BASE_URL}/review`, requestOptions).then(handleResponse);
  },
};

export default restaurantService;
