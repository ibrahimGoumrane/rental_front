import { AnimatePresence, motion } from "framer-motion";
import { Filter, RefreshCw, Search } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  userTypeFilter: string;
  onUserTypeChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  verificationFilter: string[];
  onVerificationFilterChange: (filters: string[]) => void;
  statusFilter: string[];
  onStatusFilterChange: (filters: string[]) => void;
  onResetFilters: () => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  userTypeFilter,
  onUserTypeChange,
  sortBy,
  onSortChange,
  showFilters,
  onToggleFilters,
  verificationFilter,
  onVerificationFilterChange,
  statusFilter,
  onStatusFilterChange,
  onResetFilters,
}: FilterBarProps) {
  const toggleVerificationFilter = (filter: string) => {
    if (verificationFilter.includes(filter)) {
      onVerificationFilterChange(
        verificationFilter.filter((f) => f !== filter)
      );
    } else {
      onVerificationFilterChange([...verificationFilter, filter]);
    }
  };

  const toggleStatusFilter = (filter: string) => {
    if (statusFilter.includes(filter)) {
      onStatusFilterChange(statusFilter.filter((f) => f !== filter));
    } else {
      onStatusFilterChange([...statusFilter, filter]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, email, phone, or ID number..."
            className="w-full pl-12 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white"
          />
        </div>

        {/* User Type */}
        <select
          value={userTypeFilter}
          onChange={(e) => onUserTypeChange(e.target.value)}
          className="px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white"
        >
          <option value="all">All Users</option>
          <option value="guest">Guests</option>
          <option value="host">Hosts</option>
          <option value="admin">Admins</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white"
        >
          <option value="recent">Recent Activity</option>
          <option value="registered">Registration Date</option>
          <option value="bookings">Most Bookings</option>
          <option value="listings">Most Listings</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onToggleFilters}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-charcoal/20 rounded-lg hover:border-warm-green transition-colors text-sm"
        >
          <Filter className="w-4 h-4" />
          <span>Advanced Filters</span>
          {(verificationFilter.length > 0 || statusFilter.length > 0) && (
            <span className="px-2 py-0.5 bg-warm-green text-white text-xs font-bold rounded-full">
              {verificationFilter.length + statusFilter.length}
            </span>
          )}
        </button>

        {(verificationFilter.length > 0 || statusFilter.length > 0) && (
          <button
            onClick={onResetFilters}
            className="flex items-center space-x-2 px-4 py-2 text-charcoal/60 hover:text-charcoal transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 mt-4 border-t border-charcoal/10">
              {/* Verification Status */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-3">
                  Verification Status
                </label>
                <div className="space-y-2">
                  {[
                    { value: "verified", label: "Verified" },
                    { value: "pending", label: "Pending Verification" },
                    { value: "rejected", label: "Rejected" },
                    { value: "none", label: "Not Submitted" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={verificationFilter.includes(option.value)}
                        onChange={() => toggleVerificationFilter(option.value)}
                        className="w-4 h-4 text-warm-green border-charcoal/20 rounded focus:ring-warm-green"
                      />
                      <span className="text-sm text-charcoal/70">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Account Status */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-3">
                  Account Status
                </label>
                <div className="space-y-2">
                  {[
                    { value: "active", label: "Active" },
                    { value: "suspended", label: "Suspended" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={statusFilter.includes(option.value)}
                        onChange={() => toggleStatusFilter(option.value)}
                        className="w-4 h-4 text-warm-green border-charcoal/20 rounded focus:ring-warm-green"
                      />
                      <span className="text-sm text-charcoal/70">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
