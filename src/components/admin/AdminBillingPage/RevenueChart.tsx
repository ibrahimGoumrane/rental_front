import { motion } from "framer-motion";
import type { BillingMonthlyRevenue } from "@/lib/types/admin";

interface RevenueChartProps {
  data: BillingMonthlyRevenue[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxValue = Math.max(...data.map((m) => m.revenue));

  return (
    <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
      <h2 className="font-serif text-3xl text-charcoal mb-8">
        Revenue Overview (Last 6 Months)
      </h2>
      <div className="space-y-6">
        {data.map((month, index) => (
          <div key={month.month} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-charcoal w-12">
                {month.month}
              </span>
              <div className="flex items-center space-x-6 text-charcoal/60">
                <span>Revenue: ${(month.revenue / 1000).toFixed(0)}k</span>
                <span className="text-warm-green font-medium">
                  Commission: ${(month.commission / 1000).toFixed(1)}k
                </span>
                <span className="text-terracotta font-medium">
                  TVA: ${(month.tva / 1000).toFixed(1)}k
                </span>
                <span className="text-gold font-bold">
                  Net: ${(month.netRevenue / 1000).toFixed(1)}k
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-8 bg-sand rounded-lg overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(month.revenue / maxValue) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-charcoal/20 rounded-lg"
                />
              </div>
              <div className="w-32 h-8 bg-sand rounded-lg overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(month.commission / month.revenue) * 100}%`,
                  }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="h-full bg-warm-green rounded-lg"
                />
              </div>
              <div className="w-24 h-8 bg-sand rounded-lg overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(month.tva / month.commission) * 100}%`,
                  }}
                  transition={{ duration: 1, delay: 1 + index * 0.1 }}
                  className="h-full bg-terracotta rounded-lg"
                />
              </div>
              <div className="w-32 h-8 bg-sand rounded-lg overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(month.netRevenue / month.revenue) * 100}%`,
                  }}
                  transition={{ duration: 1, delay: 1.5 + index * 0.1 }}
                  className="h-full bg-gold rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-8 mt-8 pt-6 border-t border-charcoal/10">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-charcoal/20 rounded" />
          <span className="text-sm text-charcoal/60">Guest Payments</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-warm-green rounded" />
          <span className="text-sm text-charcoal/60">Commission (10%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-terracotta rounded" />
          <span className="text-sm text-charcoal/60">TVA (20%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gold rounded" />
          <span className="text-sm text-charcoal/60">Net Platform Revenue</span>
        </div>
      </div>
    </div>
  );
}
