import { ArrowRight, Lock, Mail } from "lucide-react";
import React from "react";

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 mt-4">
      {/* Email/Phone Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-charcoal/80">
          Email or Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal/40">
            <Mail className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green transition-colors outline-none bg-sand/20"
            placeholder="Enter your email or phone"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-charcoal/80">
            Password
          </label>
          <a
            href="#"
            className="text-sm text-terracotta hover:text-terracotta/80 font-medium"
          >
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal/40">
            <Lock className="w-5 h-5" />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green transition-colors outline-none bg-sand/20"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center bg-warm-green hover:bg-warm-green/90 text-white font-bold py-3.5 rounded-lg transition-all duration-300 shadow-lg shadow-warm-green/20 group"
      >
        <span>Log In</span>
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
