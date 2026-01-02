import { motion } from "framer-motion";
import { Bell, FileText, Home, Shield } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickActionsProps {
  userVerifications: number;
  propertyVerifications: number;
  onBroadcastClick: () => void;
}

export function QuickActions({
  userVerifications,
  propertyVerifications,
  onBroadcastClick,
}: QuickActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="sticky top-24 bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm"
    >
      <h2 className="font-serif text-2xl text-charcoal mb-6">Quick Actions</h2>
      <div className="space-y-3">
        {/* Verify Users */}
        <Link
          to="/admin/users?verificationStatus=unverified"
          className="w-full flex items-center justify-between px-4 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Verify Users</span>
          </div>
          <span className="px-2 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
            {userVerifications}
          </span>
        </Link>

        {/* Verify Properties */}
        <Link
          to="/admin/properties?verificationStatus=unverified"
          className="w-full flex items-center justify-between px-4 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex items-center space-x-3">
            <Home className="w-5 h-5" />
            <span className="font-medium">Verify Properties</span>
          </div>
          <span className="px-2 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
            {propertyVerifications}
          </span>
        </Link>

        {/* Broadcast Notification */}
        <button
          onClick={onBroadcastClick}
          className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Bell className="w-5 h-5" />
          <span className="font-medium">Broadcast Notification</span>
        </button>

        <Link
          to="/admin/reports"
          className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-charcoal text-white rounded-lg hover:bg-charcoal/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <FileText className="w-5 h-5" />
          <span className="font-medium">Generate Reports</span>
        </Link>
      </div>
    </motion.div>
  );
}
