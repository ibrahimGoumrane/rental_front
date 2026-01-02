import { useState } from "react";
import {
  MOCK_EARNINGS_DATA,
  MONTHLY_EARNINGS,
  PROPERTY_EARNINGS,
} from "@/lib/constants/pages/LandlordEarningsPage";
import { EarningsPageHeader } from "@/components/landlord/LandlordEarningsPage/EarningsPageHeader";
import { EarningsFilterBar } from "@/components/landlord/LandlordEarningsPage/EarningsFilterBar";
import { EarningsStatsCards } from "@/components/landlord/LandlordEarningsPage/EarningsStatsCards";
import { MonthlyPerformanceChart } from "@/components/landlord/LandlordEarningsPage/MonthlyPerformanceChart";
import { PropertyEarningsBreakdown } from "@/components/landlord/LandlordEarningsPage/PropertyEarningsBreakdown";

export function LandlordEarningsPage() {
  const [filterBy, setFilterBy] = useState<"all" | "property">("all");
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [timeRange, setTimeRange] = useState<"6months" | "1year" | "all">(
    "6months"
  );

  // Filter property earnings
  const filteredEarnings =
    filterBy === "property" && selectedProperty
      ? PROPERTY_EARNINGS.filter((p) => p.id === selectedProperty)
      : PROPERTY_EARNINGS;

  const totalFiltered = filteredEarnings.reduce(
    (acc, p) => ({
      gross: acc.gross + p.gross,
      net: acc.net + p.net,
      bookings: acc.bookings + p.bookings,
    }),
    {
      gross: 0,
      net: 0,
      bookings: 0,
    }
  );

  const handleExport = () => {
    console.log("Exporting earnings report...");
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <EarningsPageHeader onExport={handleExport} />

        <EarningsFilterBar
          filterBy={filterBy}
          selectedProperty={selectedProperty}
          timeRange={timeRange}
          showFilterDropdown={showFilterDropdown}
          properties={PROPERTY_EARNINGS}
          onFilterChange={setFilterBy}
          onPropertySelect={setSelectedProperty}
          onTimeRangeChange={setTimeRange}
          onToggleDropdown={() => setShowFilterDropdown(!showFilterDropdown)}
        />

        <EarningsStatsCards earnings={MOCK_EARNINGS_DATA} />

        <MonthlyPerformanceChart monthlyEarnings={MONTHLY_EARNINGS} />

        <PropertyEarningsBreakdown
          properties={filteredEarnings}
          filterBy={filterBy}
          totalFiltered={filterBy === "property" ? totalFiltered : undefined}
        />
      </div>
    </div>
  );
}
