import { AnimatePresence, motion } from "framer-motion";
import {
  Ban,
  CheckCircle,
  Flag,
  MapPin,
  MessageSquare,
  MoreVertical,
  Shield,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MockReservation } from "@/lib/constants/pages/AdminReservationsPage";

interface ReservationRowProps {
  reservation: MockReservation;
  index: number;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onFlag: () => void;
  onCancel: () => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

export function ReservationRow({
  reservation,
  index,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onFlag,
  onCancel,
  getStatusBadge,
}: ReservationRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.05 }}
      className={`hover:bg-sand/50 transition-colors ${
        index % 2 === 0 ? "bg-white" : "bg-cream"
      } ${
        reservation.daysUntil >= 0 &&
        reservation.daysUntil < 1 &&
        reservation.status === "confirmed"
          ? "border-l-4 border-terracotta"
          : ""
      }`}
    >
      <td className="px-6 py-4">
        <span className="font-mono text-sm text-charcoal font-medium">
          {reservation.id}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <img
            src={reservation.property.image}
            alt={reservation.property.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <Link
              to={`/property/${reservation.property.id}`}
              className="font-bold text-charcoal hover:text-terracotta transition-colors"
            >
              {reservation.property.name}
            </Link>
            <p className="text-xs text-charcoal/60 flex items-center mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              {reservation.property.location}
            </p>
            <p className="text-xs text-terracotta mt-1 font-medium">
              Host: {reservation.host.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          {reservation.guest.avatar ? (
            <img
              src={reservation.guest.avatar}
              alt={reservation.guest.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-warm-green/10 flex items-center justify-center">
              <span className="text-xs font-bold text-warm-green">
                {reservation.guest.initials}
              </span>
            </div>
          )}
          <div>
            <div className="flex items-center space-x-1">
              <Link
                to={`/admin/users/${reservation.id}`}
                className="text-sm font-medium text-charcoal hover:text-warm-green transition-colors"
              >
                {reservation.guest.name}
              </Link>
              {reservation.guest.verified && (
                <Shield className="w-3 h-3 text-gold" />
              )}
            </div>
            <p
              className={`text-xs ${
                reservation.guest.previousBookings
                  ? reservation.guest.previousBookings > 10
                    ? "text-warm-green"
                    : "text-charcoal/60"
                  : "text-charcoal/60"
              }`}
            >
              {reservation.guest.previousBookings} bookings
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-charcoal font-medium">
          {reservation.checkIn} → {reservation.checkOut}
        </p>
        {reservation.daysUntil >= 0 && (
          <p
            className={`text-xs mt-1 ${
              reservation.daysUntil < 3
                ? "text-gold font-medium"
                : "text-charcoal/60"
            }`}
          >
            {reservation.daysUntil === 0
              ? "Today"
              : `In ${reservation.daysUntil} days`}
          </p>
        )}
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-charcoal">
          {reservation.nights} nights
        </span>
      </td>
      <td className="px-6 py-4">
        <p className="font-bold text-charcoal">${reservation.total}</p>
      </td>
      <td className="px-6 py-4">
        <p className="font-bold text-gold">${reservation.commission}</p>
        <p className="text-xs text-charcoal/60">
          ({((reservation.commission / reservation.total) * 100).toFixed(0)}%)
        </p>
      </td>
      <td className="px-6 py-4">{getStatusBadge(reservation.status)}</td>
      <td className="px-6 py-4 relative">
        <button
          onClick={onToggleMenu}
          className="p-2 hover:bg-sand rounded-lg transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-charcoal/60" />
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={onCloseMenu} />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-64 bg-cream rounded-xl shadow-2xl border border-charcoal/10 py-2 z-40"
              >
                <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm">
                  <Users className="w-4 h-4 text-charcoal/60" />
                  <span>Contact Guest</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm">
                  <Users className="w-4 h-4 text-charcoal/60" />
                  <span>Contact Host</span>
                </button>
                <Link
                  to={`/admin/messages`}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm"
                >
                  <MessageSquare className="w-4 h-4 text-charcoal/60" />
                  <span>Check Messages</span>
                </Link>
                <div className="border-t border-charcoal/10 my-2" />
                <button
                  onClick={onFlag}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm"
                >
                  <Flag className="w-4 h-4 text-charcoal/60" />
                  <span>Flag for Review</span>
                </button>
                <button
                  onClick={onCancel}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-terracotta"
                >
                  <Ban className="w-4 h-4" />
                  <span>Cancel Reservation</span>
                </button>
                {reservation.status === "disputed" && (
                  <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-warm-green">
                    <CheckCircle className="w-4 h-4" />
                    <span>Resolve Dispute</span>
                  </button>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </td>
    </motion.tr>
  );
}
