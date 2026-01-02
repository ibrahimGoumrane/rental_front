import type { LucideIcon } from "lucide-react";

// ============================================
// Admin Users Types
// ============================================

export interface UserVerification {
  status: "verified" | "pending" | "rejected";
  document: string;
  documentUrl: string | null;
  date: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  initials?: string;
  type: "guest" | "host" | "both" | "admin";
  verification: UserVerification;
  bookings: number;
  properties: number;
  totalBookings?: number;
  status: "active" | "suspended";
  suspendedUntil?: string;
  registered: string;
  lastActive: string;
}

// ============================================
// Admin Properties Types
// ============================================

export interface PropertyOwner {
  name: string;
  avatar: string | null;
  initials: string;
  verified: boolean;
}

export interface Property {
  id: number;
  title: string;
  location: string;
  city: string;
  image: string;
  type: "villa" | "apartment" | "house" | "studio";
  owner: PropertyOwner;
  status: "active" | "pending" | "suspended";
  verification: "verified" | "pending" | "rejected";
  price: number;
  bookings: number;
  revenue: number;
  commission: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  bedrooms: number;
  guests: number;
  suspendedDate?: string;
  autoDeleteDate?: string;
}

export interface Collection {
  id: number;
  name: string;
  propertyCount: number;
  createdDate: string;
  description: string;
}

// ============================================
// Admin Billing Types
// ============================================

export interface CommissionHost {
  name: string;
  avatar?: string;
  initials?: string;
  verified: boolean;
}

export interface CommissionProperty {
  name: string;
  location: string;
  id: string;
}

export interface CommissionData {
  id: number;
  host: CommissionHost;
  property: CommissionProperty;
  totalBookings: number;
  grossRevenue: number;
  commission: number;
  tva: number;
  netRevenue: number;
  period: string;
  status: string;
}

export interface RefundHost {
  name: string;
  avatar?: string;
  initials?: string;
  verified: boolean;
}

export interface RefundProperty {
  name: string;
  location: string;
}

export interface RefundData {
  id: string;
  host: RefundHost;
  property: RefundProperty;
  amountRefunded: number;
  reason: string;
  date: string;
  status: string;
  affectedBookings: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  commission: number;
  tva: number;
  netRevenue: number;
}

// ============================================
// Admin Messages Types
// ============================================

export interface ConversationUser {
  name: string;
  avatar: string | null;
  initials?: string;
}

export interface Conversation {
  id: number;
  priority: "high" | "medium" | "low";
  guest: ConversationUser;
  host: ConversationUser;
  lastMessage: string;
  flaggedPortion: string | null;
  timestamp: string;
  flagReason: string;
  secondaryTags: string[];
  aiConfidence: number;
  status: "unreviewed" | "under-review" | "resolved";
  assignedAdmin?: string;
  violationCount: number;
}

// ============================================
// Admin Reservations Types
// ============================================

export interface ReservationProperty {
  name: string;
  location: string;
  image: string;
  id: string;
}

export interface ReservationUser {
  name: string;
  avatar: string | null;
  initials?: string;
  verified: boolean;
  previousBookings?: number;
}

export interface ReservationBooking {
  id: string;
  dates: string;
  status: "completed" | "in-progress" | "upcoming";
}

export interface Reservation {
  id: string;
  property: ReservationProperty;
  guest: ReservationUser;
  host: ReservationUser;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  commission: number;
  status:
    | "confirmed"
    | "requested"
    | "cancelled-guest"
    | "cancelled-host"
    | "checked-in"
    | "completed"
    | "disputed"
    | "rejected";
  daysUntil: number;
}

// ============================================
// Admin Reports Types
// ============================================

export interface ReportUser {
  name: string;
  avatar: string | null;
  initials?: string;
  userType: "guest" | "host";
}

export interface ReportProperty {
  name: string;
  location: string;
  id: string;
}

export interface ReportBooking {
  id: string;
  dates: string;
  status: "completed" | "in-progress" | "upcoming";
}

