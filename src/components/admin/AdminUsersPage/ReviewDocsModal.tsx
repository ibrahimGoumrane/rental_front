import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, FileText, Image, X, XCircle } from "lucide-react";
import type { AdminUserWithVerification } from "@/lib/types/admin";

interface ReviewDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUserWithVerification | null;
  onVerify: () => void;
  onReject: () => void;
}

export function ReviewDocsModal({
  isOpen,
  onClose,
  user,
  onVerify,
  onReject,
}: ReviewDocsModalProps) {
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
          className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
            <div>
              <h3 className="font-serif text-2xl text-charcoal">
                Review Verification Documents
              </h3>
              <p className="text-sm text-charcoal/60 mt-1">
                User: <strong>{user.name}</strong> • Document:{" "}
                <strong>{user.verification.document}</strong>
              </p>
            </div>
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
                <strong>Instructions:</strong> Carefully review all uploaded
                documents. Verify that the information matches the user's
                profile and that the documents are clear and legitimate.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Document Front */}
              <div>
                <h4 className="font-bold text-charcoal mb-3 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-warm-green" />
                  <span>Document - Front Side</span>
                </h4>
                <div className="bg-sand/50 rounded-lg p-8 flex items-center justify-center border-2 border-dashed border-charcoal/20 aspect-video">
                  <div className="text-center text-charcoal/40">
                    <Image className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">
                      Document preview would appear here
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Back */}
              <div>
                <h4 className="font-bold text-charcoal mb-3 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-warm-green" />
                  <span>Document - Back Side</span>
                </h4>
                <div className="bg-sand/50 rounded-lg p-8 flex items-center justify-center border-2 border-dashed border-charcoal/20 aspect-video">
                  <div className="text-center text-charcoal/40">
                    <Image className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">
                      Document preview would appear here
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="bg-white border border-charcoal/20 rounded-lg p-4">
              <h4 className="font-bold text-charcoal mb-3">
                Verification Checklist
              </h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-warm-green"
                  />
                  <span className="text-sm text-charcoal">
                    Document is clear and readable
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-warm-green"
                  />
                  <span className="text-sm text-charcoal">
                    Information matches user profile
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-warm-green"
                  />
                  <span className="text-sm text-charcoal">
                    Document appears to be authentic
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-warm-green"
                  />
                  <span className="text-sm text-charcoal">
                    Document has not expired
                  </span>
                </label>
              </div>
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
              onClick={onReject}
              className="flex items-center space-x-2 px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors font-medium"
            >
              <XCircle className="w-5 h-5" />
              <span>Reject</span>
            </button>
            <button
              onClick={onVerify}
              className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Verify & Approve</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
