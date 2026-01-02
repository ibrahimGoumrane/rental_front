import { TrendingUp } from "lucide-react";

export function KeyMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm">
        <p className="text-sm text-charcoal/60 mb-2">
          Platform Commission Rate
        </p>
        <p className="font-serif text-5xl text-warm-green mb-2">10%</p>
        <p className="text-xs text-charcoal/60">Applied to all reservations</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm">
        <p className="text-sm text-charcoal/60 mb-2">TVA Rate</p>
        <p className="font-serif text-5xl text-terracotta mb-2">20%</p>
        <p className="text-xs text-charcoal/60">Applied to commission only</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm">
        <p className="text-sm text-charcoal/60 mb-2">Average Booking Value</p>
        <p className="font-serif text-5xl text-charcoal mb-2">$892</p>
        <p className="text-xs text-warm-green flex items-center">
          <TrendingUp className="w-3 h-3 mr-1" />
          +8% from last month
        </p>
      </div>
    </div>
  );
}
