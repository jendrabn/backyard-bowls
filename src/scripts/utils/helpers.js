const renderLoading = (container) => {
  container.innerHTML = `
    <div class="no-content">
       <div class="loading">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  `;
};

const renderError = (container, message) => {
  container.innerHTML = `
    <div class="no-content">
      <div class="has-error">
        <p>${message}</p>
      </div>
    </div>
  `;
};

export { renderError, renderLoading };
