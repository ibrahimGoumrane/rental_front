import { motion } from "framer-motion";
import { Calendar, Clock, DollarSign, Home, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface StatsGridProps {
  stats: {
    totalProperties: number;
    activeReservations: number;
    monthlyEarnings: number;
    pendingRequests: number;
  };
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
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
      {/* Stat Card 1 */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <Link
          to="/landlord/properties"
          className="block bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                Your Portfolio
              </p>
              <h3 className="font-serif text-5xl font-bold text-charcoal">
                {stats.totalProperties}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-warm-green/10 flex items-center justify-center group-hover:bg-warm-green/20 transition-colors">
              <Home className="w-6 h-6 text-warm-green" />
            </div>
          </div>
          <p className="text-sm text-charcoal/60">Active properties</p>
        </Link>
      </motion.div>

      {/* Stat Card 2 */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <Link
          to="/landlord/reservations"
          className="block bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                Reservations
              </p>
              <h3 className="font-serif text-5xl font-bold text-charcoal">
                {stats.activeReservations}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center group-hover:bg-terracotta/20 transition-colors">
              <Calendar className="w-6 h-6 text-terracotta" />
            </div>
          </div>
          <p className="text-sm text-charcoal/60">3 checking in this week</p>
        </Link>
      </motion.div>

      {/* Stat Card 3 */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <Link
          to="/landlord/earnings"
          className="block bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                This Month
              </p>
              <h3 className="font-serif text-5xl font-bold text-gold">
                ${(stats.monthlyEarnings / 1000).toFixed(1)}k
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <DollarSign className="w-6 h-6 text-gold" />
            </div>
          </div>
          <div className="flex items-center text-sm text-warm-green">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+18% vs last month</span>
          </div>
        </Link>
      </motion.div>

      {/* Stat Card 4 */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <Link
          to="/landlord/reservations?filter=pending"
          className="block bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group relative"
        >
          {stats.pendingRequests > 0 && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-terracotta text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg animate-pulse">
              {stats.pendingRequests}
            </div>
          )}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                Pending
              </p>
              <h3 className="font-serif text-5xl font-bold text-charcoal">
                {stats.pendingRequests}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center group-hover:bg-terracotta/20 transition-colors">
              <Clock className="w-6 h-6 text-terracotta" />
            </div>
          </div>
          <p className="text-sm text-terracotta font-medium">
            Requires your attention
          </p>
        </Link>
      </motion.div>
    </motion.div>
  );
}
