import { CheckCircle, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function LoginCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-charcoal/5 p-8 border border-charcoal/5 relative overflow-hidden">
      {/* Trust Badge */}
      <div className="absolute top-0 right-0 bg-warm-green/10 text-warm-green px-3 py-1 rounded-bl-lg text-xs font-bold uppercase tracking-wider flex items-center">
        <Shield className="w-3 h-3 mr-1" />
        Secure Login
      </div>

      {children}

      {/* Trust Notice */}
      <div className="mt-8 pt-6 border-t border-charcoal/10 text-center">
        <div className="flex items-center justify-center space-x-2 text-charcoal/60 text-sm mb-4">
          <CheckCircle className="w-4 h-4 text-warm-green" />
          <span>Your identity is verified for secure reservations</span>
        </div>
        <p className="text-charcoal/60 text-sm">
          New to the platform?{" "}
          <Link
            to="/signup"
            className="text-terracotta font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
