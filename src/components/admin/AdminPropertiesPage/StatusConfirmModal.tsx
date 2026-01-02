import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import type { StatusChangeData } from "@/lib/types/admin";

interface StatusConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  statusChange: StatusChangeData | null;
  onConfirm: () => void;
}

export function StatusConfirmModal({
  isOpen,
  onClose,
  statusChange,
  onConfirm,
}: StatusConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && statusChange && (
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
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal mb-2">
              Confirm Status Change
            </h3>
            <p className="text-charcoal/60 mb-6">
              Change status of <strong>{statusChange.propertyName}</strong> from{" "}
              <strong className="capitalize">
                {statusChange.currentStatus}
              </strong>{" "}
              to{" "}
              <strong className="capitalize">{statusChange.newStatus}</strong>?
            </p>
            {statusChange.newStatus === "suspended" && (
              <div className="bg-terracotta/10 border border-terracotta/20 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-charcoal/70">
                  <strong>Warning:</strong> Suspended properties become
                  invisible to users and will be automatically deleted after 30
                  days if not reactivated.
                </p>
              </div>
            )}
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
                className="flex-1 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors font-medium"
              >
                Confirm Change
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
