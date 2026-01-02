import { motion } from "framer-motion";
import { Filter, Search } from "lucide-react";

interface PropertiesFilterBarProps {
  searchQuery: string;
  statusFilter: "all" | "active" | "inactive";
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (status: "all" | "active" | "inactive") => void;
}

export function PropertiesFilterBar({
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}: PropertiesFilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm mb-8"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by property name or location..."
            className="w-full pl-12 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-charcoal/60" />
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusFilterChange(
                e.target.value as "all" | "active" | "inactive"
              )
            }
            className="px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
