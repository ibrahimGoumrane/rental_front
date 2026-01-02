import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MockReservation } from "@/lib/constants/pages/AdminReservationsPage";
import { ReservationRow } from "./ReservationRow";

interface ReservationsTableProps {
  reservations: MockReservation[];
  openMenuId: string | null;
  onToggleMenu: (id: string | null) => void;
  onFlag: (reservation: MockReservation) => void;
  onCancel: (reservation: MockReservation) => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

export function ReservationsTable({
  reservations,
  openMenuId,
  onToggleMenu,
  onFlag,
  onCancel,
  getStatusBadge,
}: ReservationsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
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
            {reservations.map((reservation, index) => (
              <ReservationRow
                key={reservation.id}
                reservation={reservation}
                index={index}
                isMenuOpen={openMenuId === reservation.id}
                onToggleMenu={() =>
                  onToggleMenu(
                    openMenuId === reservation.id ? null : reservation.id
                  )
                }
                onCloseMenu={() => onToggleMenu(null)}
                onFlag={() => onFlag(reservation)}
                onCancel={() => onCancel(reservation)}
                getStatusBadge={getStatusBadge}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-sand px-6 py-4 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-charcoal/70">
          Showing 1 to {reservations.length} of 1,892 reservations
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
  );
}
