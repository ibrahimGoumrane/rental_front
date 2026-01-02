import { AnimatePresence, motion } from "framer-motion";
import {
  Ban,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  Users,
  X,
} from "lucide-react";

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GuidelinesModal({ isOpen, onClose }: GuidelinesModalProps) {
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
            className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10 sticky top-0 bg-white z-10">
              <h3 className="font-serif text-2xl text-charcoal">
                Dispute Resolution Guidelines
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
                  <strong>Purpose:</strong> These guidelines help admins resolve
                  disputes fairly and consistently. Follow these principles when
                  reviewing reports.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-charcoal mb-2 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-warm-green" />
                    1. Gather All Information
                  </h4>
                  <p className="text-sm text-charcoal/70 ml-7">
                    Review the full report, evidence, and context before making
                    decisions. Use "Request More Information" if details are
                    unclear.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-charcoal mb-2 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-warm-green" />
                    2. Listen to Both Parties
                  </h4>
                  <p className="text-sm text-charcoal/70 ml-7">
                    Contact both the reporter and reported user to understand
                    their perspectives. Fair resolution requires hearing all
                    sides.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-charcoal mb-2 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-warm-green" />
                    3. Review Platform Policies
                  </h4>
                  <p className="text-sm text-charcoal/70 ml-7">
                    Ensure decisions align with Terms of Service, Community
                    Guidelines, and Cancellation Policies.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-charcoal mb-2 flex items-center">
                    <Ban className="w-5 h-5 mr-2 text-terracotta" />
                    4. Financial Resolution
                  </h4>
                  <p className="text-sm text-charcoal/70 ml-7">
                    Use "Cancel Reservation" as the primary financial
                    resolution. When canceled, the host is not charged (monthly
                    billing model). No direct refunds or compensation are
                    issued.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-charcoal mb-2 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gold" />
                    5. Timely Resolution
                  </h4>
                  <p className="text-sm text-charcoal/70 ml-7">
                    Aim to resolve disputes within 3 business days. Communicate
                    status updates to involved parties.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-charcoal mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-warm-green" />
                    6. Document Everything
                  </h4>
                  <p className="text-sm text-charcoal/70 ml-7">
                    All actions are logged automatically. Add notes explaining
                    your reasoning for audit purposes.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-charcoal/10 bg-sand/30">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
