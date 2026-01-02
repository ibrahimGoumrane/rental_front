import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import type { SortOption } from "@/lib/types/client";

interface SortDropdownProps {
  value: "recommended" | "price-low" | "price-high" | "rating";
  onChange: (
    value: "recommended" | "price-low" | "price-high" | "rating"
  ) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const sortOptions: SortOption[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Rating: High to Low" },
];

export function SortDropdown({
  value,
  onChange,
  isOpen,
  onToggle,
}: SortDropdownProps) {
  const selectedLabel =
    sortOptions.find((opt) => opt.value === value)?.label || "Recommended";

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-charcoal/60 hover:text-charcoal transition-colors text-sm font-medium"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>Sort by: {selectedLabel}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-charcoal/10 py-2 z-30"
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  onToggle();
                }}
                className={`w-full text-left px-4 py-2 hover:bg-cream transition-colors text-sm ${
                  value === option.value
                    ? "font-bold text-charcoal"
                    : "text-charcoal/80"
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
