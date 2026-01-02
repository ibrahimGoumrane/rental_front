import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/ui/Header";

// Client Pages
import { AccountSettingsPage } from "./pages/client/AccountSettingsPage";
import { BookingsPage } from "./pages/client/BookingsPage";
import { ListingsPage } from "./pages/client/ListingsPage";
import { MessagesPage } from "./pages/client/MessagesPage";
import { PropertyDetailPage } from "./pages/client/PropertyDetailPage";

// Auth Pages
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";

// Landlord Pages
import { AddPropertyPage } from "./pages/landlord/AddPropertyPage";
import { EditPropertyPage } from "./pages/landlord/EditPropertyPage";
import { LandlordDashboardPage } from "./pages/landlord/LandlordDashboardPage";
import { LandlordEarningsPage } from "./pages/landlord/LandlordEarningsPage";
import { LandlordPropertyPreviewPage } from "./pages/landlord/LandlordPropertyPreviewPage";
import { ManagePropertiesPage } from "./pages/landlord/ManagePropertiesPage";

// Admin Pages
import { AdminBillingPage } from "./pages/admin/AdminBillingPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminMessagesPage } from "./pages/admin/AdminMessagesPage";
import { AdminPropertiesPage } from "./pages/admin/AdminPropertiesPage";
import { AdminReportsPage } from "./pages/admin/AdminReportsPage";
import { AdminReservationsPage } from "./pages/admin/AdminReservationsPage";
import { AdminSettingsPage } from "./pages/admin/AdminSettingsPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
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
