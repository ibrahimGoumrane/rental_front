import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl border border-charcoal/5 shadow-sm"
    >
      <div className="bg-sand px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl">
        <p className="text-sm text-charcoal/70">
          Showing {startItem} to {endItem} of {totalItems.toLocaleString()}{" "}
          properties
        </p>
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <button
            onClick={() => onPageChange(1)}
            className={`px-4 py-2 ${
              currentPage === 1
                ? "bg-terracotta text-white"
                : "border border-charcoal/20 hover:bg-white"
            } rounded-lg font-medium text-sm transition-colors`}
          >
            1
          </button>
          <button
            onClick={() => onPageChange(2)}
            className={`px-4 py-2 ${
              currentPage === 2
                ? "bg-terracotta text-white"
                : "border border-charcoal/20 hover:bg-white"
            } rounded-lg font-medium text-sm transition-colors`}
          >
            2
          </button>
          <button
            onClick={() => onPageChange(3)}
            className={`px-4 py-2 ${
              currentPage === 3
                ? "bg-terracotta text-white"
                : "border border-charcoal/20 hover:bg-white"
            } rounded-lg font-medium text-sm transition-colors`}
          >
            3
          </button>
          <span className="px-2 text-charcoal/60">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium"
          >
            {totalPages}
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
