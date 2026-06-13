import '../src/scripts/views/components/restaurant-item';
import CONFIG from '../src/scripts/config';

describe('Restaurant item component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<restaurant-item></restaurant-item>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  const sampleRestaurant = {
    id: '123',
    name: 'Test Restaurant',
    city: 'Jakarta',
    description: 'A great place to eat.',
    rating: 4.5,
    pictureId: 'pic456',
  };

  it('should render restaurant name and city correctly', () => {
    const element = document.querySelector('restaurant-item');
    element.restaurant = sampleRestaurant;

    expect(element.innerHTML).toContain('Test Restaurant');
    expect(element.innerHTML).toContain('Jakarta');
  });

  it('should render the detail link with correct id', () => {
    const element = document.querySelector('restaurant-item');
    element.restaurant = sampleRestaurant;

    const link = element.querySelector('a.restaurant-card__name');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/detail/123');
  });

  it('should render the image with correct src and alt', () => {
    const element = document.querySelector('restaurant-item');
    element.restaurant = sampleRestaurant;

    const img = element.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('data-src')).toBe(
      `${CONFIG.BASE_IMAGE_URL}/small/pic456`,
    );
    expect(img.getAttribute('alt')).toBe('Test Restaurant - Jakarta');
  });

  it('should render the description text', () => {
    const element = document.querySelector('restaurant-item');
    element.restaurant = sampleRestaurant;

    expect(element.innerHTML).toContain('A great place to eat.');
  });

  it('should render rating stars', () => {
    const element = document.querySelector('restaurant-item');
    element.restaurant = sampleRestaurant;

    const rating = element.querySelector('.rating');
    expect(rating).toBeTruthy();
    expect(element.innerHTML).toContain('4.5');
  });

  it('should render the city badge', () => {
    const element = document.querySelector('restaurant-item');
    element.restaurant = sampleRestaurant;

    const cityBadge = element.querySelector('.restaurant-card__city');
    expect(cityBadge).toBeTruthy();
    expect(cityBadge.textContent).toContain('Jakarta');
  });
});
