import { AnimatePresence, motion } from "framer-motion";
import { UserCheck } from "lucide-react";
import type { AdminUserBasic } from "@/lib/types/admin";

interface ActivateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUserBasic | null;
  onActivate: () => void;
}

export function ActivateAccountModal({
  isOpen,
  onClose,
  user,
  onActivate,
}: ActivateAccountModalProps) {
  if (!isOpen || !user) return null;

  return (
    <AnimatePresence>
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
          <div className="w-16 h-16 rounded-full bg-warm-green/10 flex items-center justify-center mx-auto mb-6">
            <UserCheck className="w-8 h-8 text-warm-green" />
          </div>
          <h3 className="font-serif text-2xl text-charcoal mb-2">
            Activate Account
          </h3>
          <p className="text-charcoal/60 mb-6">
            Activate <strong>{user.name}</strong>'s account and remove
            suspension?
          </p>

          <div className="bg-warm-green/10 border border-warm-green/20 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-charcoal/70">
              <strong>Note:</strong> The user will regain full access to their
              account immediately. This action will be logged in the audit
              trail.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onActivate}
              className="flex-1 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium"
            >
              Activate Account
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
