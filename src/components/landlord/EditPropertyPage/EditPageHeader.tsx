import { ChevronLeft, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface EditPageHeaderProps {
  onBack: () => void;
  onDelete: () => void;
}

export function EditPageHeader({ onBack, onDelete }: EditPageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-charcoal/60 hover:text-charcoal transition-colors mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Preview</span>
      </button>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
            Edit Property
          </h1>
          <p className="text-xl text-charcoal/70 font-light">
            Update your property details and settings
          </p>
        </div>
        <button
          onClick={onDelete}
          className="flex items-center space-x-2 px-4 py-2 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span className="font-medium">Delete Property</span>
        </button>
      </div>
    </motion.div>
  );
}
