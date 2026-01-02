import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  Bell,
  Calendar,
  DollarSign,
  FileText,
  Flag,
  Home,
  MessageSquare,
  Shield,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DASHBOARD_DATA,
  PLATFORM_ACTIVITY,
  RECENT_BOOKINGS,
  REVENUE_DATA,
} from "../lib/constants/pages/AdminDashboardPage";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const handleBroadcastSend = () => {
    // Send broadcast notification logic here
    console.log("Broadcasting:", {
      title: broadcastTitle,
      message: broadcastMessage,
    });
    setShowBroadcastModal(false);
    setBroadcastTitle("");
    setBroadcastMessage("");
  };
  const getActivityColor = (type: string) => {
    switch (type) {
      case "user":
        return "text-warm-green";
      case "property":
        return "text-terracotta";
      case "financial":
        return "text-gold";
      default:
        return "text-charcoal";
    }
  };
  const getActivityBg = (type: string) => {
    switch (type) {
      case "user":
        return "bg-warm-green/10";
      case "property":
        return "bg-terracotta/10";
      case "financial":
        return "bg-gold/10";
      default:
        return "bg-charcoal/10";
    }
  };
  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-12"
        >
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-charcoal/70 font-light">
            Platform health and performance overview
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-9 space-y-8">
            {/* KPI Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
              {/* Total Users Card - NOW CLICKABLE */}
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
                        {DASHBOARD_DATA.users.total.toLocaleString()}
                      </h3>
                      <div className="space-y-1 text-sm text-charcoal/70">
                        <p>
                          Guests: {DASHBOARD_DATA.users.guests.toLocaleString()}
                        </p>
                        <p>
                          Hosts: {DASHBOARD_DATA.users.hosts.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-warm-green/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-warm-green" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-warm-green relative z-10">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>
                      +{DASHBOARD_DATA.users.monthlyGrowth} this month (
                      {DASHBOARD_DATA.users.percentageChange}%)
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* Properties Listed Card - NOW CLICKABLE */}
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
                        {DASHBOARD_DATA.properties.total.toLocaleString()}
                      </h3>
                      <div className="space-y-1 text-sm text-charcoal/70">
                        <p>
                          Published:{" "}
                          {DASHBOARD_DATA.properties.published.toLocaleString()}
                        </p>
                        <p className="flex items-center">
                          Pending: {DASHBOARD_DATA.properties.pending}
                          <span className="ml-2 px-2 py-0.5 bg-gold text-white text-xs font-bold rounded-full">
                            {DASHBOARD_DATA.properties.pending}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Home className="w-6 h-6 text-terracotta" />
                    </div>
                  </div>
                  <p className="text-sm text-charcoal/60 relative z-10">
                    Average {DASHBOARD_DATA.properties.weeklyAverage} new
                    listings/week
                  </p>
                </Link>
              </motion.div>

              {/* Active Reservations Card - NOW CLICKABLE */}
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
                        {DASHBOARD_DATA.reservations.total.toLocaleString()}
                      </h3>
                      <div className="space-y-1 text-sm text-charcoal/70">
                        <p>
                          Upcoming:{" "}
                          {DASHBOARD_DATA.reservations.upcoming.toLocaleString()}
                        </p>
                        <p>
                          In Progress: {DASHBOARD_DATA.reservations.inProgress}
                        </p>
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
                        {DASHBOARD_DATA.reservations.occupancyRate}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-charcoal/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${DASHBOARD_DATA.reservations.occupancyRate}%`,
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.5,
                        }}
                        className="h-full bg-warm-green rounded-full"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Revenue & Commission Card - NOW CLICKABLE */}
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
                        ${DASHBOARD_DATA.revenue.monthly.toLocaleString()}
                      </h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-gold font-medium">
                          Commission: $
                          {DASHBOARD_DATA.revenue.commission.toLocaleString()} (
                          {DASHBOARD_DATA.revenue.commissionRate}%)
                        </p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <DollarSign className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-warm-green relative z-10">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>
                      +{DASHBOARD_DATA.revenue.percentageChange}% vs last month
                    </span>
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Alerts & Pending Actions - RESTRUCTURED */}
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
                delay: 0.4,
              }}
              className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm"
            >
              <h2 className="font-serif text-3xl text-charcoal mb-6 flex items-center">
                <AlertCircle className="w-7 h-7 mr-3 text-terracotta" />
                Alerts & Pending Actions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Verification Queue Card */}
                <Link
                  to="/admin/users?verificationStatus=unverified"
                  className="border border-charcoal/10 rounded-xl p-6 hover:border-warm-green/30 hover:shadow-lg transition-all relative group cursor-pointer"
                >
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-terracotta rounded-full animate-pulse" />
                  </div>
                  <Shield className="w-8 h-8 text-warm-green mb-4" />
                  <h3 className="font-bold text-charcoal mb-3">
                    User Verification Queue
                  </h3>
                  <div className="space-y-2 text-sm text-charcoal/70 mb-4">
                    <p className="flex items-center justify-between">
                      <span>Pending verification</span>
                      <span className="px-2 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
                        {DASHBOARD_DATA.alerts.userVerifications}
                      </span>
                    </p>
                  </div>
                  <div className="text-sm text-warm-green font-medium group-hover:underline">
                    Review user identities →
                  </div>
                </Link>

                {/* Property Verification Queue Card */}
                <Link
                  to="/admin/properties?verificationStatus=unverified"
                  className="border border-charcoal/10 rounded-xl p-6 hover:border-warm-green/30 hover:shadow-lg transition-all relative group cursor-pointer"
                >
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-terracotta rounded-full animate-pulse" />
                  </div>
                  <Home className="w-8 h-8 text-terracotta mb-4" />
                  <h3 className="font-bold text-charcoal mb-3">
                    Property Verification Queue
                  </h3>
                  <div className="space-y-2 text-sm text-charcoal/70 mb-4">
                    <p className="flex items-center justify-between">
                      <span>Pending verification</span>
                      <span className="px-2 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
                        {DASHBOARD_DATA.alerts.propertyVerifications}
                      </span>
                    </p>
                  </div>
                  <div className="text-sm text-terracotta font-medium group-hover:underline">
                    Review property ownership →
                  </div>
                </Link>

                {/* Flagged Content - UPDATED NAVIGATION */}
                <Link
                  to="/admin/messages"
                  className="border border-charcoal/10 rounded-xl p-6 hover:border-terracotta/30 hover:shadow-lg transition-all group cursor-pointer"
                >
                  <Flag className="w-8 h-8 text-terracotta mb-4" />
                  <h3 className="font-bold text-charcoal mb-3">
                    Flagged Content
                  </h3>
                  <div className="space-y-2 text-sm text-charcoal/70 mb-4">
                    <p>
                      {DASHBOARD_DATA.alerts.flaggedConversations} conversations
                      flagged by AI moderation
                    </p>
                    <p>
                      {DASHBOARD_DATA.alerts.flaggedProperties} properties
                      reported for policy violations
                    </p>
                  </div>
                  <div className="text-sm text-terracotta font-medium group-hover:underline">
                    Review flags →
                  </div>
                </Link>
              </div>

              {/* Disputes Card - Separate row */}
              <div className="mt-6">
                <Link
                  to="/admin/reports"
                  className="block border border-charcoal/10 rounded-xl p-6 hover:border-terracotta/30 hover:shadow-lg transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <MessageSquare className="w-8 h-8 text-terracotta flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-charcoal mb-3">
                          Disputes & Support
                        </h3>
                        <div className="space-y-2 text-sm text-charcoal/70">
                          <p>
                            {DASHBOARD_DATA.alerts.disputes} guest-host disputes
                            require resolution
                          </p>
                          <p>
                            {DASHBOARD_DATA.alerts.supportTickets} support
                            tickets unresolved
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-terracotta font-medium group-hover:underline whitespace-nowrap">
                      Manage disputes →
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Activity Streams */}
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
                delay: 0.5,
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Recent Bookings */}
              <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
                <h2 className="font-serif text-2xl text-charcoal mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-warm-green" />
                  Recent Bookings
                </h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {RECENT_BOOKINGS.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.6 + index * 0.1,
                      }}
                      className="border border-charcoal/10 rounded-xl p-4 hover:border-warm-green/30 transition-all"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={booking.property.image}
                          alt={booking.property.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-charcoal truncate">
                                {booking.property.name}
                              </h4>
                              <p className="text-xs text-charcoal/60">
                                {booking.property.location}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-bold ${
                                booking.status === "confirmed"
                                  ? "bg-warm-green text-white"
                                  : "bg-gold text-white"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <img
                              src={booking.guest.avatar}
                              alt={booking.guest.name}
                              className="w-6 h-6 rounded-full border-2 border-sand"
                            />
                            <span className="text-sm text-charcoal/70">
                              {booking.guest.name}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-charcoal/60">
                              {booking.dates}
                            </span>
                            <div className="text-right">
                              <p className="font-medium text-charcoal">
                                ${booking.value}
                              </p>
                              <p className="text-xs text-gold">
                                Commission: ${booking.commission}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-charcoal/50 mt-2">
                            {booking.timestamp}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Platform Activity */}
              <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
                <h2 className="font-serif text-2xl text-charcoal mb-6 flex items-center">
                  <Activity className="w-6 h-6 mr-2 text-terracotta" />
                  Platform Activity
                </h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {PLATFORM_ACTIVITY.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.6 + index * 0.1,
                      }}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-cream transition-colors"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityBg(
                          activity.type
                        )}`}
                      >
                        <activity.icon
                          className={`w-5 h-5 ${getActivityColor(
                            activity.type
                          )}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-charcoal/80">
                          {activity.text}
                        </p>
                        <p className="text-xs text-charcoal/50 mt-1">
                          {activity.timestamp}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Revenue Chart */}
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
                delay: 0.7,
              }}
              className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm"
            >
              <h2 className="font-serif text-3xl text-charcoal mb-8">
                Revenue Trends (Last 6 Months)
              </h2>
              <div className="space-y-6">
                {REVENUE_DATA.map((month, index) => {
                  const maxValue = Math.max(
                    ...REVENUE_DATA.map((m) => m.total)
                  );
                  return (
                    <div key={month.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-charcoal w-12">
                          {month.month}
                        </span>
                        <div className="flex items-center space-x-4 text-charcoal/60">
                          <span>
                            Total: ${(month.total / 1000).toFixed(0)}k
                          </span>
                          <span>
                            Host Payout: ${(month.host / 1000).toFixed(0)}k
                          </span>
                          <span className="text-gold font-medium">
                            Commission: ${(month.commission / 1000).toFixed(1)}k
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-8 bg-sand rounded-lg overflow-hidden relative">
                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: `${(month.total / maxValue) * 100}%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: 0.8 + index * 0.1,
                            }}
                            className="h-full bg-warm-green rounded-lg"
                          />
                        </div>
                        <div className="flex-1 h-8 bg-sand rounded-lg overflow-hidden relative">
                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: `${(month.host / maxValue) * 100}%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: 0.9 + index * 0.1,
                            }}
                            className="h-full bg-terracotta rounded-lg"
                          />
                        </div>
                        <div className="w-32 h-8 bg-sand rounded-lg overflow-hidden relative">
                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: `${
                                (month.commission / month.total) * 100
                              }%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: 1 + index * 0.1,
                            }}
                            className="h-full bg-gold rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-center space-x-8 mt-8 pt-6 border-t border-charcoal/10">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-warm-green rounded" />
                  <span className="text-sm text-charcoal/60">
                    Total Revenue
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-terracotta rounded" />
                  <span className="text-sm text-charcoal/60">Host Payouts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gold rounded" />
                  <span className="text-sm text-charcoal/60">
                    Platform Commission
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar - Quick Actions - UPDATED */}
          <div className="xl:col-span-3">
            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="sticky top-24 bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm"
            >
              <h2 className="font-serif text-2xl text-charcoal mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                {/* Verify Users - WITH FILTER */}
                <Link
                  to="/admin/users?verificationStatus=unverified"
                  className="w-full flex items-center justify-between px-4 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Verify Users</span>
                  </div>
                  <span className="px-2 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
                    {DASHBOARD_DATA.alerts.userVerifications}
                  </span>
                </Link>

                {/* Verify Properties - WITH FILTER */}
                <Link
                  to="/admin/properties?verificationStatus=unverified"
                  className="w-full flex items-center justify-between px-4 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-center space-x-3">
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Verify Properties</span>
                  </div>
                  <span className="px-2 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
                    {DASHBOARD_DATA.alerts.propertyVerifications}
                  </span>
                </Link>

                {/* Broadcast Notification - WITH MODAL */}
                <button
                  onClick={() => setShowBroadcastModal(true)}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">Broadcast Notification</span>
                </button>

                <Link
                  to="/admin/reports"
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-charcoal text-white rounded-lg hover:bg-charcoal/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Generate Reports</span>
                </Link>
              </div>

              {/* Verification Status Donut Chart */}
              <div className="mt-8 pt-8 border-t border-charcoal/10">
                <h3 className="font-serif text-xl text-charcoal mb-4">
                  Verification Status
                </h3>
                <div className="relative">
                  <svg viewBox="0 0 200 200" className="w-full h-auto">
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#6B6B6B"
                      strokeWidth="20"
                      opacity="0.2"
                    />
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#2D5F3F"
                      strokeWidth="20"
                      strokeDasharray="502.4"
                      initial={{
                        strokeDashoffset: 502.4,
                      }}
                      animate={{
                        strokeDashoffset: 502.4 * 0.3,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 1,
                      }}
                      transform="rotate(-90 100 100)"
                    />
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="20"
                      strokeDasharray="502.4"
                      initial={{
                        strokeDashoffset: 502.4,
                      }}
                      animate={{
                        strokeDashoffset: 502.4 * 0.7,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 1.2,
                      }}
                      transform="rotate(108 100 100)"
                    />
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#E07A5F"
                      strokeWidth="20"
                      strokeDasharray="502.4"
                      initial={{
                        strokeDashoffset: 502.4,
                      }}
                      animate={{
                        strokeDashoffset: 502.4 * 0.85,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 1.4,
                      }}
                      transform="rotate(216 100 100)"
                    />
                    <text
                      x="100"
                      y="95"
                      textAnchor="middle"
                      className="font-serif text-3xl font-bold fill-charcoal"
                    >
                      70%
                    </text>
                    <text
                      x="100"
                      y="115"
                      textAnchor="middle"
                      className="text-xs fill-charcoal/60"
                    >
                      Verified
                    </text>
                  </svg>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-warm-green rounded-full" />
                      <span className="text-charcoal/70">Verified</span>
                    </div>
                    <span className="font-medium text-charcoal">70%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gold rounded-full" />
                      <span className="text-charcoal/70">Pending</span>
                    </div>
                    <span className="font-medium text-charcoal">20%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-terracotta rounded-full" />
                      <span className="text-charcoal/70">Rejected</span>
                    </div>
                    <span className="font-medium text-charcoal">5%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-charcoal/40 rounded-full" />
                      <span className="text-charcoal/70">Not Submitted</span>
                    </div>
                    <span className="font-medium text-charcoal">5%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Broadcast Notification Modal */}
      <AnimatePresence>
        {showBroadcastModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowBroadcastModal(false)}
            />
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
                <h3 className="font-serif text-2xl text-charcoal">
                  Broadcast Notification
                </h3>
                <button
                  onClick={() => setShowBroadcastModal(false)}
                  className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Notification Title
                  </label>
                  <input
                    type="text"
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    placeholder="Enter notification title..."
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Message (Markdown supported)
                  </label>
                  <textarea
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Enter your message... You can use **bold**, *italic*, and other Markdown formatting."
                    rows={8}
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-all resize-none font-mono text-sm"
                  />
                  <p className="text-xs text-charcoal/60 mt-2">
                    This message will be sent to all users on the platform
                    immediately.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
                <button
                  onClick={() => setShowBroadcastModal(false)}
                  className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBroadcastSend}
                  disabled={!broadcastTitle.trim() || !broadcastMessage.trim()}
                  className="px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Broadcast
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
