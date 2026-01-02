import type {
  Report,
  ReportUser,
  ReportProperty,
  ReportBooking,
} from "@/lib/types/admin";

export type { Report, ReportUser, ReportProperty, ReportBooking };

// Keep MockReport as alias for backward compatibility
export type MockReport = Report;

export const MOCK_REPORTS: Report[] = [
  {
    id: "RPT-2024-0847",
    type: "property",
    filedBy: {
      name: "Sarah Jenkins",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
      userType: "guest",
    },
    against: {
      name: "Eleanor Martinez",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      userType: "host",
    },
    property: {
      name: "The Glass Pavilion",
      location: "Montecito, CA",
      id: "prop-001",
    },
    booking: {
      id: "BK-2024-12847",
      dates: "Dec 28 → Jan 2",
      status: "completed",
    },
    status: "new",
    filedDate: "Dec 28, 2024 at 3:42 PM",
    description: "Property not as described, missing amenities",
    evidence: "Photos attached showing missing pool and gym",
  },
  {
    id: "RPT-2024-0848",
    type: "payment",
    filedBy: {
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
      userType: "guest",
    },
    against: {
      name: "Marco Rossi",
      avatar: null,
      initials: "MR",
      userType: "host",
    },
    property: {
      name: "Villa di Como",
      location: "Lake Como, Italy",
      id: "prop-002",
    },
    booking: {
      id: "BK-2024-12848",
      dates: "Jan 5 → Jan 12",
      status: "upcoming",
    },
    status: "under-review",
    filedDate: "Dec 27, 2024 at 10:15 AM",
    description: "Unauthorized charges on credit card",
    evidence: "Bank statement showing duplicate charges",
  },
  {
    id: "RPT-2024-0849",
    type: "guest-behavior",
    filedBy: {
      name: "Yuki Tanaka",
      avatar: null,
      initials: "YT",
      userType: "host",
    },
    against: {
      name: "Emma Thompson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
      userType: "guest",
    },
    property: {
      name: "Kyoto Garden House",
      location: "Kyoto, Japan",
      id: "prop-003",
    },
    booking: {
      id: "BK-2024-12849",
      dates: "Jan 15 → Jan 20",
      status: "in-progress",
    },
    status: "resolved",
    filedDate: "Dec 26, 2024 at 2:30 PM",
    description: "Guest violated house rules - unauthorized party",
    evidence: "Neighbor complaints and security footage",
  },
  {
    id: "RPT-2024-0850",
    type: "safety",
    filedBy: {
      name: "Lisa Anderson",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      userType: "guest",
    },
    against: {
      name: "Ahmed Hassan",
      avatar: null,
      initials: "AH",
      userType: "host",
    },
    property: {
      name: "Marina Beach Villa",
      location: "Casablanca, Morocco",
      id: "prop-004",
    },
    booking: {
      id: "BK-2024-12850",
      dates: "Dec 25 → Dec 27",
      status: "completed",
    },
    status: "awaiting-info",
    filedDate: "Dec 25, 2024 at 8:00 PM",
    description: "Safety hazard - broken locks and windows",
    evidence: "Photos of damaged locks and windows",
  },
];
