import type { LucideIcon } from "lucide-react";

// ============================================
// Client Listings Types
// ============================================

export interface ListingProperty {
  id: string;
  title: string;
  location: string;
  price: string;
  priceValue: number;
  image: string;
  videoUrl: string;
  size: "large" | "medium" | "small";
  rating: number;
  propertyType: string;
  amenities: string[];
  bedrooms: number;
  beds: number;
  bathrooms: number;
  available: boolean;
}

export interface SortOption {
  value: "recommended" | "price-low" | "price-high" | "rating";
  label: string;
}

// ============================================
// Client Bookings Types
// ============================================

export interface ClientBooking {
  id: string;
  property: string;
  location: string;
  image: string;
  checkIn: string;
  checkOut: string;
  status: string;
  price: string;
  guests: number;
}

export interface StatusChip {
  id: string;
  label: string;
  count: number;
}

export interface DateRange {
  start: string;
  end: string;
}

// ============================================
// Client Property Detail Types
// ============================================

export interface PropertyStats {
  type: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

export interface PropertyHighlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PropertyAmenity {
  icon: LucideIcon;
  label: string;
}

export interface PropertyPolicies {
  cancellation: string;
  safety: string[];
}

export interface RatingBreakdown {
  cleanliness: number;
  accuracy: number;
  communication: number;
  location: number;
  checkIn: number;
  value: number;
}

export interface PropertyReview {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
  verified: boolean;
}

export interface PropertyHost {
  name: string;
  avatar: string;
  bio: string;
  verified: boolean;
  joinedYear: number;
  rating: number;
  reviewCount: number;
  responseRate: string;
  responseTime: string;
}

export interface PropertyLocationData {
  neighborhood: string;
  lat: number;
  lng: number;
}

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
  reviews: Array<PropertyReview>;
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

// ============================================
// Client Account Settings Types
// ============================================

export interface SettingsSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  dateOfBirth: string;
  address: string;
}

export interface NotificationItem {
  label: string;
  description: string;
}

// ============================================
// Client Bookings Types
// ============================================

export interface StatusChip {
  id: string;
  label: string;
  count: number;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface ClientBooking {
  id: string;
  property: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  price: string;
  image: string;
  status: string;
}

// ============================================
// Client Listings Types
// ============================================

export interface SortOption {
  value: "recommended" | "price-low" | "price-high" | "rating";
  label: string;
}
