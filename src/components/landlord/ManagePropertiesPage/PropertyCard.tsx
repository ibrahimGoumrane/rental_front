import { AnimatePresence, motion } from "framer-motion";
import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { ManageProperty } from "@/lib/types/landlord";

interface PropertyCardProps {
  property: ManageProperty;
  index: number;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onDelete: (id: string) => void;
}

export function PropertyCard({
  property,
  index,
  isMenuOpen,
  onToggleMenu,
  onDelete,
}: PropertyCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-2xl overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="flex">
        {/* Image */}
        <div className="w-1/3 relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              property.status === "active"
                ? "bg-warm-green text-white"
                : "bg-charcoal/60 text-white"
            }`}
          >
            {property.status}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-serif text-2xl text-charcoal mb-1 group-hover:text-warm-green transition-colors">
                {property.title}
              </h3>
              <p className="text-sm text-charcoal/60">{property.location}</p>
            </div>

            {/* Actions Menu */}
            <div className="relative">
              <button
                onClick={onToggleMenu}
                className="p-2 hover:bg-sand rounded-lg transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-charcoal/60" />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-charcoal/10 py-2 z-20"
                  >
                    <Link
                      to={`/landlord/properties/${property.id}`}
                      className="flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors"
                    >
                      <Eye className="w-4 h-4 text-charcoal/60" />
                      <span className="text-sm">View Details</span>
                    </Link>
                    <Link
                      to={`/landlord/properties/${property.id}/edit`}
                      className="flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors"
                    >
                      <Edit className="w-4 h-4 text-charcoal/60" />
                      <span className="text-sm">Edit Property</span>
                    </Link>
                    <button
                      onClick={() => onDelete(property.id)}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-red-50 transition-colors text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-charcoal/60 mb-1">Monthly</p>
              <p className="font-serif text-lg font-bold text-gold">
                ${property.monthlyEarnings.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-charcoal/60 mb-1">Bookings</p>
              <p className="font-serif text-lg font-bold text-charcoal">
                {property.totalBookings}
              </p>
            </div>
            <div>
              <p className="text-xs text-charcoal/60 mb-1">Occupancy</p>
              <p className="font-serif text-lg font-bold text-warm-green">
                {property.occupancyRate}%
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
            <div className="flex items-center space-x-4 text-sm text-charcoal/60">
              <span>🛏️ {property.bedrooms} beds</span>
              <span>🚿 {property.bathrooms} baths</span>
            </div>
            <p className="font-serif text-xl font-bold text-charcoal">
              ${property.basePrice}
              <span className="text-sm font-normal text-charcoal/60">
                /night
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
