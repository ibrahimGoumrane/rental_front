import { motion } from "framer-motion";

export function VerificationChart() {
  return (
    <div className="mt-8 pt-8 border-t border-charcoal/10">
      <h3 className="font-serif text-xl text-charcoal mb-4">
        Verification Status
      </h3>
      <div className="relative">
        <svg viewBox="0 0 200 200" className="w-full h-auto">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#6B6B6B"
            strokeWidth="20"
            opacity="0.2"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#2D5F3F"
            strokeWidth="20"
            strokeDasharray="502.4"
            initial={{ strokeDashoffset: 502.4 }}
            animate={{ strokeDashoffset: 502.4 * 0.3 }}
            transition={{ duration: 1.5, delay: 1 }}
            transform="rotate(-90 100 100)"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="20"
            strokeDasharray="502.4"
            initial={{ strokeDashoffset: 502.4 }}
            animate={{ strokeDashoffset: 502.4 * 0.7 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            transform="rotate(108 100 100)"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#E07A5F"
            strokeWidth="20"
            strokeDasharray="502.4"
            initial={{ strokeDashoffset: 502.4 }}
            animate={{ strokeDashoffset: 502.4 * 0.85 }}
            transition={{ duration: 1.5, delay: 1.4 }}
            transform="rotate(216 100 100)"
          />
          <text
            x="100"
            y="95"
            textAnchor="middle"
            className="font-serif text-3xl font-bold fill-charcoal"
          >
            70%
          </text>
          <text
            x="100"
            y="115"
            textAnchor="middle"
            className="text-xs fill-charcoal/60"
          >
            Verified
          </text>
        </svg>
      </div>
      <div className="space-y-2 mt-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warm-green rounded-full" />
            <span className="text-charcoal/70">Verified</span>
          </div>
          <span className="font-medium text-charcoal">70%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gold rounded-full" />
            <span className="text-charcoal/70">Pending</span>
          </div>
          <span className="font-medium text-charcoal">20%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-terracotta rounded-full" />
            <span className="text-charcoal/70">Rejected</span>
          </div>
          <span className="font-medium text-charcoal">5%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-charcoal/40 rounded-full" />
            <span className="text-charcoal/70">Not Submitted</span>
          </div>
          <span className="font-medium text-charcoal">5%</span>
        </div>
      </div>
    </div>
  );
}
