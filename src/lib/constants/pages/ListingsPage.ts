import type { ListingProperty } from "@/lib/types/client";

export type { ListingProperty };

export const PROPERTIES: ListingProperty[] = [
  {
    id: "1",
    title: "The Glass Pavilion",
    location: "Montecito, California",
    price: "$1,200",
    priceValue: 1200,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    size: "large" as const,
    rating: 4.9,
    propertyType: "entire",
    amenities: ["Wifi", "Pool", "Kitchen", "Parking", "AC"],
    bedrooms: 4,
    beds: 6,
    bathrooms: 3,
    available: true,
  },
  {
    id: "2",
    title: "Villa di Como",
    location: "Lake Como, Italy",
    price: "$2,450",
    priceValue: 2450,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    size: "medium" as const,
    rating: 4.7,
    propertyType: "entire",
    amenities: ["Wifi", "Pool", "Kitchen", "Parking"],
    bedrooms: 3,
    beds: 5,
    bathrooms: 2,
    available: true,
  },
  {
    id: "3",
    title: "Kyoto Garden House",
    location: "Kyoto, Japan",
    price: "$850",
    priceValue: 850,
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=1000",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    size: "small" as const,
    rating: 4.8,
    propertyType: "private",
    amenities: ["Wifi", "Kitchen", "AC"],
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    available: true,
  },
  {
    id: "4",
    title: "Alpine Chalet",
    location: "Zermatt, Switzerland",
    price: "$1,800",
    priceValue: 1800,
    image:
      "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&q=80&w=1000",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    size: "medium" as const,
    rating: 4.6,
    propertyType: "entire",
    amenities: ["Wifi", "Kitchen", "Parking", "AC"],
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    available: false,
  },
  {
    id: "5",
    title: "Desert Modern",
    location: "Joshua Tree, CA",
    price: "$650",
    priceValue: 650,
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
    size: "small" as const,
    rating: 4.5,
    propertyType: "shared",
    amenities: ["Wifi", "Pool", "AC"],
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    available: true,
  },
  {
    id: "6",
    title: "Parisian Loft",
    location: "Le Marais, Paris",
    price: "$920",
    priceValue: 920,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-view-of-the-city-from-above-at-night-4467-large.mp4",
    size: "medium" as const,
    rating: 4.8,
    propertyType: "private",
    amenities: ["Wifi", "Kitchen"],
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    available: true,
  },
];

export const LOCATIONS = [
  "Montecito, California",
  "Lake Como, Italy",
  "Kyoto, Japan",
  "Zermatt, Switzerland",
  "Joshua Tree, CA",
  "Le Marais, Paris",
];
