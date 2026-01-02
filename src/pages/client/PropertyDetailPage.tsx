import { PropertyCarousel } from "@/components/ui/PropertyCarousel";
import { PropertyDetails } from "@/components/ui/PropertyDetails";
import { BackButton } from "@/components/client/PropertyDetailPage/BackButton";
import { PropertyHeader } from "@/components/client/PropertyDetailPage/PropertyHeader";
import { PROPERTY_DATA } from "@/lib/constants/pages/PropertyDetailPage";

export function PropertyDetailPage() {
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
        <BackButton />
      </div>

      {/* Spacer to push content below the initial viewport */}
      <div className="h-screen" />

      {/* Property Details - This section will stop at the bottom of carousel */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 bg-white/95 backdrop-blur-md rounded-t-3xl shadow-2xl -mt-screen relative z-10">
          {/* Header Info */}
          <PropertyHeader
            title={property.title}
            location={property.location}
            rating={property.rating}
            reviewCount={property.reviewCount}
          />

          {/* Rest of PropertyDetails content */}
          <PropertyDetails property={property} />
        </div>
      </div>
    </div>
  );
}
