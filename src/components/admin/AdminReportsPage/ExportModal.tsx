import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, X } from "lucide-react";
import type { ReportsExportFilters } from "@/lib/types/admin";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ReportsExportFilters;
  onFilterChange: (filters: ReportsExportFilters) => void;
  onExport: () => void;
  onReset: () => void;
}

export function ExportModal({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onExport,
  onReset,
}: ExportModalProps) {
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
                Export Report Data
              </h3>
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
                  filtered results will be included in the CSV export.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      onFilterChange({ ...filters, status: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="under-review">Under Review</option>
                    <option value="awaiting-info">Awaiting Info</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Report Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) =>
                      onFilterChange({ ...filters, type: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                  >
                    <option value="all">All Types</option>
                    <option value="property">Property Issues</option>
                    <option value="payment">Payment Disputes</option>
                    <option value="guest-behavior">Guest Behavior</option>
                    <option value="host-behavior">Host Behavior</option>
                    <option value="safety">Safety Concerns</option>
                    <option value="fraud">Scam/Fraud</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Filed By
                  </label>
                  <select
                    value={filters.filedBy}
                    onChange={(e) =>
                      onFilterChange({ ...filters, filedBy: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                  >
                    <option value="all">All Users</option>
                    <option value="guests">Guests</option>
                    <option value="hosts">Hosts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Date From
                  </label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) =>
                      onFilterChange({ ...filters, dateFrom: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Date To
                  </label>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) =>
                      onFilterChange({ ...filters, dateTo: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
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
      )}
    </AnimatePresence>
  );
}
