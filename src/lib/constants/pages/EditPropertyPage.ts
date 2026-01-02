import {
  Home,
  MapPin,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Wifi,
  Car,
  Utensils,
  Tv,
  Wind,
  Waves,
  Building,
  Castle,
  Palmtree,
  BoxIcon,
} from "lucide-react";

export const EDIT_STEPS = [
  {
    id: 1,
    name: "Photos & Video",
    icon: ImageIcon,
  },
  {
    id: 2,
    name: "Details",
    icon: Home,
  },
  {
    id: 3,
    name: "Location",
    icon: MapPin,
  },
  {
    id: 4,
    name: "Pricing",
    icon: DollarSign,
  },
  {
    id: 5,
    name: "Rules",
    icon: FileText,
  },
];

export const EDIT_AMENITIES = [
  {
    id: "wifi",
    label: "Wifi",
    icon: Wifi,
  },
  {
    id: "parking",
    label: "Parking",
    icon: Car,
  },
  {
    id: "kitchen",
    label: "Kitchen",
    icon: Utensils,
  },
  {
    id: "tv",
    label: "TV",
    icon: Tv,
  },
  {
    id: "ac",
    label: "Air Conditioning",
    icon: Wind,
  },
  {
    id: "pool",
    label: "Pool",
    icon: Waves,
  },
];

export const EDIT_PRIMARY_PROPERTY_TYPES = [
  {
    id: "apartment",
    label: "Apartment",
    icon: Building,
  },
  {
    id: "house",
    label: "House",
    icon: Home,
  },
  {
    id: "villa",
    label: "Villa",
    icon: Castle,
  },
  {
    id: "studio",
    label: "Studio",
    icon: BoxIcon,
  },
  {
    id: "riad",
    label: "Riad",
    icon: Palmtree,
  },
];

export const EDIT_SECONDARY_PROPERTY_TYPES = [
  {
    id: "guesthouse",
    label: "Guesthouse",
  },
  {
    id: "duplex",
    label: "Duplex",
  },
  {
    id: "penthouse",
    label: "Penthouse",
  },
  {
    id: "traditional",
    label: "Traditional House",
  },
];

export const EDIT_RENTAL_MODES = [
  {
    id: "entire",
    label: "Entire place",
  },
  {
    id: "private",
    label: "Private room",
  },
  {
    id: "shared",
    label: "Shared room",
  },
];

export const EDIT_HOUSE_RULE_GROUPS = [
  {
    id: "conduct",
    title: "General Conduct",
    rules: [
      {
        id: "respect_neighbors",
        label: "Respect neighbors and avoid excessive noise",
      },
      {
        id: "no_parties",
        label: "No parties or large gatherings",
      },
      {
        id: "quiet_hours",
        label: "Quiet hours respected (e.g., after 11:00 PM)",
      },
      {
        id: "reasonable_condition",
        label: "Property must be returned in reasonable condition",
      },
    ],
  },
  {
    id: "guests",
    title: "Guests & Occupancy",
    rules: [
      {
        id: "registered_only",
        label: "Only registered guests are allowed to stay",
      },
      {
        id: "visitors_declared",
        label: "Visitors must be declared in advance",
      },
      {
        id: "max_occupancy",
        label: "Maximum occupancy must not be exceeded",
      },
      {
        id: "no_overnight_guests",
        label: "Overnight guests not listed in the reservation are not allowed",
      },
    ],
  },
  {
    id: "local",
    title: "Local Regulations",
    rules: [
      {
        id: "valid_id",
        label: "Valid identification required for all guests (CIN or passport)",
      },
      {
        id: "couples_laws",
        label: "Couples must comply with local laws and house requirements",
      },
      {
        id: "respect_customs",
        label: "Respect local customs and neighborhood norms",
      },
      {
        id: "legal_compliance",
        label: "No activities contrary to Moroccan law",
      },
    ],
  },
  {
    id: "smoking_pets",
    title: "Smoking & Pets",
    rules: [
      {
        id: "no_smoking",
        label: "No smoking inside the property",
      },
      {
        id: "designated_smoking",
        label: "Smoking allowed only in designated areas",
      },
      {
        id: "alcohol_respectful",
        label: "Alcohol consumption allowed respectfully",
      },
      {
        id: "no_illegal_substances",
        label: "No illegal substances",
      },
      {
        id: "no_pets",
        label: "Pets are not allowed",
      },
      {
        id: "pets_approved",
        label: "Pets allowed with prior approval",
      },
      {
        id: "pets_quiet",
        label: "Pets must not disturb neighbors",
      },
    ],
  },
  {
    id: "property_safety",
    title: "Property & Safety",
    rules: [
      {
        id: "no_commercial",
        label: "No commercial or professional use",
      },
      {
        id: "no_filming",
        label: "No filming or photography for commercial purposes",
      },
      {
        id: "furniture_moved",
        label: "Furniture and appliances must not be moved",
      },
      {
        id: "damage_responsibility",
        label: "Guests are responsible for any damage",
      },
      {
        id: "report_issues",
        label: "Report any issue immediately to the host",
      },
      {
        id: "reasonable_usage",
        label: "Electrical and water usage must be reasonable",
      },
    ],
  },
];

export const EDIT_MOCK_PROPERTY_DATA = {
  "1": {
    title: "The Glass Pavilion",
    propertyType: {
      primary: "villa",
      secondary: "",
      rentalMode: "entire",
    },
    description:
      "Nestled in the prestigious hills of Montecito, The Glass Pavilion represents the pinnacle of modern architectural design. Surrounded by five acres of oak groves, this Steve Hermann design is completely enclosed in glass.",
    bedrooms: 4,
    beds: 6,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ["wifi", "pool", "kitchen", "parking", "ac"],
    address: "123 Pavilion Drive",
    city: "Montecito",
    country: "United States",
    basePrice: "1200",
    cleaningFee: "150",
    minStay: 2,
    maxStay: 30,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    houseRules: {
      no_smoking: true,
      no_pets: true,
      no_parties: true,
      quiet_hours: true,
      respect_neighbors: true,
    },
    cancellationPolicy: "moderate",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
    ],
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
};
