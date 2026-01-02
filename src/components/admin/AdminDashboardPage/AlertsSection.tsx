import { motion } from "framer-motion";
import { AlertCircle, Flag, Home, MessageSquare, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import type { AlertsData } from "@/lib/types/admin";

interface AlertsSectionProps {
  alerts: AlertsData;
}

export function AlertsSection({ alerts }: AlertsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm"
    >
      <h2 className="font-serif text-3xl text-charcoal mb-6 flex items-center">
        <AlertCircle className="w-7 h-7 mr-3 text-terracotta" />
        Alerts & Pending Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Verification Queue Card */}
        <Link
          to="/admin/users?verificationStatus=unverified"
          className="border border-charcoal/10 rounded-xl p-6 hover:border-warm-green/30 hover:shadow-lg transition-all relative group cursor-pointer"
        >
          <div className="absolute top-4 right-4">
            <div className="w-3 h-3 bg-terracotta rounded-full animate-pulse" />
          </div>
          <Shield className="w-8 h-8 text-warm-green mb-4" />
          <h3 className="font-bold text-charcoal mb-3">
            User Verification Queue
          </h3>
          <div className="space-y-2 text-sm text-charcoal/70 mb-4">
            <p className="flex items-center justify-between">
              <span>Pending verification</span>
              <span className="px-2 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
                {alerts.userVerifications}
              </span>
            </p>
          </div>
          <div className="text-sm text-warm-green font-medium group-hover:underline">
            Review user identities →
          </div>
        </Link>

        {/* Property Verification Queue Card */}
        <Link
          to="/admin/properties?verificationStatus=unverified"
          className="border border-charcoal/10 rounded-xl p-6 hover:border-warm-green/30 hover:shadow-lg transition-all relative group cursor-pointer"
        >
          <div className="absolute top-4 right-4">
            <div className="w-3 h-3 bg-terracotta rounded-full animate-pulse" />
          </div>
          <Home className="w-8 h-8 text-terracotta mb-4" />
          <h3 className="font-bold text-charcoal mb-3">
            Property Verification Queue
          </h3>
          <div className="space-y-2 text-sm text-charcoal/70 mb-4">
            <p className="flex items-center justify-between">
              <span>Pending verification</span>
              <span className="px-2 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
                {alerts.propertyVerifications}
              </span>
            </p>
          </div>
          <div className="text-sm text-terracotta font-medium group-hover:underline">
            Review property ownership →
          </div>
        </Link>

        {/* Flagged Content */}
        <Link
          to="/admin/messages"
          className="border border-charcoal/10 rounded-xl p-6 hover:border-terracotta/30 hover:shadow-lg transition-all group cursor-pointer"
        >
          <Flag className="w-8 h-8 text-terracotta mb-4" />
          <h3 className="font-bold text-charcoal mb-3">Flagged Content</h3>
          <div className="space-y-2 text-sm text-charcoal/70 mb-4">
            <p>
              {alerts.flaggedConversations} conversations flagged by AI
              moderation
            </p>
            <p>
              {alerts.flaggedProperties} properties reported for policy
              violations
            </p>
          </div>
          <div className="text-sm text-terracotta font-medium group-hover:underline">
            Review flags →
          </div>
        </Link>
      </div>

      {/* Disputes Card - Separate row */}
      <div className="mt-6">
        <Link
          to="/admin/reports"
          className="block border border-charcoal/10 rounded-xl p-6 hover:border-terracotta/30 hover:shadow-lg transition-all group cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <MessageSquare className="w-8 h-8 text-terracotta flex-shrink-0" />
              <div>
                <h3 className="font-bold text-charcoal mb-3">
                  Disputes & Support
                </h3>
                <div className="space-y-2 text-sm text-charcoal/70">
                  <p>
                    {alerts.disputes} guest-host disputes require resolution
                  </p>
                  <p>{alerts.supportTickets} support tickets unresolved</p>
                </div>
              </div>
            </div>
            <div className="text-sm text-terracotta font-medium group-hover:underline whitespace-nowrap">
              Manage disputes →
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
