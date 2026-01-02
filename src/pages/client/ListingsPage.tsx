import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { LOCATIONS, PROPERTIES } from "@/lib/constants/pages/ListingsPage";
import { LocationInput } from "@/components/client/ListingsPage/LocationInput";
import { DateInputs } from "@/components/client/ListingsPage/DateInputs";
import { FilterDropdown } from "@/components/client/ListingsPage/FilterDropdown";
import { SortDropdown } from "@/components/client/ListingsPage/SortDropdown";

export function ListingsPage() {
  // Search State
  const [locationQuery, setLocationQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [dateError, setDateError] = useState("");
  // Filter State
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<
    string | null
  >(null);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 5000 },
    rating: null as number | null,
    propertyTypes: [] as string[],
    amenities: [] as string[],
    bedrooms: null as number | null,
    available: false,
  });
  // Sort State
  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high" | "rating"
  >("recommended");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  // Filtered Location Suggestions
  const locationSuggestions = useMemo(() => {
    if (!locationQuery) return [];
    return LOCATIONS.filter((loc) =>
      loc.toLowerCase().includes(locationQuery.toLowerCase())
    );
  }, [locationQuery]);

  // Date Validation
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      if (new Date(checkOutDate) <= new Date(checkInDate)) {
        setDateError("Check-out must be after check-in");
      } else {
        setDateError("");
      }
    }
  }, [checkInDate, checkOutDate]);
  // Filter Logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // Location Filter
      if (
        locationQuery &&
        !property.location.toLowerCase().includes(locationQuery.toLowerCase())
      ) {
        return false;
      }
      // Price Filter
      if (
        property.priceValue < filters.priceRange.min ||
        property.priceValue > filters.priceRange.max
      ) {
        return false;
      }
      // Rating Filter
      if (filters.rating && property.rating < filters.rating) {
        return false;
      }
      // Property Type Filter
      if (
        filters.propertyTypes.length > 0 &&
        !filters.propertyTypes.includes(property.propertyType)
      ) {
        return false;
      }
      // Amenities Filter
      if (
        filters.amenities.length > 0 &&
        !filters.amenities.every((a) => property.amenities.includes(a))
      ) {
        return false;
      }
      // Bedrooms Filter
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) {
        return false;
      }
      // Availability Filter
      if (filters.available && !property.available) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      // Sort Logic
      switch (sortBy) {
        case "price-low":
          return a.priceValue - b.priceValue;
        case "price-high":
          return b.priceValue - a.priceValue;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [PROPERTIES, locationQuery, filters, sortBy]);
  const activeFilterCount =
    (filters.priceRange.min > 0 || filters.priceRange.max < 5000 ? 1 : 0) +
    (filters.rating ? 1 : 0) +
    filters.propertyTypes.length +
    filters.amenities.length +
    (filters.bedrooms ? 1 : 0) +
    (filters.available ? 1 : 0);
  const clearFilters = () => {
    setFilters({
      priceRange: {
        min: 0,
        max: 5000,
      },
      rating: null,
      propertyTypes: [],
      amenities: [],
      bedrooms: null,
      available: false,
    });
    setLocationQuery("");
    setCheckInDate("");
    setCheckOutDate("");
  };
  return (
    <main className="min-h-screen pb-20 bg-cream">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 md:px-12 text-center">
        <motion.h1
          className="font-serif text-5xl md:text-7xl text-charcoal mb-6"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          Curated Escapes
        </motion.h1>
        <motion.p
          className="text-charcoal-light text-lg max-w-2xl mx-auto font-light mb-12"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
        >
          Discover a collection of the world's most extraordinary homes,
          hand-picked for the discerning traveler.
        </motion.p>

        {/* Search & Filter Bar */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Main Search Inputs */}
          <div className="bg-white p-2 rounded-xl shadow-xl shadow-charcoal/5 flex flex-col lg:flex-row items-start lg:items-center gap-2 mb-8 border border-charcoal/5 relative z-20">
            {/* Location Input */}
            <LocationInput
              value={locationQuery}
              onChange={setLocationQuery}
              suggestions={locationSuggestions}
            />

            <div className="w-px h-10 bg-charcoal/10 hidden lg:block" />

            {/* Date Inputs */}
            <DateInputs
              checkIn={checkInDate}
              checkOut={checkOutDate}
              onCheckInChange={setCheckInDate}
              onCheckOutChange={setCheckOutDate}
              error={dateError}
            />

            <button
              onClick={() => {
                // Trigger search/filter logic if needed, currently reactive
              }}
              className="w-full lg:w-auto bg-charcoal text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-2 rounded-lg"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            {/* Price Filter */}
            <FilterDropdown
              isOpen={activeFilterDropdown === "price"}
              onToggle={() =>
                setActiveFilterDropdown(
                  activeFilterDropdown === "price" ? null : "price"
                )
              }
              label="Price Range"
              hasActive={
                filters.priceRange.min > 0 || filters.priceRange.max < 5000
              }
            >
              <div className="w-64">
                <h3 className="font-bold text-charcoal mb-4">
                  Price Range (per night)
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1">
                    <label className="text-xs text-charcoal/60 mb-1 block">
                      Min
                    </label>
                    <input
                      type="number"
                      value={filters.priceRange.min}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          priceRange: {
                            ...filters.priceRange,
                            min: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-2 border border-charcoal/20 rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-charcoal/60 mb-1 block">
                      Max
                    </label>
                    <input
                      type="number"
                      value={filters.priceRange.max}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          priceRange: {
                            ...filters.priceRange,
                            max: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-2 border border-charcoal/20 rounded-lg"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setActiveFilterDropdown(null)}
                  className="w-full py-2 bg-charcoal text-white rounded-lg hover:bg-gold transition-colors font-medium text-sm"
                >
                  Apply
                </button>
              </div>
            </FilterDropdown>

            {/* Property Type Filter */}
            <FilterDropdown
              isOpen={activeFilterDropdown === "type"}
              onToggle={() =>
                setActiveFilterDropdown(
                  activeFilterDropdown === "type" ? null : "type"
                )
              }
              label="Property Type"
              hasActive={filters.propertyTypes.length > 0}
              activeCount={filters.propertyTypes.length}
            >
              <div className="w-56">
                <h3 className="font-bold text-charcoal mb-4">Property Type</h3>
                <div className="space-y-3 mb-6">
                  {["entire", "private", "shared"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.propertyTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({
                              ...filters,
                              propertyTypes: [...filters.propertyTypes, type],
                            });
                          } else {
                            setFilters({
                              ...filters,
                              propertyTypes: filters.propertyTypes.filter(
                                (t) => t !== type
                              ),
                            });
                          }
                        }}
                        className="w-4 h-4 accent-gold"
                      />
                      <span className="capitalize">
                        {type === "entire" ? "Entire home" : type + " room"}
                      </span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={() => setActiveFilterDropdown(null)}
                  className="w-full py-2 bg-charcoal text-white rounded-lg hover:bg-gold transition-colors font-medium text-sm"
                >
                  Apply
                </button>
              </div>
            </FilterDropdown>

            {/* Amenities Filter */}
            <FilterDropdown
              isOpen={activeFilterDropdown === "amenities"}
              onToggle={() =>
                setActiveFilterDropdown(
                  activeFilterDropdown === "amenities" ? null : "amenities"
                )
              }
              label="Amenities"
              hasActive={filters.amenities.length > 0}
              activeCount={filters.amenities.length}
            >
              <div className="w-56">
                <h3 className="font-bold text-charcoal mb-4">Amenities</h3>
                <div className="space-y-3 mb-6">
                  {["Wifi", "Pool", "Kitchen", "Parking", "AC"].map(
                    (amenity) => (
                      <label
                        key={amenity}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                amenities: [...filters.amenities, amenity],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                amenities: filters.amenities.filter(
                                  (a) => a !== amenity
                                ),
                              });
                            }
                          }}
                          className="w-4 h-4 accent-gold"
                        />
                        <span>{amenity}</span>
                      </label>
                    )
                  )}
                </div>
                <button
                  onClick={() => setActiveFilterDropdown(null)}
                  className="w-full py-2 bg-charcoal text-white rounded-lg hover:bg-gold transition-colors font-medium text-sm"
                >
                  Apply
                </button>
              </div>
            </FilterDropdown>

            {/* More Filters */}
            <FilterDropdown
              isOpen={activeFilterDropdown === "more"}
              onToggle={() =>
                setActiveFilterDropdown(
                  activeFilterDropdown === "more" ? null : "more"
                )
              }
              label="More Filters"
              hasActive={
                !!(filters.bedrooms || filters.rating || filters.available)
              }
            >
              <div className="w-72">
                <div className="space-y-6 mb-6">
                  {/* Bedrooms */}
                  <div>
                    <h3 className="font-bold text-charcoal mb-3">Bedrooms</h3>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          onClick={() =>
                            setFilters({
                              ...filters,
                              bedrooms: filters.bedrooms === num ? null : num,
                            })
                          }
                          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                            filters.bedrooms === num
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
                      {[4, 4.5, 4.8].map((rating) => (
                        <button
                          key={rating}
                          onClick={() =>
                            setFilters({
                              ...filters,
                              rating: filters.rating === rating ? null : rating,
                            })
                          }
                          className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                            filters.rating === rating
                              ? "bg-charcoal text-white border-charcoal"
                              : "border-charcoal/20 text-charcoal hover:border-charcoal"
                          }`}
                        >
                          {rating}+
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-charcoal">Available only</h3>
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          available: !filters.available,
                        })
                      }
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        filters.available ? "bg-gold" : "bg-charcoal/20"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                          filters.available ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setActiveFilterDropdown(null)}
                  className="w-full py-2 bg-charcoal text-white rounded-lg hover:bg-gold transition-colors font-medium text-sm"
                >
                  Apply
                </button>
              </div>
            </FilterDropdown>

            <div className="w-px h-6 bg-charcoal/10 mx-2 hidden md:block" />

            {/* Sort Dropdown */}
            <SortDropdown
              value={sortBy}
              onChange={setSortBy}
              isOpen={showSortDropdown}
              onToggle={() => setShowSortDropdown(!showSortDropdown)}
            />

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-red-500 hover:text-red-700 underline ml-2"
              >
                Clear all ({activeFilterCount})
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Masonry Grid */}
      <section className="px-4 md:px-8 max-w-[1600px] mx-auto">
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[400px]">
            {filteredProperties.map((property, index) => (
              <PropertyCard key={property.id} {...property} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-serif text-charcoal mb-2">
              No properties found
            </h3>
            <p className="text-charcoal/60 mb-6">
              Try adjusting your filters or search location.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-charcoal text-white rounded-lg hover:bg-gold transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Load More */}
      {filteredProperties.length > 0 && (
        <div className="flex justify-center mt-16">
          <button className="px-8 py-3 border border-charcoal text-charcoal hover:bg-charcoal hover:text-white transition-colors duration-300 uppercase tracking-widest text-xs font-bold">
            Load More Collections
          </button>
        </div>
      )}
    </main>
  );
}
