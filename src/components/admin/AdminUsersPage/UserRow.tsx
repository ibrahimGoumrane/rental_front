import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Key,
  MessageSquare,
  MoreVertical,
  UserCheck,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { User } from "@/lib/constants/pages/AdminUsersPage";

interface UserRowProps {
  user: User;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  openMenuId: number | null;
  onToggleMenu: (id: number | null) => void;
  onReviewDocs: (user: User) => void;
  onSuspend: (user: User) => void;
  onActivate: (user: User) => void;
  onResetPassword: (user: User) => void;
}

export function UserRow({
  user,
  index,
  isSelected,
  onSelect,
  openMenuId,
  onToggleMenu,
  onReviewDocs,
  onSuspend,
  onActivate,
  onResetPassword,
}: UserRowProps) {
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

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.05 }}
      className={`hover:bg-sand/50 transition-colors ${
        index % 2 === 0 ? "bg-white" : "bg-cream"
      }`}
    >
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
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
              {user.verification.status === "verified" ? "Verified" : ""}
            </p>
            {user.verification.date && (
              <p className="text-xs text-charcoal/50">
                {user.verification.date}
              </p>
            )}
            {user.verification.status === "pending" && (
              <button
                onClick={() => onReviewDocs(user)}
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
            <span className="font-medium text-warm-green">{user.bookings}</span>{" "}
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
        <p className="text-xs text-charcoal/60">Active: {user.lastActive}</p>
      </td>
      <td className="px-6 py-4 relative">
        <button
          onClick={() => onToggleMenu(openMenuId === user.id ? null : user.id)}
          className="p-2 hover:bg-sand rounded-lg transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-charcoal/60" />
        </button>

        <AnimatePresence>
          {openMenuId === user.id && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => onToggleMenu(null)}
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
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
                      onActivate(user);
                      onToggleMenu(null);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-warm-green"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Activate Account</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onSuspend(user);
                      onToggleMenu(null);
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
                    onResetPassword(user);
                    onToggleMenu(null);
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
  );
}
