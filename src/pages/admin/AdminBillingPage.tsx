import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Download,
  FileText,
  Filter,
  Percent,
  Plus,
  RefreshCw,
  Settings,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  COMMISSION_DATA,
  MONTHLY_REVENUE,
  REFUNDS_DATA,
} from "../lib/constants/pages/AdminBillingPage";
export function AdminBillingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "commission" | "analytics" | "refunds"
  >("commission");
  // Updated filter states for property-level view
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    hostName: "",
    propertyName: "",
    grossAmountMin: "",
    grossAmountMax: "",
    status: "all",
  });
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // Host refund form state
  const [showRefundForm, setShowRefundForm] = useState(false);
  const [refundForm, setRefundForm] = useState({
    hostId: "",
    hostName: "",
    propertyId: "",
    propertyName: "",
    amount: "",
    reason: "",
    affectedBookings: "",
  });
  const stats = {
    monthlyRevenue: 284560,
    commission: 28456,
    tva: 5691,
    netRevenue: 34147, // commission + TVA
  };
  const totalPages = Math.ceil(COMMISSION_DATA.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = COMMISSION_DATA.slice(startIndex, endIndex);
  const handleExportReport = () => {
    console.log("Exporting financial report (CSV)...");
    // Export logic: commissions, TVA, refunds, adjustments
  };
  const handlePaymentSettings = () => {
    navigate("/admin/settings?section=payment");
  };
  const resetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      hostName: "",
      propertyName: "",
      grossAmountMin: "",
      grossAmountMax: "",
      status: "all",
    });
  };
  const handleRefundSubmit = () => {
    console.log("Processing host refund:", refundForm);
    // Audit trail logging would happen here
    setShowRefundForm(false);
    setRefundForm({
      hostId: "",
      hostName: "",
      propertyId: "",
      propertyName: "",
      amount: "",
      reason: "",
      affectedBookings: "",
    });
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
            Active
          </span>
        );
      case "pending":
        return (
          <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
            Pending
          </span>
        );
      case "processed":
        return (
          <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
            Processed
          </span>
        );
      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
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
          className="mb-8"
        >
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-8">
            Financial Management
          </h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                delay: 0.1,
              }}
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
                  <p className="text-xs text-charcoal/60 mt-2">
                    Gross reservations
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-gold" />
                </div>
              </div>
            </motion.div>

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
                delay: 0.2,
              }}
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
                  <p className="text-xs text-charcoal/60 mt-2">
                    10% of revenue
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-warm-green/10 flex items-center justify-center">
                  <Percent className="w-6 h-6 text-warm-green" />
                </div>
              </div>
            </motion.div>

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
                delay: 0.3,
              }}
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
                  <p className="text-xs text-charcoal/60 mt-2">
                    20% of commission
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-terracotta" />
                </div>
              </div>
            </motion.div>

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
                  <p className="text-xs text-charcoal/60 mt-2">
                    Commission + TVA
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-charcoal/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-charcoal" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportReport}
              className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              <span className="font-medium">Export Financial Report</span>
            </button>
            <button
              onClick={handlePaymentSettings}
              className="flex items-center space-x-2 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-all shadow-sm hover:-translate-y-0.5"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Payment Settings</span>
            </button>
          </div>
        </motion.div>

        {/* Filters Section - UPDATED for property-level view */}
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
          className="mb-6"
        >
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-charcoal/10 rounded-lg hover:bg-sand/50 transition-colors"
          >
            <Filter className="w-5 h-5 text-charcoal" />
            <span className="font-medium text-charcoal">Filters</span>
            {Object.values(filters).some((v) => v && v !== "all") && (
              <span className="px-2 py-1 bg-gold text-white text-xs font-bold rounded-full">
                Active
              </span>
            )}
          </button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                className="mt-4 bg-white rounded-xl p-6 border border-charcoal/10 shadow-sm overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Date From
                    </label>
                    <input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          dateFrom: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Date To
                    </label>
                    <input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          dateTo: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Host Name
                    </label>
                    <input
                      type="text"
                      value={filters.hostName}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          hostName: e.target.value,
                        })
                      }
                      placeholder="Search by host name..."
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Property Name
                    </label>
                    <input
                      type="text"
                      value={filters.propertyName}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          propertyName: e.target.value,
                        })
                      }
                      placeholder="Search by property name..."
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Min Gross Revenue
                    </label>
                    <input
                      type="number"
                      value={filters.grossAmountMin}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          grossAmountMin: e.target.value,
                        })
                      }
                      placeholder="0"
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Max Gross Revenue
                    </label>
                    <input
                      type="number"
                      value={filters.grossAmountMax}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          grossAmountMax: e.target.value,
                        })
                      }
                      placeholder="999999"
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          status: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={resetFilters}
                    className="flex items-center space-x-2 px-4 py-2 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tabs */}
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
            delay: 0.6,
          }}
          className="mb-8"
        >
          <div className="flex items-center space-x-8 border-b border-charcoal/10">
            {[
              {
                id: "commission",
                label: "Commission Ledger",
              },
              {
                id: "analytics",
                label: "Revenue Analytics",
              },
              {
                id: "refunds",
                label: "Host Refunds",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-charcoal"
                    : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Commission Ledger Tab - PROPERTY-LEVEL AGGREGATION */}
        {activeTab === "commission" && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="space-y-6"
          >
            {/* Commission Explanation Card */}
            <div className="bg-warm-green/10 border border-warm-green/20 rounded-xl p-6">
              <h3 className="font-bold text-charcoal mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-warm-green" />
                Commission & Tax Structure
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-charcoal/60 mb-1">
                    Gross Revenue (per property)
                  </p>
                  <p className="font-bold text-charcoal">100%</p>
                </div>
                <div>
                  <p className="text-charcoal/60 mb-1">Platform Commission</p>
                  <p className="font-bold text-warm-green">10%</p>
                </div>
                <div>
                  <p className="text-charcoal/60 mb-1">TVA on Commission</p>
                  <p className="font-bold text-terracotta">20% of 10%</p>
                </div>
                <div>
                  <p className="text-charcoal/60 mb-1">Net Platform Revenue</p>
                  <p className="font-bold text-gold">Commission + TVA</p>
                </div>
              </div>
              <p className="text-xs text-charcoal/60 mt-4">
                This ledger shows aggregated earnings per property. For
                individual reservation details, visit the{" "}
                <Link
                  to="/admin/reservations"
                  className="text-warm-green underline font-medium"
                >
                  Reservations page
                </Link>
                .
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sand border-b border-charcoal/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Host
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Property
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Total Bookings
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Gross Revenue
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Commission (10%)
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        TVA (20%)
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Net Revenue
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Period
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/5">
                    {paginatedData.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-sand/50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-cream"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            {item.host.avatar ? (
                              <img
                                src={item.host.avatar}
                                alt={item.host.name}
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                                <span className="text-sm font-bold text-gold">
                                  {item.host.initials}
                                </span>
                              </div>
                            )}
                            <div>
                              <Link
                                to={`/admin/users/${item.host.name}`}
                                className="font-medium text-charcoal hover:text-gold transition-colors"
                              >
                                {item.host.name}
                              </Link>
                              {item.host.verified && (
                                <p className="text-xs text-gold flex items-center">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <Link
                              to={`/admin/properties/${item.property.id}`}
                              className="font-medium text-charcoal hover:text-warm-green transition-colors"
                            >
                              {item.property.name}
                            </Link>
                            <p className="text-xs text-charcoal/60">
                              {item.property.location}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-charcoal">
                            {item.totalBookings}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-charcoal">
                            ${item.grossRevenue.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-warm-green">
                            ${item.commission.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-terracotta">
                            ${item.tva.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-gold">
                            ${item.netRevenue.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-charcoal/70">
                            {item.period}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(item.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-charcoal/10 bg-sand/30">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-charcoal/60">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(endIndex, COMMISSION_DATA.length)} of{" "}
                    {COMMISSION_DATA.length} properties
                  </span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-3 py-1 border border-charcoal/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                  >
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-charcoal/20 rounded-lg hover:bg-sand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5 text-charcoal" />
                  </button>
                  <span className="px-4 py-2 text-sm font-medium text-charcoal">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 border border-charcoal/20 rounded-lg hover:bg-sand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5 text-charcoal" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Host Refunds Tab - UPDATED */}
        {activeTab === "refunds" && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="space-y-6"
          >
            {/* Add Host Refund Button */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-charcoal/70 mb-2">
                  Manage refunds to hosts for canceled bookings, disputes, or
                  billing corrections.
                </p>
                <p className="text-sm text-charcoal/60">
                  Note: Guest refunds are handled through the{" "}
                  <Link
                    to="/admin/reservations"
                    className="text-warm-green underline font-medium"
                  >
                    Reservations page
                  </Link>
                  .
                </p>
              </div>
              <button
                onClick={() => setShowRefundForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">New Host Refund</span>
              </button>
            </div>

            {/* Host Refund Form Modal */}
            <AnimatePresence>
              {showRefundForm && (
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
                    onClick={() => setShowRefundForm(false)}
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
                    <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
                      <h3 className="font-serif text-2xl text-charcoal">
                        Process Host Refund
                      </h3>
                      <button
                        onClick={() => setShowRefundForm(false)}
                        className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-charcoal" />
                      </button>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">
                            Host Name
                          </label>
                          <input
                            type="text"
                            value={refundForm.hostName}
                            onChange={(e) =>
                              setRefundForm({
                                ...refundForm,
                                hostName: e.target.value,
                              })
                            }
                            placeholder="Search or select host..."
                            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">
                            Property Name
                          </label>
                          <input
                            type="text"
                            value={refundForm.propertyName}
                            onChange={(e) =>
                              setRefundForm({
                                ...refundForm,
                                propertyName: e.target.value,
                              })
                            }
                            placeholder="Select property..."
                            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">
                            Refund Amount (MAD)
                          </label>
                          <input
                            type="number"
                            value={refundForm.amount}
                            onChange={(e) =>
                              setRefundForm({
                                ...refundForm,
                                amount: e.target.value,
                              })
                            }
                            placeholder="0.00"
                            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">
                            Affected Bookings
                          </label>
                          <input
                            type="number"
                            value={refundForm.affectedBookings}
                            onChange={(e) =>
                              setRefundForm({
                                ...refundForm,
                                affectedBookings: e.target.value,
                              })
                            }
                            placeholder="1"
                            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Reason for Refund
                        </label>
                        <textarea
                          value={refundForm.reason}
                          onChange={(e) =>
                            setRefundForm({
                              ...refundForm,
                              reason: e.target.value,
                            })
                          }
                          placeholder="Explain the reason for this host refund (e.g., guest cancellation, property issue, billing error)..."
                          rows={4}
                          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 resize-none"
                        />
                      </div>

                      <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                        <p className="text-sm text-charcoal/70">
                          <strong>Note:</strong> This refund will be issued to
                          the host's account. All host refunds are logged in the
                          audit trail for compliance and transparency.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
                      <button
                        onClick={() => setShowRefundForm(false)}
                        className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleRefundSubmit}
                        disabled={
                          !refundForm.hostName ||
                          !refundForm.propertyName ||
                          !refundForm.amount ||
                          !refundForm.reason
                        }
                        className="px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Process Host Refund
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Host Refunds Table */}
            <div className="bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sand border-b border-charcoal/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Refund ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Host
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Property
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Amount Refunded
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Affected Bookings
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Reason
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/5">
                    {REFUNDS_DATA.map((refund, index) => (
                      <tr
                        key={refund.id}
                        className={`hover:bg-sand/50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-cream"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-charcoal font-medium">
                            {refund.id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            {refund.host.avatar ? (
                              <img
                                src={refund.host.avatar}
                                alt={refund.host.name}
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                                <span className="text-sm font-bold text-gold">
                                  {refund.host.initials}
                                </span>
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-charcoal">
                                {refund.host.name}
                              </p>
                              {refund.host.verified && (
                                <p className="text-xs text-gold flex items-center">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-charcoal">
                              {refund.property.name}
                            </p>
                            <p className="text-xs text-charcoal/60">
                              {refund.property.location}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-terracotta">
                            ${refund.amountRefunded.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-charcoal">
                            {refund.affectedBookings}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-charcoal/70">
                            {refund.reason}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-charcoal/60">
                            {refund.date}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(refund.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab - Same as before */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="space-y-8"
          >
            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
              <h2 className="font-serif text-3xl text-charcoal mb-8">
                Revenue Overview (Last 6 Months)
              </h2>
              <div className="space-y-6">
                {MONTHLY_REVENUE.map((month, index) => {
                  const maxValue = Math.max(
                    ...MONTHLY_REVENUE.map((m) => m.revenue)
                  );
                  return (
                    <div key={month.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-charcoal w-12">
                          {month.month}
                        </span>
                        <div className="flex items-center space-x-6 text-charcoal/60">
                          <span>
                            Revenue: ${(month.revenue / 1000).toFixed(0)}k
                          </span>
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
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: `${(month.revenue / maxValue) * 100}%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: index * 0.1,
                            }}
                            className="h-full bg-charcoal/20 rounded-lg"
                          />
                        </div>
                        <div className="w-32 h-8 bg-sand rounded-lg overflow-hidden relative">
                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: `${
                                (month.commission / month.revenue) * 100
                              }%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: 0.5 + index * 0.1,
                            }}
                            className="h-full bg-warm-green rounded-lg"
                          />
                        </div>
                        <div className="w-24 h-8 bg-sand rounded-lg overflow-hidden relative">
                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: `${(month.tva / month.commission) * 100}%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: 1 + index * 0.1,
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
                                (month.netRevenue / month.revenue) * 100
                              }%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: 1.5 + index * 0.1,
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
                  <div className="w-4 h-4 bg-charcoal/20 rounded" />
                  <span className="text-sm text-charcoal/60">
                    Guest Payments
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-warm-green rounded" />
                  <span className="text-sm text-charcoal/60">
                    Commission (10%)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-terracotta rounded" />
                  <span className="text-sm text-charcoal/60">TVA (20%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gold rounded" />
                  <span className="text-sm text-charcoal/60">
                    Net Platform Revenue
                  </span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm">
                <p className="text-sm text-charcoal/60 mb-2">
                  Platform Commission Rate
                </p>
                <p className="font-serif text-5xl text-warm-green mb-2">10%</p>
                <p className="text-xs text-charcoal/60">
                  Applied to all reservations
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm">
                <p className="text-sm text-charcoal/60 mb-2">TVA Rate</p>
                <p className="font-serif text-5xl text-terracotta mb-2">20%</p>
                <p className="text-xs text-charcoal/60">
                  Applied to commission only
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm">
                <p className="text-sm text-charcoal/60 mb-2">
                  Average Booking Value
                </p>
                <p className="font-serif text-5xl text-charcoal mb-2">$892</p>
                <p className="text-xs text-warm-green flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% from last month
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
