import UrlParser from '../../routes/url-parser';
import restaurantService from '../../services/restaurant.service';
import FavoriteButtonInitiator from '../../utils/favorite-button-initiator';
import createRestaurantDetail from '../templates/create-restaurant-detail';
import { renderLoading, renderError } from '../../utils/helpers';
import TabInitiator from '../../utils/tab-initiator';
import ModalInitiator from '../../utils/modal-initiator';
import Toast from '../../utils/toast-initiator';
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
    ${createModalReview()}    
    `;
  },
  async afterRender() {
    const container = document.querySelector('.content');
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    renderLoading(container);

    try {
      const { restaurant } = await restaurantService.getById(url.id);
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
  _onSubmitFormReview(id) {
    const form = document.getElementById('form-review');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = form.querySelector('input[name=name]').value;
      const review = form.querySelector('textarea[name=review]').value;

      if (name.trim().length > 0 && review.trim().length > 0) {
        try {
          const { customerReviews } = await restaurantService.addReview({ id, name, review });
          ModalInitiator.close();
          this._reRenderReview(customerReviews);
          Toast.show('Successfully added a review');
        } catch (error) {
          Toast.show(error.message || error);
        }
      }
    });
  },
  _reRenderReview(reviews) {
    const container = document.getElementById('review-container');
    const reviewCountTitle = document.getElementById('review-count');

    reviewCountTitle.innerHTML = `${reviews.length} Reviews`;
    container.innerHTML = reviews.reverse().map((review) => createReviewItem({ ...review })).join('');
  },
};

export default Detail;
