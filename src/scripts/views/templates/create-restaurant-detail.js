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
    <div class="detail-header">
      <h2>${name}</h2>
      <p><span><i class="fas fa-map-marker-alt"></i></span> ${city}, ${address}</p>
    </div>
    <div class="detail-main" id="mainContent">
      <div class="detail-wrapper">
        <div class="detail-media">
          <figure>
            <img class="lazyload" width="400" height="400" data-src="${CONFIG.BASE_IMAGE_URL}/medium/${pictureId}" alt="${name} - ${city}, ${address}">
          </figure>
        </div>
        <div class="detail-content">
           ${createStarsRating(rating)}
          <p class="description">${description}</p>
          <div class="favorite-wrapper"></div>
          <div class="categories">
            <span>Categories: </span>
            ${categories.map((category) => `<span class="category-tag">${category.name}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="tabs">
        <div class="tabs-nav">
          <button class="tabs-trigger" data-target="nav-food" id="defaultOpen">Foods</button>
          <button class="tabs-trigger" data-target="nav-drink">Drinks</button>
          <button class="tabs-trigger" data-target="nav-review">Reviews</button>
        </div>
        <div id="nav-food" class="tabs-panel">
          <div class="tabs-panel-header">
            <h4>${foods.length} Foods</h4>
          </div>
          <div class="tabs-panel-body">
            <ul class="menu-list">
               ${foods.map((food) => `<li>${food.name}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div id="nav-drink" class="tabs-panel">
          <div class="tabs-panel-header">
            <h4>${drinks.length} Drinks</h4>
          </div>
          <div class="tabs-panel-body">
            <ul class="menu-list">
              ${drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div id="nav-review" class="tabs-panel">
          <div class="tabs-panel-header">
            <h4 id="review-count">${customerReviews.length} Reviews</h4>
            <button id="show-modal-review" class="review-trigger" aria-label="show-modal-review">Add review</button>
          </div>
          <div class="tabs-panel-body">
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
