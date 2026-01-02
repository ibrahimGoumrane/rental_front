import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { MOCK_BOOKINGS } from "@/lib/constants/pages/BookingsPage";
import { BookingSearchBar } from "@/components/client/BookingsPage/BookingSearchBar";
import { StatusChips } from "@/components/client/BookingsPage/StatusChips";
import { DateRangePicker } from "@/components/client/BookingsPage/DateRangePicker";
import { BookingCard } from "@/components/client/BookingsPage/BookingCard";
import { CancelBookingModal } from "@/components/client/BookingsPage/CancelBookingModal";
import { EmptyBookingsState } from "@/components/client/BookingsPage/EmptyBookingsState";
export function BookingsPage() {
  const [activeStatus, setActiveStatus] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const handleCancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: "cancelled",
            }
          : b
      )
    );
    setBookingToCancel(null);
  };
  const statusChips = [
    {
      id: "all",
      label: "All Bookings",
      count: bookings.length,
    },
    {
      id: "upcoming",
      label: "Upcoming",
      count: bookings.filter((b) => b.status === "upcoming").length,
    },
    {
      id: "completed",
      label: "Completed",
      count: bookings.filter((b) => b.status === "completed").length,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: bookings.filter((b) => b.status === "cancelled").length,
    },
  ];
  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      activeStatus === "all" || booking.status === activeStatus;
    const matchesSearch =
      booking.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-sand pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-charcoal mb-2">
            My Bookings
          </h1>
          <p className="text-charcoal/60">
            Manage and track all your reservations
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <BookingSearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Status Chips */}
          <div className="mb-6">
            <StatusChips
              chips={statusChips}
              active={activeStatus}
              onSelect={(id) => setActiveStatus(id as any)}
            />
          </div>

          {/* Date Range Picker */}
          <div className="flex flex-wrap gap-3">
            <DateRangePicker
              dateRange={dateRange}
              onChange={setDateRange}
              isOpen={showDatePicker}
              onToggle={() => setShowDatePicker(!showDatePicker)}
            />

            {(dateRange.start || dateRange.end || searchQuery) && (
              <button
                onClick={() => {
                  setDateRange({ start: "", end: "" });
                  setSearchQuery("");
                }}
                className="flex items-center space-x-1 px-3 py-2 text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors text-sm font-medium"
              >
                <X className="w-4 h-4" />
                <span>Clear filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredBookings.map((booking, index) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                index={index}
                onCancel={setBookingToCancel}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Cancel Confirmation Modal */}
        <CancelBookingModal
          isOpen={!!bookingToCancel}
          onClose={() => setBookingToCancel(null)}
          onConfirm={() => {
            if (bookingToCancel) handleCancelBooking(bookingToCancel);
          }}
        />

        {filteredBookings.length === 0 && <EmptyBookingsState />}
      </div>
    </div>
  );
}
