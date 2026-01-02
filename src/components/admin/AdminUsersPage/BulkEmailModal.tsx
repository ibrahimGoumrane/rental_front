import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, X } from "lucide-react";

interface BulkEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    userType: string;
    status: string;
  };
  onFiltersChange: (filters: { userType: string; status: string }) => void;
  subject: string;
  onSubjectChange: (subject: string) => void;
  content: string;
  onContentChange: (content: string) => void;
  onSend: () => void;
  onReset: () => void;
}

export function BulkEmailModal({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  subject,
  onSubjectChange,
  content,
  onContentChange,
  onSend,
  onReset,
}: BulkEmailModalProps) {
  if (!isOpen) return null;

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
          className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-6 border-b border-charcoal/10 sticky top-0 bg-white z-10">
            <h3 className="font-serif text-2xl text-charcoal">
              Send Bulk Email
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-charcoal" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-terracotta/10 border border-terracotta/20 rounded-lg p-4">
              <p className="text-sm text-charcoal/70">
                <strong>Step 1:</strong> Apply filters to select recipients,
                then write your email content. Only filtered users will receive
                the email.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-charcoal">Filter Recipients</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    User Type
                  </label>
                  <select
                    value={filters.userType}
                    onChange={(e) =>
                      onFiltersChange({ ...filters, userType: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                  >
                    <option value="all">All Users</option>
                    <option value="guest">Guests Only</option>
                    <option value="host">Hosts Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Account Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      onFiltersChange({ ...filters, status: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="suspended">Suspended Only</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-charcoal/10 pt-6 space-y-4">
              <h4 className="font-bold text-charcoal">Email Content</h4>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => onSubjectChange(e.target.value)}
                  placeholder="Email subject..."
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Message
                </label>
                <textarea
                  value={content}
                  onChange={(e) => onContentChange(e.target.value)}
                  placeholder="Write your email message here..."
                  rows={8}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
            <button
              onClick={onReset}
              className="flex items-center space-x-2 px-4 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onSend}
              disabled={!subject.trim() || !content.trim()}
              className="px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Email
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
