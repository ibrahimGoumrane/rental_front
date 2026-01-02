import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  DollarSign,
  Filter,
  Home,
  Search,
  Shield,
  Users,
} from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  showFilters,
  onToggleFilters,
}: FilterBarProps) {
  const reportTypes = [
    { value: "property", label: "Property Issues", icon: Home },
    { value: "guest-behavior", label: "Guest Behavior", icon: Users },
    { value: "host-behavior", label: "Host Behavior", icon: Users },
    { value: "payment", label: "Payment Disputes", icon: DollarSign },
    { value: "safety", label: "Safety Concerns", icon: Shield },
    { value: "fraud", label: "Scam/Fraud", icon: AlertTriangle },
  ];

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
            placeholder="Search reports by ID, user, or property..."
            className="w-full pl-12 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white"
          />
        </div>

        <button
          onClick={onToggleFilters}
          className="flex items-center space-x-2 px-4 py-3 bg-white border border-charcoal/20 rounded-lg hover:border-terracotta transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-2">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="under-review">Under Review</option>
            <option value="awaiting-info">Awaiting Info</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-2">
            Filed By
          </label>
          <select className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm">
            <option>All Users</option>
            <option>Guests</option>
            <option>Hosts</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-2">
            Date From
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-2">
            Date To
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
          />
        </div>
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
            <div className="mt-4 pt-4 border-t border-charcoal/10">
              <p className="text-sm font-medium text-charcoal/70 mb-3">
                Report Types
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {reportTypes.map(({ value, label, icon: Icon }) => (
                  <label
                    key={value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-terracotta"
                    />
                    <Icon className="w-4 h-4 text-terracotta" />
                    <span className="text-sm text-charcoal">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
