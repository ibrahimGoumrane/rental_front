import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Download, Edit, Filter, Grid, List, MoreVertical, CheckCircle, Clock, XCircle, Star, Eye, Flag, Archive, Calendar, DollarSign, MapPin, Home, Users, Award, AlertCircle, FileText, TrendingUp, Shield, X, Plus, RefreshCw, Folder, ChevronLeft, ChevronRight } from 'lucide-react';
// Mock property data - UPDATED STATUS VALUES
const MOCK_PROPERTIES = [{
  id: 1,
  title: 'The Glass Pavilion',
  location: 'Montecito, California',
  city: 'Montecito',
  image: 'https://images.unsplash.com/photo-1600596542815-2495db98dada?auto=format&fit=crop&q=80&w=400',
  type: 'villa',
  owner: {
    name: 'Eleanor Martinez',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    verified: true
  },
  status: 'active',
  verification: 'verified',
  price: 1200,
  bookings: 87,
  revenue: 104400,
  commission: 15660,
  rating: 4.9,
  reviewCount: 128,
  featured: true,
  bedrooms: 4,
  guests: 8
}, {
  id: 2,
  title: 'Villa di Como',
  location: 'Lake Como, Italy',
  city: 'Como',
  image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=400',
  type: 'villa',
  owner: {
    name: 'Marco Rossi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    verified: true
  },
  status: 'active',
  verification: 'verified',
  price: 2450,
  bookings: 52,
  revenue: 127400,
  commission: 19110,
  rating: 4.7,
  reviewCount: 89,
  featured: false,
  bedrooms: 3,
  guests: 6
}, {
  id: 3,
  title: 'Kyoto Garden House',
  location: 'Kyoto, Japan',
  city: 'Kyoto',
  image: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=400',
  type: 'house',
  owner: {
    name: 'Yuki Tanaka',
    avatar: null,
    initials: 'YT',
    verified: true
  },
  status: 'active',
  verification: 'verified',
  price: 850,
  bookings: 95,
  revenue: 80750,
  commission: 12112,
  rating: 4.8,
  reviewCount: 142,
  featured: false,
  bedrooms: 2,
  guests: 4
}, {
  id: 4,
  title: 'Marina Beach Villa',
  location: 'Casablanca, Morocco',
  city: 'Casablanca',
  image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400',
  type: 'villa',
  owner: {
    name: 'Ahmed Hassan',
    avatar: null,
    initials: 'AH',
    verified: false
  },
  status: 'pending',
  verification: 'pending',
  price: 1800,
  bookings: 0,
  revenue: 0,
  commission: 0,
  rating: 0,
  reviewCount: 0,
  featured: false,
  bedrooms: 5,
  guests: 10
}, {
  id: 5,
  title: 'Downtown Loft',
  location: 'New York, USA',
  city: 'New York',
  image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400',
  type: 'apartment',
  owner: {
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    verified: true
  },
  status: 'suspended',
  verification: 'verified',
  price: 320,
  bookings: 156,
  revenue: 49920,
  commission: 7488,
  rating: 4.6,
  reviewCount: 203,
  featured: false,
  bedrooms: 1,
  guests: 2,
  suspendedDate: '2024-12-01',
  autoDeleteDate: '2024-12-31'
}];
// Mock collections data
const MOCK_COLLECTIONS = [{
  id: 1,
  name: 'Luxury Villas',
  propertyCount: 24,
  createdDate: 'Nov 15, 2024',
  description: 'High-end luxury properties'
}, {
  id: 2,
  name: 'Beachfront Properties',
  propertyCount: 18,
  createdDate: 'Oct 22, 2024',
  description: 'Properties with beach access'
}, {
  id: 3,
  name: 'City Center Apartments',
  propertyCount: 42,
  createdDate: 'Sep 10, 2024',
  description: 'Urban downtown locations'
}, {
  id: 4,
  name: 'Mountain Retreats',
  propertyCount: 15,
  createdDate: 'Aug 5, 2024',
  description: 'Scenic mountain properties'
}];
export function AdminPropertiesPage() {
  const [activeTab, setActiveTab] = useState<'properties' | 'collections'>('properties');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [verificationFilter, setVerificationFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [featuredFilter, setFeaturedFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'bookings' | 'revenue' | 'rating'>('newest');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  // Add collection filter state
  const [collectionFilter, setCollectionFilter] = useState<string>('all');
  // Modals
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddToCollectionModal, setShowAddToCollectionModal] = useState(false);
  const [showStatusConfirmModal, setShowStatusConfirmModal] = useState(false);
  // Export filters
  const [exportFilters, setExportFilters] = useState({
    status: 'all',
    type: 'all',
    city: '',
    owner: ''
  });
  // Add to collection state
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  // Status change state
  const [statusChange, setStatusChange] = useState<{
    propertyId: number;
    propertyName: string;
    currentStatus: string;
    newStatus: string;
  } | null>(null);
  const stats = {
    total: 3421,
    pending: 434,
    live: 2987
  };
  const handleViewCollectionProperties = (collectionId: number, collectionName: string) => {
    setCollectionFilter(collectionId.toString());
    setActiveTab('properties');
    // Optionally scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleExport = () => {
    console.log('Exporting with filters:', exportFilters);
    // Export logic would go here
    setShowExportModal(false);
  };
  const handleAddToCollection = () => {
    console.log(`Adding property ${selectedProperty} to collection ${selectedCollection}`);
    setShowAddToCollectionModal(false);
    setSelectedProperty(null);
    setSelectedCollection('');
  };
  const handleStatusChange = () => {
    if (!statusChange) return;
    console.log(`Changing status of property ${statusChange.propertyId} from ${statusChange.currentStatus} to ${statusChange.newStatus}`);
    // Status change logic would go here
    setShowStatusConfirmModal(false);
    setStatusChange(null);
  };
  const resetExportFilters = () => {
    setExportFilters({
      status: 'all',
      type: 'all',
      city: '',
      owner: ''
    });
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
            Active
          </span>;
      case 'pending':
        return <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
            Pending
          </span>;
      case 'suspended':
        return <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
            Suspended
          </span>;
      default:
        return null;
    }
  };
  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-warm-green" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-gold" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-terracotta" />;
      default:
        return <XCircle className="w-5 h-5 text-charcoal/40" />;
    }
  };
  return <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        {/* Page Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-2">
                Properties Management
              </h1>
              <p className="text-xl text-charcoal/70 font-light">
                {stats.total.toLocaleString()} total properties |
                <span className="text-gold font-medium">
                  {' '}
                  {stats.pending} pending verification
                </span>{' '}
                |
                <span className="text-warm-green font-medium">
                  {' '}
                  {stats.live.toLocaleString()} live
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => setShowExportModal(true)} className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:-translate-y-0.5">
                <Download className="w-5 h-5" />
                <span className="font-medium">Export Listings</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.05
      }} className="mb-6">
          <div className="flex items-center space-x-8 border-b border-charcoal/10">
            {[{
            id: 'properties',
            label: 'Properties'
          }, {
            id: 'collections',
            label: 'Collections'
          }].map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`pb-4 font-medium transition-colors relative ${activeTab === tab.id ? 'text-charcoal' : 'text-charcoal/60 hover:text-charcoal'}`}>
                {tab.label}
                {activeTab === tab.id && <motion.div layoutId="activePropertyTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta" />}
              </button>)}
          </div>
        </motion.div>

        {/* Properties Tab */}
        {activeTab === 'properties' && <>
            {/* Filter Bar */}
            <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }} className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
                  {/* Search */}
                  <div className="flex-1 max-w-xl relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by property name, address, or owner..." className="w-full pl-12 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white" />
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center bg-white rounded-lg border border-charcoal/10 p-1 self-start">
                    <button onClick={() => setViewMode('grid')} className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-terracotta text-white' : 'text-charcoal/60 hover:text-charcoal'}`}>
                      <Grid className="w-5 h-5" />
                    </button>
                    <button onClick={() => setViewMode('table')} className={`p-2 rounded transition-colors ${viewMode === 'table' ? 'bg-terracotta text-white' : 'text-charcoal/60 hover:text-charcoal'}`}>
                      <List className="w-5 h-5" />
                    </button>
                  </div>

                  <button onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-charcoal/20 rounded-lg hover:border-terracotta transition-colors">
                    <Filter className="w-5 h-5" />
                    <span className="font-medium">Filters</span>
                  </button>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm">
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>

                <select value={verificationFilter} onChange={e => setVerificationFilter(e.target.value)} className="px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm">
                  <option value="all">All Verification</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending Docs</option>
                  <option value="rejected">Rejected</option>
                </select>

                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm">
                  <option value="all">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="house">House</option>
                  <option value="studio">Studio</option>
                </select>

                <select value={featuredFilter} onChange={e => setFeaturedFilter(e.target.value)} className="px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm">
                  <option value="all">All Properties</option>
                  <option value="featured">Featured Only</option>
                  <option value="not-featured">Not Featured</option>
                </select>

                <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm">
                  <option value="newest">Newest First</option>
                  <option value="bookings">Most Booked</option>
                  <option value="revenue">Highest Revenue</option>
                  <option value="rating">Lowest Rating</option>
                </select>
              </div>

              {/* Collection Filter - Show when filtered */}
              {collectionFilter !== 'all' && <motion.div initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} exit={{
            opacity: 0,
            height: 0
          }} className="mt-4 pt-4 border-t border-charcoal/10">
                  <div className="flex items-center justify-between bg-warm-green/10 border border-warm-green/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Folder className="w-5 h-5 text-warm-green" />
                      <div>
                        <p className="text-sm font-medium text-charcoal">
                          Filtered by Collection
                        </p>
                        <p className="text-xs text-charcoal/60">
                          {MOCK_COLLECTIONS.find(c => c.id.toString() === collectionFilter)?.name || 'Unknown Collection'}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setCollectionFilter('all')} className="flex items-center space-x-2 px-4 py-2 bg-white border border-charcoal/20 rounded-lg hover:bg-charcoal/5 transition-colors text-sm font-medium">
                      <X className="w-4 h-4" />
                      <span>Clear Filter</span>
                    </button>
                  </div>
                </motion.div>}

              {/* Advanced Filters */}
              <AnimatePresence>
                {showFilters && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.3
            }} className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-charcoal/10">
                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">
                          Price Range (per night)
                        </label>
                        <div className="flex items-center space-x-2">
                          <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta bg-white text-sm" />
                          <span className="text-charcoal/60">-</span>
                          <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta bg-white text-sm" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">
                          Guest Capacity
                        </label>
                        <select className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta bg-white text-sm">
                          <option>Any Capacity</option>
                          <option>1-2 guests</option>
                          <option>3-5 guests</option>
                          <option>6-10 guests</option>
                          <option>10+ guests</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">
                          Performance
                        </label>
                        <select className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta bg-white text-sm">
                          <option>All Performance</option>
                          <option>High Booking Rate</option>
                          <option>Low Booking Rate</option>
                          <option>New Listings</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">
                          Location
                        </label>
                        <input type="text" placeholder="City or region..." className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta bg-white text-sm" />
                      </div>
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </motion.div>

            {/* Grid View with Pagination */}
            {viewMode === 'grid' && <div className="space-y-8">
                <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MOCK_PROPERTIES.map((property, index) => <motion.div key={property.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2 + index * 0.05
            }} onMouseEnter={() => setHoveredCard(property.id)} onMouseLeave={() => setHoveredCard(null)} className="bg-sand rounded-2xl overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-xl transition-all relative group">
                      {/* Featured Ribbon */}
                      {property.featured && <div className="absolute top-0 right-0 z-20">
                          <div className="bg-gold text-white px-4 py-1 text-xs font-bold uppercase tracking-wider transform rotate-45 translate-x-8 translate-y-4 shadow-lg">
                            <Star className="w-3 h-3 inline mr-1" />
                            Featured
                          </div>
                        </div>}

                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                        {/* Quick Actions Overlay */}
                        <AnimatePresence>
                          {hoveredCard === property.id && <motion.div initial={{
                    opacity: 0
                  }} animate={{
                    opacity: 1
                  }} exit={{
                    opacity: 0
                  }} className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center space-x-3 p-4">
                              <Link to={`/property/${property.id}`} className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-terracotta transition-colors text-sm font-medium whitespace-nowrap">
                                View
                              </Link>
                              <button onClick={() => {
                      setSelectedProperty(property.id);
                      setShowAddToCollectionModal(true);
                    }} className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-gold transition-colors text-sm font-medium whitespace-nowrap">
                                Add to Collection
                              </button>
                            </motion.div>}
                        </AnimatePresence>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <Link to={`/property/${property.id}`} className="font-bold text-charcoal hover:text-terracotta transition-colors text-lg line-clamp-1">
                              {property.title}
                            </Link>
                            <div className="flex items-center text-sm text-charcoal/60 mt-1">
                              <MapPin className="w-4 h-4 text-terracotta mr-1 flex-shrink-0" />
                              <span className="truncate">
                                {property.location}
                              </span>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0">
                            {getVerificationIcon(property.verification)}
                          </div>
                        </div>

                        <div className="flex items-center flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 bg-terracotta/20 text-terracotta text-xs font-bold rounded-full capitalize">
                            {property.type}
                          </span>
                          {getStatusBadge(property.status)}
                        </div>

                        {/* Status Dropdown */}
                        <div className="mb-4">
                          <label className="block text-xs font-medium text-charcoal/60 mb-1">
                            Status Control
                          </label>
                          <select value={property.status} onChange={e => {
                    setStatusChange({
                      propertyId: property.id,
                      propertyName: property.title,
                      currentStatus: property.status,
                      newStatus: e.target.value
                    });
                    setShowStatusConfirmModal(true);
                  }} className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta bg-white text-sm">
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="suspended">Suspended</option>
                          </select>
                        </div>

                        {/* Suspended Notice */}
                        {property.status === 'suspended' && property.autoDeleteDate && <div className="mb-4 p-3 bg-terracotta/10 border border-terracotta/20 rounded-lg">
                              <p className="text-xs text-terracotta font-medium">
                                ⚠️ Auto-delete: {property.autoDeleteDate}
                              </p>
                              <p className="text-xs text-charcoal/60 mt-1">
                                Reactivate before this date to prevent deletion
                              </p>
                            </div>}

                        {/* Owner */}
                        <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-charcoal/10">
                          {property.owner.avatar ? <img src={property.owner.avatar} alt={property.owner.name} className="w-8 h-8 rounded-full border-2 border-sand flex-shrink-0" /> : <div className="w-8 h-8 rounded-full bg-warm-green/10 flex items-center justify-center border-2 border-sand flex-shrink-0">
                              <span className="text-xs font-bold text-warm-green">
                                {property.owner.initials}
                              </span>
                            </div>}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-charcoal truncate">
                              {property.owner.name}
                            </p>
                          </div>
                          {property.owner.verified && <Shield className="w-4 h-4 text-gold flex-shrink-0" />}
                        </div>

                        {/* Stats */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-charcoal/60">
                              Nightly Rate
                            </span>
                            <span className="font-bold text-charcoal">
                              ${property.price}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-charcoal/60">
                              Total Bookings
                            </span>
                            <span className="font-medium text-warm-green">
                              {property.bookings}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-charcoal/60">
                              Revenue
                            </span>
                            <span className="font-medium text-gold">
                              ${property.revenue.toLocaleString()}
                            </span>
                          </div>
                          {property.rating > 0 && <div className="flex items-center justify-between">
                              <span className="text-sm text-charcoal/60">
                                Rating
                              </span>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-gold fill-current mr-1" />
                                <span className="font-medium text-charcoal">
                                  {property.rating}
                                </span>
                                <span className="text-xs text-charcoal/60 ml-1">
                                  ({property.reviewCount})
                                </span>
                              </div>
                            </div>}
                        </div>
                      </div>
                    </motion.div>)}
                </motion.div>

                {/* Pagination for Grid View */}
                <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="bg-white rounded-2xl border border-charcoal/5 shadow-sm">
                  <div className="bg-sand px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl">
                    <p className="text-sm text-charcoal/70">
                      Showing 1 to 5 of 3,421 properties
                    </p>
                    <div className="flex items-center flex-wrap gap-2">
                      <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium flex items-center space-x-1">
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                      <button className="px-4 py-2 bg-terracotta text-white rounded-lg font-medium text-sm">
                        1
                      </button>
                      <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                        2
                      </button>
                      <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                        3
                      </button>
                      <span className="px-2 text-charcoal/60">...</span>
                      <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                        685
                      </button>
                      <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium flex items-center space-x-1">
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>}

            {/* Table View */}
            {viewMode === 'table' && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} className="bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-sand border-b border-charcoal/10">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                          Property
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                          Owner
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                          Type
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                          Location
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                          Bookings
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                          Revenue
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-charcoal/5">
                      {MOCK_PROPERTIES.map((property, index) => <motion.tr key={property.id} initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.2 + index * 0.05
                }} className={`hover:bg-sand/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-cream'}`}>
                          <td className="px-6 py-4">
                            <Link to={`/property/${property.id}`} className="flex items-center space-x-3 group">
                              <img src={property.image} alt={property.title} className="w-16 h-16 rounded-lg object-cover" />
                              <div>
                                <p className="font-medium text-charcoal group-hover:text-terracotta transition-colors">
                                  {property.title}
                                </p>
                                {property.featured && <span className="inline-flex items-center text-xs text-gold font-bold">
                                    <Star className="w-3 h-3 mr-1 fill-current" />
                                    Featured
                                  </span>}
                              </div>
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              {property.owner.avatar ? <img src={property.owner.avatar} alt={property.owner.name} className="w-8 h-8 rounded-full" /> : <div className="w-8 h-8 rounded-full bg-warm-green/10 flex items-center justify-center">
                                  <span className="text-xs font-bold text-warm-green">
                                    {property.owner.initials}
                                  </span>
                                </div>}
                              <div>
                                <p className="text-sm font-medium text-charcoal">
                                  {property.owner.name}
                                </p>
                                {property.owner.verified && <span className="text-xs text-gold flex items-center">
                                    <Shield className="w-3 h-3 mr-1" />
                                    Verified
                                  </span>}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-terracotta/20 text-terracotta text-xs font-bold rounded-full capitalize">
                              {property.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-charcoal/70">
                              {property.city}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              {getStatusBadge(property.status)}
                              {property.status === 'suspended' && property.autoDeleteDate && <p className="text-xs text-terracotta mt-1">
                                    Auto-delete: {property.autoDeleteDate}
                                  </p>}
                            </div>
                            <select value={property.status} onChange={e => {
                      setStatusChange({
                        propertyId: property.id,
                        propertyName: property.title,
                        currentStatus: property.status,
                        newStatus: e.target.value
                      });
                      setShowStatusConfirmModal(true);
                    }} className="mt-2 w-full px-2 py-1 border border-charcoal/20 rounded text-xs outline-none focus:border-terracotta bg-white">
                              <option value="active">Active</option>
                              <option value="pending">Pending</option>
                              <option value="suspended">Suspended</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-charcoal">
                              {property.bookings}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-charcoal">
                                ${property.revenue.toLocaleString()}
                              </p>
                              <p className="text-xs text-gold">
                                Commission: $
                                {property.commission.toLocaleString()}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Link to={`/property/${property.id}`} className="px-3 py-1 bg-warm-green text-white text-xs font-medium rounded hover:bg-warm-green/90 transition-colors">
                                View
                              </Link>
                              <button onClick={() => {
                        setSelectedProperty(property.id);
                        setShowAddToCollectionModal(true);
                      }} className="px-3 py-1 bg-gold text-white text-xs font-medium rounded hover:bg-gold/90 transition-colors">
                                Add to Collection
                              </button>
                            </div>
                          </td>
                        </motion.tr>)}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="bg-sand px-6 py-4 border-t border-charcoal/10 flex items-center justify-between">
                  <p className="text-sm text-charcoal/70">
                    Showing 1 to 5 of 3,421 properties
                  </p>
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                      Previous
                    </button>
                    <button className="px-4 py-2 bg-terracotta text-white rounded-lg font-medium text-sm">
                      1
                    </button>
                    <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                      2
                    </button>
                    <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                      3
                    </button>
                    <span className="px-2 text-charcoal/60">...</span>
                    <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                      685
                    </button>
                    <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                      Next
                    </button>
                  </div>
                </div>
              </motion.div>}
          </>}

        {/* Collections Tab */}
        {activeTab === 'collections' && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="space-y-6">
            <div className="bg-gold/10 border border-gold/20 rounded-xl p-6">
              <p className="text-sm text-charcoal/70">
                <strong>Note:</strong> Collections are view-only in this scope.
                You can view existing collections and their properties, but
                cannot create, edit, or delete collections here.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_COLLECTIONS.map((collection, index) => <motion.div key={collection.id} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }} className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                      <Folder className="w-6 h-6 text-gold" />
                    </div>
                    <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
                      {collection.propertyCount} properties
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-charcoal mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-charcoal/60 mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
                    <span className="text-xs text-charcoal/60">
                      Created: {collection.createdDate}
                    </span>
                    <button onClick={() => handleViewCollectionProperties(collection.id, collection.name)} className="text-sm text-warm-green font-medium hover:underline transition-colors">
                      View Properties
                    </button>
                  </div>
                </motion.div>)}
            </div>
          </motion.div>}
      </div>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowExportModal(false)} />
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
        }} className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10">
              <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
                <h3 className="font-serif text-2xl text-charcoal">
                  Export Listings
                </h3>
                <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-charcoal/70">
                    <strong>Note:</strong> Apply filters first, then export.
                    Only filtered results will be included in the CSV export.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Status
                    </label>
                    <select value={exportFilters.status} onChange={e => setExportFilters({
                  ...exportFilters,
                  status: e.target.value
                })} className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50">
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Property Type
                    </label>
                    <select value={exportFilters.type} onChange={e => setExportFilters({
                  ...exportFilters,
                  type: e.target.value
                })} className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50">
                      <option value="all">All Types</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="house">House</option>
                      <option value="studio">Studio</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      City
                    </label>
                    <input type="text" value={exportFilters.city} onChange={e => setExportFilters({
                  ...exportFilters,
                  city: e.target.value
                })} placeholder="Filter by city..." className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Owner Name
                    </label>
                    <input type="text" value={exportFilters.owner} onChange={e => setExportFilters({
                  ...exportFilters,
                  owner: e.target.value
                })} placeholder="Filter by owner..." className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-green/50" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
                <button onClick={resetExportFilters} className="flex items-center space-x-2 px-4 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium">
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset Filters</span>
                </button>
                <button onClick={() => setShowExportModal(false)} className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium">
                  Cancel
                </button>
                <button onClick={handleExport} className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium">
                  Export to CSV
                </button>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>

      {/* Add to Collection Modal */}
      <AnimatePresence>
        {showAddToCollectionModal && <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddToCollectionModal(false)} />
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
        }} className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10">
              <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
                <h3 className="font-serif text-2xl text-charcoal">
                  Add to Collection
                </h3>
                <button onClick={() => setShowAddToCollectionModal(false)} className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              <div className="p-6">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Select Collection
                </label>
                <select value={selectedCollection} onChange={e => setSelectedCollection(e.target.value)} className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50">
                  <option value="">Choose a collection...</option>
                  {MOCK_COLLECTIONS.map(collection => <option key={collection.id} value={collection.id}>
                      {collection.name} ({collection.propertyCount} properties)
                    </option>)}
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
                <button onClick={() => setShowAddToCollectionModal(false)} className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium">
                  Cancel
                </button>
                <button onClick={handleAddToCollection} disabled={!selectedCollection} className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                  Add to Collection
                </button>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>

      {/* Status Confirmation Modal */}
      <AnimatePresence>
        {showStatusConfirmModal && statusChange && <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowStatusConfirmModal(false)} />
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
        }} className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10 text-center p-8">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">
                Confirm Status Change
              </h3>
              <p className="text-charcoal/60 mb-6">
                Change status of <strong>{statusChange.propertyName}</strong>{' '}
                from{' '}
                <strong className="capitalize">
                  {statusChange.currentStatus}
                </strong>{' '}
                to{' '}
                <strong className="capitalize">{statusChange.newStatus}</strong>
                ?
              </p>
              {statusChange.newStatus === 'suspended' && <div className="bg-terracotta/10 border border-terracotta/20 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-charcoal/70">
                    <strong>Warning:</strong> Suspended properties become
                    invisible to users and will be automatically deleted after
                    30 days if not reactivated.
                  </p>
                </div>}
              <p className="text-xs text-charcoal/60 mb-6">
                This action will be logged in the audit trail.
              </p>
              <div className="flex items-center space-x-3">
                <button onClick={() => setShowStatusConfirmModal(false)} className="flex-1 px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium">
                  Cancel
                </button>
                <button onClick={handleStatusChange} className="flex-1 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors font-medium">
                  Confirm Change
                </button>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>
    </div>;
}