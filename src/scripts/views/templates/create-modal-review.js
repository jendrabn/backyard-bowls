const createModalReview = () => `
   <div id="modal-review" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Add your review</h2>
            <button class="close close-modal" type="button" aria-label="close-modal">
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#000' width="20px" height="20px">
                    <path
                        d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z' />
                </svg>
            </button>
        </div>
        <div class="modal-body">
            <form id="form-review">
                <div class="form-group">
                    <label for="input-name">Name</label>
                    <input type="text" class="form-control" name="name" id="input-name">
                </div>
                <div class="form-group">
                    <label for="input-review">Review</label>
                    <textarea rows="3" class="form-control" name="review" id="input-review"></textarea>
                </div>
                <div class="form-group" style="text-align: right;">
                    <button aria-label="submit-review" type="submit" class="btn-submit" id="btn-submit-review">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>
`;

export default createModalReview;
