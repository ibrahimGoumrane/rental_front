import { AnimatePresence, motion } from "framer-motion";
import { Filter, Folder, Grid, List, Search, X } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  verificationFilter: string;
  onVerificationFilterChange: (verification: string) => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  featuredFilter: string;
  onFeaturedFilterChange: (featured: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  collectionFilter: string;
  onCollectionFilterChange: (collection: string) => void;
  collectionName?: string;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  showFilters,
  onToggleFilters,
  statusFilter,
  onStatusFilterChange,
  verificationFilter,
  onVerificationFilterChange,
  typeFilter,
  onTypeFilterChange,
  featuredFilter,
  onFeaturedFilterChange,
  sortBy,
  onSortByChange,
  collectionFilter,
  onCollectionFilterChange,
  collectionName,
}: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
          {/* Search */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by property name, address, or owner..."
              className="w-full pl-12 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-white rounded-lg border border-charcoal/10 p-1 self-start">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-terracotta text-white"
                  : "text-charcoal/60 hover:text-charcoal"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange("table")}
              className={`p-2 rounded transition-colors ${
                viewMode === "table"
                  ? "bg-terracotta text-white"
                  : "text-charcoal/60 hover:text-charcoal"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={onToggleFilters}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-charcoal/20 rounded-lg hover:border-terracotta transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters</span>
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>

        <select
          value={verificationFilter}
          onChange={(e) => onVerificationFilterChange(e.target.value)}
          className="px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
        >
          <option value="all">All Verification</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending Docs</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value)}
          className="px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
        >
          <option value="all">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="house">House</option>
          <option value="studio">Studio</option>
        </select>

        <select
          value={featuredFilter}
          onChange={(e) => onFeaturedFilterChange(e.target.value)}
          className="px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
        >
          <option value="all">All Properties</option>
          <option value="featured">Featured Only</option>
          <option value="not-featured">Not Featured</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="bookings">Most Booked</option>
          <option value="revenue">Highest Revenue</option>
          <option value="rating">Lowest Rating</option>
        </select>
      </div>

      {/* Collection Filter Banner */}
      {collectionFilter !== "all" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-charcoal/10"
        >
          <div className="flex items-center justify-between bg-warm-green/10 border border-warm-green/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Folder className="w-5 h-5 text-warm-green" />
              <div>
                <p className="text-sm font-medium text-charcoal">
                  Filtered by Collection
                </p>
                <p className="text-xs text-charcoal/60">
                  {collectionName || "Unknown Collection"}
                </p>
              </div>
            </div>
            <button
              onClick={() => onCollectionFilterChange("all")}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-charcoal/20 rounded-lg hover:bg-charcoal/5 transition-colors text-sm font-medium"
            >
              <X className="w-4 h-4" />
              <span>Clear Filter</span>
            </button>
          </div>
        </motion.div>
      )}

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-charcoal/10">
              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-2">
                  Price Range (per night)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta bg-white text-sm"
                  />
                  <span className="text-charcoal/60">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta bg-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-2">
                  Guest Capacity
                </label>
                <select className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta bg-white text-sm">
                  <option>Any Capacity</option>
                  <option>1-2 guests</option>
                  <option>3-5 guests</option>
                  <option>6-10 guests</option>
                  <option>10+ guests</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-2">
                  Performance
                </label>
                <select className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta bg-white text-sm">
                  <option>All Performance</option>
                  <option>High Booking Rate</option>
                  <option>Low Booking Rate</option>
                  <option>New Listings</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City or region..."
                  className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta bg-white text-sm"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
