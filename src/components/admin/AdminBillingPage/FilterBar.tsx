import { AnimatePresence, motion } from "framer-motion";
import { Filter, RefreshCw } from "lucide-react";
import type { BillingFilters } from "@/lib/types/admin";

interface FilterBarProps {
  showFilters: boolean;
  filters: BillingFilters;
  onToggleFilters: () => void;
  onFilterChange: (filters: BillingFilters) => void;
  onReset: () => void;
}

export function FilterBar({
  showFilters,
  filters,
  onToggleFilters,
  onFilterChange,
  onReset,
}: FilterBarProps) {
  const hasActiveFilters = Object.values(filters).some((v) => v && v !== "all");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mb-6"
    >
      <button
        onClick={onToggleFilters}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-charcoal/10 rounded-lg hover:bg-sand/50 transition-colors"
      >
        <Filter className="w-5 h-5 text-charcoal" />
        <span className="font-medium text-charcoal">Filters</span>
        {hasActiveFilters && (
          <span className="px-2 py-1 bg-gold text-white text-xs font-bold rounded-full">
            Active
          </span>
        )}
      </button>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-white rounded-xl p-6 border border-charcoal/10 shadow-sm overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Date From
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    onFilterChange({ ...filters, dateFrom: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Date To
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) =>
                    onFilterChange({ ...filters, dateTo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Host Name
                </label>
                <input
                  type="text"
                  value={filters.hostName}
                  onChange={(e) =>
                    onFilterChange({ ...filters, hostName: e.target.value })
                  }
                  placeholder="Search by host name..."
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Property Name
                </label>
                <input
                  type="text"
                  value={filters.propertyName}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      propertyName: e.target.value,
                    })
                  }
                  placeholder="Search by property name..."
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Min Gross Revenue
                </label>
                <input
                  type="number"
                  value={filters.grossAmountMin}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      grossAmountMin: e.target.value,
                    })
                  }
                  placeholder="0"
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Max Gross Revenue
                </label>
                <input
                  type="number"
                  value={filters.grossAmountMax}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      grossAmountMax: e.target.value,
                    })
                  }
                  placeholder="999999"
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    onFilterChange({ ...filters, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={onReset}
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
