import { motion } from "framer-motion";
import { AlertTriangle, Clock, MessageSquare, Shield } from "lucide-react";

interface StatsCardsProps {
  stats: {
    totalToday: number;
    flagged: number;
    autoBlocked: number;
    avgResponseTime: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              Total Conversations Today
            </p>
            <h3 className="font-serif text-4xl font-bold text-charcoal">
              {stats.totalToday.toLocaleString()}
            </h3>
          </div>
          <MessageSquare className="w-8 h-8 text-charcoal/40" />
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
              Flagged Messages
            </p>
            <h3 className="font-serif text-4xl font-bold text-terracotta">
              {stats.flagged}
            </h3>
            <p className="text-xs text-charcoal/60 mt-1">requiring review</p>
          </div>
          <AlertTriangle className="w-8 h-8 text-terracotta" />
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
              Auto-deleted Messages
            </p>
            <h3 className="font-serif text-4xl font-bold text-charcoal/60">
              {stats.autoBlocked}
            </h3>
            <p className="text-xs text-charcoal/60 mt-1">logged for audit</p>
          </div>
          <Shield className="w-8 h-8 text-charcoal/40" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              Average Response Time
            </p>
            <h3 className="font-serif text-4xl font-bold text-warm-green">
              {stats.avgResponseTime}h
            </h3>
          </div>
          <Clock className="w-8 h-8 text-warm-green" />
        </div>
      </motion.div>
    </div>
  );
}
