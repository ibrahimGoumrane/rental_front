import { FileText, Shield } from "lucide-react";

export function TrustFooter() {
  return (
    <div className="mt-8 flex justify-center space-x-6 text-charcoal/40">
      <div className="flex items-center space-x-2">
        <Shield className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wider">
          Bank-Grade Security
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <FileText className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wider">
          Verified Listings
        </span>
      </div>
    </div>
  );
}
