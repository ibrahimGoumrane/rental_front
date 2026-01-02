import { Check, Shield, Upload } from "lucide-react";
import React from "react";

interface IDVerificationSectionProps {
  fileName: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function IDVerificationSection({
  fileName,
  onFileChange,
}: IDVerificationSectionProps) {
  return (
    <section className="pt-6 border-t border-charcoal/10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-charcoal font-serif font-bold">
          2
        </div>
        <h2 className="font-serif text-2xl text-charcoal">ID Verification</h2>
      </div>

      <div className="bg-sand/30 rounded-xl p-6 border border-dashed border-charcoal/20 hover:border-warm-green transition-colors group">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6 text-warm-green" />
          </div>
          <h3 className="font-medium text-charcoal mb-1">Upload ID Document</h3>
          <p className="text-sm text-charcoal/60 mb-4">
            CIN or Passport (Photo or Scan)
          </p>

          <input
            type="file"
            id="id-upload"
            className="hidden"
            accept="image/*,.pdf"
            onChange={onFileChange}
          />
          <label
            htmlFor="id-upload"
            className="cursor-pointer bg-white border border-charcoal/20 text-charcoal px-6 py-2 rounded-lg text-sm font-medium hover:bg-charcoal hover:text-white transition-colors"
          >
            Select File
          </label>

          {fileName && (
            <div className="mt-4 flex items-center text-sm text-warm-green font-medium bg-warm-green/10 px-3 py-1 rounded-full">
              <Check className="w-4 h-4 mr-1" />
              {fileName}
            </div>
          )}

          <div className="mt-4 flex items-start text-xs text-charcoal/50 bg-white p-3 rounded-lg border border-charcoal/10 max-w-sm">
            <Shield className="w-4 h-4 mr-2 text-terracotta flex-shrink-0" />
            <span>
              Your ID is encrypted and only used to verify your identity for
              host security. It is never shared publicly.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
