import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { LOCATIONS, PROPERTIES } from "@/lib/constants/pages/ListingsPage";
import { SearchBar } from "@/components/client/ListingsPage/SearchBar";
import { FiltersBar } from "@/components/client/ListingsPage/FiltersBar";
import { PropertiesGrid } from "@/components/client/ListingsPage/PropertiesGrid";

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
          <SearchBar
            locationQuery={locationQuery}
            onLocationChange={setLocationQuery}
            locationSuggestions={locationSuggestions}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            onCheckInChange={setCheckInDate}
            onCheckOutChange={setCheckOutDate}
            dateError={dateError}
            onSearch={() => {
              // Trigger search/filter logic if needed, currently reactive
            }}
          />

          {/* Filters */}
          <FiltersBar
            activeDropdown={activeFilterDropdown}
            onDropdownToggle={setActiveFilterDropdown}
            filters={filters}
            onFiltersChange={setFilters}
            sortBy={sortBy}
            onSortChange={setSortBy}
            showSortDropdown={showSortDropdown}
            onSortDropdownToggle={() => setShowSortDropdown(!showSortDropdown)}
            activeFilterCount={activeFilterCount}
            onClearFilters={clearFilters}
          />
        </motion.div>
      </section>

      {/* Masonry Grid */}
      <section className="px-4 md:px-8 max-w-[1600px] mx-auto">
        <PropertiesGrid
          properties={filteredProperties}
          onClearFilters={clearFilters}
        />
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
