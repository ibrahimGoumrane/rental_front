import { Users, Home, Calendar, DollarSign, Star } from "lucide-react";

export const DASHBOARD_DATA = {
  users: {
    total: 12847,
    guests: 10234,
    hosts: 2613,
    monthlyGrowth: 234,
    percentageChange: 1.9,
  },
  properties: {
    total: 3421,
    published: 2987,
    pending: 434,
    weeklyAverage: 15,
  },
  reservations: {
    total: 1892,
    upcoming: 1200,
    inProgress: 692,
    occupancyRate: 68,
  },
  revenue: {
    monthly: 284560,
    commission: 42684,
    commissionRate: 15,
    percentageChange: 12,
  },
  alerts: {
    userVerifications: 18,
    propertyVerifications: 26,
    flaggedConversations: 7,
    flaggedProperties: 3,
    disputes: 5,
    supportTickets: 12,
  },
};

export const RECENT_BOOKINGS = [
  {
    id: 1,
    property: {
      name: "The Glass Pavilion",
      location: "Montecito, CA",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=200",
    },
    guest: {
      name: "Sarah Jenkins",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    },
    dates: "Dec 28 → Jan 2",
    value: 850,
    commission: 127.5,
    status: "confirmed",
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    property: {
      name: "Villa di Como",
      location: "Lake Como, Italy",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=200",
    },
    guest: {
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    },
    dates: "Jan 5 → Jan 12",
    value: 2450,
    commission: 367.5,
    status: "confirmed",
    timestamp: "8 minutes ago",
  },
  {
    id: 3,
    property: {
      name: "Kyoto Garden House",
      location: "Kyoto, Japan",
      image:
        "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=200",
    },
    guest: {
      name: "Emma Thompson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
    },
    dates: "Jan 15 → Jan 20",
    value: 680,
    commission: 102,
    status: "pending",
    timestamp: "15 minutes ago",
  },
];

export const PLATFORM_ACTIVITY = [
  {
    id: 1,
    type: "user",
    icon: Users,
    text: "John Smith registered as Guest",
    timestamp: "1 minute ago",
  },
  {
    id: 2,
    type: "property",
    icon: Home,
    text: "Marina Beach Villa submitted for verification",
    timestamp: "5 minutes ago",
  },
  {
    id: 3,
    type: "booking",
    icon: Calendar,
    text: "Booking #4521 cancelled by host",
    timestamp: "12 minutes ago",
  },
  {
    id: 4,
    type: "review",
    icon: Star,
    text: "★★★★★ review posted for Downtown Loft",
    timestamp: "18 minutes ago",
  },
  {
    id: 5,
    type: "financial",
    icon: DollarSign,
    text: "$1,200 payout initiated to Sarah Ahmed",
    timestamp: "25 minutes ago",
  },
  {
    id: 6,
    type: "user",
    icon: Users,
    text: "Lisa Anderson registered as Host",
    timestamp: "32 minutes ago",
  },
];

export const REVENUE_DATA = [
  {
    month: "Jul",
    total: 180000,
    host: 158400,
    commission: 27000,
  },
  {
    month: "Aug",
    total: 210000,
    host: 184800,
    commission: 31500,
  },
  {
    month: "Sep",
    total: 195000,
    host: 171600,
    commission: 29250,
  },
  {
    month: "Oct",
    total: 230000,
    host: 202400,
    commission: 34500,
  },
  {
    month: "Nov",
    total: 265000,
    host: 233200,
    commission: 39750,
  },
  {
    month: "Dec",
    total: 284560,
    host: 250573,
    commission: 42684,
  },
];
