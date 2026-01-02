import { motion } from "framer-motion";
import type { SettingsTab } from "@/lib/types/admin";

interface SettingsSidebarProps {
  tabs: SettingsTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function SettingsSidebar({
  tabs,
  activeTab,
  onTabChange,
}: SettingsSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="w-80 flex-shrink-0"
    >
      <div className="bg-sand rounded-2xl p-4 border border-charcoal/5 shadow-sm sticky top-24">
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-warm-green/10 text-warm-green border-l-4 border-warm-green"
                    : "text-charcoal/70 hover:bg-sand/50 border-l-4 border-transparent"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
}
