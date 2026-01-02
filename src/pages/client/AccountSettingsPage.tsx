import { AnimatePresence, motion } from "framer-motion";
import { Bell, CreditCard, Globe, Lock, User } from "lucide-react";
import { useState } from "react";
import { ProfileCompletionCard } from "@/components/client/AccountSettingsPage/ProfileCompletionCard";
import { SettingsSidebar } from "@/components/client/AccountSettingsPage/SettingsSidebar";
import { ProfilePhotoSection } from "@/components/client/AccountSettingsPage/ProfilePhotoSection";
import { PersonalInfoForm } from "@/components/client/AccountSettingsPage/PersonalInfoForm";
import { SecuritySection } from "@/components/client/AccountSettingsPage/SecuritySection";
import { PreferencesSection } from "@/components/client/AccountSettingsPage/PreferencesSection";
import { NotificationsSection } from "@/components/client/AccountSettingsPage/NotificationsSection";
import { PaymentsSection } from "@/components/client/AccountSettingsPage/PaymentsSection";

export function AccountSettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Travel enthusiast and architecture lover.",
    dateOfBirth: "1990-05-15",
    address: "123 Main St, San Francisco, CA",
  });
  const profileCompletion = 75;
  const sections = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: Globe,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "payments",
      label: "Payments",
      icon: CreditCard,
    },
  ];
  return (
    <div className="min-h-screen bg-sand pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-charcoal mb-2">
            Account Settings
          </h1>
          <p className="text-charcoal/60">
            Manage your account preferences and settings
          </p>
        </div>

        {/* Profile Completion Progress */}
        <ProfileCompletionCard completion={profileCompletion} />

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <SettingsSidebar
              sections={sections}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            <AnimatePresence mode="wait">
              {activeSection === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProfilePhotoSection />
                  <PersonalInfoForm
                    data={profileData}
                    onChange={setProfileData}
                  />
                </motion.div>
              )}

              {activeSection === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <SecuritySection />
                </motion.div>
              )}

              {activeSection === "preferences" && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <PreferencesSection />
                </motion.div>
              )}

              {activeSection === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <NotificationsSection />
                </motion.div>
              )}

              {activeSection === "payments" && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <PaymentsSection />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
