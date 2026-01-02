import { motion } from "framer-motion";
import { Download } from "lucide-react";

interface EarningsPageHeaderProps {
  onExport: () => void;
}

export function EarningsPageHeader({ onExport }: EarningsPageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-serif text-5xl md:text-6xl text-charcoal">
          Earnings Overview
        </h1>
        <button
          onClick={onExport}
          className="flex items-center space-x-2 px-6 py-3 bg-white border border-charcoal/20 rounded-lg hover:border-warm-green hover:text-warm-green transition-all shadow-sm"
        >
          <Download className="w-5 h-5" />
          <span className="font-medium">Export Report</span>
        </button>
      </div>
      <p className="text-xl text-charcoal/70 font-light">
        Track your financial performance and growth
      </p>
    </motion.div>
  );
}
