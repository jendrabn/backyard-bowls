import toastr from 'toastr';
import UrlParser from '../../routes/url-parser';
import RestaurantService from '../../services/restaurant.service';
import FavoriteButtonInitiator from '../../utils/favorite-button-initiator';
import createRestaurantDetail from '../templates/create-restaurant-detail';
import { renderLoading, renderError } from '../../utils/helpers';
import TabInitiator from '../../utils/tab-initiator';
import ModalInitiator from '../../utils/modal-initiator';
import createReviewItem from '../templates/create-review-item';
import createModalReview from '../templates/create-modal-review';

const Detail = {
  async render() {
    document.title = 'Detail — Backyard Bowls';
    return `
            <div class="container">
            <div class="content" style="margin-top: 20px;">
            </div>
            </div>
            ${createModalReview()}`;
  },
  async afterRender() {
    const container = document.querySelector('.content');
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    renderLoading(container);

    try {
      const { restaurant } = await RestaurantService.detail(url.id);
      document.title = `${restaurant.name} — Backyard Bowls`;
      container.innerHTML = createRestaurantDetail(restaurant);

      await FavoriteButtonInitiator.init({
        button: document.querySelector('.btn-favorite-wrapper'),
        restaurant,
      });

      TabInitiator.init({
        tabLink: document.querySelectorAll('.tab-link'),
        tabContent: document.querySelectorAll('.tab-content'),
        tabOpen: document.getElementById('defaultOpen'),
      });

      ModalInitiator.init({
        openButton: document.querySelector('.show-modal-review'),
        closeButton: document.querySelector('button.close-modal'),
        modal: document.getElementById('modal-review'),
        onClose: () => document.getElementById('form-review').reset(),
      });

      this._onSubmitFormReview(url.id);
    } catch (error) {
      renderError(container, error.message || error);
    }
  },
  _onSubmitFormReview(restaurantId) {
    const formElement = document.getElementById('form-review');

    formElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const nameElement = formElement.querySelector('input[name=name]');
      const reviewElement = formElement.querySelector('textarea[name=review]');

      const name = nameElement.value.trim();
      const review = reviewElement.value.trim();

      if (name.length > 0 && review.length > 0) {
        const { customerReviews } = await RestaurantService.addReview({
          id: restaurantId,
          name,
          review,
        });

        this._reRenderReview(customerReviews);
        ModalInitiator.close();

        toastr.success('Successfully added a review', 'Success!');
      } else {
        toastr.error('Name and review cannot be empty', 'Error!');
      }
    });
  },
  _reRenderReview(reviews) {
    const reviewContainer = document.getElementById('review-container');
    const reviewCountElement = document.getElementById('review-count');

    reviewCountElement.textContent = `${reviews.length} Reviews`;
    reviewContainer.innerHTML = reviews
      .slice()
      .reverse()
      .map(createReviewItem)
      .join('');
  },
};

export default Detail;
