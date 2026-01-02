import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import type { DateRange } from "@/lib/types/client";

interface DateRangePickerProps {
  dateRange: DateRange;
  onChange: (dateRange: DateRange) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function DateRangePicker({
  dateRange,
  onChange,
  isOpen,
  onToggle,
}: DateRangePickerProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 px-4 py-2 border border-charcoal/20 rounded-lg hover:border-warm-green transition-colors"
      >
        <Calendar className="w-4 h-4 text-charcoal/60" />
        <span className="text-sm text-charcoal">
          {dateRange.start && dateRange.end
            ? `${dateRange.start} - ${dateRange.end}`
            : "Select dates"}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-charcoal/60 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 bg-white rounded-xl shadow-2xl border border-charcoal/10 p-4 z-20 w-80"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    onChange({
                      ...dateRange,
                      start: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    onChange({
                      ...dateRange,
                      end: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => {
                    onChange({ start: "", end: "" });
                    onToggle();
                  }}
                  className="flex-1 px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-charcoal/5 transition-colors text-sm font-medium"
                >
                  Clear
                </button>
                <button
                  onClick={onToggle}
                  className="flex-1 px-4 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors text-sm font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
