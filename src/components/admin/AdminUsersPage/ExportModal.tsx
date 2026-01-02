import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, X } from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    userType: string;
    status: string;
    verification: string;
  };
  onFiltersChange: (filters: {
    userType: string;
    status: string;
    verification: string;
  }) => void;
  onExport: () => void;
  onReset: () => void;
}

export function ExportModal({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onExport,
  onReset,
}: ExportModalProps) {
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
          className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
            <h3 className="font-serif text-2xl text-charcoal">Export Users</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-charcoal" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-4">
              <p className="text-sm text-charcoal/70">
                <strong>Note:</strong> Apply filters first, then export. Only
                filtered users will be included in the CSV export.
              </p>
            </div>

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
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                >
                  <option value="all">All Users</option>
                  <option value="guest">Guests</option>
                  <option value="host">Hosts</option>
                  <option value="admin">Admins</option>
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
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Verification Status
                </label>
                <select
                  value={filters.verification}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      verification: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                >
                  <option value="all">All Verification</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
            <button
              onClick={onReset}
              className="flex items-center space-x-2 px-4 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Filters</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onExport}
              className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium"
            >
              Export to CSV
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
