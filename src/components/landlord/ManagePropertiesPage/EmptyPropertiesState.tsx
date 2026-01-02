import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface EmptyPropertiesStateProps {
  onClearFilters: () => void;
}

export function EmptyPropertiesState({
  onClearFilters,
}: EmptyPropertiesStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-20"
    >
      <div className="w-20 h-20 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-10 h-10 text-charcoal/40" />
      </div>
      <h3 className="font-serif text-3xl text-charcoal mb-2">
        No properties found
      </h3>
      <p className="text-charcoal/60 mb-8">
        Try adjusting your search or filters
      </p>
      <button
        onClick={onClearFilters}
        className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors"
      >
        Clear Filters
      </button>
    </motion.div>
  );
}
