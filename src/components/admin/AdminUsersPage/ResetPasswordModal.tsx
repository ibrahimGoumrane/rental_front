import { AnimatePresence, motion } from "framer-motion";
import { Key } from "lucide-react";
import type { AdminUserBasic } from "@/lib/types/admin";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUserBasic | null;
  newPassword: string;
  onPasswordChange: (password: string) => void;
  emailPassword: boolean;
  onEmailPasswordChange: (checked: boolean) => void;
  onReset: () => void;
  onGenerate: () => void;
}

export function ResetPasswordModal({
  isOpen,
  onClose,
  user,
  newPassword,
  onPasswordChange,
  emailPassword,
  onEmailPasswordChange,
  onReset,
  onGenerate,
}: ResetPasswordModalProps) {
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
            <Key className="w-8 h-8 text-warm-green" />
          </div>
          <h3 className="font-serif text-2xl text-charcoal mb-2">
            Reset Password
          </h3>
          <p className="text-charcoal/60 mb-6">
            Reset password for <strong>{user.name}</strong>
          </p>

          <div className="mb-6 text-left space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                New Password
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  placeholder="Enter new password..."
                  className="flex-1 px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                />
                <button
                  onClick={onGenerate}
                  className="px-4 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  Generate
                </button>
              </div>
            </div>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={emailPassword}
                onChange={(e) => onEmailPasswordChange(e.target.checked)}
                className="w-4 h-4 accent-warm-green"
              />
              <span className="text-sm text-charcoal">
                Email password to user
              </span>
            </label>
          </div>

          <div className="bg-warm-green/10 border border-warm-green/20 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-charcoal/70">
              <strong>Note:</strong> This action will be logged. The user will
              be able to log in with the new password immediately.
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
              onClick={onReset}
              disabled={!newPassword.trim()}
              className="flex-1 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset Password
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
