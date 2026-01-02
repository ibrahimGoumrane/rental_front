import { AnimatePresence, motion } from "framer-motion";

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export function BulkActionsBar({
  selectedCount,
  onClearSelection,
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-sand rounded-2xl p-4 border border-charcoal/5 shadow-lg mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center space-x-4">
          <span className="font-medium text-charcoal">
            {selectedCount} user{selectedCount !== 1 ? "s" : ""} selected
          </span>
          <button
            onClick={onClearSelection}
            className="text-sm text-charcoal/60 hover:text-charcoal"
          >
            Clear selection
          </button>
        </div>
        <div className="flex items-center flex-wrap gap-3">
          <button className="px-4 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors text-sm font-medium">
            Activate Selected
          </button>
          <button className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors text-sm font-medium">
            Suspend Selected
          </button>
          <button className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors text-sm font-medium">
            Send Email
          </button>
          <button className="px-4 py-2 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors text-sm font-medium">
            Export Selected
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
