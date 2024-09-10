const renderLoading = (container) => {
  container.innerHTML = `
    <div class="no-content">
      <p>Loading...</p> 
    </div>
  `;
};

const renderError = (container, message) => {
  container.innerHTML = `
    <div class="no-content">
       <p>${message}</p>
    </div>
  `;
};

export { renderError, renderLoading };
