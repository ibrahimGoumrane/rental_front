import { motion } from "framer-motion";
import {
  Bell,
  Calendar,
  Code,
  DollarSign,
  Home,
  Lock,
  MessageSquare,
  Settings,
  Shield,
} from "lucide-react";
import { useState } from "react";
import {
  PageHeader,
  SettingsSidebar,
  GeneralSettings,
  PaymentsSettings,
  SecuritySettings,
  PlaceholderSettings,
} from "@/components/admin/AdminSettingsPage";

export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("general");

  const tabs = [
    { id: "general", label: "General Settings", icon: Settings },
    { id: "property", label: "Property Settings", icon: Home },
    { id: "booking", label: "Booking & Policies", icon: Calendar },
    { id: "verification", label: "User Verification", icon: Shield },
    { id: "payments", label: "Payments & Commission", icon: DollarSign },
    { id: "messaging", label: "Messaging & Moderation", icon: MessageSquare },
    { id: "notifications", label: "Notifications & Emails", icon: Bell },
    { id: "api", label: "API & Integrations", icon: Code },
    { id: "security", label: "Security & Compliance", icon: Lock },
  ];

  const handleSave = () => {
    console.log("Saving all changes...");
  };

  const handleReset = () => {
    console.log("Resetting to defaults...");
  };

  const handleExport = () => {
    console.log("Exporting configuration...");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "payments":
        return <PaymentsSettings />;
      case "security":
        return <SecuritySettings />;
      default:
        return (
          <PlaceholderSettings
            label={tabs.find((t) => t.id === activeTab)?.label || "Settings"}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <PageHeader
          onSave={handleSave}
          onReset={handleReset}
          onExport={handleExport}
        />

        <div className="flex gap-8">
          <SettingsSidebar
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
