import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export function EmptyBookingsState() {
  return (
    <div className="text-center py-16">
      <Calendar className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
      <h3 className="font-serif text-2xl text-charcoal mb-2">
        No bookings found
      </h3>
      <p className="text-charcoal/60 mb-6">
        Try adjusting your filters or search query
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium"
      >
        Explore Properties
      </Link>
    </div>
  );
}
