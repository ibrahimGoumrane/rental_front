import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PropertyCarousel } from "@/components/ui/PropertyCarousel";
import { PropertyDetails } from "@/components/ui/PropertyDetails";
import { PREVIEW_MOCK_PROPERTY_DATA } from "@/lib/constants/pages/LandlordPropertyPreviewPage";
import { PreviewBackButton } from "@/components/landlord/LandlordPropertyPreviewPage/PreviewBackButton";
import { PreviewPropertyHeader } from "@/components/landlord/LandlordPropertyPreviewPage/PreviewPropertyHeader";
import { PropertyNotFound } from "@/components/landlord/LandlordPropertyPreviewPage/PropertyNotFound";

export function LandlordPropertyPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(true);
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const property =
    PREVIEW_MOCK_PROPERTY_DATA[id as keyof typeof PREVIEW_MOCK_PROPERTY_DATA];

  if (!property) {
    return <PropertyNotFound />;
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
        <PreviewBackButton onBack={() => navigate("/landlord/properties")} />
      </div>

      {/* Spacer to push content below the initial viewport */}
      <div className="h-screen" />

      {/* Property Details - This section will stop at the bottom of carousel */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 bg-white/95 backdrop-blur-md rounded-t-3xl shadow-2xl -mt-screen relative z-10">
          {/* Single Column Layout - No Sidebar Needed for Landlord Preview */}
          <div className="max-w-5xl mx-auto">
            <PreviewPropertyHeader
              property={property}
              isPublished={isPublished}
              isMenuOpen={showActionsMenu}
              onToggleMenu={() => setShowActionsMenu(!showActionsMenu)}
              onTogglePublish={() => setIsPublished(!isPublished)}
              onEdit={() => navigate(`/landlord/properties/${id}/edit`)}
            />

            {/* Rest of PropertyDetails content */}
            <PropertyDetails property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}
