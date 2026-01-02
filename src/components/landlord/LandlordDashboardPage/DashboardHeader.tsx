import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  growthPercentage: number;
}

export function DashboardHeader({
  userName,
  growthPercentage,
}: DashboardHeaderProps) {
  return (
    <section className="pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
            Welcome back, {userName}
          </h1>
          <p className="text-xl text-charcoal/70 font-light mb-2">
            Your properties are performing beautifully this month.
          </p>
          <div className="flex items-center space-x-2 text-warm-green">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">
              +{growthPercentage}% earnings compared to last month
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
