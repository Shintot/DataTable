import React from "react";

export function PaginationControls({currentPage, pageCount, onPageChange}) {
    return (
        <div className="flex justify-between items-center mt-4">
            <button onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 0}
                    className="px-4 py-2 ml-5 rounded bg-gray-700 text-white hover:bg-gray-800 disabled:bg-gray-300">
                Précédent
            </button>
            <span>Page {currentPage + 1} sur {pageCount}</span>
            <button onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= pageCount - 1}
                    className="px-4 py-2 mr-5 rounded bg-gray-700 text-white hover:bg-gray-800 disabled:bg-gray-300">
                Suivant
            </button>
        </div>
    );
}