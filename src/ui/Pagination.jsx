import { useEffect } from "react";
import PropTypes from "prop-types";
import { BiSolidArrowToLeft, BiArrowToRight } from "react-icons/bi";

function Pagination({ items, itemsPerPage, currentPage, onPageChange, onDataUpdate }) {
  const isItemsArray = Array.isArray(items);
  const totalPages = isItemsArray ? Math.ceil(items.length / itemsPerPage) : 0;

  useEffect(() => {
    if (isItemsArray) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      onDataUpdate(items.slice(start, end));
    } else {
      onDataUpdate([]);
    }
  }, [currentPage, items, itemsPerPage, onDataUpdate, isItemsArray]);

  if (!isItemsArray || totalPages <= 1) return null;

  const pages = [1];
  let left, right;

  // ────────────────────────────────────────────────
  // THE FIX: Centered Sliding Window
  // ────────────────────────────────────────────────
  if (currentPage <= 3) {
    // Start: 1 2 3 4 ...
    left = 2;
    right = Math.min(totalPages - 1, 4);
  } else if (currentPage >= totalPages - 2) {
    // End: ... 17 18 19 20
    left = Math.max(2, totalPages - 3);
    right = totalPages - 1;
  } else {
    // Middle: This centers the page. 
    // If currentPage is 5, it shows 4, 5, 6.
    // This solves the "backwards" problem.
    left = currentPage - 1;
    right = currentPage + 1;
  }

  // ────────────────────────────────────────────────
  // Build the array
  if (left > 2) pages.push("...");

  for (let i = left; i <= right && i < totalPages; i++) {
    pages.push(i);
  }

  if (right < totalPages - 1) pages.push("...");
  if (right < totalPages) pages.push(totalPages);

  // ────────────────────────────────────────────────
  // Styling (Kept exactly as yours)
  const baseBtn = "flex items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-md font-medium transition-all shadow-[0_4px_10px_rgba(0,0,0,0.08),0_10px_20px_-6px_rgba(0,0,0,0.12),0_-2px_6px_rgba(0,0,0,0.04)]";
  const ellipsisStyle = "flex items-center justify-center font-medium text-gray-500 w-6 h-8 md:h-12 md:w-10";
  const iconSize = "text-xl";

  return (
    <div className="flex items-center justify-center gap-1.5 md:gap-2 py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseBtn} bg-white text-black hover:bg-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <BiSolidArrowToLeft className={iconSize} />
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className={ellipsisStyle}>…</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${baseBtn} ${currentPage === page
                ? "bg-[#00A6E0] text-white font-semibold"
                : "bg-white text-black hover:bg-[#00ACC1] hover:text-white"
              }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseBtn} bg-white text-black hover:bg-[#00ACC1] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <BiArrowToRight className={iconSize} />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onDataUpdate: PropTypes.func.isRequired,
};

export default Pagination;