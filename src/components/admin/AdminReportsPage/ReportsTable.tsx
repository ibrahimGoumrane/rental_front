import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MockReport } from "@/lib/constants/pages/AdminReportsPage";
import { ReportRow } from "./ReportRow";

interface ReportsTableProps {
  reports: MockReport[];
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

export function ReportsTable({
  reports,
  openMenuId,
  onToggleMenu,
  onViewReport,
  onRequestInfo,
  onCancelReservation,
  getTypeBadge,
  getStatusBadge,
  getUserTypeBadge,
  getBookingStatusBadge,
}: ReportsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
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
            {reports.map((report, index) => (
              <ReportRow
                key={report.id}
                report={report}
                index={index}
                openMenuId={openMenuId}
                onToggleMenu={onToggleMenu}
                onViewReport={onViewReport}
                onRequestInfo={onRequestInfo}
                onCancelReservation={onCancelReservation}
                getTypeBadge={getTypeBadge}
                getStatusBadge={getStatusBadge}
                getUserTypeBadge={getUserTypeBadge}
                getBookingStatusBadge={getBookingStatusBadge}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-sand px-6 py-4 border-t border-charcoal/10 flex items-center justify-between">
        <p className="text-sm text-charcoal/70">
          Showing 1 to {reports.length} of {reports.length} open disputes
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
  );
}
