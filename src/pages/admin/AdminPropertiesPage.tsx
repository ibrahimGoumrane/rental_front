import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import {
  PROPERTIES_DATA,
  MOCK_COLLECTIONS,
} from "@/lib/constants/pages/AdminPropertiesPage";
import { AddToCollectionModal } from "@/components/admin/AdminPropertiesPage/AddToCollectionModal";
import { CollectionsView } from "@/components/admin/AdminPropertiesPage/CollectionsView";
import { ExportModal } from "@/components/admin/AdminPropertiesPage/ExportModal";
import { FilterBar } from "@/components/admin/AdminPropertiesPage/FilterBar";
import { Pagination } from "@/components/admin/AdminPropertiesPage/Pagination";
import { PropertyGridView } from "@/components/admin/AdminPropertiesPage/PropertyGridView";
import { PropertyTableView } from "@/components/admin/AdminPropertiesPage/PropertyTableView";
import { StatsHeader } from "@/components/admin/AdminPropertiesPage/StatsHeader";
import { StatusConfirmModal } from "@/components/admin/AdminPropertiesPage/StatusConfirmModal";
import { TabNavigation } from "@/components/admin/AdminPropertiesPage/TabNavigation";

export function AdminPropertiesPage() {
  const [activeTab, setActiveTab] = useState<"properties" | "collections">(
    "properties"
  );
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [verificationFilter, setVerificationFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "newest" | "bookings" | "revenue" | "rating"
  >("newest");
  const [showFilters, setShowFilters] = useState(false);
  // Add collection filter state
  const [collectionFilter, setCollectionFilter] = useState<string>("all");
  // Modals
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddToCollectionModal, setShowAddToCollectionModal] =
    useState(false);
  const [showStatusConfirmModal, setShowStatusConfirmModal] = useState(false);
  // Export filters
  const [exportFilters, setExportFilters] = useState({
    status: "all",
    type: "all",
    city: "",
    owner: "",
  });
  // Add to collection state
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  // Status change state
  const [statusChange, setStatusChange] = useState<{
    propertyId: number;
    propertyName: string;
    currentStatus: string;
    newStatus: string;
  } | null>(null);
  const stats = {
    total: 3421,
    pending: 434,
    live: 2987,
  };
  const handleViewCollectionProperties = (collectionId: number) => {
    setCollectionFilter(collectionId.toString());
    setActiveTab("properties");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleExport = () => {
    console.log("Exporting with filters:", exportFilters);
    // Export logic would go here
    setShowExportModal(false);
  };
  const handleAddToCollection = () => {
    console.log(
      `Adding property ${selectedProperty} to collection ${selectedCollection}`
    );
    setShowAddToCollectionModal(false);
    setSelectedProperty(null);
    setSelectedCollection("");
  };
  const handleStatusChange = () => {
    if (!statusChange) return;
    console.log(
      `Changing status of property ${statusChange.propertyId} from ${statusChange.currentStatus} to ${statusChange.newStatus}`
    );
    // Status change logic would go here
    setShowStatusConfirmModal(false);
    setStatusChange(null);
  };
  const resetExportFilters = () => {
    setExportFilters({
      status: "all",
      type: "all",
      city: "",
      owner: "",
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
      case "suspended":
        return (
          <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
            Suspended
          </span>
        );
      default:
        return null;
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-5 h-5 text-warm-green" />;
      case "pending":
        return <Clock className="w-5 h-5 text-gold" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-terracotta" />;
      default:
        return <XCircle className="w-5 h-5 text-charcoal/40" />;
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <StatsHeader stats={stats} onExport={() => setShowExportModal(true)} />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "properties" && (
          <>
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              showFilters={showFilters}
              onToggleFilters={() => setShowFilters(!showFilters)}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              verificationFilter={verificationFilter}
              onVerificationFilterChange={setVerificationFilter}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
              featuredFilter={featuredFilter}
              onFeaturedFilterChange={setFeaturedFilter}
              sortBy={sortBy}
              onSortByChange={(value) =>
                setSortBy(value as "newest" | "bookings" | "revenue" | "rating")
              }
              collectionFilter={collectionFilter}
              onCollectionFilterChange={setCollectionFilter}
              collectionName={
                MOCK_COLLECTIONS.find(
                  (c) => c.id.toString() === collectionFilter
                )?.name
              }
            />

            {viewMode === "grid" && (
              <div className="space-y-8">
                <PropertyGridView
                  properties={PROPERTIES_DATA}
                  onStatusChange={(id, name, current, next) => {
                    setStatusChange({
                      propertyId: id,
                      propertyName: name,
                      currentStatus: current,
                      newStatus: next,
                    });
                    setShowStatusConfirmModal(true);
                  }}
                  onAddToCollection={(id) => {
                    setSelectedProperty(id);
                    setShowAddToCollectionModal(true);
                  }}
                  getStatusBadge={getStatusBadge}
                  getVerificationIcon={getVerificationIcon}
                />
                <Pagination
                  currentPage={1}
                  totalPages={685}
                  totalItems={3421}
                  itemsPerPage={5}
                  onPageChange={(page) => console.log("Page:", page)}
                />
              </div>
            )}

            {viewMode === "table" && (
              <div className="space-y-8">
                <PropertyTableView
                  properties={PROPERTIES_DATA}
                  onStatusChange={(id, name, current, next) => {
                    setStatusChange({
                      propertyId: id,
                      propertyName: name,
                      currentStatus: current,
                      newStatus: next,
                    });
                    setShowStatusConfirmModal(true);
                  }}
                  onAddToCollection={(id) => {
                    setSelectedProperty(id);
                    setShowAddToCollectionModal(true);
                  }}
                  getStatusBadge={getStatusBadge}
                />
                <Pagination
                  currentPage={1}
                  totalPages={685}
                  totalItems={3421}
                  itemsPerPage={5}
                  onPageChange={(page) => console.log("Page:", page)}
                />
              </div>
            )}
          </>
        )}

        {activeTab === "collections" && (
          <CollectionsView
            collections={MOCK_COLLECTIONS}
            onViewCollectionProperties={handleViewCollectionProperties}
          />
        )}
      </div>

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        filters={exportFilters}
        onFilterChange={(key, value) =>
          setExportFilters({ ...exportFilters, [key]: value })
        }
        onExport={handleExport}
        onResetFilters={resetExportFilters}
      />

      <AddToCollectionModal
        isOpen={showAddToCollectionModal}
        onClose={() => setShowAddToCollectionModal(false)}
        collections={MOCK_COLLECTIONS}
        selectedCollection={selectedCollection}
        onCollectionChange={setSelectedCollection}
        onAdd={handleAddToCollection}
      />

      <StatusConfirmModal
        isOpen={showStatusConfirmModal}
        onClose={() => setShowStatusConfirmModal(false)}
        statusChange={statusChange}
        onConfirm={handleStatusChange}
      />
    </div>
  );
}
