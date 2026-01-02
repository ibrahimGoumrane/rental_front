import { AnimatePresence, motion } from "framer-motion";
import {
  Edit,
  Eye,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MANAGE_MOCK_PROPERTIES } from "../lib/constants/pages/ManagePropertiesPage";
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
  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
              Your Properties
            </h1>
            <p className="text-xl text-charcoal/70 font-light">
              Manage your portfolio of {MANAGE_MOCK_PROPERTIES.length} beautiful
              spaces
            </p>
          </div>
          <Link
            to="/landlord/properties/new"
            className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-lg shadow-warm-green/20 hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Property</span>
          </Link>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by property name or location..."
                className="w-full pl-12 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-charcoal/60" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as "all" | "active" | "inactive"
                  )
                }
                className="px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className="bg-white rounded-2xl overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="flex">
                  {/* Image */}
                  <div className="w-1/3 relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        property.status === "active"
                          ? "bg-warm-green text-white"
                          : "bg-charcoal/60 text-white"
                      }`}
                    >
                      {property.status}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl text-charcoal mb-1 group-hover:text-warm-green transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-sm text-charcoal/60">
                          {property.location}
                        </p>
                      </div>

                      {/* Actions Menu */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === property.id ? null : property.id
                            )
                          }
                          className="p-2 hover:bg-sand rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-charcoal/60" />
                        </button>

                        <AnimatePresence>
                          {openMenuId === property.id && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                y: 10,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                                y: 10,
                              }}
                              className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-charcoal/10 py-2 z-20"
                            >
                              <Link
                                to={`/landlord/properties/${property.id}`}
                                className="flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors"
                              >
                                <Eye className="w-4 h-4 text-charcoal/60" />
                                <span className="text-sm">View Details</span>
                              </Link>
                              <Link
                                to={`/landlord/properties/${property.id}/edit`}
                                className="flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors"
                              >
                                <Edit className="w-4 h-4 text-charcoal/60" />
                                <span className="text-sm">Edit Property</span>
                              </Link>
                              <button
                                onClick={() => handleDelete(property.id)}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-red-50 transition-colors text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span className="text-sm">Delete</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-charcoal/60 mb-1">Monthly</p>
                        <p className="font-serif text-lg font-bold text-gold">
                          ${property.monthlyEarnings.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-charcoal/60 mb-1">
                          Bookings
                        </p>
                        <p className="font-serif text-lg font-bold text-charcoal">
                          {property.totalBookings}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-charcoal/60 mb-1">
                          Occupancy
                        </p>
                        <p className="font-serif text-lg font-bold text-warm-green">
                          {property.occupancyRate}%
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
                      <div className="flex items-center space-x-4 text-sm text-charcoal/60">
                        <span>🛏️ {property.bedrooms} beds</span>
                        <span>🚿 {property.bathrooms} baths</span>
                      </div>
                      <p className="font-serif text-xl font-bold text-charcoal">
                        ${property.basePrice}
                        <span className="text-sm font-normal text-charcoal/60">
                          /night
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-charcoal/40" />
            </div>
            <h3 className="font-serif text-3xl text-charcoal mb-2">
              No properties found
            </h3>
            <p className="text-charcoal/60 mb-8">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}
              className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setShowDeleteModal(false)}
              />
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: 20,
                }}
                className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10 p-8"
              >
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-sand rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-charcoal/60" />
                </button>

                <div className="text-center">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal mb-2">
                    Delete Property?
                  </h3>
                  <p className="text-charcoal/60 mb-8">
                    This action cannot be undone. All bookings and data
                    associated with this property will be permanently deleted.
                  </p>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 px-6 py-3 border border-charcoal/20 rounded-lg hover:border-charcoal/40 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
