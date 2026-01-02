import { AnimatePresence, motion } from "framer-motion";
import { Filter, RefreshCw, Search } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  startDate: string;
  onStartDateChange: (value: string) => void;
  endDate: string;
  onEndDateChange: (value: string) => void;
  guestName: string;
  onGuestNameChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  onResetFilters: () => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  guestName,
  onGuestNameChange,
  showFilters,
  onToggleFilters,
  onResetFilters,
}: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm mb-8"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by booking ID or property name..."
            className="w-full pl-12 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white"
          />
        </div>

        <button
          onClick={onToggleFilters}
          className="flex items-center space-x-2 px-4 py-3 bg-white border border-charcoal/20 rounded-lg hover:border-warm-green transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
          {(statusFilter !== "all" || startDate || endDate || guestName) && (
            <span className="px-2 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-charcoal/10">
              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => onStatusFilterChange(e.target.value)}
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="requested">Requested</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="rejected">Rejected</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="checked-in">Checked In</option>
                  <option value="completed">Completed</option>
                  <option value="disputed">Disputed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => onStartDateChange(e.target.value)}
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => onEndDateChange(e.target.value)}
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-2">
                  Guest Name (Optional)
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => onGuestNameChange(e.target.value)}
                  placeholder="Filter by guest..."
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-charcoal/10">
              <button
                onClick={onResetFilters}
                className="flex items-center space-x-2 px-4 py-2 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button
                onClick={onToggleFilters}
                className="px-4 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors text-sm font-medium"
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
