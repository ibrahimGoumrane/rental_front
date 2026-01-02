import { ChevronDown } from "lucide-react";
import {
  ADD_PRIMARY_PROPERTY_TYPES,
  ADD_SECONDARY_PROPERTY_TYPES,
} from "@/lib/constants/pages/AddPropertyPage";

interface PropertyTypeSelectorProps {
  propertyType: {
    primary: string;
    secondary: string;
    rentalMode: string;
  };
  onPropertyTypeChange: (type: {
    primary: string;
    secondary: string;
    rentalMode: string;
  }) => void;
}

export function PropertyTypeSelector({
  propertyType,
  onPropertyTypeChange,
}: PropertyTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal/80 mb-3">
        Property Type
      </label>

      {/* Primary Types */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        {ADD_PRIMARY_PROPERTY_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() =>
              onPropertyTypeChange({
                ...propertyType,
                primary: type.id,
              })
            }
            className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${
              propertyType.primary === type.id
                ? "border-warm-green bg-warm-green/5 text-warm-green"
                : "border-charcoal/10 hover:border-charcoal/30 text-charcoal/60"
            }`}
          >
            <type.icon className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">{type.label}</span>
          </button>
        ))}
      </div>

      {/* Secondary Type Dropdown */}
      <div className="mb-6">
        <label className="block text-xs text-charcoal/60 mb-2">
          Specific Type (Optional)
        </label>
        <div className="relative">
          <select
            value={propertyType.secondary}
            onChange={(e) =>
              onPropertyTypeChange({
                ...propertyType,
                secondary: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors appearance-none bg-white"
          >
            <option value="">Select a specific type...</option>
            {ADD_SECONDARY_PROPERTY_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
