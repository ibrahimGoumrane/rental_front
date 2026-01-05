import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EDIT_MOCK_PROPERTY_DATA } from "@/lib/constants/pages/EditPropertyPage";
import { EditPageHeader } from "@/components/landlord/EditPropertyPage/EditPageHeader";
import { PropertyNotFound } from "@/components/landlord/EditPropertyPage/PropertyNotFound";
import { StepIndicator } from "@/components/landlord/AddPropertyPage/StepIndicator";
import { PhotoUploadSection } from "@/components/landlord/AddPropertyPage/PhotoUploadSection";
import { VideoUploadSection } from "@/components/landlord/AddPropertyPage/VideoUploadSection";
import { PropertyTypeSelector } from "@/components/landlord/AddPropertyPage/PropertyTypeSelector";
import { RentalModeSelector } from "@/components/landlord/AddPropertyPage/RentalModeSelector";
import { PropertyDetailsForm } from "@/components/landlord/AddPropertyPage/PropertyDetailsForm";
import { AmenitiesSelector } from "@/components/landlord/AddPropertyPage/AmenitiesSelector";
import { LocationForm } from "@/components/landlord/AddPropertyPage/LocationForm";
import { PricingForm } from "@/components/landlord/AddPropertyPage/PricingForm";
import { CheckInOutTimes } from "@/components/landlord/AddPropertyPage/CheckInOutTimes";
import { HouseRulesSelector } from "@/components/landlord/AddPropertyPage/HouseRulesSelector";
import { NavigationButtons } from "@/components/landlord/AddPropertyPage/NavigationButtons";

