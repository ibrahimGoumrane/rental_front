import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  DollarSign,
  Eye,
  Home,
  MessageSquare,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LANDLORD_MOCK_PROPERTIES,
  RECENT_RESERVATIONS,
} from "../lib/constants/pages/LandlordDashboardPage";
export function LandlordDashboardPage() {
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);
  const stats = {
    totalProperties: LANDLORD_MOCK_PROPERTIES.length,
    activeReservations: 8,
    monthlyEarnings: 12450,
    pendingRequests: 2,
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-terracotta/10 text-terracotta border-terracotta/20";
      case "accepted":
        return "bg-warm-green/10 text-warm-green border-warm-green/20";
      case "completed":
        return "bg-charcoal/10 text-charcoal border-charcoal/20";
      default:
        return "bg-charcoal/10 text-charcoal border-charcoal/20";
    }
  };
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section with Greeting */}
      <section className="pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
              Welcome back, John
            </h1>
            <p className="text-xl text-charcoal/70 font-light mb-2">
              Your properties are performing beautifully this month.
            </p>
            <div className="flex items-center space-x-2 text-warm-green">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">
                +18% earnings compared to last month
              </span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {
                opacity: 0,
              },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {/* Stat Card 1 */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
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
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
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
                <p className="text-sm text-charcoal/60">
                  3 checking in this week
                </p>
              </Link>
            </motion.div>

            {/* Stat Card 3 */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
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
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
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
        </div>
      </section>

      {/* Properties Portfolio Section */}
      <section className="py-12 px-6 md:px-12 bg-sand/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-4xl text-charcoal mb-2">
                Your Properties
              </h2>
              <p className="text-charcoal/60">
                A curated collection of your finest offerings
              </p>
            </div>
            <Link
              to="/landlord/properties"
              className="flex items-center space-x-2 text-warm-green hover:text-warm-green/80 transition-colors font-medium"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LANDLORD_MOCK_PROPERTIES.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                onMouseEnter={() => setHoveredProperty(property.id)}
                onMouseLeave={() => setHoveredProperty(null)}
                className="group"
              >
                <Link
                  to={`/landlord/properties/${property.id}`}
                  className="block bg-white rounded-2xl overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

                    {/* Earnings Overlay (appears on hover) */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: hoveredProperty === property.id ? 1 : 0,
                        y: hoveredProperty === property.id ? 0 : 20,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6"
                    >
                      <DollarSign className="w-8 h-8 text-gold mb-2" />
                      <p className="text-xs uppercase tracking-widest text-white/60 mb-1">
                        Monthly Earnings
                      </p>
                      <h4 className="font-serif text-4xl font-bold text-gold mb-4">
                        ${property.monthlyEarnings.toLocaleString()}
                      </h4>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="text-center">
                          <p className="text-xs text-white/60 mb-1">Bookings</p>
                          <p className="text-xl font-bold">
                            {property.totalBookings}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-white/60 mb-1">
                            Occupancy
                          </p>
                          <p className="text-xl font-bold">
                            {property.occupancyRate}%
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-warm-green/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full">
                      Active
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-charcoal mb-2 group-hover:text-warm-green transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-charcoal/60 text-sm mb-4">
                      {property.location}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
                      <div className="flex items-center space-x-4 text-sm text-charcoal/60">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{property.totalBookings} bookings</span>
                        </div>
                      </div>
                      <Eye className="w-5 h-5 text-charcoal/40 group-hover:text-warm-green transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reservations */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-4xl text-charcoal mb-2">
                Recent Reservations
              </h2>
              <p className="text-charcoal/60">
                Stay on top of your upcoming bookings
              </p>
            </div>
            <Link
              to="/landlord/reservations"
              className="flex items-center space-x-2 text-warm-green hover:text-warm-green/80 transition-colors font-medium"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {RECENT_RESERVATIONS.map((reservation, index) => (
              <motion.div
                key={reservation.id}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
              >
                <Link
                  to={`/landlord/reservations/${reservation.id}`}
                  className="block bg-white rounded-xl p-6 border border-charcoal/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h4 className="font-serif text-xl text-charcoal group-hover:text-warm-green transition-colors">
                          {reservation.propertyName}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(
                            reservation.status
                          )}`}
                        >
                          {reservation.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-charcoal/60">
                        <span>Guest: {reservation.clientName}</span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {reservation.checkIn} → {reservation.checkOut}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-2xl font-bold text-gold">
                        ${reservation.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-charcoal/60">Total</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-6 md:px-12 bg-sand/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl text-charcoal mb-8 text-center">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/landlord/properties/new"
              className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group text-center"
            >
              <div className="w-16 h-16 rounded-full bg-warm-green/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-warm-green group-hover:scale-110 transition-all">
                <Plus className="w-8 h-8 text-warm-green group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">
                Add New Property
              </h3>
              <p className="text-charcoal/60">
                List a new space and start earning
              </p>
            </Link>

            <Link
              to="/landlord/earnings"
              className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
                <TrendingUp className="w-8 h-8 text-gold group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">
                View Earnings
              </h3>
              <p className="text-charcoal/60">
                Track your financial performance
              </p>
            </Link>

            <Link
              to="/landlord/messages"
              className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group text-center"
            >
              <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-terracotta group-hover:scale-110 transition-all">
                <MessageSquare className="w-8 h-8 text-terracotta group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">
                Open Messages
              </h3>
              <p className="text-charcoal/60">Connect with your guests</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
