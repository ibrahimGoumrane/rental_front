import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface PreviewBackButtonProps {
  onBack: () => void;
}

export function PreviewBackButton({ onBack }: PreviewBackButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-24 left-6 md:left-12 z-50"
    >
      <button
        onClick={onBack}
        className="flex items-center space-x-2 px-6 py-3 bg-white/95 backdrop-blur-md text-charcoal rounded-xl hover:bg-white transition-all shadow-xl border border-charcoal/10 hover:-translate-y-0.5"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-bold">Back to Properties</span>
      </button>
    </motion.div>
  );
}
