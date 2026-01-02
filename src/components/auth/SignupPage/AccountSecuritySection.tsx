import { Lock } from "lucide-react";
import React from "react";

interface AccountSecuritySectionProps {
  formData: {
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AccountSecuritySection({
  formData,
  onChange,
}: AccountSecuritySectionProps) {
  return (
    <section className="pt-6 border-t border-charcoal/10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-charcoal font-serif font-bold">
          3
        </div>
        <h2 className="font-serif text-2xl text-charcoal">Account Security</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors"
              placeholder="Min. 8 characters"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors"
              placeholder="Re-enter password"
              required
            />
          </div>
        </div>
      </div>
    </section>
  );
}
