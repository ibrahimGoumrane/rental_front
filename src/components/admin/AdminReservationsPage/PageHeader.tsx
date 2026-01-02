import { motion } from "framer-motion";
import { Download } from "lucide-react";

interface PageHeaderProps {
  stats: {
    active: number;
    disputes: number;
    totalValue: number;
  };
  onExportClick: () => void;
}

export function PageHeader({ stats, onExportClick }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-2">
            Reservations Management
          </h1>
          <p className="text-xl text-charcoal/70 font-light">
            <span className="text-warm-green font-medium">
              {stats.active.toLocaleString()} active reservations
            </span>{" "}
            |
            <span className="text-terracotta font-medium">
              {" "}
              {stats.disputes} disputes
            </span>{" "}
            |
            <span className="text-gold font-medium">
              {" "}
              ${(stats.totalValue / 1000).toFixed(0)}K total value
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onExportClick}
            className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5" />
            <span className="font-medium">Export Bookings</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
