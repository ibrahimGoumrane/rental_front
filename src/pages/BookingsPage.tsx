import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Filter, ChevronDown, MapPin, Clock, DollarSign, X, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
const MOCK_BOOKINGS = [{
  id: '1',
  property: 'The Glass Pavilion',
  location: 'Montecito, California',
  image: 'https://images.unsplash.com/photo-1600596542815-2495db98dada?auto=format&fit=crop&q=80&w=400',
  checkIn: '2024-03-15',
  checkOut: '2024-03-20',
  status: 'upcoming',
  price: '$6,000',
  guests: 4
}, {
  id: '2',
  property: 'Villa di Como',
  location: 'Lake Como, Italy',
  image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400',
  checkIn: '2024-04-10',
  checkOut: '2024-04-17',
  status: 'upcoming',
  price: '$17,150',
  guests: 2
}, {
  id: '3',
  property: 'Kyoto Garden House',
  location: 'Kyoto, Japan',
  image: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=400',
  checkIn: '2024-01-10',
  checkOut: '2024-01-15',
  status: 'completed',
  price: '$4,250',
  guests: 3
}, {
  id: '4',
  property: 'Alpine Chalet',
  location: 'Zermatt, Switzerland',
  image: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&q=80&w=400',
  checkIn: '2023-12-20',
  checkOut: '2023-12-27',
  status: 'completed',
  price: '$12,600',
  guests: 6
}, {
  id: '5',
  property: 'Desert Modern',
  location: 'Joshua Tree, CA',
  image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=400',
  checkIn: '2024-02-01',
  checkOut: '2024-02-03',
  status: 'cancelled',
  price: '$1,300',
  guests: 2
}];
export function BookingsPage() {
  const [activeStatus, setActiveStatus] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const handleCancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? {
      ...b,
      status: 'cancelled'
    } : b));
    setBookingToCancel(null);
  };
  const statusChips = [{
    id: 'all',
    label: 'All Bookings',
    count: bookings.length
  }, {
    id: 'upcoming',
    label: 'Upcoming',
    count: bookings.filter(b => b.status === 'upcoming').length
  }, {
    id: 'completed',
    label: 'Completed',
    count: bookings.filter(b => b.status === 'completed').length
  }, {
    id: 'cancelled',
    label: 'Cancelled',
    count: bookings.filter(b => b.status === 'cancelled').length
  }];
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = activeStatus === 'all' || booking.status === activeStatus;
    const matchesSearch = booking.property.toLowerCase().includes(searchQuery.toLowerCase()) || booking.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-warm-green/10 text-warm-green border-warm-green/20';
      case 'completed':
        return 'bg-charcoal/10 text-charcoal border-charcoal/20';
      case 'cancelled':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-charcoal/10 text-charcoal border-charcoal/20';
    }
  };
  return <div className="min-h-screen bg-sand pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-charcoal mb-2">
            My Bookings
          </h1>
          <p className="text-charcoal/60">
            Manage and track all your reservations
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by property name or location..." className="w-full pl-12 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors" />
            </div>
          </div>

          {/* Status Chips */}
          <div className="flex flex-wrap gap-3 mb-6">
            {statusChips.map(chip => <button key={chip.id} onClick={() => setActiveStatus(chip.id as any)} className={`px-4 py-2 rounded-full border-2 transition-all font-medium text-sm ${activeStatus === chip.id ? 'bg-warm-green text-white border-warm-green shadow-sm' : 'bg-white text-charcoal border-charcoal/20 hover:border-warm-green'}`}>
                {chip.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeStatus === chip.id ? 'bg-white/20' : 'bg-charcoal/10'}`}>
                  {chip.count}
                </span>
              </button>)}
          </div>

          {/* Date Range Picker */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <button onClick={() => setShowDatePicker(!showDatePicker)} className="flex items-center space-x-2 px-4 py-2 border border-charcoal/20 rounded-lg hover:border-warm-green transition-colors">
                <Calendar className="w-4 h-4 text-charcoal/60" />
                <span className="text-sm text-charcoal">
                  {dateRange.start && dateRange.end ? `${dateRange.start} - ${dateRange.end}` : 'Select dates'}
                </span>
                <ChevronDown className={`w-4 h-4 text-charcoal/60 transition-transform ${showDatePicker ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showDatePicker && <motion.div initial={{
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
              }} className="absolute top-full mt-2 bg-white rounded-xl shadow-2xl border border-charcoal/10 p-4 z-20 w-80">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-1">
                          Start Date
                        </label>
                        <input type="date" value={dateRange.start} onChange={e => setDateRange({
                      ...dateRange,
                      start: e.target.value
                    })} className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-1">
                          End Date
                        </label>
                        <input type="date" value={dateRange.end} onChange={e => setDateRange({
                      ...dateRange,
                      end: e.target.value
                    })} className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors" />
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <button onClick={() => {
                      setDateRange({
                        start: '',
                        end: ''
                      });
                      setShowDatePicker(false);
                    }} className="flex-1 px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-charcoal/5 transition-colors text-sm font-medium">
                          Clear
                        </button>
                        <button onClick={() => setShowDatePicker(false)} className="flex-1 px-4 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors text-sm font-medium">
                          Apply
                        </button>
                      </div>
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </div>

            {(dateRange.start || dateRange.end || searchQuery) && <button onClick={() => {
            setDateRange({
              start: '',
              end: ''
            });
            setSearchQuery('');
          }} className="flex items-center space-x-1 px-3 py-2 text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors text-sm font-medium">
                <X className="w-4 h-4" />
                <span>Clear filters</span>
              </button>}
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredBookings.map((booking, index) => <motion.div key={booking.id} layout initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.9
          }} transition={{
            duration: 0.2,
            delay: index * 0.05
          }} className="bg-white rounded-xl shadow-sm border border-charcoal/10 overflow-hidden hover:shadow-lg transition-shadow group">
                <Link to={`/property/${booking.id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={booking.image} alt={booking.property} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)} backdrop-blur-sm`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </div>
                  </div>
                </Link>
                <div className="p-5">
                  <Link to={`/property/${booking.id}`}>
                    <h3 className="font-serif text-xl text-charcoal mb-2 group-hover:text-warm-green transition-colors">
                      {booking.property}
                    </h3>
                  </Link>
                  <div className="flex items-center text-charcoal/60 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{booking.location}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-charcoal/60">Check-in</span>
                      <span className="font-medium text-charcoal">
                        {booking.checkIn}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-charcoal/60">Check-out</span>
                      <span className="font-medium text-charcoal">
                        {booking.checkOut}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-charcoal/60">Guests</span>
                      <span className="font-medium text-charcoal">
                        {booking.guests} guests
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-charcoal/10 gap-2">
                    <span className="font-serif text-2xl text-charcoal">
                      {booking.price}
                    </span>
                    <div className="flex gap-2">
                      {booking.status === 'upcoming' && <button onClick={e => {
                    e.preventDefault();
                    setBookingToCancel(booking.id);
                  }} className="px-3 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                          Cancel
                        </button>}
                      <Link to={`/property/${booking.id}`} className="px-4 py-2 bg-warm-green/10 text-warm-green rounded-lg hover:bg-warm-green hover:text-white transition-colors text-sm font-medium whitespace-nowrap">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>)}
          </AnimatePresence>
        </div>

        {/* Cancel Confirmation Modal */}
        <AnimatePresence>
          {bookingToCancel && <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setBookingToCancel(null)} />
              <motion.div initial={{
            opacity: 0,
            scale: 0.95,
            y: 20
          }} animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }} exit={{
            opacity: 0,
            scale: 0.95,
            y: 20
          }} className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 z-10">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-charcoal mb-2">
                      Cancel Booking?
                    </h3>
                    <p className="text-charcoal/70 mb-6 text-sm">
                      Are you sure you want to cancel this reservation? This
                      action cannot be undone. Cancellation fees may apply based
                      on the property's policy.
                    </p>
                    <div className="flex space-x-3 justify-end">
                      <button onClick={() => setBookingToCancel(null)} className="px-4 py-2 text-charcoal/70 hover:text-charcoal font-medium text-sm">
                        Keep Booking
                      </button>
                      <button onClick={() => handleCancelBooking(bookingToCancel)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                        Yes, Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>}
        </AnimatePresence>

        {filteredBookings.length === 0 && <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-charcoal mb-2">
              No bookings found
            </h3>
            <p className="text-charcoal/60 mb-6">
              Try adjusting your filters or search query
            </p>
            <Link to="/" className="inline-block px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium">
              Explore Properties
            </Link>
          </div>}
      </div>
    </div>;
}