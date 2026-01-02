import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Ban,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Download,
  Eye,
  FileText,
  Filter,
  Home,
  Mail,
  MoreVertical,
  RefreshCw,
  Search,
  Shield,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_REPORTS } from "../lib/constants/pages/AdminReportsPage";
export function AdminReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  // Modals
  const [showExportModal, setShowExportModal] = useState(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);
  const [showFullReportModal, setShowFullReportModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [showCancelReservationModal, setShowCancelReservationModal] =
    useState(false);
  // Export filters
  const [exportFilters, setExportFilters] = useState({
    status: "all",
    type: "all",
    filedBy: "all",
    dateFrom: "",
    dateTo: "",
  });
  // Selected report for modals
  const [selectedReport, setSelectedReport] = useState<
    (typeof MOCK_REPORTS)[0] | null
  >(null);
  // Request info form
  const [requestInfoMessage, setRequestInfoMessage] = useState("");
  const stats = {
    openDisputes: 5,
    resolvedThisMonth: 42,
    avgResolutionTime: 3.2,
  };
  const handleExport = () => {
    console.log("Exporting with filters:", exportFilters);
    setShowExportModal(false);
  };
  const resetExportFilters = () => {
    setExportFilters({
      status: "all",
      type: "all",
      filedBy: "all",
      dateFrom: "",
      dateTo: "",
    });
  };
  const handleRequestInfo = () => {
    console.log("Requesting info:", requestInfoMessage);
    setShowRequestInfoModal(false);
    setRequestInfoMessage("");
    setSelectedReport(null);
  };
  const handleCancelReservation = () => {
    console.log("Canceling reservation for report:", selectedReport?.id);
    setShowCancelReservationModal(false);
    setSelectedReport(null);
  };
  const getTypeBadge = (type: string) => {
    const configs = {
      property: {
        icon: Home,
        bg: "bg-terracotta/20",
        text: "text-terracotta",
        label: "Property Issue",
      },
      "guest-behavior": {
        icon: Users,
        bg: "bg-gold/20",
        text: "text-gold",
        label: "Guest Behavior",
      },
      "host-behavior": {
        icon: Users,
        bg: "bg-terracotta/20",
        text: "text-terracotta",
        label: "Host Behavior",
      },
      payment: {
        icon: DollarSign,
        bg: "bg-gold/20",
        text: "text-gold",
        label: "Payment Dispute",
      },
      safety: {
        icon: Shield,
        bg: "bg-terracotta",
        text: "text-white",
        label: "Safety Concern",
      },
      fraud: {
        icon: AlertTriangle,
        bg: "bg-terracotta",
        text: "text-white",
        label: "Scam/Fraud",
      },
    };
    const config = configs[type as keyof typeof configs] || configs.property;
    const Icon = config.icon;
    return (
      <span
        className={`px-3 py-1 ${config.bg} ${config.text} text-xs font-bold rounded-full flex items-center space-x-1 whitespace-nowrap`}
      >
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </span>
    );
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
            New
          </span>
        );
      case "under-review":
        return (
          <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
            Under Review
          </span>
        );
      case "awaiting-info":
        return (
          <span className="px-3 py-1 bg-gold/70 text-white text-xs font-bold rounded-full">
            Awaiting Response
          </span>
        );
      case "resolved":
        return (
          <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
            Resolved
          </span>
        );
      case "closed":
        return (
          <span className="px-3 py-1 bg-charcoal/60 text-white text-xs font-bold rounded-full">
            Closed
          </span>
        );
      default:
        return null;
    }
  };
  const getUserTypeBadge = (userType: string) => {
    if (userType === "guest") {
      return (
        <span className="px-2 py-0.5 bg-warm-green/20 text-warm-green text-xs font-bold rounded-full">
          Guest
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 bg-terracotta/20 text-terracotta text-xs font-bold rounded-full">
        Host
      </span>
    );
  };
  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="px-2 py-0.5 bg-charcoal/60 text-white text-xs font-bold rounded-full">
            Completed
          </span>
        );
      case "in-progress":
        return (
          <span className="px-2 py-0.5 bg-warm-green text-white text-xs font-bold rounded-full">
            In Progress
          </span>
        );
      case "upcoming":
        return (
          <span className="px-2 py-0.5 bg-gold text-white text-xs font-bold rounded-full">
            Upcoming
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
            Reports & Dispute Resolution
          </h1>

          {/* Stats Cards - REMOVED COMPENSATION STAT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                    Open Disputes
                  </p>
                  <h3 className="font-serif text-5xl font-bold text-terracotta">
                    {stats.openDisputes}
                  </h3>
                </div>
                <AlertTriangle className="w-8 h-8 text-terracotta" />
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
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                    Resolved This Month
                  </p>
                  <h3 className="font-serif text-5xl font-bold text-warm-green">
                    {stats.resolvedThisMonth}
                  </h3>
                </div>
                <CheckCircle className="w-8 h-8 text-warm-green" />
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
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                    Avg Resolution Time
                  </p>
                  <h3 className="font-serif text-5xl font-bold text-gold">
                    {stats.avgResolutionTime}
                  </h3>
                  <p className="text-sm text-charcoal/60 mt-1">days</p>
                </div>
                <Clock className="w-8 h-8 text-gold" />
              </div>
            </motion.div>
          </div>

          {/* Action Buttons - UPDATED */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              <span className="font-medium">Export Report Data</span>
            </button>
            <button
              onClick={() => setShowGuidelinesModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-all shadow-sm hover:-translate-y-0.5"
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">Dispute Resolution Guidelines</span>
            </button>
          </div>
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
            delay: 0.5,
          }}
          className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm mb-8 sticky top-20 z-20"
        >
          <div className="flex items-center space-x-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports by ID, user, or property..."
                className="w-full pl-12 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-white border border-charcoal/20 rounded-lg hover:border-terracotta transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          {/* Quick Filters - REMOVED PRIORITY */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="under-review">Under Review</option>
                <option value="awaiting-info">Awaiting Info</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Filed By
              </label>
              <select className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm">
                <option>All Users</option>
                <option>Guests</option>
                <option>Hosts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Date From
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Date To
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm"
              />
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-charcoal/10">
                  <p className="text-sm font-medium text-charcoal/70 mb-3">
                    Report Types
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      {
                        value: "property",
                        label: "Property Issues",
                        icon: Home,
                      },
                      {
                        value: "guest-behavior",
                        label: "Guest Behavior",
                        icon: Users,
                      },
                      {
                        value: "host-behavior",
                        label: "Host Behavior",
                        icon: Users,
                      },
                      {
                        value: "payment",
                        label: "Payment Disputes",
                        icon: DollarSign,
                      },
                      {
                        value: "safety",
                        label: "Safety Concerns",
                        icon: Shield,
                      },
                      {
                        value: "fraud",
                        label: "Scam/Fraud",
                        icon: AlertTriangle,
                      },
                    ].map(({ value, label, icon: Icon }) => (
                      <label
                        key={value}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-terracotta"
                        />
                        <Icon className="w-4 h-4 text-terracotta" />
                        <span className="text-sm text-charcoal">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Reports Table - UPDATED STRUCTURE */}
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
          className="bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sand border-b border-charcoal/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Report ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Filed By
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Against
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Booking
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Filed Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/5">
                {MOCK_REPORTS.map((report, index) => (
                  <motion.tr
                    key={report.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.7 + index * 0.05,
                    }}
                    className={`hover:bg-sand/50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-cream"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-charcoal font-medium">
                        {report.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">{getTypeBadge(report.type)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {report.filedBy.avatar ? (
                          <img
                            src={report.filedBy.avatar}
                            alt={report.filedBy.name}
                            className="w-10 h-10 rounded-full border-2 border-sand"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-warm-green/10 flex items-center justify-center border-2 border-sand">
                            <span className="text-sm font-bold text-warm-green">
                              {report.filedBy.initials}
                            </span>
                          </div>
                        )}
                        <div>
                          <Link
                            to={`/admin/users/${report.id}`}
                            className="text-sm font-medium text-charcoal hover:text-warm-green transition-colors"
                          >
                            {report.filedBy.name}
                          </Link>
                          <div className="mt-1">
                            {getUserTypeBadge(report.filedBy.userType)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {report.against.avatar ? (
                          <img
                            src={report.against.avatar}
                            alt={report.against.name}
                            className="w-10 h-10 rounded-full border-2 border-sand"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center border-2 border-sand">
                            <span className="text-sm font-bold text-terracotta">
                              {report.against.initials}
                            </span>
                          </div>
                        )}
                        <div>
                          <Link
                            to={`/admin/users/${report.id}`}
                            className="text-sm font-medium text-charcoal hover:text-warm-green transition-colors"
                          >
                            {report.against.name}
                          </Link>
                          <div className="mt-1">
                            {getUserTypeBadge(report.against.userType)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <Link
                          to={`/admin/reservations/${report.booking.id}`}
                          className="text-sm font-mono text-warm-green hover:underline"
                        >
                          {report.booking.id}
                        </Link>
                        <p className="text-xs text-charcoal/60 mt-1">
                          {report.booking.dates}
                        </p>
                        <div className="mt-1">
                          {getBookingStatusBadge(report.booking.status)}
                        </div>
                        {/* Property link below booking */}
                        <Link
                          to={`/property/${report.property.id}`}
                          className="text-xs text-terracotta hover:underline mt-2 flex items-center"
                        >
                          <Home className="w-3 h-3 mr-1" />
                          {report.property.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-charcoal/70">
                        {report.filedDate}
                      </p>
                    </td>
                    <td className="px-6 py-4 relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === report.id ? null : report.id
                          )
                        }
                        className="p-2 hover:bg-sand rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-charcoal/60" />
                      </button>

                      <AnimatePresence>
                        {openMenuId === report.id && (
                          <>
                            <div
                              className="fixed inset-0 z-30"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <motion.div
                              initial={{
                                opacity: 0,
                                y: 10,
                                scale: 0.95,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                              }}
                              exit={{
                                opacity: 0,
                                y: 10,
                                scale: 0.95,
                              }}
                              transition={{
                                duration: 0.15,
                              }}
                              className="absolute right-0 top-full mt-2 w-64 bg-cream rounded-xl shadow-2xl border border-charcoal/10 py-2 z-40"
                            >
                              <button
                                onClick={() => {
                                  setSelectedReport(report);
                                  setShowFullReportModal(true);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm"
                              >
                                <Eye className="w-4 h-4 text-charcoal/60" />
                                <span>View Full Report</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedReport(report);
                                  setShowRequestInfoModal(true);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm"
                              >
                                <Mail className="w-4 h-4 text-charcoal/60" />
                                <span>Request More Information</span>
                              </button>
                              <div className="border-t border-charcoal/10 my-2" />
                              <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-warm-green">
                                <CheckCircle className="w-4 h-4" />
                                <span>Resolve Dispute</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedReport(report);
                                  setShowCancelReservationModal(true);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-terracotta"
                              >
                                <Ban className="w-4 h-4" />
                                <span>Cancel Reservation</span>
                              </button>
                              <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm">
                                <XCircle className="w-4 h-4 text-charcoal/60" />
                                <span>Close Report</span>
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-sand px-6 py-4 border-t border-charcoal/10 flex items-center justify-between">
            <p className="text-sm text-charcoal/70">
              Showing 1 to 4 of 5 open disputes
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium flex items-center space-x-1">
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              <button className="px-4 py-2 bg-terracotta text-white rounded-lg font-medium text-sm">
                1
              </button>
              <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium flex items-center space-x-1">
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
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
              onClick={() => setShowExportModal(false)}
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
                  Export Report Data
                </h3>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-charcoal/70">
                    <strong>Note:</strong> Apply filters first, then export.
                    Only filtered results will be included in the CSV export.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Status
                    </label>
                    <select
                      value={exportFilters.status}
                      onChange={(e) =>
                        setExportFilters({
                          ...exportFilters,
                          status: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="under-review">Under Review</option>
                      <option value="awaiting-info">Awaiting Info</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Report Type
                    </label>
                    <select
                      value={exportFilters.type}
                      onChange={(e) =>
                        setExportFilters({
                          ...exportFilters,
                          type: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                    >
                      <option value="all">All Types</option>
                      <option value="property">Property Issues</option>
                      <option value="payment">Payment Disputes</option>
                      <option value="guest-behavior">Guest Behavior</option>
                      <option value="host-behavior">Host Behavior</option>
                      <option value="safety">Safety Concerns</option>
                      <option value="fraud">Scam/Fraud</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Filed By
                    </label>
                    <select
                      value={exportFilters.filedBy}
                      onChange={(e) =>
                        setExportFilters({
                          ...exportFilters,
                          filedBy: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                    >
                      <option value="all">All Users</option>
                      <option value="guests">Guests</option>
                      <option value="hosts">Hosts</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Date From
                    </label>
                    <input
                      type="date"
                      value={exportFilters.dateFrom}
                      onChange={(e) =>
                        setExportFilters({
                          ...exportFilters,
                          dateFrom: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Date To
                    </label>
                    <input
                      type="date"
                      value={exportFilters.dateTo}
                      onChange={(e) =>
                        setExportFilters({
                          ...exportFilters,
                          dateTo: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
                <button
                  onClick={resetExportFilters}
                  className="flex items-center space-x-2 px-4 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset Filters</span>
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium"
                >
                  Export to CSV
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Guidelines Modal */}
      <AnimatePresence>
        {showGuidelinesModal && (
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
              onClick={() => setShowGuidelinesModal(false)}
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
              className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-charcoal/10 sticky top-0 bg-white z-10">
                <h3 className="font-serif text-2xl text-charcoal">
                  Dispute Resolution Guidelines
                </h3>
                <button
                  onClick={() => setShowGuidelinesModal(false)}
                  className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                  <p className="text-sm text-charcoal/70">
                    <strong>Purpose:</strong> These guidelines help admins
                    resolve disputes fairly and consistently. Follow these
                    principles when reviewing reports.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-charcoal mb-2 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-warm-green" />
                      1. Gather All Information
                    </h4>
                    <p className="text-sm text-charcoal/70 ml-7">
                      Review the full report, evidence, and context before
                      making decisions. Use "Request More Information" if
                      details are unclear.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-charcoal mb-2 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-warm-green" />
                      2. Listen to Both Parties
                    </h4>
                    <p className="text-sm text-charcoal/70 ml-7">
                      Contact both the reporter and reported user to understand
                      their perspectives. Fair resolution requires hearing all
                      sides.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-charcoal mb-2 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-warm-green" />
                      3. Review Platform Policies
                    </h4>
                    <p className="text-sm text-charcoal/70 ml-7">
                      Ensure decisions align with Terms of Service, Community
                      Guidelines, and Cancellation Policies.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-charcoal mb-2 flex items-center">
                      <Ban className="w-5 h-5 mr-2 text-terracotta" />
                      4. Financial Resolution
                    </h4>
                    <p className="text-sm text-charcoal/70 ml-7">
                      Use "Cancel Reservation" as the primary financial
                      resolution. When canceled, the host is not charged
                      (monthly billing model). No direct refunds or compensation
                      are issued.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-charcoal mb-2 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-gold" />
                      5. Timely Resolution
                    </h4>
                    <p className="text-sm text-charcoal/70 ml-7">
                      Aim to resolve disputes within 3 business days.
                      Communicate status updates to involved parties.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-charcoal mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-warm-green" />
                      6. Document Everything
                    </h4>
                    <p className="text-sm text-charcoal/70 ml-7">
                      All actions are logged automatically. Add notes explaining
                      your reasoning for audit purposes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end p-6 border-t border-charcoal/10 bg-sand/30">
                <button
                  onClick={() => setShowGuidelinesModal(false)}
                  className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Full Report Modal */}
      <AnimatePresence>
        {showFullReportModal && selectedReport && (
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
              onClick={() => {
                setShowFullReportModal(false);
                setSelectedReport(null);
              }}
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
              className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-charcoal/10 sticky top-0 bg-white z-10">
                <h3 className="font-serif text-2xl text-charcoal">
                  Full Report Details
                </h3>
                <button
                  onClick={() => {
                    setShowFullReportModal(false);
                    setSelectedReport(null);
                  }}
                  className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-charcoal/60 mb-1">Report ID</p>
                    <p className="font-mono text-sm font-bold text-charcoal">
                      {selectedReport.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal/60 mb-1">Filed Date</p>
                    <p className="text-sm text-charcoal">
                      {selectedReport.filedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal/60 mb-1">Type</p>
                    {getTypeBadge(selectedReport.type)}
                  </div>
                  <div>
                    <p className="text-xs text-charcoal/60 mb-1">Status</p>
                    {getStatusBadge(selectedReport.status)}
                  </div>
                </div>

                <div className="border-t border-charcoal/10 pt-4">
                  <h4 className="font-bold text-charcoal mb-3">
                    Involved Parties
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-sand rounded-lg p-4">
                      <p className="text-xs text-charcoal/60 mb-2">Reporter</p>
                      <div className="flex items-center space-x-3">
                        {selectedReport.filedBy.avatar ? (
                          <img
                            src={selectedReport.filedBy.avatar}
                            alt={selectedReport.filedBy.name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-warm-green/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-warm-green">
                              {selectedReport.filedBy.initials}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-charcoal">
                            {selectedReport.filedBy.name}
                          </p>
                          {getUserTypeBadge(selectedReport.filedBy.userType)}
                        </div>
                      </div>
                    </div>
                    <div className="bg-sand rounded-lg p-4">
                      <p className="text-xs text-charcoal/60 mb-2">
                        Reported User
                      </p>
                      <div className="flex items-center space-x-3">
                        {selectedReport.against.avatar ? (
                          <img
                            src={selectedReport.against.avatar}
                            alt={selectedReport.against.name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-terracotta">
                              {selectedReport.against.initials}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-charcoal">
                            {selectedReport.against.name}
                          </p>
                          {getUserTypeBadge(selectedReport.against.userType)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-charcoal/10 pt-4">
                  <h4 className="font-bold text-charcoal mb-3">
                    Booking & Property
                  </h4>
                  <div className="bg-sand rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-xs text-charcoal/60 mb-1">
                        Booking ID
                      </p>
                      <p className="font-mono text-sm text-warm-green">
                        {selectedReport.booking.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/60 mb-1">Dates</p>
                      <p className="text-sm text-charcoal">
                        {selectedReport.booking.dates}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/60 mb-1">Property</p>
                      <Link
                        to={`/property/${selectedReport.property.id}`}
                        className="text-sm text-terracotta hover:underline font-medium"
                      >
                        {selectedReport.property.name}
                      </Link>
                      <p className="text-xs text-charcoal/60 mt-1">
                        {selectedReport.property.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-charcoal/10 pt-4">
                  <h4 className="font-bold text-charcoal mb-3">Description</h4>
                  <p className="text-sm text-charcoal/70 bg-sand rounded-lg p-4">
                    {selectedReport.description}
                  </p>
                </div>

                <div className="border-t border-charcoal/10 pt-4">
                  <h4 className="font-bold text-charcoal mb-3">Evidence</h4>
                  <p className="text-sm text-charcoal/70 bg-sand rounded-lg p-4">
                    {selectedReport.evidence}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end p-6 border-t border-charcoal/10 bg-sand/30">
                <button
                  onClick={() => {
                    setShowFullReportModal(false);
                    setSelectedReport(null);
                  }}
                  className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Request More Information Modal */}
      <AnimatePresence>
        {showRequestInfoModal && selectedReport && (
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
              onClick={() => {
                setShowRequestInfoModal(false);
                setSelectedReport(null);
                setRequestInfoMessage("");
              }}
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
                  Request More Information
                </h3>
                <button
                  onClick={() => {
                    setShowRequestInfoModal(false);
                    setSelectedReport(null);
                    setRequestInfoMessage("");
                  }}
                  className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                  <p className="text-sm text-charcoal/70">
                    <strong>Report:</strong> {selectedReport.id} -{" "}
                    {selectedReport.description}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Message to User(s)
                  </label>
                  <textarea
                    value={requestInfoMessage}
                    onChange={(e) => setRequestInfoMessage(e.target.value)}
                    placeholder="Write your request for additional information here..."
                    rows={6}
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                  />
                </div>

                <div className="bg-sand rounded-lg p-4">
                  <p className="text-xs text-charcoal/60">
                    This message will be sent to the involved user(s). They will
                    be notified to provide additional details.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
                <button
                  onClick={() => {
                    setShowRequestInfoModal(false);
                    setSelectedReport(null);
                    setRequestInfoMessage("");
                  }}
                  className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestInfo}
                  disabled={!requestInfoMessage.trim()}
                  className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cancel Reservation Modal */}
      <AnimatePresence>
        {showCancelReservationModal && selectedReport && (
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
              onClick={() => {
                setShowCancelReservationModal(false);
                setSelectedReport(null);
              }}
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
              className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10 text-center p-8"
            >
              <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-6">
                <Ban className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">
                Cancel Reservation?
              </h3>
              <p className="text-charcoal/60 mb-6">
                Cancel reservation <strong>{selectedReport.booking.id}</strong>{" "}
                for dispute <strong>{selectedReport.id}</strong>?
              </p>
              <div className="bg-terracotta/10 border border-terracotta/20 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-charcoal/70">
                  <strong>Financial Impact:</strong> The host will not be
                  charged for this reservation (monthly billing model). This is
                  the primary financial resolution action.
                </p>
              </div>
              <p className="text-xs text-charcoal/60 mb-6">
                This action will be logged in the audit trail.
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setShowCancelReservationModal(false);
                    setSelectedReport(null);
                  }}
                  className="flex-1 px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCancelReservation}
                  className="flex-1 px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors font-medium"
                >
                  Confirm Cancellation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
