import { FilterDropdown } from "./FilterDropdown";
import { SortDropdown } from "./SortDropdown";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { AmenitiesFilter } from "./AmenitiesFilter";
import { MoreFilters } from "./MoreFilters";

interface FiltersBarProps {
  activeDropdown: string | null;
  onDropdownToggle: (dropdown: string | null) => void;
  filters: {
    priceRange: { min: number; max: number };
    propertyTypes: string[];
    amenities: string[];
    bedrooms: number | null;
    rating: number | null;
    available: boolean;
  };
  onFiltersChange: (filters: FiltersBarProps["filters"]) => void;
  sortBy: "recommended" | "price-low" | "price-high" | "rating";
  onSortChange: (
    value: "recommended" | "price-low" | "price-high" | "rating"
  ) => void;
  showSortDropdown: boolean;
  onSortDropdownToggle: () => void;
  activeFilterCount: number;
  onClearFilters: () => void;
}

export function FiltersBar({
  activeDropdown,
  onDropdownToggle,
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  showSortDropdown,
  onSortDropdownToggle,
  activeFilterCount,
  onClearFilters,
}: FiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
      {/* Price Filter */}
      <FilterDropdown
        isOpen={activeDropdown === "price"}
        onToggle={() =>
          onDropdownToggle(activeDropdown === "price" ? null : "price")
        }
        label="Price Range"
        hasActive={filters.priceRange.min > 0 || filters.priceRange.max < 5000}
      >
        <PriceRangeFilter
          min={filters.priceRange.min}
          max={filters.priceRange.max}
          onMinChange={(min) =>
            onFiltersChange({
              ...filters,
              priceRange: { ...filters.priceRange, min },
            })
          }
          onMaxChange={(max) =>
            onFiltersChange({
              ...filters,
              priceRange: { ...filters.priceRange, max },
            })
          }
          onApply={() => onDropdownToggle(null)}
        />
      </FilterDropdown>

      {/* Property Type Filter */}
      <FilterDropdown
        isOpen={activeDropdown === "type"}
        onToggle={() =>
          onDropdownToggle(activeDropdown === "type" ? null : "type")
        }
        label="Property Type"
        hasActive={filters.propertyTypes.length > 0}
        activeCount={filters.propertyTypes.length}
      >
        <PropertyTypeFilter
          selectedTypes={filters.propertyTypes}
          onTypeToggle={(type, checked) => {
            const newTypes = checked
              ? [...filters.propertyTypes, type]
              : filters.propertyTypes.filter((t) => t !== type);
            onFiltersChange({ ...filters, propertyTypes: newTypes });
          }}
          onApply={() => onDropdownToggle(null)}
        />
      </FilterDropdown>

      {/* Amenities Filter */}
      <FilterDropdown
        isOpen={activeDropdown === "amenities"}
        onToggle={() =>
          onDropdownToggle(activeDropdown === "amenities" ? null : "amenities")
        }
        label="Amenities"
        hasActive={filters.amenities.length > 0}
        activeCount={filters.amenities.length}
      >
        <AmenitiesFilter
          selectedAmenities={filters.amenities}
          onAmenityToggle={(amenity, checked) => {
            const newAmenities = checked
              ? [...filters.amenities, amenity]
              : filters.amenities.filter((a) => a !== amenity);
            onFiltersChange({ ...filters, amenities: newAmenities });
          }}
          onApply={() => onDropdownToggle(null)}
        />
      </FilterDropdown>

      {/* More Filters */}
      <FilterDropdown
        isOpen={activeDropdown === "more"}
        onToggle={() =>
          onDropdownToggle(activeDropdown === "more" ? null : "more")
        }
        label="More Filters"
        hasActive={!!(filters.bedrooms || filters.rating || filters.available)}
      >
        <MoreFilters
          bedrooms={filters.bedrooms}
          rating={filters.rating}
          available={filters.available}
          onBedroomsChange={(bedrooms) =>
            onFiltersChange({ ...filters, bedrooms })
          }
          onRatingChange={(rating) => onFiltersChange({ ...filters, rating })}
          onAvailableToggle={() =>
            onFiltersChange({ ...filters, available: !filters.available })
          }
          onApply={() => onDropdownToggle(null)}
        />
      </FilterDropdown>

      <div className="w-px h-6 bg-charcoal/10 mx-2 hidden md:block" />

      {/* Sort Dropdown */}
      <SortDropdown
        value={sortBy}
        onChange={onSortChange}
        isOpen={showSortDropdown}
        onToggle={onSortDropdownToggle}
      />

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={onClearFilters}
          className="text-xs text-red-500 hover:text-red-700 underline ml-2"
        >
          Clear all ({activeFilterCount})
        </button>
      )}
    </div>
  );
}
