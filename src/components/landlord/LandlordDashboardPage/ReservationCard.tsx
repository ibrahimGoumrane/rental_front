import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface ReservationCardProps {
  reservation: {
    id: string;
    propertyName: string;
    clientName: string;
    checkIn: string;
    checkOut: string;
    amount: number;
    status: string;
  };
  index: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-terracotta/10 text-terracotta border-terracotta/20";
    case "accepted":
      return "bg-warm-green/10 text-warm-green border-warm-green/20";
    case "completed":
      return "bg-charcoal/10 text-charcoal border-charcoal/20";
    default:
      return "bg-charcoal/10 text-charcoal border-charcoal/20";
  }
};

export function ReservationCard({ reservation, index }: ReservationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        to={`/landlord/reservations/${reservation.id}`}
        className="block bg-white rounded-xl p-6 border border-charcoal/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-2">
              <h4 className="font-serif text-xl text-charcoal group-hover:text-warm-green transition-colors">
                {reservation.propertyName}
              </h4>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(
                  reservation.status
                )}`}
              >
                {reservation.status}
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-charcoal/60">
              <span>Guest: {reservation.clientName}</span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {reservation.checkIn} → {reservation.checkOut}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-serif text-2xl font-bold text-gold">
              ${reservation.amount.toLocaleString()}
            </p>
            <p className="text-xs text-charcoal/60">Total</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
