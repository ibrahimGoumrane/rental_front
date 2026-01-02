import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { MockReservation } from "@/lib/constants/pages/AdminReservationsPage";

interface FlagModalProps {
  isOpen: boolean;
  reservation: MockReservation | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function FlagModal({
  isOpen,
  reservation,
  onClose,
  onConfirm,
}: FlagModalProps) {
  if (!reservation) return null;

  return (
    <AnimatePresence>
      {isOpen && reservation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
              <h3 className="font-serif text-2xl text-charcoal">
                Flag Reservation for Review
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                <p className="text-sm text-charcoal/70">
                  <strong>Booking:</strong> {reservation.id}
                </p>
                <p className="text-sm text-charcoal/70 mt-1">
                  <strong>Property:</strong> {reservation.property.name}
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-sand rounded-lg p-4">
                  <h4 className="font-bold text-charcoal mb-2">
                    Property Details
                  </h4>
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={reservation.property.image}
                      alt={reservation.property.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-charcoal">
                        {reservation.property.name}
                      </p>
                      <p className="text-xs text-charcoal/60">
                        {reservation.property.location}
                      </p>
                      <Link
                        to={`/property/${reservation.property.id}`}
                        className="text-xs text-terracotta hover:underline mt-1 inline-block"
                      >
                        View Property Page
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-sand rounded-lg p-4">
                  <h4 className="font-bold text-charcoal mb-2">
                    Reservation Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-charcoal/60">Guest</p>
                      <p className="font-medium text-charcoal">
                        {reservation.guest.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-charcoal/60">Host</p>
                      <p className="font-medium text-charcoal">
                        {reservation.host.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-charcoal/60">Dates</p>
                      <p className="font-medium text-charcoal">
                        {reservation.checkIn} → {reservation.checkOut}
                      </p>
                    </div>
                    <div>
                      <p className="text-charcoal/60">Total</p>
                      <p className="font-medium text-charcoal">
                        ${reservation.total}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-terracotta/10 border border-terracotta/20 rounded-lg p-4">
                  <p className="text-sm text-charcoal/70">
                    <strong>Action:</strong> This reservation will be flagged
                    for admin review. The property and reservation details will
                    be logged for audit purposes.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors font-medium"
              >
                Flag for Review
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
