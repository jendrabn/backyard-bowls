import createStarsRating from '../templates/create-stars-rating';
import CONFIG from '../../config';

class RestaurantCardComponent extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this._render();
  }

  _render() {
    const {
      city, pictureId, name, description, rating, id,
    } = this._restaurant;

    this.innerHTML = `
        <div class="card">
            <div class="city"><span><i class="fas fa-map-marker-alt"></i></span> ${city}</div>
            <figure><img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL}/small/${pictureId}" alt="${name}"></figure>
            <div class="meta-wrapper">
                <a class="name" href="${`/#/detail/${id}`}">${name}</a>
                <div class="description">
                    ${description}
                </div>
                <div class="meta-footer">
                    ${createStarsRating(rating)}
                    <div class="favorite"></div>
                </div>
            </div>
        </div>`;
  }
}

customElements.define('restaurant-item', RestaurantCardComponent);
