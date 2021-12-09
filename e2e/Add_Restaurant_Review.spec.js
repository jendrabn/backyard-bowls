Feature('Add restaurant review');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Add review', ({ I }) => {
  const reviewText = 'Enak & Harganya terjangkau';

  I.seeElement('restaurant-item .card .meta-wrapper .name');
  const firstRestaurant = locate('restaurant-item .card .meta-wrapper .name').first();
  I.click(firstRestaurant);

  I.seeElement('button[data-target="nav-review"]');
  I.click('button[data-target="nav-review"]');
  I.seeElement('button#show-modal-review');
  I.click('button#show-modal-review');
  I.seeElement('#input-name');
  I.seeElement('#input-review');
  I.seeElement('button#btn-submit-review');

  I.fillField('#input-name', 'Jendra');
  I.fillField('#input-review', reviewText);
  I.click('button#btn-submit-review');

  I.see(reviewText, '.review-desc');
});
