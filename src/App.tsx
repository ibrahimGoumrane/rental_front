import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/ui/Header";
import { ListingsPage } from "./pages/ListingsPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { MessagesPage } from "./pages/MessagesPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { AccountSettingsPage } from "./pages/AccountSettingsPage";
import { BookingsPage } from "./pages/BookingsPage";
import { LandlordDashboardPage } from "./pages/LandlordDashboardPage";
import { LandlordEarningsPage } from "./pages/LandlordEarningsPage";
import { AddPropertyPage } from "./pages/AddPropertyPage";
import { ManagePropertiesPage } from "./pages/ManagePropertiesPage";
import { LandlordPropertyPreviewPage } from "./pages/LandlordPropertyPreviewPage";
import { EditPropertyPage } from "./pages/EditPropertyPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminUsersPage } from "./pages/AdminUsersPage";
import { AdminPropertiesPage } from "./pages/AdminPropertiesPage";
import { AdminReservationsPage } from "./pages/AdminReservationsPage";
import { AdminBillingPage } from "./pages/AdminBillingPage";
import { AdminMessagesPage } from "./pages/AdminMessagesPage";
import { AdminReportsPage } from "./pages/AdminReportsPage";
import { AdminSettingsPage } from "./pages/AdminSettingsPage";
import { AnimatePresence } from "framer-motion";
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
function AppContent() {
  const location = useLocation();
  const isLandlordRoute = location.pathname.startsWith("/landlord");
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <div className="min-h-screen bg-cream selection:bg-gold/30 selection:text-charcoal">
      <Header isLandlordMode={isLandlordRoute} />
      <AnimatePresence mode="wait">
        <Routes>
          {/* Guest Routes */}
          <Route path="/" element={<ListingsPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<AccountSettingsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />

          {/* Landlord Routes */}
          <Route
            path="/landlord/dashboard"
            element={<LandlordDashboardPage />}
          />
          <Route
            path="/landlord/properties"
            element={<ManagePropertiesPage />}
          />
          <Route
            path="/landlord/properties/new"
            element={<AddPropertyPage />}
          />
          <Route
            path="/landlord/properties/:id"
            element={<LandlordPropertyPreviewPage />}
          />
          <Route
            path="/landlord/properties/:id/edit"
            element={<EditPropertyPage />}
          />
          <Route path="/landlord/reservations" element={<BookingsPage />} />
          <Route path="/landlord/messages" element={<MessagesPage />} />
          <Route path="/landlord/earnings" element={<LandlordEarningsPage />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/properties" element={<AdminPropertiesPage />} />
          <Route
            path="/admin/reservations"
            element={<AdminReservationsPage />}
          />
          <Route path="/admin/billing" element={<AdminBillingPage />} />
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
export function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
