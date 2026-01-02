export interface UserVerification {
  status: "verified" | "pending" | "rejected";
  document: string;
  documentUrl: string | null;
  date: string | null;
}

export interface MockUser {
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

export const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "s***@gmail.com",
    phone: "+212 6XX XXX XXX",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    type: "guest",
    verification: {
      status: "verified",
      document: "CIN",
      documentUrl: "https://example.com/doc.pdf",
      date: "Dec 15, 2024",
    },
    bookings: 23,
    properties: 0,
    status: "active",
    registered: "Nov 12, 2024",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m***@outlook.com",
    phone: "+1 5XX XXX XXXX",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    type: "host",
    verification: {
      status: "verified",
      document: "Passport",
      documentUrl: "https://example.com/passport.jpg",
      date: "Jan 3, 2024",
    },
    bookings: 0,
    properties: 4,
    totalBookings: 87,
    status: "active",
    registered: "Jan 5, 2024",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Emma Thompson",
    email: "e***@yahoo.com",
    phone: "+44 7XX XXX XXXX",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
    type: "both",
    verification: {
      status: "pending",
      document: "CIN",
      documentUrl: "https://example.com/cin-pending.jpg",
      date: null,
    },
    bookings: 8,
    properties: 2,
    totalBookings: 15,
    status: "active",
    registered: "Dec 20, 2024",
    lastActive: "5 minutes ago",
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    email: "a***@gmail.com",
    phone: "+212 6XX XXX XXX",
    avatar: null,
    initials: "AH",
    type: "guest",
    verification: {
      status: "rejected",
      document: "CIN",
      documentUrl: null,
      date: null,
    },
    bookings: 2,
    properties: 0,
    status: "suspended",
    suspendedUntil: "Jan 30, 2025",
    registered: "Oct 8, 2024",
    lastActive: "3 weeks ago",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "l***@proton.me",
    phone: "+1 3XX XXX XXXX",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    type: "host",
    verification: {
      status: "verified",
      document: "Passport",
      documentUrl: "https://example.com/passport2.pdf",
      date: "Nov 28, 2024",
    },
    bookings: 0,
    properties: 1,
    totalBookings: 5,
    status: "active",
    registered: "Nov 15, 2024",
    lastActive: "30 minutes ago",
  },
];
