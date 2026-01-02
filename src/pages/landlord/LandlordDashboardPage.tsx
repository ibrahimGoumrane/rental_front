import { useState } from "react";
import {
  LANDLORD_MOCK_PROPERTIES,
  RECENT_RESERVATIONS,
} from "@/lib/constants/pages/LandlordDashboardPage";
import { DashboardHeader } from "@/components/landlord/LandlordDashboardPage/DashboardHeader";
import { StatsGrid } from "@/components/landlord/LandlordDashboardPage/StatsGrid";
import { SectionHeader } from "@/components/landlord/LandlordDashboardPage/SectionHeader";
import { PropertyCard } from "@/components/landlord/LandlordDashboardPage/PropertyCard";
import { ReservationCard } from "@/components/landlord/LandlordDashboardPage/ReservationCard";
import { QuickActions } from "@/components/landlord/LandlordDashboardPage/QuickActions";

export function LandlordDashboardPage() {
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);
  const stats = {
    totalProperties: LANDLORD_MOCK_PROPERTIES.length,
    activeReservations: 8,
    monthlyEarnings: 12450,
    pendingRequests: 2,
  };
  return (
    <div className="min-h-screen bg-cream">
      <DashboardHeader userName="John" growthPercentage={18} />

      <section className="pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <StatsGrid stats={stats} />
        </div>
      </section>

      {/* Properties Portfolio Section */}
      <section className="py-12 px-6 md:px-12 bg-sand/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Your Properties"
            description="A curated collection of your finest offerings"
            viewAllLink="/landlord/properties"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LANDLORD_MOCK_PROPERTIES.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
                isHovered={hoveredProperty === property.id}
                onHover={setHoveredProperty}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reservations */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Recent Reservations"
            description="Stay on top of your upcoming bookings"
            viewAllLink="/landlord/reservations"
          />

          <div className="space-y-4">
            {RECENT_RESERVATIONS.map((reservation, index) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <QuickActions />
    </div>
  );
}
