import { motion } from "framer-motion";
import { useState } from "react";
import {
  Settings,
  Home,
  Calendar,
  Shield,
  DollarSign,
  MessageSquare,
  Mail,
  Code,
  Lock,
} from "lucide-react";
import { PageHeader } from "@/components/admin/AdminSettingsPage/PageHeader";
import { SettingsSidebar } from "@/components/admin/AdminSettingsPage/SettingsSidebar";
import { GeneralSettings } from "@/components/admin/AdminSettingsPage/GeneralSettings";
import { PropertySettings } from "@/components/admin/AdminSettingsPage/PropertySettings";
import { BookingSettings } from "@/components/admin/AdminSettingsPage/BookingSettings";
import { VerificationSettings } from "@/components/admin/AdminSettingsPage/VerificationSettings";
import { PaymentsSettings } from "@/components/admin/AdminSettingsPage/PaymentsSettings";
import { MessagingSettings } from "@/components/admin/AdminSettingsPage/MessagingSettings";
import { NotificationsSettings } from "@/components/admin/AdminSettingsPage/NotificationsSettings";
import { ApiSettings } from "@/components/admin/AdminSettingsPage/ApiSettings";
import { SecuritySettings } from "@/components/admin/AdminSettingsPage/SecuritySettings";

export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("general");

  const tabs = [
    { id: "general", label: "General Settings", icon: Settings },
    { id: "property", label: "Property Settings", icon: Home },
    { id: "booking", label: "Booking & Policies", icon: Calendar },
    { id: "verification", label: "User Verification", icon: Shield },
    { id: "payments", label: "Payments & Commission", icon: DollarSign },
    { id: "messaging", label: "Messaging & Moderation", icon: MessageSquare },
    { id: "notifications", label: "Email Settings", icon: Mail },
    { id: "api", label: "API & Integrations", icon: Code },
    { id: "security", label: "Security & Compliance", icon: Lock },
  ];

  const handleSave = () => {
    console.log("Saving all settings...");
    // TODO: Implement save functionality
  };

  const handleReset = () => {
    console.log("Resetting to defaults...");
    // TODO: Implement reset functionality
  };

  const handleExport = () => {
    console.log("Exporting configuration...");
    // TODO: Implement export functionality
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "property":
        return <PropertySettings />;
      case "booking":
        return <BookingSettings />;
      case "verification":
        return <VerificationSettings />;
      case "payments":
        return <PaymentsSettings />;
      case "messaging":
        return <MessagingSettings />;
      case "notifications":
        return <NotificationsSettings />;
      case "api":
        return <ApiSettings />;
      case "security":
        return <SecuritySettings />;
      default:
        return <GeneralSettings />;
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

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
