interface MoreFiltersProps {
  bedrooms: number | null;
  rating: number | null;
  available: boolean;
  onBedroomsChange: (value: number | null) => void;
  onRatingChange: (value: number | null) => void;
  onAvailableToggle: () => void;
  onApply: () => void;
}

export function MoreFilters({
  bedrooms,
  rating,
  available,
  onBedroomsChange,
  onRatingChange,
  onAvailableToggle,
  onApply,
}: MoreFiltersProps) {
  return (
    <div className="w-72">
      <div className="space-y-6 mb-6">
        {/* Bedrooms */}
        <div>
          <h3 className="font-bold text-charcoal mb-3">Bedrooms</h3>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => onBedroomsChange(bedrooms === num ? null : num)}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                  bedrooms === num
                    ? "bg-charcoal text-white border-charcoal"
                    : "border-charcoal/20 text-charcoal hover:border-charcoal"
                }`}
              >
                {num}+
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-bold text-charcoal mb-3">Rating</h3>
          <div className="flex gap-2">
            {[4, 4.5, 4.8].map((rate) => (
              <button
                key={rate}
                onClick={() => onRatingChange(rating === rate ? null : rate)}
                className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                  rating === rate
                    ? "bg-charcoal text-white border-charcoal"
                    : "border-charcoal/20 text-charcoal hover:border-charcoal"
                }`}
              >
                {rate}+
              </button>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-charcoal">Available only</h3>
          <button
            onClick={onAvailableToggle}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              available ? "bg-gold" : "bg-charcoal/20"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                available ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>
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
