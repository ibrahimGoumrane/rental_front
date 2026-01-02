import { MapPin } from "lucide-react";

interface LocationFormProps {
  address: string;
  city: string;
  country: string;
  onFormChange: (field: string, value: string) => void;
}

export function LocationForm({
  address,
  city,
  country,
  onFormChange,
}: LocationFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-charcoal/80 mb-2">
          Street Address
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => onFormChange("address", e.target.value)}
          placeholder="123 Main Street"
          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-2">
            City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => onFormChange("city", e.target.value)}
            placeholder="San Francisco"
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-2">
            Country
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => onFormChange("country", e.target.value)}
            placeholder="United States"
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
          />
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-sand/30 rounded-xl h-64 flex items-center justify-center border border-charcoal/10">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-charcoal/40 mx-auto mb-2" />
          <p className="text-charcoal/60">Map preview will appear here</p>
        </div>
      </div>
    </div>
  );
}
