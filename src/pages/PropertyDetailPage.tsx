import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PropertyCarousel } from '../components/PropertyCarousel';
import { PropertyDetails } from '../components/PropertyDetails';
import { ArrowLeft, Star } from 'lucide-react';
import { Wifi, Coffee, Car, Wind, Utensils, Tv, Waves, Trees, MapPin, Key, Sparkles } from 'lucide-react';
// Expanded data structure
const PROPERTY_DATA = {
  title: 'The Glass Pavilion',
  location: 'Montecito, California',
  price: '$1,200',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  images: ['https://images.unsplash.com/photo-1600596542815-2495db98dada?auto=format&fit=crop&q=80&w=2000', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000'],
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
  }, {
    id: 3,
    name: 'Emma Thompson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    date: 'August 2023',
    rating: 4,
    comment: 'Stunning architecture. The only minor issue was the pool heating took a while, but otherwise perfect.',
    verified: false
  }],
  host: {
    name: 'Eleanor Sterling',
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
};
export function PropertyDetailPage() {
  const navigate = useNavigate();
  return <div className="bg-sand min-h-screen font-sans relative">
      {/* Property Carousel - Full Screen */}
      <div className="relative">
        <PropertyCarousel images={PROPERTY_DATA.images} videoUrl={PROPERTY_DATA.videoUrl} title={PROPERTY_DATA.title} location={PROPERTY_DATA.location} price={PROPERTY_DATA.price} />

        {/* Back Button - Positioned over carousel */}
        <motion.div initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} className="absolute top-24 left-6 md:left-12 z-50">
          <button onClick={() => navigate('/')} className="flex items-center space-x-2 px-6 py-3 bg-white/95 backdrop-blur-md text-charcoal rounded-xl hover:bg-white transition-all shadow-xl border border-charcoal/10 hover:-translate-y-0.5">
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
                  {PROPERTY_DATA.title}
                </h2>
                <p className="text-charcoal/60">{PROPERTY_DATA.location}</p>
              </div>
            </div>

            {/* Property Stats */}
            <div className="flex items-center space-x-4 text-charcoal/70 text-sm md:text-base">
              <span className="flex items-center">
                <Star className="w-4 h-4 text-terracotta mr-1 fill-current" />
                <span className="font-medium text-charcoal">
                  {PROPERTY_DATA.rating}
                </span>
                <span className="mx-1">·</span>
                <span className="underline cursor-pointer">
                  {PROPERTY_DATA.reviewCount} reviews
                </span>
              </span>
            </div>
          </div>

          {/* Rest of PropertyDetails content */}
          <PropertyDetails property={PROPERTY_DATA} />
        </div>
      </div>
    </div>;
}