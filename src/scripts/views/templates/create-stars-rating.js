const createStarsRating = (rating = 0) => {
  const starPercentage = (rating / 5) * 100;
  return `
    <div class="rating">
      <div class="stars-outer">
        <div class="stars-inner" style="width:${starPercentage}%;"></div>
      </div>
      <span class="number-rating">${rating}</span>
    </div>
  `;
};

export default createStarsRating;
