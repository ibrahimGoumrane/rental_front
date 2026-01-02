import { motion } from "framer-motion";

interface TabNavigationProps {
  activeTab: "commission" | "analytics" | "refunds";
  onTabChange: (tab: "commission" | "analytics" | "refunds") => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: "commission" as const, label: "Commission Ledger" },
    { id: "analytics" as const, label: "Revenue Analytics" },
    { id: "refunds" as const, label: "Host Refunds" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center space-x-8 border-b border-charcoal/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-4 font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-charcoal"
                : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
              />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
