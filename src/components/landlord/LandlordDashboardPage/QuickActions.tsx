import { MessageSquare, Plus, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function QuickActions() {
  return (
    <section className="py-12 px-6 md:px-12 bg-sand/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl text-charcoal mb-8 text-center">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/landlord/properties/new"
            className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group text-center"
          >
            <div className="w-16 h-16 rounded-full bg-warm-green/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-warm-green group-hover:scale-110 transition-all">
              <Plus className="w-8 h-8 text-warm-green group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal mb-2">
              Add New Property
            </h3>
            <p className="text-charcoal/60">
              List a new space and start earning
            </p>
          </Link>

          <Link
            to="/landlord/earnings"
            className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
              <TrendingUp className="w-8 h-8 text-gold group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal mb-2">
              View Earnings
            </h3>
            <p className="text-charcoal/60">Track your financial performance</p>
          </Link>

          <Link
            to="/landlord/messages"
            className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group text-center"
          >
            <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-terracotta group-hover:scale-110 transition-all">
              <MessageSquare className="w-8 h-8 text-terracotta group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal mb-2">
              Open Messages
            </h3>
            <p className="text-charcoal/60">Connect with your guests</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
