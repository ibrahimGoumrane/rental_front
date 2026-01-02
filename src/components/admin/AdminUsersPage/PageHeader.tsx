import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";

interface PageHeaderProps {
  totalUsers: number;
  onExportClick: () => void;
  onBulkEmailClick: () => void;
}

export function PageHeader({
  totalUsers,
  onExportClick,
  onBulkEmailClick,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-2">
            Users Management
          </h1>
          <p className="text-xl text-charcoal/70 font-light">
            {totalUsers.toLocaleString()} registered users
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-3">
          <button
            onClick={onExportClick}
            className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5" />
            <span className="font-medium">Export Users</span>
          </button>
          <button
            onClick={onBulkEmailClick}
            className="flex items-center space-x-2 px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-all shadow-sm hover:-translate-y-0.5"
          >
            <Mail className="w-5 h-5" />
            <span className="font-medium">Send Bulk Email</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
