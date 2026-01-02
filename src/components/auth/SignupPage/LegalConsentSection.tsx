import { Check } from "lucide-react";
import React from "react";

interface LegalConsentSectionProps {
  formData: {
    termsAccepted: boolean;
    privacyAccepted: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LegalConsentSection({
  formData,
  onChange,
}: LegalConsentSectionProps) {
  return (
    <section className="pt-6 border-t border-charcoal/10">
      <div className="space-y-4">
        <label className="flex items-start space-x-3 cursor-pointer group">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={onChange}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-charcoal/20 bg-white transition-all checked:border-warm-green checked:bg-warm-green hover:border-warm-green"
              required
            />
            <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
          </div>
          <span className="text-sm text-charcoal/80 group-hover:text-charcoal transition-colors">
            I agree to the{" "}
            <a href="#" className="text-terracotta underline">
              Terms & Conditions
            </a>{" "}
            and accept the platform rules.
          </span>
        </label>

        <label className="flex items-start space-x-3 cursor-pointer group">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              name="privacyAccepted"
              checked={formData.privacyAccepted}
              onChange={onChange}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-charcoal/20 bg-white transition-all checked:border-warm-green checked:bg-warm-green hover:border-warm-green"
              required
            />
            <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
          </div>
          <span className="text-sm text-charcoal/80 group-hover:text-charcoal transition-colors">
            I acknowledge the{" "}
            <a href="#" className="text-terracotta underline">
              Privacy Policy
            </a>{" "}
            and consent to ID verification processing.
          </span>
        </label>
      </div>
    </section>
  );
}
