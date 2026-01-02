import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function CommissionExplanation() {
  return (
    <div className="bg-warm-green/10 border border-warm-green/20 rounded-xl p-6">
      <h3 className="font-bold text-charcoal mb-3 flex items-center">
        <AlertCircle className="w-5 h-5 mr-2 text-warm-green" />
        Commission & Tax Structure
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-charcoal/60 mb-1">Gross Revenue (per property)</p>
          <p className="font-bold text-charcoal">100%</p>
        </div>
        <div>
          <p className="text-charcoal/60 mb-1">Platform Commission</p>
          <p className="font-bold text-warm-green">10%</p>
        </div>
        <div>
          <p className="text-charcoal/60 mb-1">TVA on Commission</p>
          <p className="font-bold text-terracotta">20% of 10%</p>
        </div>
        <div>
          <p className="text-charcoal/60 mb-1">Net Platform Revenue</p>
          <p className="font-bold text-gold">Commission + TVA</p>
        </div>
      </div>
      <p className="text-xs text-charcoal/60 mt-4">
        This ledger shows aggregated earnings per property. For individual
        reservation details, visit the{" "}
        <Link
          to="/admin/reservations"
          className="text-warm-green underline font-medium"
        >
          Reservations page
        </Link>
        .
      </p>
    </div>
  );
}
