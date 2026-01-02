import { motion } from "framer-motion";
import { Calendar, DollarSign, Home, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { DashboardData } from "@/lib/types/admin";

interface KPICardsProps {
  data: DashboardData;
}

export function KPICards({ data }: KPICardsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
      {/* Total Users Card */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
        onMouseEnter={() => setHoveredCard("users")}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <Link
          to="/admin/users"
          className="block bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
        >
          {hoveredCard === "users" && (
            <div className="absolute inset-0 bg-gold/10 pointer-events-none" />
          )}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                Total Users
              </p>
              <h3 className="font-serif text-4xl font-bold text-charcoal mb-3">
                {data.users.total.toLocaleString()}
              </h3>
              <div className="space-y-1 text-sm text-charcoal/70">
                <p>Guests: {data.users.guests.toLocaleString()}</p>
                <p>Hosts: {data.users.hosts.toLocaleString()}</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-warm-green/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-warm-green" />
            </div>
          </div>
          <div className="flex items-center text-sm text-warm-green relative z-10">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>
              +{data.users.monthlyGrowth} this month (
              {data.users.percentageChange}%)
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Properties Listed Card */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
        onMouseEnter={() => setHoveredCard("properties")}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <Link
          to="/admin/properties"
          className="block bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
        >
          {hoveredCard === "properties" && (
            <div className="absolute inset-0 bg-gold/10 pointer-events-none" />
          )}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                Properties Listed
              </p>
              <h3 className="font-serif text-4xl font-bold text-charcoal mb-3">
                {data.properties.total.toLocaleString()}
              </h3>
              <div className="space-y-1 text-sm text-charcoal/70">
                <p>Published: {data.properties.published.toLocaleString()}</p>
                <p className="flex items-center">
                  Pending: {data.properties.pending}
                  <span className="ml-2 px-2 py-0.5 bg-gold text-white text-xs font-bold rounded-full">
                    {data.properties.pending}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Home className="w-6 h-6 text-terracotta" />
            </div>
          </div>
          <p className="text-sm text-charcoal/60 relative z-10">
            Average {data.properties.weeklyAverage} new listings/week
          </p>
        </Link>
      </motion.div>

      {/* Active Reservations Card */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
        onMouseEnter={() => setHoveredCard("reservations")}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <Link
          to="/admin/reservations"
          className="block bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
        >
          {hoveredCard === "reservations" && (
            <div className="absolute inset-0 bg-gold/10 pointer-events-none" />
          )}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                Active Reservations
              </p>
              <h3 className="font-serif text-4xl font-bold text-charcoal mb-3">
                {data.reservations.total.toLocaleString()}
              </h3>
              <div className="space-y-1 text-sm text-charcoal/70">
                <p>Upcoming: {data.reservations.upcoming.toLocaleString()}</p>
                <p>In Progress: {data.reservations.inProgress}</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-warm-green/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-warm-green" />
            </div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-charcoal/70">Occupancy Rate</span>
              <span className="font-bold text-warm-green">
                {data.reservations.occupancyRate}%
              </span>
            </div>
            <div className="w-full h-2 bg-charcoal/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data.reservations.occupancyRate}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-warm-green rounded-full"
              />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Revenue & Commission Card */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
        onMouseEnter={() => setHoveredCard("revenue")}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <Link
          to="/admin/billing"
          className="block bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
        >
          {hoveredCard === "revenue" && (
            <div className="absolute inset-0 bg-gold/10 pointer-events-none" />
          )}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                Monthly Revenue
              </p>
              <h3 className="font-serif text-4xl font-bold text-charcoal mb-3">
                ${data.revenue.monthly.toLocaleString()}
              </h3>
              <div className="space-y-1 text-sm">
                <p className="text-gold font-medium">
                  Commission: ${data.revenue.commission.toLocaleString()} (
                  {data.revenue.commissionRate}%)
                </p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6 text-gold" />
            </div>
          </div>
          <div className="flex items-center text-sm text-warm-green relative z-10">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+{data.revenue.percentageChange}% vs last month</span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
