import { ADD_RENTAL_MODES } from "@/lib/constants/pages/AddPropertyPage";

interface RentalModeSelectorProps {
  rentalMode: string;
  onRentalModeChange: (mode: string) => void;
}

export function RentalModeSelector({
  rentalMode,
  onRentalModeChange,
}: RentalModeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal/80 mb-3">
        Rental Mode
      </label>
      <div className="bg-sand/30 p-1 rounded-xl flex">
        {ADD_RENTAL_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onRentalModeChange(mode.id)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              rentalMode === mode.id
                ? "bg-white text-charcoal shadow-sm"
                : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
}
