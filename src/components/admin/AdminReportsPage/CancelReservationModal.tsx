import { AnimatePresence, motion } from "framer-motion";
import { Ban } from "lucide-react";
import { MockReport } from "@/lib/constants/pages/AdminReportsPage";

interface CancelReservationModalProps {
  isOpen: boolean;
  report: MockReport | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function CancelReservationModal({
  isOpen,
  report,
  onClose,
  onConfirm,
}: CancelReservationModalProps) {
  if (!report) return null;

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10 text-center p-8"
          >
            <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-6">
              <Ban className="w-8 h-8 text-terracotta" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal mb-2">
              Cancel Reservation?
            </h3>
            <p className="text-charcoal/60 mb-6">
              Cancel reservation <strong>{report.booking.id}</strong> for
              dispute <strong>{report.id}</strong>?
            </p>
            <div className="bg-terracotta/10 border border-terracotta/20 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-charcoal/70">
                <strong>Financial Impact:</strong> The host will not be charged
                for this reservation (monthly billing model). This is the
                primary financial resolution action.
              </p>
            </div>
            <p className="text-xs text-charcoal/60 mb-6">
              This action will be logged in the audit trail.
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors font-medium"
              >
                Confirm Cancellation
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
