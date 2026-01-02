import { AlertCircle } from "lucide-react";
import { useState } from "react";
import {
  MOCK_RESERVATIONS,
  MockReservation,
} from "@/lib/constants/pages/AdminReservationsPage";
import {
  PageHeader,
  FilterBar,
  ReservationsTable,
  ExportModal,
  FlagModal,
  CancelModal,
} from "@/components/admin/AdminReservationsPage";

export function AdminReservationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestName, setGuestName] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Modals
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Export filters
  const [exportFilters, setExportFilters] = useState({
    status: "all",
    startDate: "",
    endDate: "",
    guestName: "",
  });

  // Selected reservation
  const [selectedReservation, setSelectedReservation] =
    useState<MockReservation | null>(null);

  const stats = {
    active: 1892,
    disputes: 15,
    totalValue: 284000,
  };

  const handleExport = () => {
    console.log("Exporting with filters:", exportFilters);
    setShowExportModal(false);
  };

  const resetExportFilters = () => {
    setExportFilters({
      status: "all",
      startDate: "",
      endDate: "",
      guestName: "",
    });
  };

  const resetFilters = () => {
    setStatusFilter("all");
    setStartDate("");
    setEndDate("");
    setGuestName("");
  };

  const handleFlagReservation = () => {
    console.log("Flagging reservation:", selectedReservation?.id);
    setShowFlagModal(false);
    setSelectedReservation(null);
  };

  const handleCancelReservation = () => {
    console.log("Canceling reservation:", selectedReservation?.id);
    setShowCancelModal(false);
    setSelectedReservation(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "requested":
        return (
          <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
            Requested
          </span>
        );
      case "confirmed":
        return (
          <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
            Confirmed
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
            Rejected
          </span>
        );
      case "cancelled-guest":
        return (
          <span className="px-3 py-1 bg-gold/80 text-white text-xs font-bold rounded-full">
            Cancelled by Guest
          </span>
        );
      case "cancelled-host":
        return (
          <span className="px-3 py-1 bg-terracotta/80 text-white text-xs font-bold rounded-full">
            Cancelled by Host
          </span>
        );
      case "checked-in":
        return (
          <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full animate-pulse">
            Checked In
          </span>
        );
      case "completed":
        return (
          <span className="px-3 py-1 bg-charcoal/60 text-white text-xs font-bold rounded-full">
            Completed
          </span>
        );
      case "disputed":
        return (
          <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full flex items-center space-x-1">
            <AlertCircle className="w-3 h-3" />
            <span>Disputed</span>
          </span>
        );
      default:
        return null;
    }
  };

  const handleFlag = (reservation: MockReservation) => {
    setSelectedReservation(reservation);
    setShowFlagModal(true);
    setOpenMenuId(null);
  };

  const handleCancel = (reservation: MockReservation) => {
    setSelectedReservation(reservation);
    setShowCancelModal(true);
    setOpenMenuId(null);
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <PageHeader
          stats={stats}
          onExportClick={() => setShowExportModal(true)}
        />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          guestName={guestName}
          onGuestNameChange={setGuestName}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onResetFilters={resetFilters}
        />

        <ReservationsTable
          reservations={MOCK_RESERVATIONS}
          openMenuId={openMenuId}
          onToggleMenu={setOpenMenuId}
          onFlag={handleFlag}
          onCancel={handleCancel}
          getStatusBadge={getStatusBadge}
        />
      </div>

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        filters={exportFilters}
        onFilterChange={setExportFilters}
        onExport={handleExport}
        onReset={resetExportFilters}
      />

      <FlagModal
        isOpen={showFlagModal}
        reservation={selectedReservation}
        onClose={() => {
          setShowFlagModal(false);
          setSelectedReservation(null);
        }}
        onConfirm={handleFlagReservation}
      />

      <CancelModal
        isOpen={showCancelModal}
        reservation={selectedReservation}
        onClose={() => {
          setShowCancelModal(false);
          setSelectedReservation(null);
        }}
        onConfirm={handleCancelReservation}
      />
    </div>
  );
}