export function EditPropertyPage() {
  const navigate = useNavigate();
  const { id } = useParams<{
    id: string;
  }>();
  const [currentStep, setCurrentStep] = useState(1);
  // Load existing property data
  const existingProperty =
    EDIT_MOCK_PROPERTY_DATA[id as keyof typeof EDIT_MOCK_PROPERTY_DATA];
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    existingProperty?.images || []
  );
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(
    existingProperty?.videoUrl || null
  );
  const [expandedRuleGroups, setExpandedRuleGroups] = useState<string[]>([
    "conduct",
  ]);
  const [formData, setFormData] = useState(
    existingProperty || {
      title: "",
      propertyType: {
        primary: "apartment",
        secondary: "",
        rentalMode: "entire",
      },
      description: "",
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      maxGuests: 2,
      amenities: [] as string[],
      address: "",
      city: "",
      country: "",
      basePrice: "",
      cleaningFee: "",
      minStay: 1,
      maxStay: 30,
      checkInTime: "15:00",
      checkOutTime: "11:00",
      houseRules: {} as Record<string, boolean>,
      cancellationPolicy: "moderate",
    }
  );
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideo(videoUrl);
    }
  };
  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };
  const removeVideo = () => {
    setUploadedVideo(null);
  };
  const toggleAmenity = (amenityId: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenityId)
        ? formData.amenities.filter((a) => a !== amenityId)
        : [...formData.amenities, amenityId],
    });
  };
  const handleFormChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePropertyTypeChange = (type: {
    primary: string;
    secondary: string;
    rentalMode: string;
  }) => {
    setFormData({ ...formData, propertyType: type });
  };

  const toggleRuleGroup = (groupId: string) => {
    setExpandedRuleGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };
  const toggleRule = (ruleId: string) => {
    setFormData({
      ...formData,
      houseRules: {
        ...formData.houseRules,
        [ruleId]:
          !formData.houseRules[ruleId as keyof typeof formData.houseRules],
      },
    });
  };
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return uploadedImages.length >= 5;
      case 2:
        return formData.title && formData.description;
      case 3:
        return formData.address && formData.city && formData.country;
      case 4:
        return formData.basePrice;
      case 5:
        return true;
      default:
        return false;
    }
  };
  const handleSubmit = () => {
    console.log("Property updated:", {
      ...formData,
      images: uploadedImages,
      video: uploadedVideo,
    });
    navigate(`/landlord/properties/${id}`);
  };
  if (!existingProperty) {
    return (
      <PropertyNotFound
        onBackToProperties={() => navigate("/landlord/properties")}
      />
    );
  }
  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <EditPageHeader
          onBack={() => navigate(`/landlord/properties/${id}`)}
          onDelete={() => {
            if (
              confirm(
                "Are you sure you want to delete this property? This action cannot be undone."
              )
            ) {
              navigate("/landlord/properties");
            }
          }}
        />

        <StepIndicator currentStep={currentStep} />

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            transition={{
              duration: 0.3,
            }}
            className="bg-white rounded-2xl p-8 md:p-12 border border-charcoal/5 shadow-sm mb-8"
          >
            {/* Step 1: Photos & Video */}
            {currentStep === 1 && (
              <div>
                <h2 className="font-serif text-3xl text-charcoal mb-4">
                  Update Photos & Video
                </h2>
                <p className="text-charcoal/60 mb-8">
                  Your property currently has {uploadedImages.length} photos.
                  You can add more or remove existing ones.
                </p>

                <PhotoUploadSection
                  uploadedImages={uploadedImages}
                  onImageUpload={handleImageUpload}
                  onRemoveImage={removeImage}
                />

                <VideoUploadSection
                  uploadedVideo={uploadedVideo}
                  onVideoUpload={handleVideoUpload}
                  onRemoveVideo={removeVideo}
                />
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div>
                <h2 className="font-serif text-3xl text-charcoal mb-4">
                  Property Details
                </h2>
                <p className="text-charcoal/60 mb-8">
                  Update your property information
                </p>

                <div className="space-y-8">
                  <PropertyDetailsForm
                    title={formData.title}
                    description={formData.description}
                    bedrooms={formData.bedrooms}
                    beds={formData.beds}
                    bathrooms={formData.bathrooms}
                    maxGuests={formData.maxGuests}
                    onFormChange={handleFormChange}
                  />

                  <PropertyTypeSelector
                    propertyType={formData.propertyType}
                    onPropertyTypeChange={handlePropertyTypeChange}
                  />

                  <RentalModeSelector
                    rentalMode={formData.propertyType.rentalMode}
                    onRentalModeChange={(mode) =>
                      handlePropertyTypeChange({
                        ...formData.propertyType,
                        rentalMode: mode,
                      })
                    }
                  />

                  <AmenitiesSelector
                    selectedAmenities={formData.amenities}
                    onToggleAmenity={toggleAmenity}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div>
                <h2 className="font-serif text-3xl text-charcoal mb-4">
                  Location
                </h2>
                <p className="text-charcoal/60 mb-8">
                  Update your property location
                </p>

                <LocationForm
                  address={formData.address}
                  city={formData.city}
                  country={formData.country}
                  onFormChange={handleFormChange}
                />
              </div>
            )}

            {/* Step 4: Pricing */}
            {currentStep === 4 && (
              <div>
                <h2 className="font-serif text-3xl text-charcoal mb-4">
                  Pricing
                </h2>
                <p className="text-charcoal/60 mb-8">
                  Update your rates and booking requirements
                </p>

                <PricingForm
                  basePrice={formData.basePrice}
                  cleaningFee={formData.cleaningFee}
                  minStay={formData.minStay}
                  maxStay={formData.maxStay}
                  onFormChange={handleFormChange}
                />
              </div>
            )}

            {/* Step 5: Rules */}
            {currentStep === 5 && (
              <div>
                <h2 className="font-serif text-3xl text-charcoal mb-4">
                  House Rules
                </h2>
                <p className="text-charcoal/60 mb-8">
                  Update check-in/out times and comprehensive house rules
                </p>

                <div className="space-y-8">
                  <CheckInOutTimes
                    checkInTime={formData.checkInTime}
                    checkOutTime={formData.checkOutTime}
                    onTimeChange={handleFormChange}
                  />

                  <HouseRulesSelector
                    selectedRules={formData.houseRules}
                    expandedGroups={expandedRuleGroups}
                    onToggleGroup={toggleRuleGroup}
                    onToggleRule={toggleRule}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <NavigationButtons
          currentStep={currentStep}
          canProceed={!!canProceed()}
          onBack={() => setCurrentStep(Math.max(1, currentStep - 1))}
          onNext={() => setCurrentStep(currentStep + 1)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
