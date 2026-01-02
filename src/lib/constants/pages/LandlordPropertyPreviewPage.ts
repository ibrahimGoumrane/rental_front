import {
  Wifi,
  Coffee,
  Car,
  Wind,
  Utensils,
  Tv,
  Waves,
  Trees,
  MapPin,
  Key,
  Sparkles,
  LucideIcon,
} from "lucide-react";

export interface PropertyType {
  primary: "villa" | "apartment" | "house" | "studio" | "penthouse";
  secondary?: string;
  rentalMode: "entire" | "private-room" | "shared-room";
}

export interface HouseRules {
  respect_neighbors: boolean;
  no_parties: boolean;
  quiet_hours: boolean;
  reasonable_condition: boolean;
  registered_only: boolean;
  visitors_declared: boolean;
  max_occupancy: boolean;
  no_overnight_guests: boolean;
  valid_id: boolean;
  couples_laws: boolean;
  respect_customs: boolean;
  legal_compliance: boolean;
  no_smoking: boolean;
  designated_smoking: boolean;
  alcohol_respectful: boolean;
  no_illegal_substances: boolean;
  no_pets: boolean;
  pets_approved: boolean;
  pets_quiet: boolean;
  no_commercial: boolean;
  no_filming: boolean;
  furniture_moved: boolean;
  damage_responsibility: boolean;
  report_issues: boolean;
  reasonable_usage: boolean;
}
export interface Review {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
  verified: boolean;
}
export interface PropertyData {
  title: string;
  location: string;
  price: string;
  videoUrl: string;
  images: string[];
  propertyType: PropertyType;
  stats: {
    type: string;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  highlights: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
  }>;
  description: string;
  amenities: Array<{
    icon: LucideIcon;
    label: string;
  }>;
  rules: string[];
  houseRules: HouseRules;
  policies: {
    cancellation: string;
    safety: string[];
  };
  availabilityStatus: string;
  rating: number;
  reviewCount: number;
  ratingBreakdown: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
  reviews: Array<Review>;
  host: {
    name: string;
    avatar: string;
    bio: string;
    verified: boolean;
    joinedYear: number;
    rating: number;
    reviewCount: number;
    responseRate: string;
    responseTime: string;
  };
  locationData: {
    neighborhood: string;
    lat: number;
    lng: number;
  };
}
export const PREVIEW_MOCK_PROPERTY_DATA: Record<string, PropertyData> = {
  "1": {
    title: "The Glass Pavilion",
    location: "Montecito, California",
    price: "$1,200",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    images: [
      "https://images.unsplash.com/photo-1600596542815-2495db98dada?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000",
    ],
    propertyType: {
      primary: "villa",
      secondary: "penthouse",
      rentalMode: "entire",
    },
    stats: {
      type: "Entire home",
      bedrooms: 4,
      beds: 6,
      bathrooms: 3.5,
    },
    highlights: [
      {
        icon: MapPin,
        title: "Great location",
        description: "95% of recent guests gave the location a 5-star rating.",
      },
      {
        icon: Key,
        title: "Self check-in",
        description: "Check yourself in with the keypad.",
      },
      {
        icon: Sparkles,
        title: "Sparkling clean",
        description: "Recent guests said this place was spotless.",
      },
    ],
    description: `Nestled in the prestigious hills of Montecito, The Glass Pavilion represents the pinnacle of modern architectural design. Surrounded by five acres of oak groves, this Steve Hermann design is completely enclosed in glass, allowing for unobstructed views of the surrounding nature while maintaining complete privacy.

The home features a kitchen by Varenna, and bathrooms with fixtures by Antonio Lupi. The walnut lined art gallery is large enough to display your car collection of up to 32 cars. This is not just a home; it is a piece of art that you can live in.

Guest access
Guests have full access to the main house, infinity pool, and the surrounding 5 acres of private gardens. The art gallery/garage is available upon request.

Other things to note
The property is located in a quiet residential area. We ask that you respect our neighbors' privacy and keep noise levels down after 10 PM.`,
    amenities: [
      {
        icon: Wifi,
        label: "High-speed Wifi",
      },
      {
        icon: Coffee,
        label: "Espresso Machine",
      },
      {
        icon: Car,
        label: "Private Parking",
      },
      {
        icon: Wind,
        label: "Air Conditioning",
      },
      {
        icon: Utensils,
        label: "Chef's Kitchen",
      },
      {
        icon: Tv,
        label: "Home Theater",
      },
      {
        icon: Waves,
        label: "Infinity Pool",
      },
      {
        icon: Trees,
        label: "Private Garden",
      },
    ],
    rules: [
      "No smoking inside the property",
      "No pets allowed without prior approval",
      "Check-in after 3:00 PM",
      "Check-out before 11:00 AM",
      "No parties or events",
      "Quiet hours after 10:00 PM",
    ],
    houseRules: {
      respect_neighbors: true,
      no_parties: true,
      quiet_hours: true,
      reasonable_condition: true,
      registered_only: true,
      visitors_declared: false,
      max_occupancy: true,
      no_overnight_guests: true,
      valid_id: true,
      couples_laws: true,
      respect_customs: true,
      legal_compliance: true,
      no_smoking: true,
      designated_smoking: false,
      alcohol_respectful: true,
      no_illegal_substances: true,
      no_pets: false,
      pets_approved: true,
      pets_quiet: true,
      no_commercial: true,
      no_filming: false,
      furniture_moved: true,
      damage_responsibility: true,
      report_issues: true,
      reasonable_usage: true,
    },
    policies: {
      cancellation:
        "Free cancellation for 48 hours. After that, cancel up to 7 days before check-in and get a 50% refund, minus the service fee.",
      safety: [
        "Smoke alarm",
        "Carbon monoxide alarm",
        "First aid kit",
        "Fire extinguisher",
      ],
    },
    availabilityStatus: "Available",
    rating: 4.92,
    reviewCount: 128,
    ratingBreakdown: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.8,
      checkIn: 5.0,
      value: 4.7,
    },
    reviews: [
      {
        id: 1,
        name: "Sarah Jenkins",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
        date: "October 2023",
        rating: 5,
        comment:
          "Absolutely breathtaking. The photos don't do it justice. Waking up to the sunrise through the glass walls was a spiritual experience.",
        verified: true,
      },
      {
        id: 2,
        name: "Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
        date: "September 2023",
        rating: 5,
        comment:
          "Eleanor was a fantastic host. The property was pristine and the location is unmatched for privacy and luxury.",
        verified: true,
      },
    ],
    host: {
      name: "You",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      bio: "Curating exceptional stays for discerning travelers since 2015. I specialize in architectural landmarks and historic estates.",
      verified: true,
      joinedYear: 2015,
      rating: 4.95,
      reviewCount: 342,
      responseRate: "100%",
      responseTime: "within an hour",
    },
    locationData: {
      neighborhood:
        "Montecito is known for its celebrity residents and stunning coastal landscape. You're just minutes from Butterfly Beach and the Upper Village.",
      lat: 34.4367,
      lng: -119.6321,
    },
  },
};
