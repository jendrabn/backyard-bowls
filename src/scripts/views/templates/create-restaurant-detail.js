import createStarsRating from './create-stars-rating';
import createReviewItem from './create-review-item';
import CONFIG from '../../config';

const createRestaurantDetail = (restaurant) => {
  const {
    name,
    city,
    address,
    pictureId,
    customerReviews,
    menus,
    rating,
    description,
    categories,
  } = restaurant;
  const { foods, drinks } = menus;

  return `
    <div class="content-header detail-header">
      <h2>${name}</h2>
      <p><span><i class="fas fa-map-marker-alt"></i></span> ${city}, ${address}</p>
    </div>
    <div class="content-body" id="mainContent">
      <div class="detail-wrapper">
        <div class="side-left">
          <figure>
            <img class="lazyload" width="400" height="400" data-src="${CONFIG.BASE_IMAGE_URL}/medium/${pictureId}" alt="${name}">
          </figure>
        </div>
        <div class="side-right">
           ${createStarsRating(rating)}
          <p class="description">${description}</p>
          <div class="btn-favorite-wrapper"></div>
          <div class="categories">
            <span>Categories: </span>
            ${categories.map((category) => `<span class="name">${category.name}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="tab-wrapper">
        <div class="tab">
          <button class="tab-link" data-target="nav-food" id="defaultOpen">Foods</button>
          <button class="tab-link" data-target="nav-drink">Drinks</button>
          <button class="tab-link" data-target="nav-review">Reviews</button>
        </div>
        <div id="nav-food" class="tab-content">
          <div class="tab-content-header">
            <h4>${foods.length} Foods</h4>
          </div>
          <div class="tab-content-body">
            <ul class="menu-list">
               ${foods.map((food) => `<li>${food.name}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div id="nav-drink" class="tab-content">
          <div class="tab-content-header">
            <h4>${drinks.length} Drinks</h4>
          </div>
          <div class="tab-content-body">
            <ul class="menu-list">
              ${drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div id="nav-review" class="tab-content">
          <div class="tab-content-header">
            <h4 id="review-count">${customerReviews.length} Reviews</h4>
            <div class="tab-content-header-action">
              <button id="show-modal-review" class="show-modal-review" aria-label="show-modal-review">Add review</button>
            </div>
          </div>
          <div class="tab-content-body">
            <ul class="review-list" id="review-container">
              ${customerReviews.reverse().map((review) => createReviewItem({ ...review })).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default createRestaurantDetail;
