// ============================================
// Landlord Dashboard Types
// ============================================

export interface DashboardProperty {
  id: string;
  title: string;
  location: string;
  image: string;
  monthlyEarnings: number;
  totalBookings: number;
  occupancyRate: number;
  status: "active" | "inactive";
}

export interface DashboardReservation {
  id: string;
  propertyName: string;
  clientName: string;
  checkIn: string;
  checkOut: string;
  status: "pending" | "accepted" | "completed";
  amount: number;
}

// ============================================
// Landlord Earnings Types
// ============================================

export interface LandlordProperty {
  id: string;
  name: string;
  location: string;
  image: string;
  gross: number;
  commission: number;
  net: number;
  bookings: number;
  avgPerBooking: number;
}

export interface EarningsData {
  thisMonth: number;
  lastMonth: number;
  totalAllTime: number;
  upcomingPayouts: number;
  commission: number;
}

export interface MonthlyEarning {
  month: string;
  gross: number;
  net: number;
}

export interface PropertyEarning {
  id: string;
  name: string;
  location: string;
  image: string;
  gross: number;
  commission: number;
  net: number;
  bookings: number;
  avgPerBooking: number;
}

// ============================================
// Landlord Manage Properties Types
// ============================================

export interface ManageProperty {
  id: string;
  title: string;
  location: string;
  image: string;
  status: "active" | "inactive";
  monthlyEarnings: number;
  totalBookings: number;
  occupancyRate: number;
  bedrooms: number;
  beds?: number;
  bathrooms: number;
  basePrice: number;
}

// ============================================
// Landlord Property Preview Types
// ============================================

export interface PreviewProperty {
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
}
