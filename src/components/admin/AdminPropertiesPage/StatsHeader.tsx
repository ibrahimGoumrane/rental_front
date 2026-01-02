import { motion } from "framer-motion";
import { Download } from "lucide-react";

interface StatsHeaderProps {
  stats: {
    total: number;
    pending: number;
    live: number;
  };
  onExport: () => void;
}

export function StatsHeader({ stats, onExport }: StatsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-2">
            Properties Management
          </h1>
          <p className="text-xl text-charcoal/70 font-light">
            {stats.total.toLocaleString()} total properties |
            <span className="text-gold font-medium">
              {" "}
              {stats.pending} pending verification
            </span>{" "}
            |
            <span className="text-warm-green font-medium">
              {" "}
              {stats.live.toLocaleString()} live
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onExport}
            className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5" />
            <span className="font-medium">Export Listings</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
