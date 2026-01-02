export interface PropertyOwner {
  name: string;
  avatar: string | null;
  initials?: string;
  verified: boolean;
}

export interface MockProperty {
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

export const ADMIN_MOCK_PROPERTIES: MockProperty[] = [
  {
    id: 1,
    title: "The Glass Pavilion",
    location: "Montecito, California",
    city: "Montecito",
    image:
      "https://images.unsplash.com/photo-1600596542815-2495db98dada?auto=format&fit=crop&q=80&w=400",
    type: "villa",
    owner: {
      name: "Eleanor Martinez",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      verified: true,
    },
    status: "active",
    verification: "verified",
    price: 1200,
    bookings: 87,
    revenue: 104400,
    commission: 15660,
    rating: 4.9,
    reviewCount: 128,
    featured: true,
    bedrooms: 4,
    guests: 8,
  },
  {
    id: 2,
    title: "Villa di Como",
    location: "Lake Como, Italy",
    city: "Como",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=400",
    type: "villa",
    owner: {
      name: "Marco Rossi",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
      verified: true,
    },
    status: "active",
    verification: "verified",
    price: 2450,
    bookings: 52,
    revenue: 127400,
    commission: 19110,
    rating: 4.7,
    reviewCount: 89,
    featured: false,
    bedrooms: 3,
    guests: 6,
  },
  {
    id: 3,
    title: "Kyoto Garden House",
    location: "Kyoto, Japan",
    city: "Kyoto",
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=400",
    type: "house",
    owner: {
      name: "Yuki Tanaka",
      avatar: null,
      initials: "YT",
      verified: true,
    },
    status: "active",
    verification: "verified",
    price: 850,
    bookings: 95,
    revenue: 80750,
    commission: 12112,
    rating: 4.8,
    reviewCount: 142,
    featured: false,
    bedrooms: 2,
    guests: 4,
  },
  {
    id: 4,
    title: "Marina Beach Villa",
    location: "Casablanca, Morocco",
    city: "Casablanca",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400",
    type: "villa",
    owner: {
      name: "Ahmed Hassan",
      avatar: null,
      initials: "AH",
      verified: false,
    },
    status: "pending",
    verification: "pending",
    price: 1800,
    bookings: 0,
    revenue: 0,
    commission: 0,
    rating: 0,
    reviewCount: 0,
    featured: false,
    bedrooms: 5,
    guests: 10,
  },
  {
    id: 5,
    title: "Downtown Loft",
    location: "New York, USA",
    city: "New York",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400",
    type: "apartment",
    owner: {
      name: "Sarah Jenkins",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
      verified: true,
    },
    status: "suspended",
    verification: "verified",
    price: 320,
    bookings: 156,
    revenue: 49920,
    commission: 7488,
    rating: 4.6,
    reviewCount: 203,
    featured: false,
    bedrooms: 1,
    guests: 2,
    suspendedDate: "2024-12-01",
    autoDeleteDate: "2024-12-31",
  },
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 1,
    name: "Luxury Villas",
    propertyCount: 24,
    createdDate: "Nov 15, 2024",
    description: "High-end luxury properties",
  },
  {
    id: 2,
    name: "Beachfront Properties",
    propertyCount: 18,
    createdDate: "Oct 22, 2024",
    description: "Properties with beach access",
  },
  {
    id: 3,
    name: "City Center Apartments",
    propertyCount: 42,
    createdDate: "Sep 10, 2024",
    description: "Urban downtown locations",
  },
  {
    id: 4,
    name: "Mountain Retreats",
    propertyCount: 15,
    createdDate: "Aug 5, 2024",
    description: "Scenic mountain properties",
  },
];
