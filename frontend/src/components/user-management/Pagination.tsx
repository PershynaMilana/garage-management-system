import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#4e6b8c]/20 border-t border-[#4e6b8c]/30 gap-4">
      <div className="flex items-center gap-2">
        <span className="text-white/70 font-[Ubuntu-Regular] text-sm">Show result:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded px-2 py-1 text-white text-sm font-[Ubuntu-Regular] focus:outline-none focus:border-[#87d7de]"
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-[#4e6b8c]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 rounded-lg font-[Ubuntu-Regular] text-sm transition-colors ${
                page === currentPage
                  ? 'bg-[#87d7de] text-white'
                  : 'text-white/70 hover:bg-[#4e6b8c]/30'
              }`}
            >
              {page}
            </button>
          ))}

          {totalPages > 10 && currentPage < totalPages - 2 && (
            <>
              <span className="text-white/50 px-2">...</span>
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-2 rounded-lg text-white/70 hover:bg-[#4e6b8c]/30 font-[Ubuntu-Regular] text-sm transition-colors"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Mobile page info */}
        <div className="sm:hidden text-white/70 font-[Ubuntu-Regular] text-sm">
          {currentPage} / {totalPages}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-[#4e6b8c]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white/70" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;