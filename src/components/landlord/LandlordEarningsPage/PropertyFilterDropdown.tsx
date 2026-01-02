import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { LandlordProperty } from "@/lib/types/landlord";

interface PropertyFilterDropdownProps {
  properties: LandlordProperty[];
  selectedPropertyId: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (propertyId: string) => void;
  isActive: boolean;
}

export function PropertyFilterDropdown({
  properties,
  selectedPropertyId,
  isOpen,
  onToggle,
  onSelect,
  isActive,
}: PropertyFilterDropdownProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
          isActive
            ? "bg-warm-green text-white"
            : "bg-sand text-charcoal hover:bg-sand/80"
        }`}
      >
        <span>By Property</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-charcoal/10 py-2 z-20"
        >
          {properties.map((property) => (
            <button
              key={property.id}
              onClick={() => onSelect(property.id)}
              className={`w-full text-left px-4 py-3 hover:bg-sand transition-colors flex items-center space-x-3 ${
                selectedPropertyId === property.id ? "bg-sand/50" : ""
              }`}
            >
              <img
                src={property.image}
                alt={property.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-charcoal text-sm">
                  {property.name}
                </p>
                <p className="text-xs text-charcoal/60">{property.location}</p>
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
