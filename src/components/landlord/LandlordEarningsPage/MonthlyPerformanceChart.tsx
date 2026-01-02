import { motion } from "framer-motion";
import type { MonthlyEarning } from "@/lib/types/landlord";

interface MonthlyPerformanceChartProps {
  monthlyEarnings: MonthlyEarning[];
}

export function MonthlyPerformanceChart({
  monthlyEarnings,
}: MonthlyPerformanceChartProps) {
  const maxEarning = Math.max(...monthlyEarnings.map((m) => m.gross));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm mb-12"
    >
      <h2 className="font-serif text-3xl text-charcoal mb-8">
        Monthly Performance
      </h2>

      <div className="space-y-6">
        {monthlyEarnings.map((month, index) => (
          <motion.div
            key={month.month}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-charcoal w-12">
                {month.month}
              </span>
              <div className="flex items-center space-x-4 text-charcoal/60">
                <span>Gross: ${month.gross.toLocaleString()}</span>
                <span className="text-gold font-medium">
                  Net: ${month.net.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Gross bar */}
              <div className="flex-1 h-10 bg-sand rounded-lg overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(month.gross / maxEarning) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-warm-green/30 rounded-lg"
                />
              </div>
              {/* Net bar */}
              <div className="flex-1 h-10 bg-sand rounded-lg overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(month.net / maxEarning) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                  className="h-full bg-gold rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-8 mt-8 pt-6 border-t border-charcoal/10">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-warm-green/30 rounded" />
          <span className="text-sm text-charcoal/60">Gross Earnings</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gold rounded" />
          <span className="text-sm text-charcoal/60">
            Net (after commission)
          </span>
        </div>
      </div>
    </motion.div>
  );
}
