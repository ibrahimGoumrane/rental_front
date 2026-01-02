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

// Shared constants used across multiple pages

export const STEPS = [
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

export const AMENITIES = [
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

export const PRIMARY_PROPERTY_TYPES = [
  {
    id: "villa",
    icon: Building,
    label: "Villa",
  },
  {
    id: "apartment",
    icon: Building,
    label: "Apartment",
  },
  {
    id: "house",
    icon: Castle,
    label: "House",
  },
  {
    id: "studio",
    icon: Building,
    label: "Studio",
  },
  {
    id: "penthouse",
    icon: Palmtree,
    label: "Penthouse",
  },
];

export const SECONDARY_PROPERTY_TYPES = [
  {
    id: "seaside",
    icon: Waves,
    label: "Seaside",
  },
  {
    id: "countryside",
    icon: Palmtree,
    label: "Countryside",
  },
  {
    id: "city",
    icon: Building,
    label: "City",
  },
  {
    id: "mountain",
    icon: Castle,
    label: "Mountain",
  },
];

export const RENTAL_MODES = [
  {
    id: "entire",
    icon: Home,
    label: "Entire place",
    description: "Guests have the whole place to themselves",
  },
  {
    id: "private-room",
    icon: BoxIcon,
    label: "Private room",
    description: "Guests have a private room but share some common spaces",
  },
  {
    id: "shared-room",
    icon: Building,
    label: "Shared room",
    description:
      "Guests sleep in a room or common area that may be shared with others",
  },
];

export const HOUSE_RULE_GROUPS = [
  {
    id: "general",
    label: "General Rules",
    rules: [
      {
        id: "respect_neighbors",
        label: "Respect neighbors",
      },
      {
        id: "no_parties",
        label: "No parties or events",
      },
      {
        id: "quiet_hours",
        label: "Respect quiet hours (10 PM - 8 AM)",
      },
      {
        id: "reasonable_condition",
        label: "Leave property in reasonable condition",
      },
      {
        id: "registered_only",
        label: "Only registered guests permitted",
      },
      {
        id: "visitors_declared",
        label: "All visitors must be declared",
      },
      {
        id: "max_occupancy",
        label: "Adhere to maximum occupancy",
      },
      {
        id: "no_overnight_guests",
        label: "No unregistered overnight guests",
      },
    ],
  },
  {
    id: "guest-requirements",
    label: "Guest Requirements",
    rules: [
      {
        id: "valid_id",
        label: "Valid ID required for all guests",
      },
      {
        id: "couples_laws",
        label: "Unmarried couples must comply with local laws",
      },
      {
        id: "respect_customs",
        label: "Respect local customs and traditions",
      },
      {
        id: "legal_compliance",
        label: "Comply with all local laws and regulations",
      },
    ],
  },
  {
    id: "smoking-alcohol",
    label: "Smoking & Alcohol",
    rules: [
      {
        id: "no_smoking",
        label: "No smoking inside",
      },
      {
        id: "designated_smoking",
        label: "Smoking in designated areas only",
      },
      {
        id: "alcohol_respectful",
        label: "Alcohol consumption must be respectful",
      },
      {
        id: "no_illegal_substances",
        label: "No illegal substances",
      },
    ],
  },
  {
    id: "pets",
    label: "Pets",
    rules: [
      {
        id: "no_pets",
        label: "No pets allowed",
      },
      {
        id: "pets_approved",
        label: "Pets must be pre-approved",
      },
      {
        id: "pets_quiet",
        label: "Pets must be well-behaved and quiet",
      },
    ],
  },
  {
    id: "property-use",
    label: "Property Use",
    rules: [
      {
        id: "no_commercial",
        label: "No commercial activities",
      },
      {
        id: "no_filming",
        label: "No filming or photography for commercial purposes",
      },
      {
        id: "furniture_moved",
        label: "No moving furniture without permission",
      },
      {
        id: "damage_responsibility",
        label: "Guests responsible for any damages",
      },
      {
        id: "report_issues",
        label: "Report any issues immediately",
      },
      {
        id: "reasonable_usage",
        label: "Reasonable use of utilities",
      },
    ],
  },
];
