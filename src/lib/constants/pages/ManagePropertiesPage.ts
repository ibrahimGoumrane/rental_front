import type { ManageProperty } from "@/lib/types/landlord";

export type { ManageProperty };

export const MANAGE_MOCK_PROPERTIES: ManageProperty[] = [
  {
    id: "1",
    title: "The Glass Pavilion",
    location: "Montecito, California",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
    status: "active",
    monthlyEarnings: 4800,
    totalBookings: 12,
    occupancyRate: 85,
    basePrice: 1200,
    bedrooms: 4,
    beds: 6,
    bathrooms: 3,
  },
  {
    id: "2",
    title: "Villa di Como",
    location: "Lake Como, Italy",
    image:
      "https://images.unsplash.com/photo-1600596542815-2495db9dc2c3?auto=format&fit=crop&q=80&w=600",
    status: "active",
    monthlyEarnings: 7350,
    totalBookings: 8,
    occupancyRate: 92,
    basePrice: 2450,
    bedrooms: 3,
    beds: 5,
    bathrooms: 2,
  },
  {
    id: "3",
    title: "Kyoto Garden House",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=600",
    status: "active",
    monthlyEarnings: 2550,
    totalBookings: 15,
    occupancyRate: 78,
    basePrice: 850,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
  },
  {
    id: "4",
    title: "Alpine Chalet",
    location: "Zermatt, Switzerland",
    image:
      "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&q=80&w=600",
    status: "inactive",
    monthlyEarnings: 0,
    totalBookings: 0,
    occupancyRate: 0,
    basePrice: 1800,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
  },
];
