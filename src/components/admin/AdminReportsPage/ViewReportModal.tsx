import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { MockReport } from "@/lib/constants/pages/AdminReportsPage";

interface ViewReportModalProps {
  isOpen: boolean;
  report: MockReport | null;
  onClose: () => void;
  getTypeBadge: (type: string) => JSX.Element;
  getStatusBadge: (status: string) => JSX.Element | null;
  getUserTypeBadge: (userType: string) => JSX.Element;
}

export function ViewReportModal({
  isOpen,
  report,
  onClose,
  getTypeBadge,
  getStatusBadge,
  getUserTypeBadge,
}: ViewReportModalProps) {
  if (!report) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10 sticky top-0 bg-white z-10">
              <h3 className="font-serif text-2xl text-charcoal">
                Full Report Details
              </h3>
              <button
                onClick={onClose}
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
                    {report.id}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/60 mb-1">Filed Date</p>
                  <p className="text-sm text-charcoal">{report.filedDate}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/60 mb-1">Type</p>
                  {getTypeBadge(report.type)}
                </div>
                <div>
                  <p className="text-xs text-charcoal/60 mb-1">Status</p>
                  {getStatusBadge(report.status)}
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
                      {report.filedBy.avatar ? (
                        <img
                          src={report.filedBy.avatar}
                          alt={report.filedBy.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-warm-green/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-warm-green">
                            {report.filedBy.initials}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-charcoal">
                          {report.filedBy.name}
                        </p>
                        {getUserTypeBadge(report.filedBy.userType)}
                      </div>
                    </div>
                  </div>
                  <div className="bg-sand rounded-lg p-4">
                    <p className="text-xs text-charcoal/60 mb-2">
                      Reported User
                    </p>
                    <div className="flex items-center space-x-3">
                      {report.against.avatar ? (
                        <img
                          src={report.against.avatar}
                          alt={report.against.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-terracotta">
                            {report.against.initials}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-charcoal">
                          {report.against.name}
                        </p>
                        {getUserTypeBadge(report.against.userType)}
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
                    <p className="text-xs text-charcoal/60 mb-1">Booking ID</p>
                    <p className="font-mono text-sm text-warm-green">
                      {report.booking.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal/60 mb-1">Dates</p>
                    <p className="text-sm text-charcoal">
                      {report.booking.dates}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal/60 mb-1">Property</p>
                    <Link
                      to={`/property/${report.property.id}`}
                      className="text-sm text-terracotta hover:underline font-medium"
                    >
                      {report.property.name}
                    </Link>
                    <p className="text-xs text-charcoal/60 mt-1">
                      {report.property.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-charcoal/10 pt-4">
                <h4 className="font-bold text-charcoal mb-3">Description</h4>
                <p className="text-sm text-charcoal/70 bg-sand rounded-lg p-4">
                  {report.description}
                </p>
              </div>

              <div className="border-t border-charcoal/10 pt-4">
                <h4 className="font-bold text-charcoal mb-3">Evidence</h4>
                <p className="text-sm text-charcoal/70 bg-sand rounded-lg p-4">
                  {report.evidence}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-charcoal/10 bg-sand/30">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
