import { motion } from "framer-motion";
import { Folder, Home, Star } from "lucide-react";

interface StatsCardsProps {
  stats: {
    total: number;
    pending: number;
    live: number;
  };
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
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              Total Properties
            </p>
            <h3 className="font-serif text-4xl font-bold text-charcoal">
              {stats.total.toLocaleString()}
            </h3>
            <p className="text-xs text-charcoal/60 mt-2">All listings</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center">
            <Home className="w-6 h-6 text-terracotta" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              Pending Review
            </p>
            <h3 className="font-serif text-4xl font-bold text-gold">
              {stats.pending}
            </h3>
            <p className="text-xs text-charcoal/60 mt-2">Needs approval</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
            <Star className="w-6 h-6 text-gold" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              Live Properties
            </p>
            <h3 className="font-serif text-4xl font-bold text-warm-green">
              {stats.live.toLocaleString()}
            </h3>
            <p className="text-xs text-charcoal/60 mt-2">Active listings</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-warm-green/10 flex items-center justify-center">
            <Folder className="w-6 h-6 text-warm-green" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
