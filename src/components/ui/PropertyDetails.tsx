import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  MessageSquare,
  Minus,
  Plus,
  Shield,
  Star,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HOUSE_RULE_GROUPS,
  HOUSE_RULE_LABELS,
  PROPERTY_TYPE_LABELS,
  RENTAL_MODE_LABELS,
} from "../../lib/constants/components/PropertyDetails";
import { RatingForm } from "./RatingForm";
import { PropertyData } from "../../lib/constants";

export function PropertyDetails({ property }: { property: PropertyData }) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [expandedRuleGroups, setExpandedRuleGroups] = useState<string[]>([
    "conduct",
  ]);
  const [showRatingForm, setShowRatingForm] = useState(false);
  // Calculate total price (mock logic)
  const pricePerNight = parseInt(
    property.price.replace("$", "").replace(",", "")
  );
  const getDays = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  const days = getDays();
  const total = pricePerNight * days;
  const serviceFee = Math.round(total * 0.12);
  const grandTotal = total + serviceFee;
  // Availability check
  const isDatesSelected = checkIn !== "" && checkOut !== "";
  const handleReserve = () => {
    if (!isDatesSelected) return;
    setIsReserved(true);
    setShowSuccessModal(true);
  };
  const updateGuests = (
    type: "adults" | "children" | "infants",
    operation: "inc" | "dec"
  ) => {
    setGuests((prev) => ({
      ...prev,
      [type]:
        operation === "inc" ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };
  const totalGuests = guests.adults + guests.children;
  const toggleRuleGroup = (groupId: string) => {
    setExpandedRuleGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };
  // Get property type display
  const getPropertyTypeDisplay = () => {
    if (!property.propertyType) return property.stats.type;
    const parts = [];
    if (property.propertyType.primary) {
      parts.push(
        PROPERTY_TYPE_LABELS[property.propertyType.primary] ||
          property.propertyType.primary
      );
    }
    if (property.propertyType.secondary) {
      parts.push(
        PROPERTY_TYPE_LABELS[property.propertyType.secondary] ||
          property.propertyType.secondary
      );
    }
    if (property.propertyType.rentalMode) {
      parts.push(
        `(${
          RENTAL_MODE_LABELS[property.propertyType.rentalMode] ||
          property.propertyType.rentalMode
        })`
      );
    }
    return parts.join(" · ") || property.stats.type;
  };
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 bg-white/95 backdrop-blur-md rounded-t-3xl shadow-2xl mt-0 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* LEFT COLUMN - CONTENT */}
        <div className="lg:col-span-8 space-y-10">
          {/* Header Info */}
          <div className=" pb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                Overview
              </h2>
              {isDatesSelected && (
                <div className="flex items-center space-x-2">
                  <div className="bg-warm-green/10 text-warm-green px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <span className="w-2 h-2 bg-warm-green rounded-full mr-2 animate-pulse"></span>
                    Available for your dates
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4 text-charcoal/70 text-sm md:text-base">
              <span className="flex items-center">
                <Star className="w-4 h-4 text-terracotta mr-1 fill-current" />
                <span className="font-medium text-charcoal">
                  {property.rating}
                </span>
                <span className="mx-1">·</span>
                <span className="underline cursor-pointer">
                  {property.reviewCount} reviews
                </span>
              </span>
              <span>·</span>
              <span className="underline cursor-pointer">
                {property.location}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-between py-6 border-b border-charcoal/10">
            <div>
              <h3 className="font-medium text-charcoal text-xl mb-1">
                {getPropertyTypeDisplay()} hosted by {property.host.name}
              </h3>
              <p className="text-charcoal/70">
                {property.stats.bedrooms} bedrooms · {property.stats.beds} beds
                · {property.stats.bathrooms} baths
              </p>
            </div>
            <img
              src={property.host.avatar}
              alt={property.host.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-sand"
            />
          </div>

          {/* Highlights */}
          <div className="py-6 border-b border-charcoal/10 space-y-6">
            {property.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <highlight.icon className="w-6 h-6 text-charcoal mt-1" />
                <div>
                  <h4 className="font-medium text-charcoal">
                    {highlight.title}
                  </h4>
                  <p className="text-charcoal/60 text-sm">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="py-6 border-b border-charcoal/10">
            <div
              className={`prose prose-lg prose-charcoal max-w-none relative ${
                !isDescriptionExpanded ? "max-h-[200px] overflow-hidden" : ""
              }`}
            >
              <p className="text-charcoal/80 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
              {!isDescriptionExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
              )}
            </div>
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-4 flex items-center text-charcoal font-medium underline decoration-charcoal/30 hover:decoration-charcoal transition-all"
            >
              {isDescriptionExpanded ? "Show less" : "Read more"}
              {isDescriptionExpanded ? (
                <ChevronUp className="w-4 h-4 ml-1" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-1" />
              )}
            </button>
          </div>

          {/* Amenities */}
          <div className="py-8 border-b border-charcoal/10">
            <h3 className="font-serif text-2xl text-charcoal mb-6">
              What this place offers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.amenities.slice(0, 6).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-charcoal/5 transition-colors"
                >
                  <item.icon className="w-6 h-6 text-charcoal/70" />
                  <span className="text-charcoal/80">{item.label}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 px-6 py-3 border border-charcoal text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors text-sm font-medium">
              Show all {property.amenities.length} amenities
            </button>
          </div>

          {/* House Rules - Comprehensive Display */}
          {property.houseRules &&
            Object.keys(property.houseRules).length > 0 && (
              <div className="py-8 border-b border-charcoal/10">
                <h3 className="font-serif text-2xl text-charcoal mb-6">
                  House Rules
                </h3>
                <div className="space-y-4">
                  {HOUSE_RULE_GROUPS.map((group) => {
                    const activeRulesInGroup = group.rules.filter(
                      (ruleId) =>
                        property.houseRules?.[
                          ruleId as keyof typeof property.houseRules
                        ]
                    );
                    if (activeRulesInGroup.length === 0) return null;
                    return (
                      <div
                        key={group.id}
                        className="border border-charcoal/10 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleRuleGroup(group.id)}
                          className="w-full flex items-center justify-between p-4 bg-sand/20 hover:bg-sand/40 transition-colors"
                        >
                          <span className="font-medium text-charcoal">
                            {group.title}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-charcoal/60 transition-transform duration-300 ${
                              expandedRuleGroups.includes(group.id)
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedRuleGroups.includes(group.id) && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.3,
                              }}
                            >
                              <div className="p-4 space-y-3 bg-white">
                                {activeRulesInGroup.map((ruleId) => (
                                  <div
                                    key={ruleId}
                                    className="flex items-start space-x-3 p-2"
                                  >
                                    <Check className="w-5 h-5 text-warm-green flex-shrink-0 mt-0.5" />
                                    <span className="text-charcoal/80 text-sm">
                                      {HOUSE_RULE_LABELS[ruleId] || ruleId}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Fallback to old rules if new format not available */}
          {(!property.houseRules ||
            Object.keys(property.houseRules).length === 0) &&
            property.rules &&
            property.rules.length > 0 && (
              <div className="py-8 border-b border-charcoal/10">
                <h3 className="font-serif text-2xl text-charcoal mb-6">
                  House Rules
                </h3>
                <ul className="space-y-3">
                  {property.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-warm-green flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal/80">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Location */}
          <div className="py-8 border-b border-charcoal/10">
            <h3 className="font-serif text-2xl text-charcoal mb-6">
              Where you'll be
            </h3>
            <div className="bg-charcoal/5 h-64 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden group cursor-pointer">
              <MapPin className="w-12 h-12 text-terracotta mb-2" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
              <span className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                Google Maps
              </span>
            </div>
            <h4 className="font-medium text-charcoal mb-2">
              {property.location}
            </h4>
            <p className="text-charcoal/70 leading-relaxed">
              {property.locationData.neighborhood}
            </p>
          </div>

          {/* Reviews */}
          <div className="py-8 border-b border-charcoal/10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-terracotta fill-current" />
                <h3 className="font-serif text-2xl text-charcoal">
                  {property.rating} · {property.reviewCount} reviews
                </h3>
              </div>

              {!showRatingForm && (
                <button
                  onClick={() => setShowRatingForm(true)}
                  className="px-4 py-2 border border-charcoal/20 rounded-lg text-sm font-medium hover:bg-charcoal hover:text-white transition-all"
                >
                  Write a review
                </button>
              )}
            </div>

            <AnimatePresence>
              {showRatingForm && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  className="overflow-hidden mb-10"
                >
                  <RatingForm
                    propertyId="1"
                    onCancel={() => setShowRatingForm(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {property.reviews.map((review) => (
                <div key={review.id} className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-charcoal">
                        {review.name}
                      </h4>
                      <p className="text-xs text-charcoal/50">{review.date}</p>
                    </div>
                  </div>
                  <p className="text-charcoal/80 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Host Bio */}
          <div className="py-8 border-b border-charcoal/10">
            <h3 className="font-serif text-2xl text-charcoal mb-6">
              Meet your host
            </h3>
            <div className="bg-sand/30 p-8 rounded-xl border border-charcoal/5 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center text-center space-y-2 min-w-[200px]">
                  <img
                    src={property.host.avatar}
                    alt={property.host.name}
                    className="w-24 h-24 rounded-full object-cover shadow-md"
                  />
                  <h4 className="font-serif text-xl text-charcoal mt-2">
                    {property.host.name}
                  </h4>
                  {property.host.verified && (
                    <div className="flex items-center text-warm-green text-sm font-medium">
                      <Shield className="w-4 h-4 mr-1" />
                      Identity verified
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-charcoal/80 leading-relaxed">
                    {property.host.bio}
                  </p>

                  {isReserved && (
                    <button
                      onClick={() => navigate("/messages")}
                      className="px-6 py-3 bg-charcoal text-white rounded-lg hover:bg-charcoal/90 transition-colors text-sm font-medium flex items-center"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Host
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - STICKY SIDEBAR */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            <div className="bg-white p-6 rounded-xl shadow-xl shadow-charcoal/5 border border-charcoal/5">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  {isDatesSelected ? (
                    <>
                      <span className="text-2xl font-serif text-charcoal font-medium">
                        {property.price}
                      </span>
                      <span className="text-charcoal/60 text-sm"> / night</span>
                    </>
                  ) : (
                    <span className="text-xl font-serif text-charcoal font-medium">
                      Add dates for prices
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm text-charcoal/80">
                  <Star className="w-4 h-4 text-terracotta mr-1 fill-current" />
                  <span>{property.rating}</span>
                  <span className="mx-1 text-charcoal/30">|</span>
                  <span className="underline">
                    {property.reviewCount} reviews
                  </span>
                </div>
              </div>

              {/* Booking Widget */}
              <div className="border border-charcoal/20 rounded-lg mb-4">
                <div className="grid grid-cols-2 border-b border-charcoal/20">
                  <div className="p-3 border-r border-charcoal/20">
                    <label className="block text-[10px] uppercase font-bold text-charcoal/60 mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-sm outline-none text-charcoal bg-transparent p-0"
                    />
                  </div>
                  <div className="p-3">
                    <label className="block text-[10px] uppercase font-bold text-charcoal/60 mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-sm outline-none text-charcoal bg-transparent p-0"
                    />
                  </div>
                </div>

                {/* Guest Dropdown */}
                <div className="relative">
                  <div
                    className="p-3 cursor-pointer hover:bg-charcoal/5 transition-colors"
                    onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
                  >
                    <label className="block text-[10px] uppercase font-bold text-charcoal/60 mb-1">
                      Guests
                    </label>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-charcoal">
                        {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-charcoal transition-transform ${
                          showGuestsDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {showGuestsDropdown && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-charcoal/10 shadow-xl rounded-lg mt-1 p-4 z-20">
                      {["adults", "children", "infants"].map((type) => (
                        <div
                          key={type}
                          className="flex items-center justify-between py-3 border-b border-charcoal/5 last:border-0"
                        >
                          <div>
                            <h5 className="font-medium text-charcoal capitalize">
                              {type}
                            </h5>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateGuests(type as any, "dec")}
                              disabled={
                                guests[type as keyof typeof guests] === 0 ||
                                (type === "adults" && guests.adults === 1)
                              }
                              className="p-1 rounded-full border border-charcoal/20 hover:border-charcoal text-charcoal disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-4 text-center text-sm">
                              {guests[type as keyof typeof guests]}
                            </span>
                            <button
                              onClick={() => updateGuests(type as any, "inc")}
                              className="p-1 rounded-full border border-charcoal/20 hover:border-charcoal text-charcoal"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleReserve}
                disabled={!isDatesSelected}
                className={`w-full font-bold py-3.5 rounded-lg transition-all shadow-lg mb-4 ${
                  isDatesSelected
                    ? "bg-warm-green hover:bg-warm-green/90 text-white shadow-warm-green/20"
                    : "bg-charcoal/10 text-charcoal/40 cursor-not-allowed"
                }`}
              >
                {isDatesSelected ? "Reserve" : "Check availability"}
              </button>

              {!isDatesSelected && (
                <p className="text-center text-sm text-charcoal/60 mb-2">
                  Select dates to check availability
                </p>
              )}

              {isDatesSelected && (
                <div className="space-y-3 pt-4 border-t border-charcoal/10">
                  <div className="flex justify-between text-charcoal/80 text-sm">
                    <span className="underline">
                      ${pricePerNight} x {days} nights
                    </span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-charcoal/80 text-sm">
                    <span className="underline">Service fee</span>
                    <span>${serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-charcoal font-medium text-base pt-3 border-t border-charcoal/10">
                    <span>Total before taxes</span>
                    <span>${grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowSuccessModal(false)}
            />
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10 text-center p-8"
            >
              <div className="w-16 h-16 bg-warm-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-warm-green" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">
                Reservation Requested!
              </h3>
              <p className="text-charcoal/60 mb-6">
                Your request has been sent to the host. You can now message them
                directly to discuss details.
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/messages");
                }}
                className="w-full bg-warm-green text-white py-3 rounded-lg font-medium hover:bg-warm-green/90 transition-colors"
              >
                Go to Messages
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
