import { AnimatePresence, motion } from "framer-motion";
import {
  Ban,
  CheckCircle,
  Eye,
  Home,
  Mail,
  MoreVertical,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MockReport } from "@/lib/constants/pages/AdminReportsPage";

interface ReportRowProps {
  report: MockReport;
  index: number;
  openMenuId: string | null;
  onToggleMenu: (id: string | null) => void;
  onViewReport: (report: MockReport) => void;
  onRequestInfo: (report: MockReport) => void;
  onCancelReservation: (report: MockReport) => void;
  getTypeBadge: (type: string) => JSX.Element;
  getStatusBadge: (status: string) => JSX.Element | null;
  getUserTypeBadge: (userType: string) => JSX.Element;
  getBookingStatusBadge: (status: string) => JSX.Element | null;
}

export function ReportRow({
  report,
  index,
  openMenuId,
  onToggleMenu,
  onViewReport,
  onRequestInfo,
  onCancelReservation,
  getTypeBadge,
  getStatusBadge,
  getUserTypeBadge,
  getBookingStatusBadge,
}: ReportRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 + index * 0.05 }}
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
          <Link
            to={`/property/${report.property.id}`}
            className="text-xs text-terracotta hover:underline mt-2 flex items-center"
          >
            <Home className="w-3 h-3 mr-1" />
            {report.property.name}
          </Link>
        </div>
      </td>
      <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
      <td className="px-6 py-4">
        <p className="text-sm text-charcoal/70">{report.filedDate}</p>
      </td>
      <td className="px-6 py-4 relative">
        <button
          onClick={() =>
            onToggleMenu(openMenuId === report.id ? null : report.id)
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
                onClick={() => onToggleMenu(null)}
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-64 bg-cream rounded-xl shadow-2xl border border-charcoal/10 py-2 z-40"
              >
                <button
                  onClick={() => {
                    onViewReport(report);
                    onToggleMenu(null);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm"
                >
                  <Eye className="w-4 h-4 text-charcoal/60" />
                  <span>View Full Report</span>
                </button>
                <button
                  onClick={() => {
                    onRequestInfo(report);
                    onToggleMenu(null);
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
                    onCancelReservation(report);
                    onToggleMenu(null);
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
  );
}