export interface Report {
  id: string;
  type:
    | "property"
    | "guest-behavior"
    | "host-behavior"
    | "payment"
    | "safety"
    | "fraud";
  filedBy: ReportUser;
  against: ReportUser;
  property: ReportProperty;
  booking: ReportBooking;
  status: "new" | "under-review" | "awaiting-info" | "resolved" | "closed";
  filedDate: string;
  description: string;
  evidence: string;
  assignedAdmin?: string;
}

// ============================================
// Admin Dashboard Types
// ============================================

export interface DashboardData {
  users: {
    total: number;
    guests: number;
    hosts: number;
    monthlyGrowth: number;
    percentageChange: number;
  };
  properties: {
    total: number;
    published: number;
    pending: number;
    weeklyAverage: number;
  };
  reservations: {
    total: number;
    upcoming: number;
    inProgress: number;
    occupancyRate: number;
  };
  revenue: {
    monthly: number;
    commission: number;
    commissionRate: number;
    percentageChange: number;
  };
}

export interface AlertsData {
  userVerifications: number;
  propertyVerifications: number;
  flaggedConversations: number;
  flaggedProperties: number;
  disputes: number;
  supportTickets: number;
}

export interface AdminDashboardBooking {
  id: number;
  property: {
    name: string;
    location: string;
    image: string;
  };
  guest: {
    name: string;
    avatar: string;
  };
  dates: string;
  value: number;
  commission: number;
  status: string;
  timestamp: string;
}

export interface ActivityItem {
  id: number;
  type: string;
  text: string;
  timestamp: string;
  icon: LucideIcon;
}

export interface DashboardMonthlyRevenue {
  month: string;
  total: number;
  host: number;
  commission: number;
}

// ============================================
// Admin Users Types
// ============================================

export interface AdminUserBasic {
  id: number;
  name: string;
}

export interface AdminUserWithVerification extends AdminUserBasic {
  verification: {
    status: string;
    document: string;
  };
}

// ============================================
// Admin Billing Types
// ============================================

export interface BillingFilters {
  dateFrom: string;
  dateTo: string;
  hostName: string;
  propertyName: string;
  grossAmountMin: string;
  grossAmountMax: string;
  status: string;
}

export interface RefundForm {
  hostId: string;
  hostName: string;
  propertyId: string;
  propertyName: string;
  amount: string;
  affectedBookings: string;
  reason: string;
}

export interface BillingMonthlyRevenue {
  month: string;
  revenue: number;
  commission: number;
  tva: number;
  netRevenue: number;
}

// ============================================
// Admin Properties Types
// ============================================

export interface AdminCollection {
  id: number;
  name: string;
  description?: string;
  propertyCount: number;
  createdDate?: string;
}

export interface StatusChangeData {
  propertyId: number;
  propertyName: string;
  currentStatus: string;
  newStatus: string;
}

// ============================================
// Admin Reports Types
// ============================================

export interface ReportStats {
  openDisputes: number;
  resolvedThisMonth: number;
  avgResolutionTime: number;
}

export interface ReportsExportFilters {
  status: string;
  type: string;
  filedBy: string;
  dateFrom: string;
  dateTo: string;
}

// ============================================
// Admin Messages Types
// ============================================

export interface MessagesFilters {
  userName: string;
  flagReason: string;
  dateFrom: string;
  dateTo: string;
  status: string;
}

export interface MessagesExportFilters {
  dateFrom: string;
  dateTo: string;
  userName: string;
  flagReason: string;
}

export interface ConfirmAction {
  type: "warn" | "suspend" | "false-positive";
  conversationId: number;
  userName: string;
}

// ============================================
// Admin Reservations Types
// ============================================

export interface ReservationsExportFilters {
  status: string;
  startDate: string;
  endDate: string;
  guestName: string;
}

// ============================================
// Admin Settings Types
// ============================================

export interface SettingsTab {
  id: string;
  label: string;
  icon: LucideIcon;
}
