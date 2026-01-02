import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { PropertyFilterDropdown } from "./PropertyFilterDropdown";
import type { LandlordProperty } from "@/lib/types/landlord";

interface EarningsFilterBarProps {
  filterBy: "all" | "property";
  selectedProperty: string | null;
  timeRange: "6months" | "1year" | "all";
  showFilterDropdown: boolean;
  properties: LandlordProperty[];
  onFilterChange: (filter: "all" | "property") => void;
  onPropertySelect: (propertyId: string | null) => void;
  onTimeRangeChange: (range: "6months" | "1year" | "all") => void;
  onToggleDropdown: () => void;
}

export function EarningsFilterBar({
  filterBy,
  selectedProperty,
  timeRange,
  showFilterDropdown,
  properties,
  onFilterChange,
  onPropertySelect,
  onTimeRangeChange,
  onToggleDropdown,
}: EarningsFilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-charcoal/60" />
          <span className="text-sm font-medium text-charcoal/80">
            Filter by:
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                onFilterChange("all");
                onPropertySelect(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterBy === "all"
                  ? "bg-warm-green text-white"
                  : "bg-sand text-charcoal hover:bg-sand/80"
              }`}
            >
              All Properties
            </button>
            <PropertyFilterDropdown
              properties={properties}
              selectedPropertyId={selectedProperty}
              isOpen={showFilterDropdown}
              onToggle={onToggleDropdown}
              onSelect={(id) => {
                onFilterChange("property");
                onPropertySelect(id);
                onToggleDropdown();
              }}
              isActive={filterBy === "property"}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-charcoal/60">Time range:</span>
          <select
            value={timeRange}
            onChange={(e) =>
              onTimeRangeChange(e.target.value as "6months" | "1year" | "all")
            }
            className="px-4 py-2 bg-sand border border-charcoal/10 rounded-lg text-sm font-medium text-charcoal outline-none focus:border-warm-green transition-colors"
          >
            <option value="6months">Last 6 months</option>
            <option value="1year">Last year</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
