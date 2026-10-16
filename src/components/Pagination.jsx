
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  // Hide pagination when only one page is available
  if (totalPages <= 1) return null;

  // Generate visible page numbers dynamically
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(
      totalPages,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const buttonBase =
    "flex h-10 min-w-10 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40";

  const inactiveButton =
    "border border-gray-200 bg-white text-gray-700 hover:border-[#087F5B] hover:bg-[#E8F3ED] hover:text-[#087F5B]";

  return (
    <nav
      aria-label="Product pagination"
      className="flex flex-wrap items-center justify-center gap-2 py-6"
    >
      {/* Previous Button */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() =>
          setCurrentPage((page) => Math.max(1, page - 1))
        }
        className={`${buttonBase} gap-1 border border-gray-200 bg-white px-3 text-gray-700 hover:border-[#087F5B] hover:bg-[#E8F3ED] hover:text-[#087F5B]`}
      >
        <FiChevronLeft size={17} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* First Page */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`${buttonBase} ${inactiveButton}`}
          >
            1
          </button>

          {pageNumbers[0] > 2 && (
            <span
              aria-hidden="true"
              className="px-1 text-gray-400"
            >
              ...
            </span>
          )}
        </>
      )}

      {/* Dynamic Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={currentPage === page ? "page" : undefined}
          onClick={() => setCurrentPage(page)}
          className={`${buttonBase} ${
            currentPage === page
              ? "bg-[#087F5B] text-white shadow-md shadow-emerald-900/15 hover:bg-[#066548]"
              : inactiveButton
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span
              aria-hidden="true"
              className="px-1 text-gray-400"
            >
              ...
            </span>
          )}

          <button
            type="button"
            onClick={() => setCurrentPage(totalPages)}
            className={`${buttonBase} ${inactiveButton}`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() =>
          setCurrentPage((page) =>
            Math.min(totalPages, page + 1)
          )
        }
        className={`${buttonBase} gap-1 border border-gray-200 bg-white px-3 text-gray-700 hover:border-[#087F5B] hover:bg-[#E8F3ED] hover:text-[#087F5B]`}
      >
        <span className="hidden sm:inline">Next</span>
        <FiChevronRight size={17} />
      </button>
    </nav>
  );
}

export default Pagination;
