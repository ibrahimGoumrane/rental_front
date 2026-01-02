import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Edit, Eye, EyeOff, MoreVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PropertyCarousel } from "../components/ui/PropertyCarousel";
import { PropertyDetails } from "../components/ui/PropertyDetails";
import { PREVIEW_MOCK_PROPERTY_DATA } from "../lib/constants/pages/LandlordPropertyPreviewPage";
export function LandlordPropertyPreviewPage() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(true);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const property =
    PREVIEW_MOCK_PROPERTY_DATA[id as keyof typeof PREVIEW_MOCK_PROPERTY_DATA];
  if (!property) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4">
            Property not found
          </h2>
          <button
            onClick={() => navigate("/landlord/properties")}
            className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-sand min-h-screen font-sans relative">
      {/* Property Carousel - Full Screen */}
      <div className="relative">
        <PropertyCarousel
          images={property.images}
          videoUrl={property.videoUrl}
          title={property.title}
          location={property.location}
          price={property.price}
        />

        {/* Back Button - Positioned over carousel */}
        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="absolute top-24 left-6 md:left-12 z-50"
        >
          <button
            onClick={() => navigate("/landlord/properties")}
            className="flex items-center space-x-2 px-6 py-3 bg-white/95 backdrop-blur-md text-charcoal rounded-xl hover:bg-white transition-all shadow-xl border border-charcoal/10 hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">Back to Properties</span>
          </button>
        </motion.div>
      </div>

      {/* Spacer to push content below the initial viewport */}
      <div className="h-screen" />

      {/* Property Details - This section will stop at the bottom of carousel */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 bg-white/95 backdrop-blur-md rounded-t-3xl shadow-2xl -mt-screen relative z-10">
          {/* Single Column Layout - No Sidebar Needed for Landlord Preview */}
          <div className="max-w-5xl mx-auto">
            {/* Header with Actions Menu */}
            <div className="border-b border-charcoal/10 pb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
                    {property.title}
                  </h2>
                  <p className="text-charcoal/60">{property.location}</p>
                </div>

                {/* Actions Menu Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowActionsMenu(!showActionsMenu)}
                    className="p-3 hover:bg-sand rounded-xl transition-colors border border-charcoal/10"
                  >
                    <MoreVertical className="w-5 h-5 text-charcoal" />
                  </button>

                  <AnimatePresence>
                    {showActionsMenu && (
                      <>
                        {/* Backdrop */}
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setShowActionsMenu(false)}
                        />

                        {/* Menu */}
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10,
                            scale: 0.95,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 10,
                            scale: 0.95,
                          }}
                          transition={{
                            duration: 0.15,
                          }}
                          className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-charcoal/10 overflow-hidden z-50"
                        >
                          <div className="p-3">
                            {/* Guest Preview Badge */}
                            <div className="px-4 py-3 bg-sand/50 rounded-xl mb-2">
                              <div className="flex items-center space-x-2 text-charcoal/60 text-sm">
                                <Eye className="w-4 h-4" />
                                <span className="font-medium">
                                  Guest Preview Mode
                                </span>
                              </div>
                              <p className="text-xs text-charcoal/50 mt-1">
                                Viewing as your guests see it
                              </p>
                            </div>

                            {/* Publish Toggle */}
                            <button
                              onClick={() => {
                                setIsPublished(!isPublished);
                                setShowActionsMenu(false);
                              }}
                              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all mb-2 ${
                                isPublished
                                  ? "bg-warm-green/10 hover:bg-warm-green/20"
                                  : "bg-charcoal/5 hover:bg-charcoal/10"
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                {isPublished ? (
                                  <Eye className="w-5 h-5 text-warm-green" />
                                ) : (
                                  <EyeOff className="w-5 h-5 text-charcoal/60" />
                                )}
                                <div className="text-left">
                                  <p
                                    className={`font-bold text-sm ${
                                      isPublished
                                        ? "text-warm-green"
                                        : "text-charcoal"
                                    }`}
                                  >
                                    {isPublished ? "Published" : "Unpublished"}
                                  </p>
                                  <p className="text-xs text-charcoal/60">
                                    {isPublished
                                      ? "Visible to guests"
                                      : "Hidden from guests"}
                                  </p>
                                </div>
                              </div>
                              <div
                                className={`w-10 h-6 rounded-full transition-colors relative ${
                                  isPublished
                                    ? "bg-warm-green"
                                    : "bg-charcoal/20"
                                }`}
                              >
                                <div
                                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                                    isPublished ? "left-5" : "left-1"
                                  }`}
                                />
                              </div>
                            </button>

                            {/* Edit Button */}
                            <button
                              onClick={() => {
                                navigate(`/landlord/properties/${id}/edit`);
                                setShowActionsMenu(false);
                              }}
                              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-warm-green/10 transition-colors group"
                            >
                              <Edit className="w-5 h-5 text-charcoal/60 group-hover:text-warm-green transition-colors" />
                              <div className="text-left">
                                <p className="font-bold text-sm text-charcoal group-hover:text-warm-green transition-colors">
                                  Edit Property
                                </p>
                                <p className="text-xs text-charcoal/60">
                                  Update details, photos, pricing
                                </p>
                              </div>
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Property Stats */}
              <div className="flex items-center space-x-4 text-charcoal/70 text-sm md:text-base">
                <span className="flex items-center">
                  <span className="font-medium text-charcoal">
                    {property.rating}
                  </span>
                  <span className="mx-1">·</span>
                  <span className="underline cursor-pointer">
                    {property.reviewCount} reviews
                  </span>
                </span>
              </div>
            </div>

            {/* Rest of PropertyDetails content */}
            <PropertyDetails property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}
