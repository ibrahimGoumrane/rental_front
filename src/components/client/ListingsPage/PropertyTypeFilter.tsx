interface PropertyTypeFilterProps {
  selectedTypes: string[];
  onTypeToggle: (type: string, checked: boolean) => void;
  onApply: () => void;
}

export function PropertyTypeFilter({
  selectedTypes,
  onTypeToggle,
  onApply,
}: PropertyTypeFilterProps) {
  const types = ["entire", "private", "shared"];

  return (
    <div className="w-56">
      <h3 className="font-bold text-charcoal mb-4">Property Type</h3>
      <div className="space-y-3 mb-6">
        {types.map((type) => (
          <label key={type} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={(e) => onTypeToggle(type, e.target.checked)}
              className="w-4 h-4 accent-gold"
            />
            <span className="capitalize">
              {type === "entire" ? "Entire home" : type + " room"}
            </span>
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
