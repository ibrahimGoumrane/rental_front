import { PropertyCard } from "@/components/ui/PropertyCard";
import { ListingProperty } from "@/lib/types/client";

interface PropertiesGridProps {
  properties: ListingProperty[];
  onClearFilters: () => void;
}

export function PropertiesGrid({
  properties,
  onClearFilters,
}: PropertiesGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-serif text-charcoal mb-2">
          No properties found
        </h3>
        <p className="text-charcoal/60 mb-6">
          Try adjusting your filters or search location.
        </p>
        <button
          onClick={onClearFilters}
          className="px-6 py-2 bg-charcoal text-white rounded-lg hover:bg-gold transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[400px]">
      {properties.map((property, index) => (
        <PropertyCard key={property.id} {...property} index={index} />
      ))}
    </div>
  );
}
