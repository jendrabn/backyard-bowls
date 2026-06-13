const createReviewItem = ({ name, date, review }) => `
     <li>
        <div class="review-avatar">
          <figure>
            <img src="images/avatar-default.webp" alt="${name}">
          </figure>
        </div>
        <div class="review-body">
          <div class="review-author">${name} <span>${date}</span></div>
          <div class="review-text">${review}</div>
        </div>
      </li>
  `;

export default createReviewItem;
