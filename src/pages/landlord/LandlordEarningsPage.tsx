import { motion } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  DollarSign,
  Download,
  Filter,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  MOCK_EARNINGS_DATA,
  MONTHLY_EARNINGS,
  PROPERTY_EARNINGS,
} from "../lib/constants/pages/LandlordEarningsPage";
export function LandlordEarningsPage() {
  const [filterBy, setFilterBy] = useState<"all" | "property">("all");
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [timeRange, setTimeRange] = useState<"6months" | "1year" | "all">(
    "6months"
  );
  const percentageChange =
    ((MOCK_EARNINGS_DATA.thisMonth - MOCK_EARNINGS_DATA.lastMonth) /
      MOCK_EARNINGS_DATA.lastMonth) *
    100;
  const maxEarning = Math.max(...MONTHLY_EARNINGS.map((m) => m.gross));
  // Filter property earnings
  const filteredEarnings =
    filterBy === "property" && selectedProperty
      ? PROPERTY_EARNINGS.filter((p) => p.id === selectedProperty)
      : PROPERTY_EARNINGS;
  const totalFiltered = filteredEarnings.reduce(
    (acc, p) => ({
      gross: acc.gross + p.gross,
      net: acc.net + p.net,
      bookings: acc.bookings + p.bookings,
    }),
    {
      gross: 0,
      net: 0,
      bookings: 0,
    }
  );
  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
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
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal">
              Earnings Overview
            </h1>
            <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-charcoal/20 rounded-lg hover:border-warm-green hover:text-warm-green transition-all shadow-sm">
              <Download className="w-5 h-5" />
              <span className="font-medium">Export Report</span>
            </button>
          </div>
          <p className="text-xl text-charcoal/70 font-light">
            Track your financial performance and growth
          </p>
        </motion.div>

        {/* Filter Bar */}
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
            delay: 0.1,
          }}
          className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-charcoal/60" />
              <span className="text-sm font-medium text-charcoal/80">
                Filter by:
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setFilterBy("all");
                    setSelectedProperty(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterBy === "all"
                      ? "bg-warm-green text-white"
                      : "bg-sand text-charcoal hover:bg-sand/80"
                  }`}
                >
                  All Properties
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                      filterBy === "property"
                        ? "bg-warm-green text-white"
                        : "bg-sand text-charcoal hover:bg-sand/80"
                    }`}
                  >
                    <span>By Property</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showFilterDropdown && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-charcoal/10 py-2 z-20"
                    >
                      {PROPERTY_EARNINGS.map((property) => (
                        <button
                          key={property.id}
                          onClick={() => {
                            setFilterBy("property");
                            setSelectedProperty(property.id);
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-sand transition-colors flex items-center space-x-3 ${
                            selectedProperty === property.id ? "bg-sand/50" : ""
                          }`}
                        >
                          <img
                            src={property.image}
                            alt={property.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-charcoal text-sm">
                              {property.name}
                            </p>
                            <p className="text-xs text-charcoal/60">
                              {property.location}
                            </p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-charcoal/60">Time range:</span>
              <select
                value={timeRange}
                onChange={(e) =>
                  setTimeRange(e.target.value as "6months" | "1year" | "all")
                }
                className="px-4 py-2 bg-sand border border-charcoal/10 rounded-lg text-sm font-medium text-charcoal outline-none focus:border-warm-green transition-colors"
              >
                <option value="6months">Last 6 months</option>
                <option value="1year">Last year</option>
                <option value="all">All time</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
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
          {/* This Month */}
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
            className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                  This Month
                </p>
                <h3 className="font-serif text-4xl font-bold text-gold">
                  ${MOCK_EARNINGS_DATA.thisMonth.toLocaleString()}
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
              hidden: {
                opacity: 0,
                y: 20,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                  Total Earnings
                </p>
                <h3 className="font-serif text-4xl font-bold text-charcoal">
                  ${MOCK_EARNINGS_DATA.totalAllTime.toLocaleString()}
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
              hidden: {
                opacity: 0,
                y: 20,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                  Upcoming
                </p>
                <h3 className="font-serif text-4xl font-bold text-terracotta">
                  ${MOCK_EARNINGS_DATA.upcomingPayouts.toLocaleString()}
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
              hidden: {
                opacity: 0,
                y: 20,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                  Commission (12%)
                </p>
                <h3 className="font-serif text-4xl font-bold text-charcoal/40">
                  -${MOCK_EARNINGS_DATA.commission.toLocaleString()}
                </h3>
              </div>
            </div>
            <p className="text-sm text-charcoal/60">This month</p>
          </motion.div>
        </motion.div>

        {/* Earnings Chart */}
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
            delay: 0.3,
          }}
          className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm mb-12"
        >
          <h2 className="font-serif text-3xl text-charcoal mb-8">
            Monthly Performance
          </h2>

          <div className="space-y-6">
            {MONTHLY_EARNINGS.map((month, index) => (
              <motion.div
                key={month.month}
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
                  delay: index * 0.05,
                }}
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
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${(month.gross / maxEarning) * 100}%`,
                      }}
                      transition={{
                        duration: 1,
                        delay: index * 0.1,
                      }}
                      className="h-full bg-warm-green/30 rounded-lg"
                    />
                  </div>
                  {/* Net bar */}
                  <div className="flex-1 h-10 bg-sand rounded-lg overflow-hidden relative">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${(month.net / maxEarning) * 100}%`,
                      }}
                      transition={{
                        duration: 1,
                        delay: index * 0.1 + 0.2,
                      }}
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

        {/* Per-Property Breakdown */}
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
            delay: 0.4,
          }}
          className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl text-charcoal">
              {filterBy === "property" && selectedProperty
                ? "Property Performance"
                : "Property Breakdown"}
            </h2>
            {filterBy === "property" && (
              <div className="text-right">
                <p className="text-sm text-charcoal/60 mb-1">Total Filtered</p>
                <p className="font-serif text-2xl font-bold text-gold">
                  ${totalFiltered.net.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {filteredEarnings.map((property, index) => (
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
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                className="border border-charcoal/10 rounded-xl p-6 hover:border-warm-green/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-charcoal mb-1">
                      {property.name}
                    </h3>
                    <p className="text-sm text-charcoal/60 mb-3">
                      {property.location}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-charcoal/60 mb-1">Bookings</p>
                        <p className="font-bold text-charcoal">
                          {property.bookings}
                        </p>
                      </div>
                      <div>
                        <p className="text-charcoal/60 mb-1">Gross</p>
                        <p className="font-bold text-charcoal">
                          ${property.gross.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-charcoal/60 mb-1">Commission</p>
                        <p className="font-bold text-terracotta">
                          -${property.commission.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-charcoal/60 mb-1">Net</p>
                        <p className="font-bold text-gold">
                          ${property.net.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-charcoal/60 mb-1">Avg/Booking</p>
                        <p className="font-bold text-charcoal">
                          ${property.avgPerBooking.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
