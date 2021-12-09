Feature('Add and remove favorite restaurant');

const assert = require('assert');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Show not found text when favorites is empty', ({ I }) => {
  I.see('Belum ada data restoran favorit', '.no-content .has-error');
});

Scenario('Favorite one restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.seeElement('restaurant-item .card .meta-wrapper .name');
  const firstRestaurant = locate('restaurant-item .card .meta-wrapper .name').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('button#btn-favorite');
  const favoritedRestaurantName = await I.grabTextFrom('.detail-header h2');
  I.click('button#btn-favorite');

  I.amOnPage('/#/favorite');

  I.seeElement('restaurant-item');
  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);
});

Scenario('Remove favorite one restaurant', async ({ I }) => {
  I.see('Belum ada data restoran favorit', '.no-content .has-error');

  I.amOnPage('/');
  I.seeElement('restaurant-item .card .meta-wrapper .name');
  const firstRestaurant = locate('restaurant-item .card .meta-wrapper .name').first();
  I.click(firstRestaurant);

  I.seeElement('button#btn-favorite');
  I.click('button#btn-favorite');

  I.seeElement('button#btn-favorite');
  I.click('button#btn-favorite');

  I.amOnPage('/#/favorite');

  I.see('Belum ada data restoran favorit', '.no-content .has-error');
});
