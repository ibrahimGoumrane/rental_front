import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Ban, CheckCircle } from "lucide-react";
import type { ConfirmAction } from "@/lib/types/admin";

interface ConfirmActionModalProps {
  confirmAction: ConfirmAction | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmActionModal({
  confirmAction,
  onClose,
  onConfirm,
}: ConfirmActionModalProps) {
  if (!confirmAction) return null;

  return (
    <AnimatePresence>
      {confirmAction && (
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
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                confirmAction.type === "false-positive"
                  ? "bg-warm-green/10"
                  : confirmAction.type === "warn"
                  ? "bg-gold/10"
                  : "bg-terracotta/10"
              }`}
            >
              {confirmAction.type === "false-positive" ? (
                <CheckCircle className="w-8 h-8 text-warm-green" />
              ) : confirmAction.type === "warn" ? (
                <AlertTriangle className="w-8 h-8 text-gold" />
              ) : (
                <Ban className="w-8 h-8 text-terracotta" />
              )}
            </div>
            <h3 className="font-serif text-2xl text-charcoal mb-2">
              {confirmAction.type === "false-positive"
                ? "Mark as False Positive?"
                : confirmAction.type === "warn"
                ? "Warn User?"
                : "Suspend User?"}
            </h3>
            <p className="text-charcoal/60 mb-6">
              {confirmAction.type === "false-positive"
                ? "This will mark the flag as incorrect and restore the user's standing."
                : confirmAction.type === "warn"
                ? `This will send a warning to ${confirmAction.userName}. The action will be logged in the audit trail.`
                : `This will suspend ${confirmAction.userName}'s account. They will not be able to access the platform.`}
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
                className={`flex-1 px-6 py-3 rounded-lg transition-colors font-medium ${
                  confirmAction.type === "false-positive"
                    ? "bg-warm-green text-white hover:bg-warm-green/90"
                    : confirmAction.type === "warn"
                    ? "bg-gold text-white hover:bg-gold/90"
                    : "bg-terracotta text-white hover:bg-terracotta/90"
                }`}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
