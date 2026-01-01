import React, { useEffect, useMemo, useState, useRef } from "react";
import { PropertyCard } from "../components/ui/PropertyCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Calendar,
  SlidersHorizontal,
  ChevronDown,
  X,
  Star,
  Check,
} from "lucide-react";
// Enhanced property data
const PROPERTIES = [
  {
    id: "1",
    title: "The Glass Pavilion",
    location: "Montecito, California",
    price: "$1,200",
    priceValue: 1200,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    size: "large" as const,
    rating: 4.9,
    propertyType: "entire",
    amenities: ["Wifi", "Pool", "Kitchen", "Parking", "AC"],
    bedrooms: 4,
    beds: 6,
    bathrooms: 3,
    available: true,
  },
  {
    id: "2",
    title: "Villa di Como",
    location: "Lake Como, Italy",
    price: "$2,450",
    priceValue: 2450,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    size: "medium" as const,
    rating: 4.7,
    propertyType: "entire",
    amenities: ["Wifi", "Pool", "Kitchen", "Parking"],
    bedrooms: 3,
    beds: 5,
    bathrooms: 2,
    available: true,
  },
  {
    id: "3",
    title: "Kyoto Garden House",
    location: "Kyoto, Japan",
    price: "$850",
    priceValue: 850,
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=1000",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    size: "small" as const,
    rating: 4.8,
    propertyType: "private",
    amenities: ["Wifi", "Kitchen", "AC"],
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    available: true,
  },
  {
    id: "4",
    title: "Alpine Chalet",
    location: "Zermatt, Switzerland",
    price: "$1,800",
    priceValue: 1800,
    image:
      "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&q=80&w=1000",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    size: "medium" as const,
    rating: 4.6,
    propertyType: "entire",
    amenities: ["Wifi", "Kitchen", "Parking", "AC"],
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    available: false,
  },
  {
    id: "5",
    title: "Desert Modern",
    location: "Joshua Tree, CA",
    price: "$650",
    priceValue: 650,
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
    size: "small" as const,
    rating: 4.5,
    propertyType: "shared",
    amenities: ["Wifi", "Pool", "AC"],
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    available: true,
  },
  {
    id: "6",
    title: "Parisian Loft",
    location: "Le Marais, Paris",
    price: "$920",
    priceValue: 920,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-view-of-the-city-from-above-at-night-4467-large.mp4",
    size: "medium" as const,
    rating: 4.8,
    propertyType: "private",
    amenities: ["Wifi", "Kitchen"],
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    available: true,
  },
];
const LOCATIONS = [
  "Montecito, California",
  "Lake Como, Italy",
  "Kyoto, Japan",
  "Zermatt, Switzerland",
  "Joshua Tree, CA",
  "Le Marais, Paris",
];
export function ListingsPage() {
  // Search State
  const [locationQuery, setLocationQuery] = useState("");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [dateError, setDateError] = useState("");
  // Filter State
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<
    string | null
  >(null);
  const [filters, setFilters] = useState({
    priceRange: {
      min: 0,
      max: 5000,
    },
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
  // Refs for click outside
  const locationRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setShowLocationSuggestions(false);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        // Don't close if clicking inside the dropdown
      } else {
        // This logic is tricky with multiple dropdowns, simplified:
        // We'll handle closing in the dropdown component or specific handlers
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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
            delay: 0.4,
          }}
        >
          {/* Main Search Inputs */}
          <div className="bg-white p-2 rounded-xl shadow-xl shadow-charcoal/5 flex flex-col lg:flex-row items-start lg:items-center gap-2 mb-8 border border-charcoal/5 relative z-20">
            {/* Location Input */}
            <div className="flex-1 w-full relative group" ref={locationRef}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => {
                  setLocationQuery(e.target.value);
                  setShowLocationSuggestions(true);
                }}
                onFocus={() => setShowLocationSuggestions(true)}
                placeholder="Where would you like to go?"
                className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-charcoal placeholder:text-charcoal/40 font-serif text-lg focus:bg-cream/30 transition-colors rounded-lg"
              />
              <AnimatePresence>
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                    }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-charcoal/10 overflow-hidden z-30"
                  >
                    {locationSuggestions.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setLocationQuery(loc);
                          setShowLocationSuggestions(false);
                        }}
                        className="w-full text-left px-6 py-3 hover:bg-cream transition-colors flex items-center gap-3 text-charcoal"
                      >
                        <MapPin className="w-4 h-4 text-gold" />
                        {loc}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-px h-10 bg-charcoal/10 hidden lg:block" />

            {/* Date Inputs */}
            <div className="flex-1 w-full flex flex-col sm:flex-row gap-2 relative group">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none">
                  <Calendar className="w-5 h-5" />
                </div>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-charcoal placeholder:text-charcoal/40 font-serif text-lg focus:bg-cream/30 transition-colors rounded-lg appearance-none cursor-pointer"
                />
                <span className="absolute left-12 top-2 text-xs text-charcoal/40 font-sans pointer-events-none">
                  Check-in
                </span>
              </div>
              <div className="w-px h-10 bg-charcoal/10 hidden sm:block self-center" />
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none">
                  <Calendar className="w-5 h-5" />
                </div>
                <input
                  type="date"
                  value={checkOutDate}
                  min={checkInDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-charcoal placeholder:text-charcoal/40 font-serif text-lg focus:bg-cream/30 transition-colors rounded-lg appearance-none cursor-pointer"
                />
                <span className="absolute left-12 top-2 text-xs text-charcoal/40 font-sans pointer-events-none">
                  Check-out
                </span>
              </div>

              {dateError && (
                <div className="absolute -bottom-6 left-0 text-red-500 text-xs font-medium">
                  {dateError}
                </div>
              )}
            </div>

            <button
              onClick={() => {}} // Trigger search/filter logic if needed, currently reactive
              className="w-full lg:w-auto bg-charcoal text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-2 rounded-lg"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

          {/* Filters */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 relative z-10"
            ref={filterRef}
          >
            {/* Price Filter */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveFilterDropdown(
                    activeFilterDropdown === "price" ? null : "price"
                  )
                }
                className={`px-6 py-2 border ${
                  filters.priceRange.min > 0 || filters.priceRange.max < 5000
                    ? "border-gold bg-gold/10 text-charcoal"
                    : "border-charcoal/20 text-charcoal/60 hover:border-charcoal/40"
                } rounded-full text-sm transition-all duration-300 flex items-center gap-2`}
              >
                Price Range
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-300 ${
                    activeFilterDropdown === "price" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeFilterDropdown === "price" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                    }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-charcoal/10 p-6 z-30"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Property Type Filter */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveFilterDropdown(
                    activeFilterDropdown === "type" ? null : "type"
                  )
                }
                className={`px-6 py-2 border ${
                  filters.propertyTypes.length > 0
                    ? "border-gold bg-gold/10 text-charcoal"
                    : "border-charcoal/20 text-charcoal/60 hover:border-charcoal/40"
                } rounded-full text-sm transition-all duration-300 flex items-center gap-2`}
              >
                Property Type
                {filters.propertyTypes.length > 0 && (
                  <span className="bg-gold text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {filters.propertyTypes.length}
                  </span>
                )}
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-300 ${
                    activeFilterDropdown === "type" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeFilterDropdown === "type" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                    }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-charcoal/10 p-6 z-30"
                  >
                    <h3 className="font-bold text-charcoal mb-4">
                      Property Type
                    </h3>
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
                                  propertyTypes: [
                                    ...filters.propertyTypes,
                                    type,
                                  ],
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Amenities Filter */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveFilterDropdown(
                    activeFilterDropdown === "amenities" ? null : "amenities"
                  )
                }
                className={`px-6 py-2 border ${
                  filters.amenities.length > 0
                    ? "border-gold bg-gold/10 text-charcoal"
                    : "border-charcoal/20 text-charcoal/60 hover:border-charcoal/40"
                } rounded-full text-sm transition-all duration-300 flex items-center gap-2`}
              >
                Amenities
                {filters.amenities.length > 0 && (
                  <span className="bg-gold text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {filters.amenities.length}
                  </span>
                )}
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-300 ${
                    activeFilterDropdown === "amenities" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeFilterDropdown === "amenities" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                    }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-charcoal/10 p-6 z-30"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* More Filters */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveFilterDropdown(
                    activeFilterDropdown === "more" ? null : "more"
                  )
                }
                className={`px-6 py-2 border ${
                  filters.bedrooms || filters.rating || filters.available
                    ? "border-gold bg-gold/10 text-charcoal"
                    : "border-charcoal/20 text-charcoal/60 hover:border-charcoal/40"
                } rounded-full text-sm transition-all duration-300 flex items-center gap-2`}
              >
                More Filters
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-300 ${
                    activeFilterDropdown === "more" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeFilterDropdown === "more" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                    }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-charcoal/10 p-6 z-30"
                  >
                    <div className="space-y-6 mb-6">
                      {/* Bedrooms */}
                      <div>
                        <h3 className="font-bold text-charcoal mb-3">
                          Bedrooms
                        </h3>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4].map((num) => (
                            <button
                              key={num}
                              onClick={() =>
                                setFilters({
                                  ...filters,
                                  bedrooms:
                                    filters.bedrooms === num ? null : num,
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
                                  rating:
                                    filters.rating === rating ? null : rating,
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
                        <h3 className="font-bold text-charcoal">
                          Available only
                        </h3>
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-px h-6 bg-charcoal/10 mx-2 hidden md:block" />

            {/* Sort Dropdown */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 text-charcoal/60 hover:text-charcoal transition-colors text-sm font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>
                  Sort by:{" "}
                  {sortBy === "recommended"
                    ? "Recommended"
                    : sortBy === "price-low"
                    ? "Price: Low to High"
                    : sortBy === "price-high"
                    ? "Price: High to Low"
                    : "Rating"}
                </span>
              </button>
              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                    }}
                    className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-charcoal/10 py-2 z-30"
                  >
                    {[
                      {
                        value: "recommended",
                        label: "Recommended",
                      },
                      {
                        value: "price-low",
                        label: "Price: Low to High",
                      },
                      {
                        value: "price-high",
                        label: "Price: High to Low",
                      },
                      {
                        value: "rating",
                        label: "Rating: High to Low",
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value as any);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-cream transition-colors text-sm ${
                          sortBy === option.value
                            ? "font-bold text-charcoal"
                            : "text-charcoal/80"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
