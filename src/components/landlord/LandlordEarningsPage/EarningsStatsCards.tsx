import { motion } from "framer-motion";
import { Calendar, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import type { EarningsData } from "@/lib/types/landlord";

interface EarningsStatsCardsProps {
  earnings: EarningsData;
}

export function EarningsStatsCards({ earnings }: EarningsStatsCardsProps) {
  const percentageChange =
    ((earnings.thisMonth - earnings.lastMonth) / earnings.lastMonth) * 100;

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      {/* This Month */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
        className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              This Month
            </p>
            <h3 className="font-serif text-4xl font-bold text-gold">
              ${earnings.thisMonth.toLocaleString()}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-gold" />
          </div>
        </div>
        <div
          className={`flex items-center text-sm ${
            percentageChange >= 0 ? "text-warm-green" : "text-terracotta"
          }`}
        >
          {percentageChange >= 0 ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          <span>
            {percentageChange >= 0 ? "+" : ""}
            {percentageChange.toFixed(1)}% vs last month
          </span>
        </div>
      </motion.div>

      {/* Total All-Time */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
        className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              Total Earnings
            </p>
            <h3 className="font-serif text-4xl font-bold text-charcoal">
              ${earnings.totalAllTime.toLocaleString()}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-warm-green/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-warm-green" />
          </div>
        </div>
        <p className="text-sm text-charcoal/60">All-time</p>
      </motion.div>

      {/* Upcoming Payouts */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
        className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              Upcoming
            </p>
            <h3 className="font-serif text-4xl font-bold text-terracotta">
              ${earnings.upcomingPayouts.toLocaleString()}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-terracotta" />
          </div>
        </div>
        <p className="text-sm text-charcoal/60">Next 30 days</p>
      </motion.div>

      {/* Commission */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
        className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
              Commission (12%)
            </p>
            <h3 className="font-serif text-4xl font-bold text-charcoal/40">
              -${earnings.commission.toLocaleString()}
            </h3>
          </div>
        </div>
        <p className="text-sm text-charcoal/60">This month</p>
      </motion.div>
    </motion.div>
  );
}
