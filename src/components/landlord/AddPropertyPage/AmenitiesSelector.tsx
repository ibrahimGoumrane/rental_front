import { ADD_AMENITIES } from "@/lib/constants/pages/AddPropertyPage";

interface AmenitiesSelectorProps {
  selectedAmenities: string[];
  onToggleAmenity: (amenityId: string) => void;
}

export function AmenitiesSelector({
  selectedAmenities,
  onToggleAmenity,
}: AmenitiesSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal/80 mb-4">
        Amenities
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ADD_AMENITIES.map((amenity) => (
          <button
            key={amenity.id}
            onClick={() => onToggleAmenity(amenity.id)}
            className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-all ${
              selectedAmenities.includes(amenity.id)
                ? "border-warm-green bg-warm-green/5"
                : "border-charcoal/20 hover:border-charcoal/40"
            }`}
          >
            <amenity.icon className="w-5 h-5" />
            <span className="font-medium">{amenity.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
