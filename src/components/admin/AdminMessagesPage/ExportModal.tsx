import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { MessagesExportFilters } from "@/lib/types/admin";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MessagesExportFilters;
  onFilterChange: (filters: MessagesExportFilters) => void;
  onExport: () => void;
}

export function ExportModal({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onExport,
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
                Export Conversations
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
                    Date From
                  </label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) =>
                      onFilterChange({ ...filters, dateFrom: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Date To
                  </label>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) =>
                      onFilterChange({ ...filters, dateTo: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  User Name(s)
                </label>
                <input
                  type="text"
                  value={filters.userName}
                  onChange={(e) =>
                    onFilterChange({ ...filters, userName: e.target.value })
                  }
                  placeholder="Filter by user name..."
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Flag Reason
                </label>
                <select
                  value={filters.flagReason}
                  onChange={(e) =>
                    onFilterChange({ ...filters, flagReason: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="all">All Reasons</option>
                  <option value="contact">
                    Exchange of Contact Information
                  </option>
                  <option value="keywords">Blocked Keywords Detected</option>
                </select>
              </div>

              <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                <p className="text-sm text-charcoal/70">
                  <strong>Export includes:</strong> Conversation metadata, flag
                  reason, users involved, timestamps. Format: CSV
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
                onClick={onExport}
                className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors font-medium"
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
