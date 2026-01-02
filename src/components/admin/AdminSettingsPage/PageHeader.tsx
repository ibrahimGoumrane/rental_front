import { motion } from "framer-motion";
import { Download, RotateCcw, Save } from "lucide-react";

interface PageHeaderProps {
  onSave: () => void;
  onReset: () => void;
  onExport: () => void;
}

export function PageHeader({ onSave, onReset, onExport }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-8"
    >
      <div>
        <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-2">
          Platform Configuration & Settings
        </h1>
        <p className="text-sm text-charcoal/60">
          Last modified: Dec 25, 2024 by Admin Sarah
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={onSave}
          className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:-translate-y-0.5 font-medium"
        >
          <Save className="w-5 h-5" />
          <span>Save All Changes</span>
        </button>
        <button
          onClick={onReset}
          className="flex items-center space-x-2 px-6 py-3 border border-charcoal/20 text-charcoal/70 rounded-lg hover:bg-sand transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset to Defaults</span>
        </button>
        <button
          onClick={onExport}
          className="flex items-center space-x-2 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-all shadow-sm hover:-translate-y-0.5"
        >
          <Download className="w-5 h-5" />
          <span>Export Configuration</span>
        </button>
      </div>
    </motion.div>
  );
}
