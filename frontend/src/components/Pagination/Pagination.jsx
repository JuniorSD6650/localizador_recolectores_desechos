import React from 'react';
import PropTypes from 'prop-types';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="flex justify-center items-center mt-4 space-x-2">
            <button
                className="bg-gray-300 text-gray-700 w-6 h-6 rounded-md hover:bg-gray-400 flex items-center justify-center"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <NavigateBeforeIcon fontSize="small" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
                return (
                    <button
                        key={page}
                        className={`w-6 h-6 rounded-md flex items-center justify-center ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                className="bg-gray-300 text-gray-700 w-6 h-6 rounded-md hover:bg-gray-400 flex items-center justify-center"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <NavigateNextIcon fontSize="small" />
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;