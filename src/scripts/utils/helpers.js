const MIN_LOADING_MS = 1000;

const renderLoading = (container) => {
  container.innerHTML = `
    <div class="loading-state">
      <div class="loading-state__spinner">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <p class="loading-state__text">Memuat data...</p>
    </div>
  `;
};

const showLoading = async (container, fetchFn) => {
  const start = Date.now();
  renderLoading(container);
  try {
    const result = await fetchFn();
    const elapsed = Date.now() - start;
    if (elapsed < MIN_LOADING_MS) {
      await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_MS - elapsed));
    }
    return result;
  } catch (error) {
    const elapsed = Date.now() - start;
    if (elapsed < MIN_LOADING_MS) {
      await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_MS - elapsed));
    }
    throw error;
  }
};

const renderError = (container, message) => {
  container.innerHTML = `
    <div class="no-content">
       <p>${message}</p>
    </div>
  `;
};

const fadeInContent = (container, html) => {
  container.style.opacity = '0';
  container.style.transition = 'opacity 0.25s ease';
  container.innerHTML = html;
  requestAnimationFrame(() => {
    container.style.opacity = '1';
  });
};

export { renderError, renderLoading, showLoading, fadeInContent };
