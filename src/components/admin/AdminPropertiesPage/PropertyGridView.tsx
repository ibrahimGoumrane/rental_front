import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Shield, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Property } from "@/lib/constants/pages/AdminPropertiesPage";

interface PropertyGridViewProps {
  properties: Property[];
  onStatusChange: (
    propertyId: number,
    propertyName: string,
    currentStatus: string,
    newStatus: string
  ) => void;
  onAddToCollection: (propertyId: number) => void;
  getStatusBadge: (status: string) => JSX.Element | null;
  getVerificationIcon: (status: string) => JSX.Element;
}

export function PropertyGridView({
  properties,
  onStatusChange,
  onAddToCollection,
  getStatusBadge,
  getVerificationIcon,
}: PropertyGridViewProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {properties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.05 }}
          onMouseEnter={() => setHoveredCard(property.id)}
          onMouseLeave={() => setHoveredCard(null)}
          className="bg-sand rounded-2xl overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-xl transition-all relative group"
        >
          {/* Featured Ribbon */}
          {property.featured && (
            <div className="absolute top-0 right-0 z-20">
              <div className="bg-gold text-white px-4 py-1 text-xs font-bold uppercase tracking-wider transform rotate-45 translate-x-8 translate-y-4 shadow-lg">
                <Star className="w-3 h-3 inline mr-1" />
                Featured
              </div>
            </div>
          )}

          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Quick Actions Overlay */}
            <AnimatePresence>
              {hoveredCard === property.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center space-x-3 p-4"
                >
                  <Link
                    to={`/property/${property.id}`}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-terracotta transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => onAddToCollection(property.id)}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-gold transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    Add to Collection
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <Link
                  to={`/property/${property.id}`}
                  className="font-bold text-charcoal hover:text-terracotta transition-colors text-lg line-clamp-1"
                >
                  {property.title}
                </Link>
                <div className="flex items-center text-sm text-charcoal/60 mt-1">
                  <MapPin className="w-4 h-4 text-terracotta mr-1 flex-shrink-0" />
                  <span className="truncate">{property.location}</span>
                </div>
              </div>
              <div className="ml-2 flex-shrink-0">
                {getVerificationIcon(property.verification)}
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-terracotta/20 text-terracotta text-xs font-bold rounded-full capitalize">
                {property.type}
              </span>
              {getStatusBadge(property.status)}
            </div>

            {/* Status Dropdown */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-charcoal/60 mb-1">
                Status Control
              </label>
              <select
                value={property.status}
                onChange={(e) =>
                  onStatusChange(
                    property.id,
                    property.title,
                    property.status,
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta bg-white text-sm"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            {/* Suspended Notice */}
            {property.status === "suspended" && property.autoDeleteDate && (
              <div className="mb-4 p-3 bg-terracotta/10 border border-terracotta/20 rounded-lg">
                <p className="text-xs text-terracotta font-medium">
                  ⚠️ Auto-delete: {property.autoDeleteDate}
                </p>
                <p className="text-xs text-charcoal/60 mt-1">
                  Reactivate before this date to prevent deletion
                </p>
              </div>
            )}

            {/* Owner */}
            <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-charcoal/10">
              {property.owner.avatar ? (
                <img
                  src={property.owner.avatar}
                  alt={property.owner.name}
                  className="w-8 h-8 rounded-full border-2 border-sand flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-warm-green/10 flex items-center justify-center border-2 border-sand flex-shrink-0">
                  <span className="text-xs font-bold text-warm-green">
                    {property.owner.initials}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-charcoal truncate">
                  {property.owner.name}
                </p>
              </div>
              {property.owner.verified && (
                <Shield className="w-4 h-4 text-gold flex-shrink-0" />
              )}
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-charcoal/60">Nightly Rate</span>
                <span className="font-bold text-charcoal">
                  ${property.price}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-charcoal/60">Total Bookings</span>
                <span className="font-medium text-warm-green">
                  {property.bookings}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-charcoal/60">Revenue</span>
                <span className="font-medium text-gold">
                  ${property.revenue.toLocaleString()}
                </span>
              </div>
              {property.rating > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-charcoal/60">Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-gold fill-current mr-1" />
                    <span className="font-medium text-charcoal">
                      {property.rating}
                    </span>
                    <span className="text-xs text-charcoal/60 ml-1">
                      ({property.reviewCount})
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
