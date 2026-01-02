import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import type { ReportStats } from "@/lib/types/admin";

interface StatsCardsProps {
  stats: ReportStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              Open Disputes
            </p>
            <h3 className="font-serif text-5xl font-bold text-terracotta">
              {stats.openDisputes}
            </h3>
          </div>
          <AlertTriangle className="w-8 h-8 text-terracotta" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              Resolved This Month
            </p>
            <h3 className="font-serif text-5xl font-bold text-warm-green">
              {stats.resolvedThisMonth}
            </h3>
          </div>
          <CheckCircle className="w-8 h-8 text-warm-green" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              Avg Resolution Time
            </p>
            <h3 className="font-serif text-5xl font-bold text-gold">
              {stats.avgResolutionTime}
            </h3>
            <p className="text-sm text-charcoal/60 mt-1">days</p>
          </div>
          <Clock className="w-8 h-8 text-gold" />
        </div>
      </motion.div>
    </div>
  );
}
