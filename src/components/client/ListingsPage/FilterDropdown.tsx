import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  label: string;
  hasActive?: boolean;
  activeCount?: number;
  children: React.ReactNode;
}

export function FilterDropdown({
  isOpen,
  onToggle,
  label,
  hasActive = false,
  activeCount = 0,
  children,
}: FilterDropdownProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`px-6 py-2 border ${
          hasActive
            ? "border-gold bg-gold/10 text-charcoal"
            : "border-charcoal/20 text-charcoal/60 hover:border-charcoal/40"
        } rounded-full text-sm transition-all duration-300 flex items-center gap-2`}
      >
        {label}
        {activeCount > 0 && (
          <span className="bg-gold text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
            {activeCount}
          </span>
        )}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-charcoal/10 p-6 z-30"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
