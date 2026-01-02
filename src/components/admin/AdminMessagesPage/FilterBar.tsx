import { AnimatePresence, motion } from "framer-motion";
import { Filter, RefreshCw, Search } from "lucide-react";
import type { MessagesFilters } from "@/lib/types/admin";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: MessagesFilters;
  onFiltersChange: (filters: MessagesFilters) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  onResetFilters: () => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  showFilters,
  onToggleFilters,
  onResetFilters,
}: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm mb-8 sticky top-20 z-20"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-12 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white"
          />
        </div>

        <button
          onClick={onToggleFilters}
          className="flex items-center space-x-2 px-4 py-3 bg-white border border-charcoal/20 rounded-lg hover:border-terracotta transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
          {Object.values(filters).some((v) => v && v !== "all") && (
            <span className="px-2 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
              Active
            </span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  value={filters.userName}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, userName: e.target.value })
                  }
                  placeholder="Search by user name..."
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-2">
                  Flag Reason
                </label>
                <select
                  value={filters.flagReason}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, flagReason: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
                >
                  <option value="all">All Reasons</option>
                  <option value="contact">
                    Exchange of Contact Information
                  </option>
                  <option value="keywords">Blocked Keywords Detected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="unreviewed">Unreviewed</option>
                  <option value="under-review">Under Review</option>
                  <option value="resolved">Resolved</option>
                  <option value="false-positive">False Positive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-2">
                  Date From
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, dateFrom: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-2">
                  Date To
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, dateTo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-charcoal/10">
              <button
                onClick={onResetFilters}
                className="flex items-center space-x-2 px-4 py-2 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button
                onClick={onToggleFilters}
                className="px-4 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors"
              >
                Apply Filters
              </button>
            </div>

            <div className="mt-4 p-4 bg-gold/10 border border-gold/20 rounded-lg">
              <p className="text-sm text-charcoal/70">
                <strong>Focus:</strong> Use these filters to identify users with
                repeated violations. Users with multiple flags may require
                stronger action.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
