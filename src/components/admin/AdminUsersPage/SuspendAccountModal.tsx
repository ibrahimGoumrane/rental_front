import { AnimatePresence, motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { AdminUserBasic } from "@/lib/types/admin";

interface SuspendAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUserBasic | null;
  duration: string;
  onDurationChange: (duration: string) => void;
  onSuspend: () => void;
}

export function SuspendAccountModal({
  isOpen,
  onClose,
  user,
  duration,
  onDurationChange,
  onSuspend,
}: SuspendAccountModalProps) {
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
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-gold" />
          </div>
          <h3 className="font-serif text-2xl text-charcoal mb-2">
            Suspend Account
          </h3>
          <p className="text-charcoal/60 mb-6">
            Temporarily suspend <strong>{user.name}</strong>'s account?
          </p>

          <div className="mb-6 text-left">
            <label className="block text-sm font-medium text-charcoal mb-2">
              Suspension Duration
            </label>
            <select
              value={duration}
              onChange={(e) => onDurationChange(e.target.value)}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="permanent">Permanent</option>
            </select>
          </div>

          <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-charcoal/70">
              <strong>Note:</strong> The user will not be able to log in or
              access their account during the suspension period. This action
              will be logged in the audit trail.
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
              onClick={onSuspend}
              className="flex-1 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors font-medium"
            >
              Suspend Account
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
