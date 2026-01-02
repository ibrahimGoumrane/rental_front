import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";

interface PageHeaderProps {
  onExportClick: () => void;
  onGuidelinesClick: () => void;
}

export function PageHeader({
  onExportClick,
  onGuidelinesClick,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-8">
        Reports & Dispute Resolution
      </h1>

      <div className="flex items-center space-x-3">
        <button
          onClick={onExportClick}
          className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:-translate-y-0.5"
        >
          <Download className="w-5 h-5" />
          <span className="font-medium">Export Report Data</span>
        </button>
        <button
          onClick={onGuidelinesClick}
          className="flex items-center space-x-2 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-all shadow-sm hover:-translate-y-0.5"
        >
          <FileText className="w-5 h-5" />
          <span className="font-medium">Dispute Resolution Guidelines</span>
        </button>
      </div>
    </motion.div>
  );
}
