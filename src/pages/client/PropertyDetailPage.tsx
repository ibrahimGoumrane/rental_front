import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PropertyCarousel } from "../components/ui/PropertyCarousel";
import { PropertyDetails } from "../components/ui/PropertyDetails";
import { PROPERTY_DATA } from "../lib/constants/pages/PropertyDetailPage";
export function PropertyDetailPage() {
  const navigate = useNavigate();
  const property = PROPERTY_DATA["1"];
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
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 px-6 py-3 bg-white/95 backdrop-blur-md text-charcoal rounded-xl hover:bg-white transition-all shadow-xl border border-charcoal/10 hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">Back to Listings</span>
          </button>
        </motion.div>
      </div>

      {/* Spacer to push content below the initial viewport */}
      <div className="h-screen" />

      {/* Property Details - This section will stop at the bottom of carousel */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 bg-white/95 backdrop-blur-md rounded-t-3xl shadow-2xl -mt-screen relative z-10">
          {/* Header Info */}
          <div className="border-b border-charcoal/10 pb-8 mb-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
                  {property.title}
                </h2>
                <p className="text-charcoal/60">{property.location}</p>
              </div>
            </div>

            {/* Property Stats */}
            <div className="flex items-center space-x-4 text-charcoal/70 text-sm md:text-base">
              <span className="flex items-center">
                <Star className="w-4 h-4 text-terracotta mr-1 fill-current" />
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
  );
}
