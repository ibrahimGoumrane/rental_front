import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MANAGE_MOCK_PROPERTIES } from "@/lib/constants/pages/ManagePropertiesPage";
import { ManagePropertiesHeader } from "@/components/landlord/ManagePropertiesPage/ManagePropertiesHeader";
import { PropertiesFilterBar } from "@/components/landlord/ManagePropertiesPage/PropertiesFilterBar";
import { PropertyCard } from "@/components/landlord/ManagePropertiesPage/PropertyCard";
import { EmptyPropertiesState } from "@/components/landlord/ManagePropertiesPage/EmptyPropertiesState";
import { DeletePropertyModal } from "@/components/landlord/ManagePropertiesPage/DeletePropertyModal";

export function ManagePropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredProperties = MANAGE_MOCK_PROPERTIES.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    setPropertyToDelete(id);
    setShowDeleteModal(true);
    setOpenMenuId(null);
  };

  const confirmDelete = () => {
    console.log("Deleting property:", propertyToDelete);
    setShowDeleteModal(false);
    setPropertyToDelete(null);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <ManagePropertiesHeader
          totalProperties={MANAGE_MOCK_PROPERTIES.length}
        />

        <PropertiesFilterBar
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSearchChange={setSearchQuery}
          onStatusFilterChange={setStatusFilter}
        />

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
                isMenuOpen={openMenuId === property.id}
                onToggleMenu={() =>
                  setOpenMenuId(openMenuId === property.id ? null : property.id)
                }
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <EmptyPropertiesState onClearFilters={clearFilters} />
        )}

        {/* Delete Confirmation Modal */}
        <DeletePropertyModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
}
