import { motion } from "framer-motion";

interface ProfileCompletionCardProps {
  completion: number;
}

export function ProfileCompletionCard({
  completion,
}: ProfileCompletionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-warm-green/10 to-terracotta/10 rounded-xl p-6 mb-8 border border-charcoal/10"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-charcoal mb-1">Profile Completion</h3>
          <p className="text-sm text-charcoal/60">
            Complete your profile to unlock all features
          </p>
        </div>
        <div className="text-3xl font-bold text-warm-green">{completion}%</div>
      </div>
      <div className="w-full h-3 bg-white rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completion}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-warm-green to-terracotta rounded-full"
        />
      </div>
    </motion.div>
  );
}
