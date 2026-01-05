interface PriceRangeFilterProps {
  min: number;
  max: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  onApply: () => void;
}

export function PriceRangeFilter({
  min,
  max,
  onMinChange,
  onMaxChange,
  onApply,
}: PriceRangeFilterProps) {
  return (
    <div className="w-64">
      <h3 className="font-bold text-charcoal mb-4">Price Range (per night)</h3>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <label className="text-xs text-charcoal/60 mb-1 block">Min</label>
          <input
            type="number"
            value={min}
            onChange={(e) => onMinChange(Number(e.target.value))}
            className="w-full p-2 border border-charcoal/20 rounded-lg"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs text-charcoal/60 mb-1 block">Max</label>
          <input
            type="number"
            value={max}
            onChange={(e) => onMaxChange(Number(e.target.value))}
            className="w-full p-2 border border-charcoal/20 rounded-lg"
          />
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
