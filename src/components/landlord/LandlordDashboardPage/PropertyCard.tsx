import { motion } from "framer-motion";
import { Calendar, DollarSign, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    image: string;
    monthlyEarnings: number;
    totalBookings: number;
    occupancyRate: number;
  };
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

export function PropertyCard({
  property,
  index,
  isHovered,
  onHover,
}: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => onHover(property.id)}
      onMouseLeave={() => onHover(null)}
      className="group"
    >
      <Link
        to={`/landlord/properties/${property.id}`}
        className="block bg-white rounded-2xl overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

          {/* Earnings Overlay (appears on hover) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6"
          >
            <DollarSign className="w-8 h-8 text-gold mb-2" />
            <p className="text-xs uppercase tracking-widest text-white/60 mb-1">
              Monthly Earnings
            </p>
            <h4 className="font-serif text-4xl font-bold text-gold mb-4">
              ${property.monthlyEarnings.toLocaleString()}
            </h4>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="text-center">
                <p className="text-xs text-white/60 mb-1">Bookings</p>
                <p className="text-xl font-bold">{property.totalBookings}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/60 mb-1">Occupancy</p>
                <p className="text-xl font-bold">{property.occupancyRate}%</p>
              </div>
            </div>
          </motion.div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-warm-green/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full">
            Active
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-2xl text-charcoal mb-2 group-hover:text-warm-green transition-colors">
            {property.title}
          </h3>
          <p className="text-charcoal/60 text-sm mb-4">{property.location}</p>
          <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
            <div className="flex items-center space-x-4 text-sm text-charcoal/60">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{property.totalBookings} bookings</span>
              </div>
            </div>
            <Eye className="w-5 h-5 text-charcoal/40 group-hover:text-warm-green transition-colors" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
