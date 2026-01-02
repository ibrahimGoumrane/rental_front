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

export interface MockReservation {
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

export const MOCK_RESERVATIONS: MockReservation[] = [
  {
    id: "BK-2024-12847",
    property: {
      name: "The Glass Pavilion",
      location: "Montecito, CA",
      image:
        "https://images.unsplash.com/photo-1600596542815-2495db98dada?auto=format&fit=crop&q=80&w=200",
      id: "prop-001",
    },
    guest: {
      name: "Sarah Jenkins",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
      verified: true,
      previousBookings: 23,
    },
    host: {
      name: "Eleanor Martinez",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      verified: true,
    },
    checkIn: "Dec 28, 2024",
    checkOut: "Jan 2, 2025",
    nights: 5,
    total: 850,
    commission: 127.5,
    status: "confirmed",
    daysUntil: 3,
  },
  {
    id: "BK-2024-12848",
    property: {
      name: "Villa di Como",
      location: "Lake Como, Italy",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=200",
      id: "prop-002",
    },
    guest: {
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
      verified: true,
      previousBookings: 8,
    },
    host: {
      name: "Marco Rossi",
      avatar: null,
      initials: "MR",
      verified: true,
    },
    checkIn: "Jan 5, 2025",
    checkOut: "Jan 12, 2025",
    nights: 7,
    total: 2450,
    commission: 367.5,
    status: "confirmed",
    daysUntil: 11,
  },
  {
    id: "BK-2024-12849",
    property: {
      name: "Kyoto Garden House",
      location: "Kyoto, Japan",
      image:
        "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=200",
      id: "prop-003",
    },
    guest: {
      name: "Emma Thompson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
      verified: false,
      previousBookings: 2,
    },
    host: {
      name: "Yuki Tanaka",
      avatar: null,
      initials: "YT",
      verified: true,
    },
    checkIn: "Jan 15, 2025",
    checkOut: "Jan 20, 2025",
    nights: 5,
    total: 680,
    commission: 102,
    status: "requested",
    daysUntil: 21,
  },
  {
    id: "BK-2024-12850",
    property: {
      name: "Downtown Loft",
      location: "New York, USA",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=200",
      id: "prop-004",
    },
    guest: {
      name: "Ahmed Hassan",
      avatar: null,
      initials: "AH",
      verified: false,
      previousBookings: 1,
    },
    host: {
      name: "Sarah Jenkins",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
      verified: true,
    },
    checkIn: "Dec 20, 2024",
    checkOut: "Dec 22, 2024",
    nights: 2,
    total: 320,
    commission: 48,
    status: "cancelled-guest",
    daysUntil: -5,
  },
  {
    id: "BK-2024-12851",
    property: {
      name: "Marina Beach Villa",
      location: "Casablanca, Morocco",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=200",
      id: "prop-005",
    },
    guest: {
      name: "Lisa Anderson",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      verified: true,
      previousBookings: 15,
    },
    host: {
      name: "Ahmed Hassan",
      avatar: null,
      initials: "AH",
      verified: false,
    },
    checkIn: "Dec 25, 2024",
    checkOut: "Dec 27, 2024",
    nights: 2,
    total: 1200,
    commission: 180,
    status: "disputed",
    daysUntil: 0,
  },
];
