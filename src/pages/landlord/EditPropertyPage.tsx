import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Film,
  Trash2,
  Upload,
  Video,
  X,
} from "lucide-react";
import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  EDIT_AMENITIES,
  EDIT_HOUSE_RULE_GROUPS,
  EDIT_MOCK_PROPERTY_DATA,
  EDIT_PRIMARY_PROPERTY_TYPES,
  EDIT_RENTAL_MODES,
  EDIT_SECONDARY_PROPERTY_TYPES,
  EDIT_STEPS,
} from "../lib/constants/pages/EditPropertyPage";

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
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
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
          className="mb-12"
        >
          <button
            onClick={() => navigate(`/landlord/properties/${id}`)}
            className="flex items-center space-x-2 text-charcoal/60 hover:text-charcoal transition-colors mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Preview</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
                Edit Property
              </h1>
              <p className="text-xl text-charcoal/70 font-light">
                Update your property details and settings
              </p>
            </div>
            <button
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to delete this property? This action cannot be undone."
                  )
                ) {
                  navigate("/landlord/properties");
                }
              }}
              className="flex items-center space-x-2 px-4 py-2 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="font-medium">Delete Property</span>
            </button>
          </div>
        </motion.div>

        {/* Progress Steps */}
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
          <div className="flex items-center justify-between">
            {EDIT_STEPS.map((step, index) => (
              <Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentStep > step.id
                        ? "bg-warm-green text-white"
                        : currentStep === step.id
                        ? "bg-warm-green text-white ring-4 ring-warm-green/20"
                        : "bg-sand text-charcoal/40"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      currentStep >= step.id
                        ? "text-charcoal"
                        : "text-charcoal/40"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < EDIT_STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                      currentStep > step.id ? "bg-warm-green" : "bg-sand"
                    }`}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </motion.div>

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

                {/* Image Grid */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {uploadedImages.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        className="relative group aspect-square rounded-xl overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-gold text-white text-xs font-bold px-2 py-1 rounded">
                            Cover
                          </div>
                        )}
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-5 h-5 text-charcoal" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Upload Area */}
                <label className="block border-2 border-dashed border-charcoal/20 rounded-2xl p-12 text-center hover:border-warm-green hover:bg-sand/30 transition-all cursor-pointer group mb-8">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload className="w-12 h-12 text-charcoal/40 group-hover:text-warm-green mx-auto mb-4 transition-colors" />
                  <p className="text-lg font-medium text-charcoal mb-2">
                    Add more photos
                  </p>
                  <p className="text-sm text-charcoal/60">
                    JPG, PNG or WebP (max 5MB each)
                  </p>
                </label>

                <div className="border-t border-charcoal/10 pt-8">
                  <h3 className="font-serif text-xl text-charcoal mb-4 flex items-center">
                    <Video className="w-5 h-5 mr-2 text-warm-green" />
                    Property Video (Optional)
                  </h3>

                  {!uploadedVideo ? (
                    <label className="block border-2 border-dashed border-charcoal/20 rounded-2xl p-8 text-center hover:border-warm-green hover:bg-sand/30 transition-all cursor-pointer group">
                      <input
                        type="file"
                        accept="video/mp4,video/webm"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                      <Film className="w-10 h-10 text-charcoal/40 group-hover:text-warm-green mx-auto mb-3 transition-colors" />
                      <p className="font-medium text-charcoal mb-1">
                        Upload a video tour
                      </p>
                      <p className="text-xs text-charcoal/60">
                        MP4 or WebM (max 50MB)
                      </p>
                    </label>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden bg-black aspect-video max-w-md">
                      <video
                        src={uploadedVideo}
                        className="w-full h-full object-cover"
                        controls
                      />
                      <button
                        onClick={removeVideo}
                        className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                      >
                        <X className="w-5 h-5 text-charcoal" />
                      </button>
                    </div>
                  )}
                </div>
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
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal/80 mb-2">
                      Property Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                    />
                  </div>

                  {/* Property Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal/80 mb-3">
                      Property Type
                    </label>

                    {/* Primary Types */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                      {EDIT_PRIMARY_PROPERTY_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              propertyType: {
                                ...formData.propertyType,
                                primary: type.id,
                              },
                            })
                          }
                          className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${
                            formData.propertyType.primary === type.id
                              ? "border-warm-green bg-warm-green/5 text-warm-green"
                              : "border-charcoal/10 hover:border-charcoal/30 text-charcoal/60"
                          }`}
                        >
                          <type.icon className="w-6 h-6 mb-2" />
                          <span className="text-sm font-medium">
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Secondary Type Dropdown */}
                    <div className="mb-6">
                      <label className="block text-xs text-charcoal/60 mb-2">
                        Specific Type (Optional)
                      </label>
                      <div className="relative">
                        <select
                          value={formData.propertyType.secondary}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              propertyType: {
                                ...formData.propertyType,
                                secondary: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors appearance-none bg-white"
                        >
                          <option value="">Select a specific type...</option>
                          {EDIT_SECONDARY_PROPERTY_TYPES.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40 pointer-events-none" />
                      </div>
                    </div>

                    {/* Rental Mode */}
                    <div>
                      <label className="block text-sm font-medium text-charcoal/80 mb-3">
                        Rental Mode
                      </label>
                      <div className="bg-sand/30 p-1 rounded-xl flex">
                        {EDIT_RENTAL_MODES.map((mode) => (
                          <button
                            key={mode.id}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                propertyType: {
                                  ...formData.propertyType,
                                  rentalMode: mode.id,
                                },
                              })
                            }
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                              formData.propertyType.rentalMode === mode.id
                                ? "bg-white text-charcoal shadow-sm"
                                : "text-charcoal/60 hover:text-charcoal"
                            }`}
                          >
                            {mode.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal/80 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={6}
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        key: "bedrooms",
                        label: "Bedrooms",
                      },
                      {
                        key: "beds",
                        label: "Beds",
                      },
                      {
                        key: "bathrooms",
                        label: "Bathrooms",
                      },
                      {
                        key: "maxGuests",
                        label: "Max Guests",
                      },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium text-charcoal/80 mb-2">
                          {field.label}
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={
                            formData[
                              field.key as keyof typeof formData
                            ] as number
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field.key]: parseInt(e.target.value),
                            })
                          }
                          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal/80 mb-4">
                      Amenities
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {EDIT_AMENITIES.map((amenity) => (
                        <button
                          key={amenity.id}
                          onClick={() => toggleAmenity(amenity.id)}
                          className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-all ${
                            formData.amenities.includes(amenity.id)
                              ? "border-warm-green bg-warm-green/5"
                              : "border-charcoal/20 hover:border-charcoal/40"
                          }`}
                        >
                          <amenity.icon className="w-5 h-5" />
                          <span className="font-medium">{amenity.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
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

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal/80 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal/80 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            city: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal/80 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            country: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                      />
                    </div>
                  </div>
                </div>
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

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal/80 mb-2">
                        Base Price (per night)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                        <input
                          type="number"
                          value={formData.basePrice}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              basePrice: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                        />
                      </div>
                      <p className="text-xs text-charcoal/60 mt-1">
                        You'll receive: $
                        {formData.basePrice
                          ? (parseFloat(formData.basePrice) * 0.88).toFixed(2)
                          : "0"}{" "}
                        (after 12% commission)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal/80 mb-2">
                        Cleaning Fee
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                        <input
                          type="number"
                          value={formData.cleaningFee}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cleaningFee: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal/80 mb-2">
                        Check-in Time
                      </label>
                      <input
                        type="time"
                        value={formData.checkInTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            checkInTime: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal/80 mb-2">
                        Check-out Time
                      </label>
                      <input
                        type="time"
                        value={formData.checkOutTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            checkOutTime: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal/80 mb-4">
                      House Rules
                    </label>
                    <div className="space-y-4">
                      {EDIT_HOUSE_RULE_GROUPS.map((group) => (
                        <div
                          key={group.id}
                          className="border border-charcoal/10 rounded-xl overflow-hidden"
                        >
                          <button
                            onClick={() => toggleRuleGroup(group.id)}
                            className="w-full flex items-center justify-between p-4 bg-sand/20 hover:bg-sand/40 transition-colors"
                          >
                            <span className="font-medium text-charcoal">
                              {group.title}
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-charcoal/60 transition-transform duration-300 ${
                                expandedRuleGroups.includes(group.id)
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {expandedRuleGroups.includes(group.id) && (
                              <motion.div
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                transition={{
                                  duration: 0.3,
                                }}
                              >
                                <div className="p-4 space-y-3 bg-white">
                                  {group.rules.map((rule) => (
                                    <label
                                      key={rule.id}
                                      className="flex items-start space-x-3 p-2 hover:bg-charcoal/5 rounded-lg transition-colors cursor-pointer"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={!!formData.houseRules[rule.id as keyof typeof formData.houseRules]}
                                        onChange={() => toggleRule(rule.id)}
                                        className="mt-1 w-5 h-5 accent-warm-green flex-shrink-0"
                                      />
                                      <span className="text-charcoal/80 text-sm">
                                        {rule.label}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-6 py-3 border border-charcoal/20 rounded-lg hover:border-charcoal/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {currentStep < EDIT_STEPS.length ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className="flex items-center space-x-2 px-8 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-warm-green/20"
            >
              <span>Continue</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 px-8 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors shadow-lg shadow-warm-green/20"
            >
              <Check className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
