import { motion } from "framer-motion";
import { DollarSign, FileText, Percent, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  stats: {
    monthlyRevenue: number;
    commission: number;
    tva: number;
    netRevenue: number;
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
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              Monthly Revenue
            </p>
            <h3 className="font-serif text-4xl font-bold text-gold">
              ${stats.monthlyRevenue.toLocaleString()}
            </h3>
            <p className="text-xs text-charcoal/60 mt-2">Gross reservations</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-gold" />
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
              Platform Commission
            </p>
            <h3 className="font-serif text-4xl font-bold text-warm-green">
              ${stats.commission.toLocaleString()}
            </h3>
            <p className="text-xs text-charcoal/60 mt-2">10% of revenue</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-warm-green/10 flex items-center justify-center">
            <Percent className="w-6 h-6 text-warm-green" />
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
              TVA (Tax)
            </p>
            <h3 className="font-serif text-4xl font-bold text-terracotta">
              ${stats.tva.toLocaleString()}
            </h3>
            <p className="text-xs text-charcoal/60 mt-2">20% of commission</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-terracotta" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              Net Platform Revenue
            </p>
            <h3 className="font-serif text-4xl font-bold text-charcoal">
              ${stats.netRevenue.toLocaleString()}
            </h3>
            <p className="text-xs text-charcoal/60 mt-2">Commission + TVA</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-charcoal/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-charcoal" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
