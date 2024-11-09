// Pagination.js
import PropTypes from "prop-types";

export function Pagination({
  currentPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
}) {
  return (
    <div className="flex justify-center mb-2">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="mx-2 px-4 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 disabled:opacity-50"
      >
        Anterior
      </button>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="mx-2 px-4 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goToPreviousPage: PropTypes.func.isRequired,
  goToNextPage: PropTypes.func.isRequired,
};
