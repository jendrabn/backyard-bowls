const createReviewItem = ({ name, date, review }) => `
     <li>
        <div class="side-left">
          <figure>
            <img src="images/avatar-default.webp" alt="${name}">
          </figure>
        </div>
        <div class="side-right">
          <div>${name} <span>${date}</span></div>
          <div class="review-desc">${review}</div>
        </div>
      </li>
  `;

export default createReviewItem;
