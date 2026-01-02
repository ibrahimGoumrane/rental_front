import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { MockReport } from "@/lib/constants/pages/AdminReportsPage";

interface RequestInfoModalProps {
  isOpen: boolean;
  report: MockReport | null;
  message: string;
  onMessageChange: (message: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function RequestInfoModal({
  isOpen,
  report,
  message,
  onMessageChange,
  onClose,
  onSubmit,
}: RequestInfoModalProps) {
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
            className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
              <h3 className="font-serif text-2xl text-charcoal">
                Request More Information
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                <p className="text-sm text-charcoal/70">
                  <strong>Report:</strong> {report.id} - {report.description}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Message to User(s)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => onMessageChange(e.target.value)}
                  placeholder="Write your request for additional information here..."
                  rows={6}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                />
              </div>

              <div className="bg-sand rounded-lg p-4">
                <p className="text-xs text-charcoal/60">
                  This message will be sent to the involved user(s). They will
                  be notified to provide additional details.
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
                disabled={!message.trim()}
                className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Request
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
