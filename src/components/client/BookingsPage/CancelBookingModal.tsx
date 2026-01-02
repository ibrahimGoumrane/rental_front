import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function CancelBookingModal({
  isOpen,
  onClose,
  onConfirm,
}: CancelModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
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
            className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 z-10"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl text-charcoal mb-2">
                  Cancel Booking?
                </h3>
                <p className="text-charcoal/70 mb-6 text-sm">
                  Are you sure you want to cancel this reservation? This action
                  cannot be undone. Cancellation fees may apply based on the
                  property's policy.
                </p>
                <div className="flex space-x-3 justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-charcoal/70 hover:text-charcoal font-medium text-sm"
                  >
                    Keep Booking
                  </button>
                  <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Yes, Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
