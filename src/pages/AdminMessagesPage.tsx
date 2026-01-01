import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Download, Settings, Filter, AlertTriangle, MessageSquare, Clock, CheckCircle, ArrowLeftRight, MapPin, Phone, Mail, Shield, Eye, Flag, Trash2, Ban, MoreVertical, Lightbulb, XCircle, X, Plus, RefreshCw } from 'lucide-react';
// Mock conversation data - NO PROPERTY REFERENCES
const MOCK_CONVERSATIONS = [{
  id: 1,
  priority: 'high',
  guest: {
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
  },
  host: {
    name: 'Eleanor Martinez',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
  },
  lastMessage: 'Hey, can we talk on WhatsApp? My number is +212 6XX XXX XXX',
  flaggedPortion: 'WhatsApp? My number is +212 6XX XXX XXX',
  timestamp: '2 hours ago',
  flagReason: 'Exchange of Contact Information',
  secondaryTags: ['Phone number detected'],
  aiConfidence: 94,
  status: 'unreviewed',
  violationCount: 2 // Repeat offender tracking
}, {
  id: 2,
  priority: 'high',
  guest: {
    name: 'Ahmed Hassan',
    avatar: null,
    initials: 'AH'
  },
  host: {
    name: 'Lisa Anderson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
  },
  lastMessage: 'Email me at example@gmail.com for faster response',
  flaggedPortion: 'Email me at example@gmail.com',
  timestamp: '30 minutes ago',
  flagReason: 'Exchange of Contact Information',
  secondaryTags: ['Email detected'],
  aiConfidence: 96,
  status: 'unreviewed',
  violationCount: 1
}, {
  id: 3,
  priority: 'medium',
  guest: {
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
  },
  host: {
    name: 'Marco Rossi',
    avatar: null,
    initials: 'MR'
  },
  lastMessage: 'This property is absolutely terrible and disgusting!',
  flaggedPortion: 'terrible and disgusting',
  timestamp: '5 hours ago',
  flagReason: 'Blocked Keywords Detected',
  secondaryTags: ['Profanity detected'],
  aiConfidence: 88,
  status: 'under-review',
  assignedAdmin: 'Admin John',
  violationCount: 3 // Repeat offender
}, {
  id: 4,
  priority: 'low',
  guest: {
    name: 'Emma Thompson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100'
  },
  host: {
    name: 'Yuki Tanaka',
    avatar: null,
    initials: 'YT'
  },
  lastMessage: 'Thank you so much! Looking forward to the stay.',
  flaggedPortion: null,
  timestamp: '1 day ago',
  flagReason: 'Blocked Keywords Detected',
  secondaryTags: ['False positive'],
  aiConfidence: 62,
  status: 'resolved',
  violationCount: 0
}];
// Mock blocked keywords
const INITIAL_BLOCKED_KEYWORDS = ['whatsapp', 'email', 'phone', 'call me', 'text me', 'paypal', 'venmo', 'cash app', 'terrible', 'disgusting', 'awful'];
export function AdminMessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    userName: '',
    flagReason: 'all',
    dateFrom: '',
    dateTo: '',
    status: 'all'
  });
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  // Modals
  const [showBlockedKeywordsModal, setShowBlockedKeywordsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // Blocked keywords management
  const [blockedKeywords, setBlockedKeywords] = useState(INITIAL_BLOCKED_KEYWORDS);
  const [newKeyword, setNewKeyword] = useState('');
  // Export filters
  const [exportFilters, setExportFilters] = useState({
    dateFrom: '',
    dateTo: '',
    userName: '',
    flagReason: 'all'
  });
  // Confirmation modal state
  const [confirmAction, setConfirmAction] = useState<{
    type: 'warn' | 'suspend' | 'false-positive';
    conversationId: number;
    userName: string;
  } | null>(null);
  const stats = {
    totalToday: 2847,
    flagged: 7,
    autoBlocked: 23,
    avgResponseTime: 2.3
  };
  const handleAddKeyword = () => {
    if (newKeyword.trim() && !blockedKeywords.includes(newKeyword.trim().toLowerCase())) {
      setBlockedKeywords([...blockedKeywords, newKeyword.trim().toLowerCase()]);
      setNewKeyword('');
    }
  };
  const handleRemoveKeyword = (keyword: string) => {
    setBlockedKeywords(blockedKeywords.filter(k => k !== keyword));
  };
  const handleExport = () => {
    console.log('Exporting conversations with filters:', exportFilters);
    // Export logic would go here
    setShowExportModal(false);
  };
  const handleConfirmAction = () => {
    if (!confirmAction) return;
    console.log(`Executing ${confirmAction.type} for conversation ${confirmAction.conversationId}`);
    // Action logic would go here
    setConfirmAction(null);
    setOpenMenuId(null);
  };
  const resetFilters = () => {
    setFilters({
      userName: '',
      flagReason: 'all',
      dateFrom: '',
      dateTo: '',
      status: 'all'
    });
  };
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full flex items-center space-x-1">
            <span className="w-2 h-2 bg-white rounded-full" />
            <span>High</span>
          </span>;
      case 'medium':
        return <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full flex items-center space-x-1">
            <span className="w-2 h-2 bg-white rounded-full" />
            <span>Medium</span>
          </span>;
      case 'low':
        return <span className="px-3 py-1 bg-warm-green/60 text-white text-xs font-bold rounded-full flex items-center space-x-1">
            <span className="w-2 h-2 bg-white rounded-full" />
            <span>Low</span>
          </span>;
      default:
        return null;
    }
  };
  const getStatusBadge = (status: string, extra?: any) => {
    switch (status) {
      case 'unreviewed':
        return <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
            Unreviewed
          </span>;
      case 'under-review':
        return <div>
            <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
              Under Review
            </span>
            {extra?.assignedAdmin && <p className="text-xs text-charcoal/60 mt-1">
                {extra.assignedAdmin}
              </p>}
          </div>;
      case 'resolved':
        return <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
            Resolved
          </span>;
      default:
        return null;
    }
  };
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-warm-green';
    if (confidence >= 75) return 'text-gold';
    return 'text-charcoal/60';
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
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-8">
            Message Moderation & Oversight
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                    Total Conversations Today
                  </p>
                  <h3 className="font-serif text-4xl font-bold text-charcoal">
                    {stats.totalToday.toLocaleString()}
                  </h3>
                </div>
                <MessageSquare className="w-8 h-8 text-charcoal/40" />
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                    Flagged Messages
                  </p>
                  <h3 className="font-serif text-4xl font-bold text-terracotta">
                    {stats.flagged}
                  </h3>
                  <p className="text-xs text-charcoal/60 mt-1">
                    requiring review
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-terracotta" />
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                    Auto-deleted Messages
                  </p>
                  <h3 className="font-serif text-4xl font-bold text-charcoal/60">
                    {stats.autoBlocked}
                  </h3>
                  <p className="text-xs text-charcoal/60 mt-1">
                    logged for audit
                  </p>
                </div>
                <Shield className="w-8 h-8 text-charcoal/40" />
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/60 font-medium mb-2">
                    Average Response Time
                  </p>
                  <h3 className="font-serif text-4xl font-bold text-warm-green">
                    {stats.avgResponseTime}h
                  </h3>
                </div>
                <Clock className="w-8 h-8 text-warm-green" />
              </div>
            </motion.div>
          </div>

          {/* Action Buttons - UPDATED */}
          <div className="flex items-center space-x-3">
            <button onClick={() => setShowBlockedKeywordsModal(true)} className="flex items-center space-x-2 px-6 py-3 bg-charcoal text-white rounded-lg hover:bg-charcoal/90 transition-all shadow-sm hover:-translate-y-0.5">
              <Shield className="w-5 h-5" />
              <span className="font-medium">View Blocked Keywords</span>
            </button>
            <button onClick={() => setShowExportModal(true)} className="flex items-center space-x-2 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-all shadow-sm hover:-translate-y-0.5">
              <Download className="w-5 h-5" />
              <span className="font-medium">Export Conversations</span>
            </button>
          </div>
        </motion.div>

        {/* Filter Bar - UPDATED */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.5
      }} className="bg-sand rounded-2xl p-6 border border-charcoal/5 shadow-sm mb-8 sticky top-20 z-20">
          <div className="flex items-center space-x-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search conversations..." className="w-full pl-12 pr-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white" />
            </div>

            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2 px-4 py-3 bg-white border border-charcoal/20 rounded-lg hover:border-terracotta transition-colors">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
              {Object.values(filters).some(v => v && v !== 'all') && <span className="px-2 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
                  Active
                </span>}
            </button>
          </div>

          {/* Filters */}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      User Name
                    </label>
                    <input type="text" value={filters.userName} onChange={e => setFilters({
                  ...filters,
                  userName: e.target.value
                })} placeholder="Search by user name..." className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Flag Reason
                    </label>
                    <select value={filters.flagReason} onChange={e => setFilters({
                  ...filters,
                  flagReason: e.target.value
                })} className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm">
                      <option value="all">All Reasons</option>
                      <option value="contact">
                        Exchange of Contact Information
                      </option>
                      <option value="keywords">
                        Blocked Keywords Detected
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Status
                    </label>
                    <select value={filters.status} onChange={e => setFilters({
                  ...filters,
                  status: e.target.value
                })} className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm">
                      <option value="all">All Status</option>
                      <option value="unreviewed">Unreviewed</option>
                      <option value="under-review">Under Review</option>
                      <option value="resolved">Resolved</option>
                      <option value="false-positive">False Positive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Date From
                    </label>
                    <input type="date" value={filters.dateFrom} onChange={e => setFilters({
                  ...filters,
                  dateFrom: e.target.value
                })} className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Date To
                    </label>
                    <input type="date" value={filters.dateTo} onChange={e => setFilters({
                  ...filters,
                  dateTo: e.target.value
                })} className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-terracotta transition-colors bg-white text-sm" />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-charcoal/10">
                  <button onClick={resetFilters} className="flex items-center space-x-2 px-4 py-2 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                  <button onClick={() => setShowFilters(false)} className="px-4 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors">
                    Apply Filters
                  </button>
                </div>

                <div className="mt-4 p-4 bg-gold/10 border border-gold/20 rounded-lg">
                  <p className="text-sm text-charcoal/70">
                    <strong>Focus:</strong> Use these filters to identify users
                    with repeated violations. Users with multiple flags may
                    require stronger action.
                  </p>
                </div>
              </motion.div>}
          </AnimatePresence>
        </motion.div>

        {/* Conversations Table - REMOVED PROPERTY COLUMN */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.6
      }} className="bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sand border-b border-charcoal/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Users
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Last Message
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Flag Reason
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Violations
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/5">
                {MOCK_CONVERSATIONS.map((conversation, index) => <motion.tr key={conversation.id} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.7 + index * 0.05
              }} className={`hover:bg-sand/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-cream'}`}>
                    <td className="px-6 py-4">
                      {getPriorityBadge(conversation.priority)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {/* Guest */}
                        <div className="flex items-center space-x-2">
                          {conversation.guest.avatar ? <img src={conversation.guest.avatar} alt={conversation.guest.name} className="w-8 h-8 rounded-full border-2 border-sand" /> : <div className="w-8 h-8 rounded-full bg-warm-green/10 flex items-center justify-center border-2 border-sand">
                              <span className="text-xs font-bold text-warm-green">
                                {conversation.guest.initials}
                              </span>
                            </div>}
                          <Link to={`/admin/users/${conversation.id}`} className="text-sm text-charcoal hover:text-warm-green transition-colors">
                            {conversation.guest.name}
                          </Link>
                        </div>

                        {/* Arrow */}
                        <ArrowLeftRight className="w-4 h-4 text-charcoal/40" />

                        {/* Host */}
                        <div className="flex items-center space-x-2">
                          {conversation.host.avatar ? <img src={conversation.host.avatar} alt={conversation.host.name} className="w-8 h-8 rounded-full border-2 border-sand" /> : <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center border-2 border-sand">
                              <span className="text-xs font-bold text-terracotta">
                                {conversation.host.initials}
                              </span>
                            </div>}
                          <Link to={`/admin/users/${conversation.id}`} className="text-sm text-charcoal hover:text-warm-green transition-colors">
                            {conversation.host.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-charcoal">
                          {conversation.flaggedPortion ? <>
                              {conversation.lastMessage.split(conversation.flaggedPortion)[0]}
                              <span className="bg-terracotta/20 px-1 rounded">
                                {conversation.flaggedPortion}
                              </span>
                              {conversation.lastMessage.split(conversation.flaggedPortion)[1]}
                            </> : conversation.lastMessage}
                        </p>
                        <p className="text-xs text-charcoal/60 mt-1">
                          {conversation.timestamp}
                        </p>
                        <p className="text-xs text-terracotta mt-1 font-medium">
                          ⚠️ Message auto-deleted
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
                          {conversation.flagReason}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {conversation.secondaryTags.map(tag => <span key={tag} className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-medium rounded-full">
                              {tag}
                            </span>)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className={`font-bold text-lg ${conversation.violationCount >= 3 ? 'text-terracotta' : conversation.violationCount >= 2 ? 'text-gold' : 'text-charcoal/60'}`}>
                          {conversation.violationCount}
                        </p>
                        <p className="text-xs text-charcoal/60">
                          {conversation.violationCount >= 3 ? 'Repeat offender' : conversation.violationCount >= 2 ? 'Multiple flags' : 'First offense'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(conversation.status, {
                    assignedAdmin: conversation.assignedAdmin
                  })}
                    </td>
                    <td className="px-6 py-4 relative">
                      <button onClick={() => setOpenMenuId(openMenuId === conversation.id ? null : conversation.id)} className="p-2 hover:bg-sand rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-charcoal/60" />
                      </button>

                      <AnimatePresence>
                        {openMenuId === conversation.id && <>
                            <div className="fixed inset-0 z-30" onClick={() => setOpenMenuId(null)} />
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
                      }} className="absolute right-0 top-full mt-2 w-64 bg-cream rounded-xl shadow-2xl border border-charcoal/10 py-2 z-40">
                              <Link to={`/admin/messages/${conversation.id}`} className="flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm">
                                <Eye className="w-4 h-4 text-charcoal/60" />
                                <span>View Full Conversation</span>
                              </Link>
                              <div className="border-t border-charcoal/10 my-2" />
                              <button onClick={() => {
                          setConfirmAction({
                            type: 'warn',
                            conversationId: conversation.id,
                            userName: conversation.guest.name
                          });
                        }} className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-gold">
                                <AlertTriangle className="w-4 h-4" />
                                <span>Warn User(s)</span>
                              </button>
                              <button onClick={() => {
                          setConfirmAction({
                            type: 'suspend',
                            conversationId: conversation.id,
                            userName: conversation.guest.name
                          });
                        }} className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-terracotta">
                                <Ban className="w-4 h-4" />
                                <span>Suspend User(s)</span>
                              </button>
                              <div className="border-t border-charcoal/10 my-2" />
                              <button onClick={() => {
                          setConfirmAction({
                            type: 'false-positive',
                            conversationId: conversation.id,
                            userName: conversation.guest.name
                          });
                        }} className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-warm-green">
                                <CheckCircle className="w-4 h-4" />
                                <span>Mark as False Positive</span>
                              </button>
                            </motion.div>
                          </>}
                      </AnimatePresence>
                    </td>
                  </motion.tr>)}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-sand px-6 py-4 border-t border-charcoal/10 flex items-center justify-between">
            <p className="text-sm text-charcoal/70">
              Showing 1 to 4 of 7 flagged conversations
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                Previous
              </button>
              <button className="px-4 py-2 bg-terracotta text-white rounded-lg font-medium text-sm">
                1
              </button>
              <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                Next
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Blocked Keywords Modal */}
      <AnimatePresence>
        {showBlockedKeywordsModal && <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowBlockedKeywordsModal(false)} />
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
                  Blocked Keywords Management
                </h3>
                <button onClick={() => setShowBlockedKeywordsModal(false)} className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Add New Keyword
                  </label>
                  <div className="flex items-center space-x-2">
                    <input type="text" value={newKeyword} onChange={e => setNewKeyword(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAddKeyword()} placeholder="Enter keyword to block..." className="flex-1 px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50" />
                    <button onClick={handleAddKeyword} className="px-4 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-charcoal mb-3">
                    Current Blocked Keywords ({blockedKeywords.length})
                  </h4>
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {blockedKeywords.map(keyword => <div key={keyword} className="flex items-center justify-between p-3 bg-sand rounded-lg">
                        <span className="text-sm text-charcoal font-mono">
                          {keyword}
                        </span>
                        <button onClick={() => handleRemoveKeyword(keyword)} className="p-1 hover:bg-terracotta/10 rounded transition-colors">
                          <X className="w-4 h-4 text-terracotta" />
                        </button>
                      </div>)}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gold/10 border border-gold/20 rounded-lg">
                  <p className="text-sm text-charcoal/70">
                    <strong>Note:</strong> Changes apply globally to all chat
                    moderation. Messages containing these keywords will be
                    automatically flagged and deleted.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
                <button onClick={() => setShowBlockedKeywordsModal(false)} className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium">
                  Done
                </button>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>

      {/* Export Conversations Modal */}
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
                  Export Conversations
                </h3>
                <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Date From
                    </label>
                    <input type="date" value={exportFilters.dateFrom} onChange={e => setExportFilters({
                  ...exportFilters,
                  dateFrom: e.target.value
                })} className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Date To
                    </label>
                    <input type="date" value={exportFilters.dateTo} onChange={e => setExportFilters({
                  ...exportFilters,
                  dateTo: e.target.value
                })} className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    User Name(s)
                  </label>
                  <input type="text" value={exportFilters.userName} onChange={e => setExportFilters({
                ...exportFilters,
                userName: e.target.value
              })} placeholder="Filter by user name..." className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Flag Reason
                  </label>
                  <select value={exportFilters.flagReason} onChange={e => setExportFilters({
                ...exportFilters,
                flagReason: e.target.value
              })} className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50">
                    <option value="all">All Reasons</option>
                    <option value="contact">
                      Exchange of Contact Information
                    </option>
                    <option value="keywords">Blocked Keywords Detected</option>
                  </select>
                </div>

                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                  <p className="text-sm text-charcoal/70">
                    <strong>Export includes:</strong> Conversation metadata,
                    flag reason, users involved, timestamps. Format: CSV
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
                <button onClick={() => setShowExportModal(false)} className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium">
                  Cancel
                </button>
                <button onClick={handleExport} className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors font-medium">
                  Export to CSV
                </button>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmAction && <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmAction(null)} />
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
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${confirmAction.type === 'false-positive' ? 'bg-warm-green/10' : confirmAction.type === 'warn' ? 'bg-gold/10' : 'bg-terracotta/10'}`}>
                {confirmAction.type === 'false-positive' ? <CheckCircle className="w-8 h-8 text-warm-green" /> : confirmAction.type === 'warn' ? <AlertTriangle className="w-8 h-8 text-gold" /> : <Ban className="w-8 h-8 text-terracotta" />}
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">
                {confirmAction.type === 'false-positive' ? 'Mark as False Positive?' : confirmAction.type === 'warn' ? 'Warn User?' : 'Suspend User?'}
              </h3>
              <p className="text-charcoal/60 mb-6">
                {confirmAction.type === 'false-positive' ? "This will mark the flag as incorrect and restore the user's standing." : confirmAction.type === 'warn' ? `This will send a warning to ${confirmAction.userName}. The action will be logged in the audit trail.` : `This will suspend ${confirmAction.userName}'s account. They will not be able to access the platform.`}
              </p>
              <div className="flex items-center space-x-3">
                <button onClick={() => setConfirmAction(null)} className="flex-1 px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium">
                  Cancel
                </button>
                <button onClick={handleConfirmAction} className={`flex-1 px-6 py-3 rounded-lg transition-colors font-medium ${confirmAction.type === 'false-positive' ? 'bg-warm-green text-white hover:bg-warm-green/90' : confirmAction.type === 'warn' ? 'bg-gold text-white hover:bg-gold/90' : 'bg-terracotta text-white hover:bg-terracotta/90'}`}>
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>
    </div>;
}