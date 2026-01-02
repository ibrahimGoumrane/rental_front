import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Filter,
  Image,
  Key,
  Mail,
  MessageSquare,
  MoreVertical,
  RefreshCw,
  Search,
  UserCheck,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_USERS } from "../lib/constants/pages/AdminUsersPage";
export function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState<string>("all");
  const [verificationFilter, setVerificationFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "recent" | "registered" | "bookings" | "listings"
  >("recent");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  // Modals
  const [showExportModal, setShowExportModal] = useState(false);
  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);
  const [showReviewDocsModal, setShowReviewDocsModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  // Export filters
  const [exportFilters, setExportFilters] = useState({
    userType: "all",
    status: "all",
    verification: "all",
  });
  // Bulk email state
  const [bulkEmailFilters, setBulkEmailFilters] = useState({
    userType: "all",
    status: "all",
  });
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  // Selected user for actions
  const [selectedUser, setSelectedUser] = useState<
    (typeof MOCK_USERS)[0] | null
  >(null);
  // Suspend account state
  const [suspendDuration, setSuspendDuration] = useState("7");
  // Reset password state
  const [newPassword, setNewPassword] = useState("");
  const [emailPassword, setEmailPassword] = useState(false);
  const handleExport = () => {
    console.log("Exporting with filters:", exportFilters);
    setShowExportModal(false);
  };
  const resetExportFilters = () => {
    setExportFilters({
      userType: "all",
      status: "all",
      verification: "all",
    });
  };
  const handleBulkEmail = () => {
    console.log("Sending bulk email:", {
      bulkEmailFilters,
      emailSubject,
      emailContent,
    });
    setShowBulkEmailModal(false);
    setEmailSubject("");
    setEmailContent("");
  };
  const resetBulkEmailFilters = () => {
    setBulkEmailFilters({
      userType: "all",
      status: "all",
    });
  };
  const handleVerifyDocument = () => {
    console.log("Verifying document for user:", selectedUser?.id);
    setShowReviewDocsModal(false);
    setSelectedUser(null);
  };
  const handleRejectDocument = () => {
    console.log("Rejecting document for user:", selectedUser?.id);
    setShowReviewDocsModal(false);
    setSelectedUser(null);
  };
  const handleSuspendAccount = () => {
    console.log(
      "Suspending account:",
      selectedUser?.id,
      "for",
      suspendDuration,
      "days"
    );
    setShowSuspendModal(false);
    setSelectedUser(null);
    setSuspendDuration("7");
  };
  const handleResetPassword = () => {
    console.log("Resetting password for:", selectedUser?.id, {
      newPassword,
      emailPassword,
    });
    setShowResetPasswordModal(false);
    setSelectedUser(null);
    setNewPassword("");
    setEmailPassword(false);
  };
  const generateStrongPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
  };
  const handleActivateAccount = () => {
    console.log("Activating account:", selectedUser?.id);
    setShowActivateModal(false);
    setSelectedUser(null);
  };
  const getVerificationColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-warm-green";
      case "pending":
        return "text-gold";
      case "rejected":
        return "text-terracotta";
      default:
        return "text-charcoal/40";
    }
  };
  const getVerificationBg = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-warm-green/10";
      case "pending":
        return "bg-gold/10";
      case "rejected":
        return "bg-terracotta/10";
      default:
        return "bg-charcoal/5";
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
            Active
          </span>
        );
      case "suspended":
        return (
          <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
            Suspended
          </span>
        );
      default:
        return null;
    }
  };
  const getTypeBadge = (type: string) => {
    if (type === "guest") {
      return (
        <span className="px-3 py-1 bg-warm-green/20 text-warm-green text-xs font-bold rounded-full">
          Guest
        </span>
      );
    } else if (type === "host") {
      return (
        <span className="px-3 py-1 bg-terracotta/20 text-terracotta text-xs font-bold rounded-full">
          Host
        </span>
      );
    } else if (type === "both") {
      return (
        <span className="px-3 py-1 bg-gradient-to-r from-warm-green/20 to-terracotta/20 text-charcoal text-xs font-bold rounded-full">
          Guest + Host
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 bg-charcoal/20 text-charcoal text-xs font-bold rounded-full">
          Admin
        </span>
      );
    }
  };
  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };
  const selectAllUsers = () => {
    if (selectedUsers.length === MOCK_USERS.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(MOCK_USERS.map((u) => u.id));
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
                Users Management
              </h1>
              <p className="text-xl text-charcoal/70 font-light">
                12,847 registered users
              </p>
            </div>
            <div className="flex items-center flex-wrap gap-3">
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                <span className="font-medium">Export Users</span>
              </button>
              <button
                onClick={() => setShowBulkEmailModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-all shadow-sm hover:-translate-y-0.5"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">Send Bulk Email</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, phone, or ID number..."
                className="w-full pl-12 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white"
              />
            </div>

            {/* User Type - UPDATED */}
            <select
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value)}
              className="px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white"
            >
              <option value="all">All Users</option>
              <option value="guest">Guests</option>
              <option value="host">Hosts</option>
              <option value="admin">Admins</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white"
            >
              <option value="recent">Recent Activity</option>
              <option value="registered">Registration Date</option>
              <option value="bookings">Total Bookings</option>
              <option value="listings">Total Listings</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-charcoal/20 rounded-lg hover:border-warm-green transition-colors text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
              {(verificationFilter.length > 0 || statusFilter.length > 0) && (
                <span className="px-2 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
                  Active
                </span>
              )}
            </button>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-charcoal/10">
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Verification Status
                    </label>
                    <div className="space-y-2">
                      {["verified", "pending", "rejected"].map((status) => (
                        <label
                          key={status}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={verificationFilter.includes(status)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setVerificationFilter([
                                  ...verificationFilter,
                                  status,
                                ]);
                              } else {
                                setVerificationFilter(
                                  verificationFilter.filter((s) => s !== status)
                                );
                              }
                            }}
                            className="w-4 h-4 accent-warm-green"
                          />
                          <span className="text-sm text-charcoal capitalize">
                            {status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Account Status
                    </label>
                    <div className="space-y-2">
                      {["active", "suspended"].map((status) => (
                        <label
                          key={status}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={statusFilter.includes(status)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setStatusFilter([...statusFilter, status]);
                              } else {
                                setStatusFilter(
                                  statusFilter.filter((s) => s !== status)
                                );
                              }
                            }}
                            className="w-4 h-4 accent-warm-green"
                          />
                          <span className="text-sm text-charcoal capitalize">
                            {status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Registration Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bulk Actions Bar */}
        <AnimatePresence>
          {selectedUsers.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              className="bg-sand rounded-2xl p-4 border border-charcoal/5 shadow-lg mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-4">
                <span className="font-medium text-charcoal">
                  {selectedUsers.length} user
                  {selectedUsers.length !== 1 ? "s" : ""} selected
                </span>
                <button
                  onClick={() => setSelectedUsers([])}
                  className="text-sm text-charcoal/60 hover:text-charcoal"
                >
                  Clear selection
                </button>
              </div>
              <div className="flex items-center flex-wrap gap-3">
                <button className="px-4 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors text-sm font-medium">
                  Activate Selected
                </button>
                <button className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors text-sm font-medium">
                  Suspend Selected
                </button>
                <button className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors text-sm font-medium">
                  Send Email
                </button>
                <button className="px-4 py-2 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors text-sm font-medium">
                  Export Selected
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Users Table - UPDATED */}
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
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === MOCK_USERS.length}
                      onChange={selectAllUsers}
                      className="w-4 h-4 accent-warm-green"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Profile
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Name & Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Verification
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Bookings/Listings
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Registered
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/5">
                {MOCK_USERS.map((user, index) => (
                  <motion.tr
                    key={user.id}
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
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="w-4 h-4 accent-warm-green"
                      />
                    </td>
                    <td className="px-6 py-4">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-sand"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center border-2 border-sand">
                          <span className="text-sm font-bold text-warm-green">
                            {user.initials}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/users/${user.id}`}
                        className="font-medium text-charcoal hover:text-warm-green hover:underline transition-colors"
                      >
                        {user.name}
                      </Link>
                      <p className="text-sm text-charcoal/60">{user.email}</p>
                      <p className="text-sm text-charcoal/60">{user.phone}</p>
                    </td>
                    <td className="px-6 py-4">{getTypeBadge(user.type)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${getVerificationBg(
                            user.verification.status
                          )}`}
                        >
                          {user.verification.status === "verified" && (
                            <CheckCircle
                              className={`w-5 h-5 ${getVerificationColor(
                                user.verification.status
                              )}`}
                            />
                          )}
                          {user.verification.status === "pending" && (
                            <Clock
                              className={`w-5 h-5 ${getVerificationColor(
                                user.verification.status
                              )}`}
                            />
                          )}
                          {user.verification.status === "rejected" && (
                            <XCircle
                              className={`w-5 h-5 ${getVerificationColor(
                                user.verification.status
                              )}`}
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal capitalize">
                            {user.verification.status}
                          </p>
                          <p className="text-xs text-charcoal/60">
                            {user.verification.document}{" "}
                            {user.verification.status === "verified"
                              ? "Verified"
                              : ""}
                          </p>
                          {user.verification.date && (
                            <p className="text-xs text-charcoal/50">
                              {user.verification.date}
                            </p>
                          )}
                          {user.verification.status === "pending" && (
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowReviewDocsModal(true);
                              }}
                              className="mt-1 px-2 py-1 bg-gold text-white text-xs font-bold rounded hover:bg-gold/90 transition-colors"
                            >
                              Review Documents
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.type === "guest" || user.type === "both" ? (
                        <p className="text-sm text-charcoal">
                          <span className="font-medium text-warm-green">
                            {user.bookings}
                          </span>{" "}
                          bookings
                        </p>
                      ) : null}
                      {user.type === "host" || user.type === "both" ? (
                        <div className="text-sm">
                          <p className="text-terracotta font-medium">
                            {user.properties} properties
                          </p>
                          {user.totalBookings && (
                            <p className="text-charcoal/60">
                              {user.totalBookings} total bookings
                            </p>
                          )}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(user.status)}
                      {user.status === "suspended" && user.suspendedUntil && (
                        <p className="text-xs text-charcoal/60 mt-1">
                          Until {user.suspendedUntil}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-charcoal">{user.registered}</p>
                      <p className="text-xs text-charcoal/60">
                        Active: {user.lastActive}
                      </p>
                    </td>
                    <td className="px-6 py-4 relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === user.id ? null : user.id)
                        }
                        className="p-2 hover:bg-sand rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-charcoal/60" />
                      </button>

                      <AnimatePresence>
                        {openMenuId === user.id && (
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
                                <MessageSquare className="w-4 h-4 text-charcoal/60" />
                                <span>Send Message</span>
                              </button>
                              <div className="border-t border-charcoal/10 my-2" />
                              {user.status === "suspended" ? (
                                <button
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setShowActivateModal(true);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-warm-green"
                                >
                                  <UserCheck className="w-4 h-4" />
                                  <span>Activate Account</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setShowSuspendModal(true);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm"
                                >
                                  <Clock className="w-4 h-4 text-charcoal/60" />
                                  <span>Suspend Account</span>
                                </button>
                              )}
                              <div className="border-t border-charcoal/10 my-2" />
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowResetPasswordModal(true);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm"
                              >
                                <Key className="w-4 h-4 text-charcoal/60" />
                                <span>Reset Password</span>
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
          <div className="bg-sand px-6 py-4 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-charcoal/70">
              Showing 1 to 5 of 12,847 users
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
                257
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
                  Export Users
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
                    Only filtered users will be included in the CSV export.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      User Type
                    </label>
                    <select
                      value={exportFilters.userType}
                      onChange={(e) =>
                        setExportFilters({
                          ...exportFilters,
                          userType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                    >
                      <option value="all">All Users</option>
                      <option value="guest">Guests</option>
                      <option value="host">Hosts</option>
                      <option value="admin">Admins</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Account Status
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
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Verification Status
                    </label>
                    <select
                      value={exportFilters.verification}
                      onChange={(e) =>
                        setExportFilters({
                          ...exportFilters,
                          verification: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                    >
                      <option value="all">All Verification</option>
                      <option value="verified">Verified</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
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

      {/* Bulk Email Modal */}
      <AnimatePresence>
        {showBulkEmailModal && (
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
              onClick={() => setShowBulkEmailModal(false)}
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
              className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-charcoal/10 sticky top-0 bg-white z-10">
                <h3 className="font-serif text-2xl text-charcoal">
                  Send Bulk Email
                </h3>
                <button
                  onClick={() => setShowBulkEmailModal(false)}
                  className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-terracotta/10 border border-terracotta/20 rounded-lg p-4">
                  <p className="text-sm text-charcoal/70">
                    <strong>Step 1:</strong> Apply filters to select recipients,
                    then write your email content. Only filtered users will
                    receive the email.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-charcoal">Filter Recipients</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        User Type
                      </label>
                      <select
                        value={bulkEmailFilters.userType}
                        onChange={(e) =>
                          setBulkEmailFilters({
                            ...bulkEmailFilters,
                            userType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                      >
                        <option value="all">All Users</option>
                        <option value="guest">Guests Only</option>
                        <option value="host">Hosts Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Account Status
                      </label>
                      <select
                        value={bulkEmailFilters.status}
                        onChange={(e) =>
                          setBulkEmailFilters({
                            ...bulkEmailFilters,
                            status: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active Only</option>
                        <option value="suspended">Suspended Only</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-charcoal/10 pt-6 space-y-4">
                  <h4 className="font-bold text-charcoal">Email Content</h4>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Email subject..."
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Message
                    </label>
                    <textarea
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      placeholder="Write your email message here..."
                      rows={8}
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
                <button
                  onClick={resetBulkEmailFilters}
                  className="flex items-center space-x-2 px-4 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={() => setShowBulkEmailModal(false)}
                  className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkEmail}
                  disabled={!emailSubject.trim() || !emailContent.trim()}
                  className="px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Email
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Review Documents Modal */}
      <AnimatePresence>
        {showReviewDocsModal && selectedUser && (
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
                setShowReviewDocsModal(false);
                setSelectedUser(null);
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
              className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-charcoal/10 sticky top-0 bg-white z-10">
                <h3 className="font-serif text-2xl text-charcoal">
                  Review Verification Documents
                </h3>
                <button
                  onClick={() => {
                    setShowReviewDocsModal(false);
                    setSelectedUser(null);
                  }}
                  className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                  <p className="text-sm text-charcoal/70">
                    <strong>User:</strong> {selectedUser.name} (
                    {selectedUser.email})
                  </p>
                  <p className="text-sm text-charcoal/70 mt-1">
                    <strong>Document Type:</strong>{" "}
                    {selectedUser.verification.document}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-charcoal">Document Preview</h4>
                  <div className="bg-sand rounded-lg p-8 flex items-center justify-center min-h-[400px]">
                    {selectedUser.verification.documentUrl?.endsWith(".pdf") ? (
                      <div className="text-center">
                        <FileText className="w-20 h-20 text-charcoal/40 mx-auto mb-4" />
                        <p className="text-charcoal/60 mb-4">PDF Document</p>
                        <a
                          href={selectedUser.verification.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors text-sm font-medium inline-block"
                        >
                          Open PDF in New Tab
                        </a>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Image className="w-20 h-20 text-charcoal/40 mx-auto mb-4" />
                        <p className="text-charcoal/60 mb-4">
                          Image Preview (ID Card / Passport)
                        </p>
                        <div className="bg-white rounded-lg p-4 border-2 border-charcoal/10">
                          <div className="w-full h-64 bg-charcoal/5 rounded flex items-center justify-center">
                            <p className="text-charcoal/40">
                              Document image would display here
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-sand rounded-lg p-4">
                  <h4 className="font-bold text-charcoal mb-2">
                    Verification Checklist
                  </h4>
                  <div className="space-y-2 text-sm text-charcoal/70">
                    <p>✓ Document is clear and readable</p>
                    <p>✓ Photo matches user profile</p>
                    <p>✓ Document is not expired</p>
                    <p>✓ All required information is visible</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
                <button
                  onClick={() => {
                    setShowReviewDocsModal(false);
                    setSelectedUser(null);
                  }}
                  className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectDocument}
                  className="px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors font-medium"
                >
                  Reject Document
                </button>
                <button
                  onClick={handleVerifyDocument}
                  className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium"
                >
                  Verify Identity
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Suspend Account Modal */}
      <AnimatePresence>
        {showSuspendModal && selectedUser && (
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
                setShowSuspendModal(false);
                setSelectedUser(null);
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
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">
                Suspend Account
              </h3>
              <p className="text-charcoal/60 mb-6">
                Suspend <strong>{selectedUser.name}</strong>'s account
                temporarily?
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal mb-2 text-left">
                  Suspension Duration
                </label>
                <select
                  value={suspendDuration}
                  onChange={(e) => setSuspendDuration(e.target.value)}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>

              <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-charcoal/70">
                  <strong>Note:</strong> This action will be logged in the audit
                  trail. The user will be notified of the suspension.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setShowSuspendModal(false);
                    setSelectedUser(null);
                  }}
                  className="flex-1 px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSuspendAccount}
                  className="flex-1 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors font-medium"
                >
                  Suspend Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reset Password Modal */}
      <AnimatePresence>
        {showResetPasswordModal && selectedUser && (
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
                setShowResetPasswordModal(false);
                setSelectedUser(null);
                setNewPassword("");
                setEmailPassword(false);
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
              className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10 p-8"
            >
              <div className="w-16 h-16 rounded-full bg-warm-green/10 flex items-center justify-center mx-auto mb-6">
                <Key className="w-8 h-8 text-warm-green" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2 text-center">
                Reset Password
              </h3>
              <p className="text-charcoal/60 mb-6 text-center">
                Reset password for <strong>{selectedUser.name}</strong>
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    New Password
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password..."
                      className="flex-1 px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50"
                    />
                    <button
                      onClick={generateStrongPassword}
                      className="px-4 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailPassword}
                    onChange={(e) => setEmailPassword(e.target.checked)}
                    className="w-4 h-4 accent-warm-green"
                  />
                  <span className="text-sm text-charcoal">
                    Email password to user
                  </span>
                </label>
              </div>

              <div className="bg-warm-green/10 border border-warm-green/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-charcoal/70">
                  <strong>Note:</strong> This action will be logged. The user
                  will be able to log in with the new password immediately.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setShowResetPasswordModal(false);
                    setSelectedUser(null);
                    setNewPassword("");
                    setEmailPassword(false);
                  }}
                  className="flex-1 px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetPassword}
                  disabled={!newPassword.trim()}
                  className="flex-1 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Password
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Activate Account Modal */}
      <AnimatePresence>
        {showActivateModal && selectedUser && (
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
                setShowActivateModal(false);
                setSelectedUser(null);
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
              <div className="w-16 h-16 rounded-full bg-warm-green/10 flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-8 h-8 text-warm-green" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">
                Activate Account
              </h3>
              <p className="text-charcoal/60 mb-6">
                Activate <strong>{selectedUser.name}</strong>'s account and
                remove suspension?
              </p>

              <div className="bg-warm-green/10 border border-warm-green/20 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-charcoal/70">
                  <strong>Note:</strong> The user will regain full access to
                  their account immediately. This action will be logged in the
                  audit trail.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setShowActivateModal(false);
                    setSelectedUser(null);
                  }}
                  className="flex-1 px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleActivateAccount}
                  className="flex-1 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium"
                >
                  Activate Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
