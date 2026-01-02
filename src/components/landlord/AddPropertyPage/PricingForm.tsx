import { DollarSign } from "lucide-react";

interface PricingFormProps {
  basePrice: string;
  cleaningFee: string;
  minStay: number;
  maxStay: number;
  onFormChange: (field: string, value: string | number) => void;
}

export function PricingForm({
  basePrice,
  cleaningFee,
  minStay,
  maxStay,
  onFormChange,
}: PricingFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-2">
            Base Price (per night)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <input
              type="number"
              value={basePrice}
              onChange={(e) => onFormChange("basePrice", e.target.value)}
              placeholder="120"
              className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
          </div>
          <p className="text-xs text-charcoal/60 mt-1">
            You'll receive: $
            {basePrice ? (parseFloat(basePrice) * 0.88).toFixed(2) : "0"} (after
            12% commission)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-2">
            Cleaning Fee (optional)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <input
              type="number"
              value={cleaningFee}
              onChange={(e) => onFormChange("cleaningFee", e.target.value)}
              placeholder="50"
              className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-2">
            Minimum Stay (nights)
          </label>
          <input
            type="number"
            min="1"
            value={minStay}
            onChange={(e) => onFormChange("minStay", parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-2">
            Maximum Stay (nights)
          </label>
          <input
            type="number"
            min="1"
            value={maxStay}
            onChange={(e) => onFormChange("maxStay", parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
