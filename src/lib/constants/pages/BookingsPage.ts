import type { ClientBooking } from "@/lib/types/client";

export type { ClientBooking };

export const MOCK_BOOKINGS: ClientBooking[] = [
  {
    id: "1",
    property: "The Glass Pavilion",
    location: "Montecito, California",
    image:
      "https://images.unsplash.com/photo-1600596542815-2495db98dada?auto=format&fit=crop&q=80&w=400",
    checkIn: "2024-03-15",
    checkOut: "2024-03-20",
    status: "upcoming",
    price: "$6,000",
    guests: 4,
  },
  {
    id: "2",
    property: "Villa di Como",
    location: "Lake Como, Italy",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400",
    checkIn: "2024-04-10",
    checkOut: "2024-04-17",
    status: "upcoming",
    price: "$17,150",
    guests: 2,
  },
  {
    id: "3",
    property: "Kyoto Garden House",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=400",
    checkIn: "2024-01-10",
    checkOut: "2024-01-15",
    status: "completed",
    price: "$4,250",
    guests: 3,
  },
  {
    id: "4",
    property: "Alpine Chalet",
    location: "Zermatt, Switzerland",
    image:
      "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&q=80&w=400",
    checkIn: "2023-12-20",
    checkOut: "2023-12-27",
    status: "completed",
    price: "$12,600",
    guests: 6,
  },
  {
    id: "5",
    property: "Desert Modern",
    location: "Joshua Tree, CA",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=400",
    checkIn: "2024-02-01",
    checkOut: "2024-02-03",
    status: "cancelled",
    price: "$1,300",
    guests: 2,
  },
];
