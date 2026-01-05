interface AmenitiesFilterProps {
  selectedAmenities: string[];
  onAmenityToggle: (amenity: string, checked: boolean) => void;
  onApply: () => void;
}

export function AmenitiesFilter({
  selectedAmenities,
  onAmenityToggle,
  onApply,
}: AmenitiesFilterProps) {
  const amenities = ["Wifi", "Pool", "Kitchen", "Parking", "AC"];

  return (
    <div className="w-56">
      <h3 className="font-bold text-charcoal mb-4">Amenities</h3>
      <div className="space-y-3 mb-6">
        {amenities.map((amenity) => (
          <label
            key={amenity}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity)}
              onChange={(e) => onAmenityToggle(amenity, e.target.checked)}
              className="w-4 h-4 accent-gold"
            />
            <span>{amenity}</span>
          </label>
        ))}
      </div>
      <button
        onClick={onApply}
        className="w-full py-2 bg-charcoal text-white rounded-lg hover:bg-gold transition-colors font-medium text-sm"
      >
        Apply
      </button>
    </div>
  );
}
