import type {
  EarningsData,
  MonthlyEarning,
  PropertyEarning,
} from "@/lib/types/landlord";

export type { EarningsData, MonthlyEarning, PropertyEarning };

export const MOCK_EARNINGS_DATA: EarningsData = {
  thisMonth: 12450,
  lastMonth: 10550,
  totalAllTime: 87320,
  upcomingPayouts: 8900,
  commission: 1494,
};

export const MONTHLY_EARNINGS: MonthlyEarning[] = [
  {
    month: "Oct",
    gross: 8200,
    net: 7216,
  },
  {
    month: "Nov",
    gross: 9800,
    net: 8624,
  },
  {
    month: "Dec",
    gross: 11200,
    net: 9856,
  },
  {
    month: "Jan",
    gross: 10550,
    net: 9284,
  },
  {
    month: "Feb",
    gross: 10800,
    net: 9504,
  },
  {
    month: "Mar",
    gross: 12450,
    net: 10956,
  },
];

export const PROPERTY_EARNINGS: PropertyEarning[] = [
  {
    id: "1",
    name: "The Glass Pavilion",
    location: "Montecito, California",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=200",
    bookings: 12,
    gross: 14400,
    commission: 1728,
    net: 12672,
    avgPerBooking: 1200,
  },
  {
    id: "2",
    name: "Villa di Como",
    location: "Lake Como, Italy",
    image:
      "https://images.unsplash.com/photo-1600596542815-2495db9dc2c3?auto=format&fit=crop&q=80&w=200",
    bookings: 8,
    gross: 19600,
    commission: 2352,
    net: 17248,
    avgPerBooking: 2450,
  },
  {
    id: "3",
    name: "Kyoto Garden House",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=200",
    bookings: 15,
    gross: 12750,
    commission: 1530,
    net: 11220,
    avgPerBooking: 850,
  },
];
