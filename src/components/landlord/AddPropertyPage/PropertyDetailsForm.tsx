interface PropertyDetailsFormProps {
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  maxGuests: number;
  onFormChange: (field: string, value: string | number) => void;
}

export function PropertyDetailsForm({
  title,
  description,
  bedrooms,
  beds,
  bathrooms,
  maxGuests,
  onFormChange,
}: PropertyDetailsFormProps) {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-charcoal/80 mb-2">
          Property Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onFormChange("title", e.target.value)}
          placeholder="e.g., Stunning Villa with Ocean Views"
          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-charcoal/80 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => onFormChange("description", e.target.value)}
          rows={6}
          placeholder="Describe your space, the neighborhood, and what makes it special..."
          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors resize-none"
        />
      </div>

      {/* Rooms */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { key: "bedrooms", label: "Bedrooms", value: bedrooms },
          { key: "beds", label: "Beds", value: beds },
          { key: "bathrooms", label: "Bathrooms", value: bathrooms },
          { key: "maxGuests", label: "Max Guests", value: maxGuests },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-charcoal/80 mb-2">
              {field.label}
            </label>
            <input
              type="number"
              min="1"
              value={field.value}
              onChange={(e) =>
                onFormChange(field.key, parseInt(e.target.value))
              }
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
