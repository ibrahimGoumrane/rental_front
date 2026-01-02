import { motion } from "framer-motion";
import { Download, Shield } from "lucide-react";

interface PageHeaderProps {
  onBlockedKeywordsClick: () => void;
  onExportClick: () => void;
}

export function PageHeader({
  onBlockedKeywordsClick,
  onExportClick,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-8">
        Message Moderation & Oversight
      </h1>

      <div className="flex items-center space-x-3">
        <button
          onClick={onBlockedKeywordsClick}
          className="flex items-center space-x-2 px-6 py-3 bg-charcoal text-white rounded-lg hover:bg-charcoal/90 transition-all shadow-sm hover:-translate-y-0.5"
        >
          <Shield className="w-5 h-5" />
          <span className="font-medium">View Blocked Keywords</span>
        </button>
        <button
          onClick={onExportClick}
          className="flex items-center space-x-2 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-all shadow-sm hover:-translate-y-0.5"
        >
          <Download className="w-5 h-5" />
          <span className="font-medium">Export Conversations</span>
        </button>
      </div>
    </motion.div>
  );
}
