import React from 'react';

const Pagination = React.memo(({ page, totalPages, onBack, onNext }) => (
    <div className="pagination">
        <button onClick={onBack} disabled={page === 1}>
            Back
        </button>
        <span>
            Page {page} of {totalPages}
        </span>
        <button onClick={onNext} disabled={page === totalPages}>
            Next
        </button>
    </div>
));

Pagination.displayName = 'Pagination';
export default Pagination;