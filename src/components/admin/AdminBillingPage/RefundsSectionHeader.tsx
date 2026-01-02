import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface RefundsSectionHeaderProps {
  onNewRefund: () => void;
}

export function RefundsSectionHeader({
  onNewRefund,
}: RefundsSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-charcoal/70 mb-2">
          Manage refunds to hosts for canceled bookings, disputes, or billing
          corrections.
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
        onClick={onNewRefund}
        className="flex items-center space-x-2 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-all"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">New Host Refund</span>
      </button>
    </div>
  );
}
