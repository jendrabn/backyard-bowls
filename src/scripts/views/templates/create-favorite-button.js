const createFavoriteButton = (favorite) => `
<button id="btn-favorite" class="btn-favorite ${favorite ? 'add' : 'un'}" aria-label="${favorite ? 'add to favorites' : 'remove from favorites'}">${favorite ? 'Add to favorite' : 'Unfavorite'}</button>`;
export default createFavoriteButton;
