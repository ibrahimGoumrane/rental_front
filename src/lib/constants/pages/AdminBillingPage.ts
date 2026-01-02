import type {
  CommissionData,
  CommissionHost,
  CommissionProperty,
  RefundData,
  RefundHost,
  RefundProperty,
  MonthlyRevenue,
} from "@/lib/types/admin";

export type {
  CommissionData,
  CommissionHost,
  CommissionProperty,
  RefundData,
  RefundHost,
  RefundProperty,
  MonthlyRevenue,
};

export const COMMISSION_DATA: CommissionData[] = [
  {
    id: 1,
    host: {
      name: "Eleanor Martinez",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      initials: "EM",
      verified: true,
    },
    property: {
      name: "The Glass Pavilion",
      location: "Montecito, California",
      id: "prop-001",
    },
    totalBookings: 87,
    grossRevenue: 104400,
    commission: 10440,
    tva: 2088,
    netRevenue: 12528,
    period: "Dec 2024",
    status: "active",
  },
  {
    id: 2,
    host: {
      name: "Marco Rossi",
      initials: "MR",
      verified: true,
    },
    property: {
      name: "Villa di Como",
      location: "Lake Como, Italy",
      id: "prop-002",
    },
    totalBookings: 52,
    grossRevenue: 127400,
    commission: 12740,
    tva: 2548,
    netRevenue: 15288,
    period: "Dec 2024",
    status: "active",
  },
  {
    id: 3,
    host: {
      name: "Yuki Tanaka",
      initials: "YT",
      verified: true,
    },
    property: {
      name: "Kyoto Garden House",
      location: "Kyoto, Japan",
      id: "prop-003",
    },
    totalBookings: 95,
    grossRevenue: 80750,
    commission: 8075,
    tva: 1615,
    netRevenue: 9690,
    period: "Dec 2024",
    status: "active",
  },
  {
    id: 4,
    host: {
      name: "Sarah Jenkins",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
      initials: "SJ",
      verified: true,
    },
    property: {
      name: "Downtown Loft",
      location: "Manhattan, New York",
      id: "prop-004",
    },
    totalBookings: 156,
    grossRevenue: 49920,
    commission: 4992,
    tva: 998,
    netRevenue: 5990,
    period: "Dec 2024",
    status: "active",
  },
  {
    id: 5,
    host: {
      name: "Eleanor Martinez",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      initials: "EM",
      verified: true,
    },
    property: {
      name: "Coastal Retreat",
      location: "Malibu, California",
      id: "prop-005",
    },
    totalBookings: 34,
    grossRevenue: 68200,
    commission: 6820,
    tva: 1364,
    netRevenue: 8184,
    period: "Dec 2024",
    status: "active",
  },
];

export const REFUNDS_DATA: RefundData[] = [
  {
    id: "REF-H-001",
    host: {
      name: "Marco Rossi",
      initials: "MR",
      verified: true,
    },
    property: {
      name: "Villa di Como",
      location: "Lake Como, Italy",
    },
    amountRefunded: 2548,
    reason: "Guest cancellation - Full refund policy applied",
    date: "Dec 10, 2024",
    status: "processed",
    affectedBookings: 2,
  },
  {
    id: "REF-H-002",
    host: {
      name: "Eleanor Martinez",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      initials: "EM",
      verified: true,
    },
    property: {
      name: "The Glass Pavilion",
      location: "Montecito, California",
    },
    amountRefunded: 1200,
    reason: "Property maintenance issue - Host compensation",
    date: "Dec 12, 2024",
    status: "processed",
    affectedBookings: 1,
  },
  {
    id: "REF-H-003",
    host: {
      name: "Yuki Tanaka",
      initials: "YT",
      verified: true,
    },
    property: {
      name: "Kyoto Garden House",
      location: "Kyoto, Japan",
    },
    amountRefunded: 807,
    reason: "Billing error - Overpayment correction",
    date: "Dec 18, 2024",
    status: "pending",
    affectedBookings: 1,
  },
  {
    id: "REF-H-004",
    host: {
      name: "Sarah Jenkins",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
      initials: "SJ",
      verified: true,
    },
    property: {
      name: "Downtown Loft",
      location: "Manhattan, New York",
    },
    amountRefunded: 499,
    reason: "Dispute resolution - Partial refund to host",
    date: "Dec 20, 2024",
    status: "pending",
    affectedBookings: 1,
  },
];

export const MONTHLY_REVENUE: MonthlyRevenue[] = [
  {
    month: "Jul",
    revenue: 180000,
    commission: 18000,
    tva: 3600,
    netRevenue: 21600,
  },
  {
    month: "Aug",
    revenue: 210000,
    commission: 21000,
    tva: 4200,
    netRevenue: 25200,
  },
  {
    month: "Sep",
    revenue: 195000,
    commission: 19500,
    tva: 3900,
    netRevenue: 23400,
  },
  {
    month: "Oct",
    revenue: 230000,
    commission: 23000,
    tva: 4600,
    netRevenue: 27600,
  },
  {
    month: "Nov",
    revenue: 265000,
    commission: 26500,
    tva: 5300,
    netRevenue: 31800,
  },
  {
    month: "Dec",
    revenue: 284560,
    commission: 28456,
    tva: 5691,
    netRevenue: 34147,
  },
];
