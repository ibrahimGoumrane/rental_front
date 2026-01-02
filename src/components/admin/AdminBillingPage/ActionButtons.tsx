import { Download, Settings } from "lucide-react";

interface ActionButtonsProps {
  onExportReport: () => void;
  onPaymentSettings: () => void;
}

export function ActionButtons({
  onExportReport,
  onPaymentSettings,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onExportReport}
        className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:-translate-y-0.5"
      >
        <Download className="w-5 h-5" />
        <span className="font-medium">Export Financial Report</span>
      </button>
      <button
        onClick={onPaymentSettings}
        className="flex items-center space-x-2 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-all shadow-sm hover:-translate-y-0.5"
      >
        <Settings className="w-5 h-5" />
        <span className="font-medium">Payment Settings</span>
      </button>
    </div>
  );
}
