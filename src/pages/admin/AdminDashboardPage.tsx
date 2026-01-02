import { motion } from "framer-motion";
import { useState } from "react";
import {
  DASHBOARD_DATA,
  PLATFORM_ACTIVITY,
  RECENT_BOOKINGS,
  REVENUE_DATA,
} from "@/lib/constants/pages/AdminDashboardPage";
import { ActivityStream } from "@/components/admin/AdminDashboardPage/ActivityStream";
import { AlertsSection } from "@/components/admin/AdminDashboardPage/AlertsSection";
import { BroadcastModal } from "@/components/admin/AdminDashboardPage/BroadcastModal";
import { KPICards } from "@/components/admin/AdminDashboardPage/KPICards";
import { QuickActions } from "@/components/admin/AdminDashboardPage/QuickActions";
import { RevenueChart } from "@/components/admin/AdminDashboardPage/RevenueChart";

export function AdminDashboardPage() {
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const handleBroadcastSend = () => {
    console.log("Broadcasting:", {
      title: broadcastTitle,
      message: broadcastMessage,
    });
    setShowBroadcastModal(false);
    setBroadcastTitle("");
    setBroadcastMessage("");
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "user":
        return "text-warm-green";
      case "property":
        return "text-terracotta";
      case "financial":
        return "text-gold";
      default:
        return "text-charcoal";
    }
  };

  const getActivityBg = (type: string) => {
    switch (type) {
      case "user":
        return "bg-warm-green/10";
      case "property":
        return "bg-terracotta/10";
      case "financial":
        return "bg-gold/10";
      default:
        return "bg-charcoal/10";
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-charcoal/70 font-light">
            Platform health and performance overview
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-9 space-y-8">
            {/* KPI Cards */}
            <KPICards data={DASHBOARD_DATA} />

            {/* Alerts & Pending Actions */}
            <AlertsSection alerts={DASHBOARD_DATA.alerts} />

            {/* Activity Streams */}
            <ActivityStream
              bookings={RECENT_BOOKINGS}
              activities={PLATFORM_ACTIVITY}
              getActivityColor={getActivityColor}
              getActivityBg={getActivityBg}
            />

            {/* Revenue Chart */}
            <RevenueChart data={REVENUE_DATA} />
          </div>

          {/* Right Sidebar - Quick Actions */}
          <div className="xl:col-span-3">
            <QuickActions
              userVerifications={DASHBOARD_DATA.alerts.userVerifications}
              propertyVerifications={
                DASHBOARD_DATA.alerts.propertyVerifications
              }
              onBroadcastClick={() => setShowBroadcastModal(true)}
            />
          </div>
        </div>
      </div>

      {/* Broadcast Notification Modal */}
      <BroadcastModal
        isOpen={showBroadcastModal}
        onClose={() => setShowBroadcastModal(false)}
        title={broadcastTitle}
        message={broadcastMessage}
        onTitleChange={setBroadcastTitle}
        onMessageChange={setBroadcastMessage}
        onSend={handleBroadcastSend}
      />
    </div>
  );
}
