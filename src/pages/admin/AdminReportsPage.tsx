import { AlertTriangle, DollarSign, Home, Shield, Users } from "lucide-react";
import { useState } from "react";
import {
  MOCK_REPORTS,
  MockReport,
} from "@/lib/constants/pages/AdminReportsPage";
import {
  PageHeader,
  StatsCards,
  FilterBar,
  ReportsTable,
  ViewReportModal,
  GuidelinesModal,
  ExportModal,
  RequestInfoModal,
  CancelReservationModal,
} from "@/components/admin/AdminReportsPage";

export function AdminReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Modals
  const [showExportModal, setShowExportModal] = useState(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);
  const [showFullReportModal, setShowFullReportModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [showCancelReservationModal, setShowCancelReservationModal] =
    useState(false);

  // Export filters
  const [exportFilters, setExportFilters] = useState({
    status: "all",
    type: "all",
    filedBy: "all",
    dateFrom: "",
    dateTo: "",
  });

  // Selected report for modals
  const [selectedReport, setSelectedReport] = useState<MockReport | null>(null);

  // Request info form
  const [requestInfoMessage, setRequestInfoMessage] = useState("");

  const stats = {
    openDisputes: 5,
    resolvedThisMonth: 42,
    avgResolutionTime: 3.2,
  };

  const handleExport = () => {
    console.log("Exporting with filters:", exportFilters);
    setShowExportModal(false);
  };

  const resetExportFilters = () => {
    setExportFilters({
      status: "all",
      type: "all",
      filedBy: "all",
      dateFrom: "",
      dateTo: "",
    });
  };

  const handleRequestInfo = () => {
    console.log("Requesting info:", requestInfoMessage);
    setShowRequestInfoModal(false);
    setRequestInfoMessage("");
    setSelectedReport(null);
  };

  const handleCancelReservation = () => {
    console.log("Canceling reservation for report:", selectedReport?.id);
    setShowCancelReservationModal(false);
    setSelectedReport(null);
  };

  const getTypeBadge = (type: string) => {
    const configs = {
      property: {
        icon: Home,
        bg: "bg-terracotta/20",
        text: "text-terracotta",
        label: "Property Issue",
      },
      "guest-behavior": {
        icon: Users,
        bg: "bg-gold/20",
        text: "text-gold",
        label: "Guest Behavior",
      },
      "host-behavior": {
        icon: Users,
        bg: "bg-terracotta/20",
        text: "text-terracotta",
        label: "Host Behavior",
      },
      payment: {
        icon: DollarSign,
        bg: "bg-gold/20",
        text: "text-gold",
        label: "Payment Dispute",
      },
      safety: {
        icon: Shield,
        bg: "bg-terracotta",
        text: "text-white",
        label: "Safety Concern",
      },
      fraud: {
        icon: AlertTriangle,
        bg: "bg-terracotta",
        text: "text-white",
        label: "Scam/Fraud",
      },
    };
    const config = configs[type as keyof typeof configs] || configs.property;
    const Icon = config.icon;
    return (
      <span
        className={`px-3 py-1 ${config.bg} ${config.text} text-xs font-bold rounded-full flex items-center space-x-1 whitespace-nowrap`}
      >
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
            New
          </span>
        );
      case "under-review":
        return (
          <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
            Under Review
          </span>
        );
      case "awaiting-info":
        return (
          <span className="px-3 py-1 bg-gold/70 text-white text-xs font-bold rounded-full">
            Awaiting Response
          </span>
        );
      case "resolved":
        return (
          <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
            Resolved
          </span>
        );
      case "closed":
        return (
          <span className="px-3 py-1 bg-charcoal/60 text-white text-xs font-bold rounded-full">
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  const getUserTypeBadge = (userType: string) => {
    if (userType === "guest") {
      return (
        <span className="px-2 py-0.5 bg-warm-green/20 text-warm-green text-xs font-bold rounded-full">
          Guest
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 bg-terracotta/20 text-terracotta text-xs font-bold rounded-full">
        Host
      </span>
    );
  };

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="px-2 py-0.5 bg-charcoal/60 text-white text-xs font-bold rounded-full">
            Completed
          </span>
        );
      case "in-progress":
        return (
          <span className="px-2 py-0.5 bg-warm-green text-white text-xs font-bold rounded-full">
            In Progress
          </span>
        );
      case "upcoming":
        return (
          <span className="px-2 py-0.5 bg-gold text-white text-xs font-bold rounded-full">
            Upcoming
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <PageHeader
          onExportClick={() => setShowExportModal(true)}
          onGuidelinesClick={() => setShowGuidelinesModal(true)}
        />

        <StatsCards stats={stats} />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        <ReportsTable
          reports={MOCK_REPORTS}
          openMenuId={openMenuId}
          onToggleMenu={setOpenMenuId}
          onViewReport={(report) => {
            setSelectedReport(report);
            setShowFullReportModal(true);
          }}
          onRequestInfo={(report) => {
            setSelectedReport(report);
            setShowRequestInfoModal(true);
          }}
          onCancelReservation={(report) => {
            setSelectedReport(report);
            setShowCancelReservationModal(true);
          }}
          getTypeBadge={getTypeBadge}
          getStatusBadge={getStatusBadge}
          getUserTypeBadge={getUserTypeBadge}
          getBookingStatusBadge={getBookingStatusBadge}
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

      <GuidelinesModal
        isOpen={showGuidelinesModal}
        onClose={() => setShowGuidelinesModal(false)}
      />

      <ViewReportModal
        isOpen={showFullReportModal}
        report={selectedReport}
        onClose={() => {
          setShowFullReportModal(false);
          setSelectedReport(null);
        }}
        getTypeBadge={getTypeBadge}
        getStatusBadge={getStatusBadge}
        getUserTypeBadge={getUserTypeBadge}
      />

      <RequestInfoModal
        isOpen={showRequestInfoModal}
        report={selectedReport}
        message={requestInfoMessage}
        onMessageChange={setRequestInfoMessage}
        onClose={() => {
          setShowRequestInfoModal(false);
          setSelectedReport(null);
          setRequestInfoMessage("");
        }}
        onSubmit={handleRequestInfo}
      />

      <CancelReservationModal
        isOpen={showCancelReservationModal}
        report={selectedReport}
        onClose={() => {
          setShowCancelReservationModal(false);
          setSelectedReport(null);
        }}
        onConfirm={handleCancelReservation}
      />
    </div>
  );
}
