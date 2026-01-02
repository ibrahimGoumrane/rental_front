import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { RefundForm } from "@/lib/types/admin";

interface RefundModalProps {
  show: boolean;
  form: RefundForm;
  onClose: () => void;
  onFormChange: (form: RefundForm) => void;
  onSubmit: () => void;
}

export function RefundModal({
  show,
  form,
  onClose,
  onFormChange,
  onSubmit,
}: RefundModalProps) {
  return (
    <AnimatePresence>
      {show && (
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
            className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
              <h3 className="font-serif text-2xl text-charcoal">
                Process Host Refund
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Host Name
                  </label>
                  <input
                    type="text"
                    value={form.hostName}
                    onChange={(e) =>
                      onFormChange({ ...form, hostName: e.target.value })
                    }
                    placeholder="Search or select host..."
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Property Name
                  </label>
                  <input
                    type="text"
                    value={form.propertyName}
                    onChange={(e) =>
                      onFormChange({ ...form, propertyName: e.target.value })
                    }
                    placeholder="Select property..."
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Refund Amount (MAD)
                  </label>
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(e) =>
                      onFormChange({ ...form, amount: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Affected Bookings
                  </label>
                  <input
                    type="number"
                    value={form.affectedBookings}
                    onChange={(e) =>
                      onFormChange({
                        ...form,
                        affectedBookings: e.target.value,
                      })
                    }
                    placeholder="1"
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Reason for Refund
                </label>
                <textarea
                  value={form.reason}
                  onChange={(e) =>
                    onFormChange({ ...form, reason: e.target.value })
                  }
                  placeholder="Explain the reason for this host refund (e.g., guest cancellation, property issue, billing error)..."
                  rows={4}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 resize-none"
                />
              </div>

              <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                <p className="text-sm text-charcoal/70">
                  <strong>Note:</strong> This refund will be issued to the
                  host's account. All host refunds are logged in the audit trail
                  for compliance and transparency.
                </p>
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
                onClick={onSubmit}
                disabled={
                  !form.hostName ||
                  !form.propertyName ||
                  !form.amount ||
                  !form.reason
                }
                className="px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Process Host Refund
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
