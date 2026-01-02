import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Ban,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Flag,
  MapPin,
  MessageSquare,
  MoreVertical,
  RefreshCw,
  Search,
  Shield,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_RESERVATIONS } from "../lib/constants/pages/AdminReservationsPage";
export function AdminReservationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestName, setGuestName] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  // Modals
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  // Export filters
  const [exportFilters, setExportFilters] = useState({
    status: "all",
    startDate: "",
    endDate: "",
    guestName: "",
  });
  // Selected reservation
  const [selectedReservation, setSelectedReservation] = useState<
    (typeof MOCK_RESERVATIONS)[0] | null
  >(null);
  const stats = {
    active: 1892,
    disputes: 15,
    totalValue: 284000,
  };
  const handleExport = () => {
    console.log("Exporting with filters:", exportFilters);
    setShowExportModal(false);
  };
  const resetExportFilters = () => {
    setExportFilters({
      status: "all",
      startDate: "",
      endDate: "",
      guestName: "",
    });
  };
  const resetFilters = () => {
    setStatusFilter("all");
    setStartDate("");
    setEndDate("");
    setGuestName("");
  };
  const handleFlagReservation = () => {
    console.log("Flagging reservation:", selectedReservation?.id);
    setShowFlagModal(false);
    setSelectedReservation(null);
  };
  const handleCancelReservation = () => {
    console.log("Canceling reservation:", selectedReservation?.id);
    setShowCancelModal(false);
    setSelectedReservation(null);
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "requested":
        return (
          <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
            Requested
          </span>
        );
      case "confirmed":
        return (
          <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
            Confirmed
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
            Rejected
          </span>
        );
      case "cancelled-guest":
        return (
          <span className="px-3 py-1 bg-gold/80 text-white text-xs font-bold rounded-full">
            Cancelled by Guest
          </span>
        );
      case "cancelled-host":
        return (
          <span className="px-3 py-1 bg-terracotta/80 text-white text-xs font-bold rounded-full">
            Cancelled by Host
          </span>
        );
      case "checked-in":
        return (
          <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full animate-pulse">
            Checked In
          </span>
        );
      case "completed":
        return (
          <span className="px-3 py-1 bg-charcoal/60 text-white text-xs font-bold rounded-full">
            Completed
          </span>
        );
      case "disputed":
        return (
          <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full flex items-center space-x-1">
            <AlertCircle className="w-3 h-3" />
            <span>Disputed</span>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-2">
                Reservations Management
              </h1>
              <p className="text-xl text-charcoal/70 font-light">
                <span className="text-warm-green font-medium">
                  {stats.active.toLocaleString()} active reservations
                </span>{" "}
                |
                <span className="text-terracotta font-medium">
                  {" "}
                  {stats.disputes} disputes
                </span>{" "}
                |
                <span className="text-gold font-medium">
                  {" "}
                  ${(stats.totalValue / 1000).toFixed(0)}K total value
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                <span className="font-medium">Export Bookings</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filter Bar - UPDATED */}
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
          className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by booking ID or property name..."
                className="w-full pl-12 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-white border border-charcoal/20 rounded-lg hover:border-warm-green transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
              {(statusFilter !== "all" ||
                startDate ||
                endDate ||
                guestName) && (
                <span className="px-2 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
                  Active
                </span>
              )}
            </button>
          </div>

          {/* Filters */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-charcoal/10">
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="requested">Requested</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="checked-in">Checked In</option>
                      <option value="completed">Completed</option>
                      <option value="disputed">Disputed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Guest Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Filter by guest..."
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-charcoal/10">
                  <button
                    onClick={resetFilters}
                    className="flex items-center space-x-2 px-4 py-2 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors text-sm font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors text-sm font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Reservations Table - UPDATED STRUCTURE */}
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
          className="bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sand border-b border-charcoal/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Booking ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Property
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Guest
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Dates
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Nights
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Commission
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/5">
                {MOCK_RESERVATIONS.map((reservation, index) => (
                  <motion.tr
                    key={reservation.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.3 + index * 0.05,
                    }}
                    className={`hover:bg-sand/50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-cream"
                    } ${
                      reservation.daysUntil >= 0 &&
                      reservation.daysUntil < 1 &&
                      reservation.status === "confirmed"
                        ? "border-l-4 border-terracotta"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-charcoal font-medium">
                        {reservation.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={reservation.property.image}
                          alt={reservation.property.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <Link
                            to={`/property/${reservation.property.id}`}
                            className="font-bold text-charcoal hover:text-terracotta transition-colors"
                          >
                            {reservation.property.name}
                          </Link>
                          <p className="text-xs text-charcoal/60 flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {reservation.property.location}
                          </p>
                          {/* Host name below property */}
                          <p className="text-xs text-terracotta mt-1 font-medium">
                            Host: {reservation.host.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {reservation.guest.avatar ? (
                          <img
                            src={reservation.guest.avatar}
                            alt={reservation.guest.name}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-warm-green/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-warm-green">
                              {reservation.guest.initials}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="flex items-center space-x-1">
                            <Link
                              to={`/admin/users/${reservation.id}`}
                              className="text-sm font-medium text-charcoal hover:text-warm-green transition-colors"
                            >
                              {reservation.guest.name}
                            </Link>
                            {reservation.guest.verified && (
                              <Shield className="w-3 h-3 text-gold" />
                            )}
                          </div>
                          <p
                            className={`text-xs ${
                              reservation.guest.previousBookings
                                ? reservation.guest.previousBookings > 10
                                  ? "text-warm-green"
                                  : "text-charcoal/60"
                                : "text-charcoal/60"
                            }`}
                          >
                            {reservation.guest.previousBookings} bookings
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-charcoal font-medium">
                        {reservation.checkIn} → {reservation.checkOut}
                      </p>
                      {reservation.daysUntil >= 0 && (
                        <p
                          className={`text-xs mt-1 ${
                            reservation.daysUntil < 3
                              ? "text-gold font-medium"
                              : "text-charcoal/60"
                          }`}
                        >
                          {reservation.daysUntil === 0
                            ? "Today"
                            : `In ${reservation.daysUntil} days`}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-charcoal">
                        {reservation.nights} nights
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-charcoal">
                        ${reservation.total}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gold">
                        ${reservation.commission}
                      </p>
                      <p className="text-xs text-charcoal/60">
                        (
                        {(
                          (reservation.commission / reservation.total) *
                          100
                        ).toFixed(0)}
                        %)
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(reservation.status)}
                    </td>
                    <td className="px-6 py-4 relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === reservation.id
                              ? null
                              : reservation.id
                          )
                        }
                        className="p-2 hover:bg-sand rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-charcoal/60" />
                      </button>

                      <AnimatePresence>
                        {openMenuId === reservation.id && (
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
                              <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm">
                                <Users className="w-4 h-4 text-charcoal/60" />
                                <span>Contact Guest</span>
                              </button>
                              <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm">
                                <Users className="w-4 h-4 text-charcoal/60" />
                                <span>Contact Host</span>
                              </button>
                              <Link
                                to={`/admin/messages`}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm"
                              >
                                <MessageSquare className="w-4 h-4 text-charcoal/60" />
                                <span>Check Messages</span>
                              </Link>
                              <div className="border-t border-charcoal/10 my-2" />
                              <button
                                onClick={() => {
                                  setSelectedReservation(reservation);
                                  setShowFlagModal(true);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm"
                              >
                                <Flag className="w-4 h-4 text-charcoal/60" />
                                <span>Flag for Review</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedReservation(reservation);
                                  setShowCancelModal(true);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-terracotta"
                              >
                                <Ban className="w-4 h-4" />
                                <span>Cancel Reservation</span>
                              </button>
                              {reservation.status === "disputed" && (
                                <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-warm-green">
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Resolve Dispute</span>
                                </button>
                              )}
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
          <div className="bg-sand px-6 py-4 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-charcoal/70">
              Showing 1 to 5 of 1,892 reservations
            </p>
            <div className="flex items-center flex-wrap gap-2">
              <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium flex items-center space-x-1">
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              <button className="px-4 py-2 bg-warm-green text-white rounded-lg font-medium text-sm">
                1
              </button>
              <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                2
              </button>
              <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                3
              </button>
              <span className="px-2 text-charcoal/60">...</span>
              <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                379
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
                  Export Bookings
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
                      <option value="requested">Requested</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="checked-in">Checked In</option>
                      <option value="completed">Completed</option>
                      <option value="disputed">Disputed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Guest Name
                    </label>
                    <input
                      type="text"
                      value={exportFilters.guestName}
                      onChange={(e) =>
                        setExportFilters({
                          ...exportFilters,
                          guestName: e.target.value,
                        })
                      }
                      placeholder="Filter by guest..."
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={exportFilters.startDate}
                      onChange={(e) =>
                        setExportFilters({
                          ...exportFilters,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={exportFilters.endDate}
                      onChange={(e) =>
                        setExportFilters({
                          ...exportFilters,
                          endDate: e.target.value,
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

      {/* Flag for Review Modal */}
      <AnimatePresence>
        {showFlagModal && selectedReservation && (
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
                setShowFlagModal(false);
                setSelectedReservation(null);
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
              className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
                <h3 className="font-serif text-2xl text-charcoal">
                  Flag Reservation for Review
                </h3>
                <button
                  onClick={() => {
                    setShowFlagModal(false);
                    setSelectedReservation(null);
                  }}
                  className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                  <p className="text-sm text-charcoal/70">
                    <strong>Booking:</strong> {selectedReservation.id}
                  </p>
                  <p className="text-sm text-charcoal/70 mt-1">
                    <strong>Property:</strong>{" "}
                    {selectedReservation.property.name}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-sand rounded-lg p-4">
                    <h4 className="font-bold text-charcoal mb-2">
                      Property Details
                    </h4>
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={selectedReservation.property.image}
                        alt={selectedReservation.property.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-charcoal">
                          {selectedReservation.property.name}
                        </p>
                        <p className="text-xs text-charcoal/60">
                          {selectedReservation.property.location}
                        </p>
                        <Link
                          to={`/property/${selectedReservation.property.id}`}
                          className="text-xs text-terracotta hover:underline mt-1 inline-block"
                        >
                          View Property Page
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="bg-sand rounded-lg p-4">
                    <h4 className="font-bold text-charcoal mb-2">
                      Reservation Details
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-charcoal/60">Guest</p>
                        <p className="font-medium text-charcoal">
                          {selectedReservation.guest.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-charcoal/60">Host</p>
                        <p className="font-medium text-charcoal">
                          {selectedReservation.host.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-charcoal/60">Dates</p>
                        <p className="font-medium text-charcoal">
                          {selectedReservation.checkIn} →{" "}
                          {selectedReservation.checkOut}
                        </p>
                      </div>
                      <div>
                        <p className="text-charcoal/60">Total</p>
                        <p className="font-medium text-charcoal">
                          ${selectedReservation.total}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-terracotta/10 border border-terracotta/20 rounded-lg p-4">
                    <p className="text-sm text-charcoal/70">
                      <strong>Action:</strong> This reservation will be flagged
                      for admin review. The property and reservation details
                      will be logged for audit purposes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
                <button
                  onClick={() => {
                    setShowFlagModal(false);
                    setSelectedReservation(null);
                  }}
                  className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFlagReservation}
                  className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors font-medium"
                >
                  Flag for Review
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cancel Reservation Modal */}
      <AnimatePresence>
        {showCancelModal && selectedReservation && (
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
                setShowCancelModal(false);
                setSelectedReservation(null);
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
                Cancel reservation <strong>{selectedReservation.id}</strong> for{" "}
                <strong>{selectedReservation.property.name}</strong>?
              </p>
              <div className="bg-terracotta/10 border border-terracotta/20 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-charcoal/70">
                  <strong>Financial Impact:</strong> The host will not be
                  charged for this reservation (monthly billing model). This
                  cancellation will be logged in the audit trail.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setSelectedReservation(null);
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
