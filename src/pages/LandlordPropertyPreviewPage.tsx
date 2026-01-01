import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PropertyCarousel } from '../components/PropertyCarousel';
import { PropertyDetails } from '../components/PropertyDetails';
import { Edit, ArrowLeft, Eye, EyeOff, MoreVertical, X } from 'lucide-react';
import { Wifi, Coffee, Car, Wind, Utensils, Tv, Waves, Trees, MapPin, Key, Sparkles } from 'lucide-react';
// Mock property data - in real app, fetch by ID
const MOCK_PROPERTY_DATA = {
  '1': {
    title: 'The Glass Pavilion',
    location: 'Montecito, California',
    price: '$1,200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    images: ['https://images.unsplash.com/photo-1600596542815-2495db98dada?auto=format&fit=crop&q=80&w=2000', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000'],
    propertyType: {
      primary: 'villa',
      secondary: 'penthouse',
      rentalMode: 'entire'
    },
    stats: {
      type: 'Entire home',
      bedrooms: 4,
      beds: 6,
      bathrooms: 3.5
    },
    highlights: [{
      icon: MapPin,
      title: 'Great location',
      description: '95% of recent guests gave the location a 5-star rating.'
    }, {
      icon: Key,
      title: 'Self check-in',
      description: 'Check yourself in with the keypad.'
    }, {
      icon: Sparkles,
      title: 'Sparkling clean',
      description: 'Recent guests said this place was spotless.'
    }],
    description: `Nestled in the prestigious hills of Montecito, The Glass Pavilion represents the pinnacle of modern architectural design. Surrounded by five acres of oak groves, this Steve Hermann design is completely enclosed in glass, allowing for unobstructed views of the surrounding nature while maintaining complete privacy.

The home features a kitchen by Varenna, and bathrooms with fixtures by Antonio Lupi. The walnut lined art gallery is large enough to display your car collection of up to 32 cars. This is not just a home; it is a piece of art that you can live in.

Guest access
Guests have full access to the main house, infinity pool, and the surrounding 5 acres of private gardens. The art gallery/garage is available upon request.

Other things to note
The property is located in a quiet residential area. We ask that you respect our neighbors' privacy and keep noise levels down after 10 PM.`,
    amenities: [{
      icon: Wifi,
      label: 'High-speed Wifi'
    }, {
      icon: Coffee,
      label: 'Espresso Machine'
    }, {
      icon: Car,
      label: 'Private Parking'
    }, {
      icon: Wind,
      label: 'Air Conditioning'
    }, {
      icon: Utensils,
      label: "Chef's Kitchen"
    }, {
      icon: Tv,
      label: 'Home Theater'
    }, {
      icon: Waves,
      label: 'Infinity Pool'
    }, {
      icon: Trees,
      label: 'Private Garden'
    }],
    rules: ['No smoking inside the property', 'No pets allowed without prior approval', 'Check-in after 3:00 PM', 'Check-out before 11:00 AM', 'No parties or events', 'Quiet hours after 10:00 PM'],
    houseRules: {
      respect_neighbors: true,
      no_parties: true,
      quiet_hours: true,
      reasonable_condition: true,
      registered_only: true,
      visitors_declared: false,
      max_occupancy: true,
      no_overnight_guests: true,
      valid_id: true,
      couples_laws: true,
      respect_customs: true,
      legal_compliance: true,
      no_smoking: true,
      designated_smoking: false,
      alcohol_respectful: true,
      no_illegal_substances: true,
      no_pets: false,
      pets_approved: true,
      pets_quiet: true,
      no_commercial: true,
      no_filming: false,
      furniture_moved: true,
      damage_responsibility: true,
      report_issues: true,
      reasonable_usage: true
    },
    policies: {
      cancellation: 'Free cancellation for 48 hours. After that, cancel up to 7 days before check-in and get a 50% refund, minus the service fee.',
      safety: ['Smoke alarm', 'Carbon monoxide alarm', 'First aid kit', 'Fire extinguisher']
    },
    availabilityStatus: 'Available',
    rating: 4.92,
    reviewCount: 128,
    ratingBreakdown: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.8,
      checkIn: 5.0,
      value: 4.7
    },
    reviews: [{
      id: 1,
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      date: 'October 2023',
      rating: 5,
      comment: "Absolutely breathtaking. The photos don't do it justice. Waking up to the sunrise through the glass walls was a spiritual experience.",
      verified: true
    }, {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      date: 'September 2023',
      rating: 5,
      comment: 'Eleanor was a fantastic host. The property was pristine and the location is unmatched for privacy and luxury.',
      verified: true
    }],
    host: {
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
      bio: 'Curating exceptional stays for discerning travelers since 2015. I specialize in architectural landmarks and historic estates.',
      verified: true,
      joinedYear: 2015,
      rating: 4.95,
      reviewCount: 342,
      responseRate: '100%',
      responseTime: 'within an hour'
    },
    locationData: {
      neighborhood: "Montecito is known for its celebrity residents and stunning coastal landscape. You're just minutes from Butterfly Beach and the Upper Village.",
      lat: 34.4367,
      lng: -119.6321
    }
  }
};
export function LandlordPropertyPreviewPage() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(true);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const property = MOCK_PROPERTY_DATA[id as keyof typeof MOCK_PROPERTY_DATA];
  if (!property) {
    return <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4">
            Property not found
          </h2>
          <button onClick={() => navigate('/landlord/properties')} className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors">
            Back to Properties
          </button>
        </div>
      </div>;
  }
  return <div className="bg-sand min-h-screen font-sans relative">
      {/* Property Carousel - Full Screen */}
      <div className="relative">
        <PropertyCarousel images={property.images} videoUrl={property.videoUrl} title={property.title} location={property.location} price={property.price} />

        {/* Back Button - Positioned over carousel */}
        <motion.div initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} className="absolute top-24 left-6 md:left-12 z-50">
          <button onClick={() => navigate('/landlord/properties')} className="flex items-center space-x-2 px-6 py-3 bg-white/95 backdrop-blur-md text-charcoal rounded-xl hover:bg-white transition-all shadow-xl border border-charcoal/10 hover:-translate-y-0.5">
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
                  <button onClick={() => setShowActionsMenu(!showActionsMenu)} className="p-3 hover:bg-sand rounded-xl transition-colors border border-charcoal/10">
                    <MoreVertical className="w-5 h-5 text-charcoal" />
                  </button>

                  <AnimatePresence>
                    {showActionsMenu && <>
                        {/* Backdrop */}
                        <div className="fixed inset-0 z-40" onClick={() => setShowActionsMenu(false)} />

                        {/* Menu */}
                        <motion.div initial={{
                      opacity: 0,
                      y: 10,
                      scale: 0.95
                    }} animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1
                    }} exit={{
                      opacity: 0,
                      y: 10,
                      scale: 0.95
                    }} transition={{
                      duration: 0.15
                    }} className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-charcoal/10 overflow-hidden z-50">
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
                            <button onClick={() => {
                          setIsPublished(!isPublished);
                          setShowActionsMenu(false);
                        }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all mb-2 ${isPublished ? 'bg-warm-green/10 hover:bg-warm-green/20' : 'bg-charcoal/5 hover:bg-charcoal/10'}`}>
                              <div className="flex items-center space-x-3">
                                {isPublished ? <Eye className="w-5 h-5 text-warm-green" /> : <EyeOff className="w-5 h-5 text-charcoal/60" />}
                                <div className="text-left">
                                  <p className={`font-bold text-sm ${isPublished ? 'text-warm-green' : 'text-charcoal'}`}>
                                    {isPublished ? 'Published' : 'Unpublished'}
                                  </p>
                                  <p className="text-xs text-charcoal/60">
                                    {isPublished ? 'Visible to guests' : 'Hidden from guests'}
                                  </p>
                                </div>
                              </div>
                              <div className={`w-10 h-6 rounded-full transition-colors relative ${isPublished ? 'bg-warm-green' : 'bg-charcoal/20'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isPublished ? 'left-5' : 'left-1'}`} />
                              </div>
                            </button>

                            {/* Edit Button */}
                            <button onClick={() => {
                          navigate(`/landlord/properties/${id}/edit`);
                          setShowActionsMenu(false);
                        }} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-warm-green/10 transition-colors group">
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
                      </>}
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
    </div>;
}