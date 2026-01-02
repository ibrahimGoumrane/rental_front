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

export const LANDLORD_MOCK_PROPERTIES: DashboardProperty[] = [
  {
    id: "1",
    title: "The Glass Pavilion",
    location: "Montecito, California",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    monthlyEarnings: 4800,
    totalBookings: 12,
    occupancyRate: 85,
    status: "active",
  },
  {
    id: "2",
    title: "Villa di Como",
    location: "Lake Como, Italy",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    monthlyEarnings: 7350,
    totalBookings: 8,
    occupancyRate: 92,
    status: "active",
  },
  {
    id: "3",
    title: "Kyoto Garden House",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=600",
    monthlyEarnings: 2550,
    totalBookings: 15,
    occupancyRate: 78,
    status: "active",
  },
];

export const RECENT_RESERVATIONS: DashboardReservation[] = [
  {
    id: "1",
    propertyName: "The Glass Pavilion",
    clientName: "Sarah J.",
    checkIn: "Mar 15",
    checkOut: "Mar 20",
    status: "pending",
    amount: 6000,
  },
  {
    id: "2",
    propertyName: "Villa di Como",
    clientName: "Michael C.",
    checkIn: "Mar 18",
    checkOut: "Mar 25",
    status: "accepted",
    amount: 17150,
  },
  {
    id: "3",
    propertyName: "Kyoto Garden House",
    clientName: "Emma T.",
    checkIn: "Mar 22",
    checkOut: "Mar 27",
    status: "accepted",
    amount: 4250,
  },
];
