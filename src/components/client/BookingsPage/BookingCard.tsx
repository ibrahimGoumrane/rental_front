import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { ClientBooking } from "@/lib/types/client";

interface BookingCardProps {
  booking: ClientBooking;
  index: number;
  onCancel?: (id: string) => void;
}

export function BookingCard({ booking, index, onCancel }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-warm-green/10 text-warm-green border-warm-green/20";
      case "completed":
        return "bg-charcoal/10 text-charcoal border-charcoal/20";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-charcoal/10 text-charcoal border-charcoal/20";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-sm border border-charcoal/10 overflow-hidden hover:shadow-lg transition-shadow group"
    >
      <Link to={`/property/${booking.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={booking.image}
            alt={booking.property}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
              booking.status
            )} backdrop-blur-sm`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/property/${booking.id}`}>
          <h3 className="font-serif text-xl text-charcoal mb-2 group-hover:text-warm-green transition-colors">
            {booking.property}
          </h3>
        </Link>
        <div className="flex items-center text-charcoal/60 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{booking.location}</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal/60">Check-in</span>
            <span className="font-medium text-charcoal">{booking.checkIn}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal/60">Check-out</span>
            <span className="font-medium text-charcoal">
              {booking.checkOut}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal/60">Guests</span>
            <span className="font-medium text-charcoal">
              {booking.guests} guests
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-charcoal/10 gap-2">
          <span className="font-serif text-2xl text-charcoal">
            {booking.price}
          </span>
          <div className="flex gap-2">
            {booking.status === "upcoming" && onCancel && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onCancel(booking.id);
                }}
                className="px-3 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            )}
            <Link
              to={`/property/${booking.id}`}
              className="px-4 py-2 bg-warm-green/10 text-warm-green rounded-lg hover:bg-warm-green hover:text-white transition-colors text-sm font-medium whitespace-nowrap"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
