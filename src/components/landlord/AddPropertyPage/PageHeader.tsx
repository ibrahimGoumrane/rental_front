import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  onBack: () => void;
}

export function PageHeader({ onBack }: PageHeaderProps) {
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
        <span>Back to Dashboard</span>
      </button>
      <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
        List Your Property
      </h1>
      <p className="text-xl text-charcoal/70 font-light">
        Share your beautiful space with travelers around the world
      </p>
    </motion.div>
  );
}
