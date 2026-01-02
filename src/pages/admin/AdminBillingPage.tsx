import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  COMMISSION_DATA,
  MONTHLY_REVENUE,
  REFUNDS_DATA,
} from "@/lib/constants/pages/AdminBillingPage";
import { StatsCards } from "@/components/admin/AdminBillingPage/StatsCards";
import { ActionButtons } from "@/components/admin/AdminBillingPage/ActionButtons";
import { FilterBar } from "@/components/admin/AdminBillingPage/FilterBar";
import { TabNavigation } from "@/components/admin/AdminBillingPage/TabNavigation";
import { CommissionExplanation } from "@/components/admin/AdminBillingPage/CommissionExplanation";
import { CommissionTable } from "@/components/admin/AdminBillingPage/CommissionTable";
import { Pagination } from "@/components/admin/AdminBillingPage/Pagination";
import { RefundsSectionHeader } from "@/components/admin/AdminBillingPage/RefundsSectionHeader";
import { RefundModal } from "@/components/admin/AdminBillingPage/RefundModal";
import { RefundsTable } from "@/components/admin/AdminBillingPage/RefundsTable";
import { RevenueChart } from "@/components/admin/AdminBillingPage/RevenueChart";
import { KeyMetrics } from "@/components/admin/AdminBillingPage/KeyMetrics";

export function AdminBillingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "commission" | "analytics" | "refunds"
  >("commission");

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    hostName: "",
    propertyName: "",
    grossAmountMin: "",
    grossAmountMax: "",
    status: "all",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [showRefundForm, setShowRefundForm] = useState(false);
  const [refundForm, setRefundForm] = useState({
    hostId: "",
    hostName: "",
    propertyId: "",
    propertyName: "",
    amount: "",
    reason: "",
    affectedBookings: "",
  });

  const stats = {
    monthlyRevenue: 284560,
    commission: 28456,
    tva: 5691,
    netRevenue: 34147,
  };

  const totalPages = Math.ceil(COMMISSION_DATA.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = COMMISSION_DATA.slice(startIndex, endIndex);

  const handleExportReport = () => {
    console.log("Exporting financial report (CSV)...");
  };

  const handlePaymentSettings = () => {
    navigate("/admin/settings?section=payment");
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      hostName: "",
      propertyName: "",
      grossAmountMin: "",
      grossAmountMax: "",
      status: "all",
    });
  };

  const handleRefundSubmit = () => {
    console.log("Processing host refund:", refundForm);
    setShowRefundForm(false);
    setRefundForm({
      hostId: "",
      hostName: "",
      propertyId: "",
      propertyName: "",
      amount: "",
      reason: "",
      affectedBookings: "",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
            Active
          </span>
        );
      case "pending":
        return (
          <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
            Pending
          </span>
        );
      case "processed":
        return (
          <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
            Processed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-8">
            Financial Management
          </h1>

          <StatsCards stats={stats} />
          <ActionButtons
            onExportReport={handleExportReport}
            onPaymentSettings={handlePaymentSettings}
          />
        </motion.div>

        <FilterBar
          showFilters={showFilters}
          filters={filters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onFilterChange={setFilters}
          onReset={resetFilters}
        />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "commission" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <CommissionExplanation />
            <div>
              <CommissionTable
                data={paginatedData}
                getStatusBadge={getStatusBadge}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={COMMISSION_DATA.length}
                startIndex={startIndex}
                endIndex={endIndex}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />
            </div>
          </motion.div>
        )}

        {activeTab === "refunds" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <RefundsSectionHeader onNewRefund={() => setShowRefundForm(true)} />
            <RefundModal
              show={showRefundForm}
              form={refundForm}
              onClose={() => setShowRefundForm(false)}
              onFormChange={setRefundForm}
              onSubmit={handleRefundSubmit}
            />
            <RefundsTable data={REFUNDS_DATA} getStatusBadge={getStatusBadge} />
          </motion.div>
        )}

        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <RevenueChart data={MONTHLY_REVENUE} />
            <KeyMetrics />
          </motion.div>
        )}
      </div>
    </div>
  );
}
