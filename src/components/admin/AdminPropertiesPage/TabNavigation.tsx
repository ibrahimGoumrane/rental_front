import { motion } from "framer-motion";

interface TabNavigationProps {
  activeTab: "properties" | "collections";
  onTabChange: (tab: "properties" | "collections") => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: "properties" as const, label: "Properties" },
    { id: "collections" as const, label: "Collections" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="mb-6"
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
                layoutId="activePropertyTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta"
              />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
