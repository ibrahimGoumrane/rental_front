import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw, Download, Settings, Home, Calendar, Shield, DollarSign, MessageSquare, Bell, Code, Lock, Upload, CheckCircle, AlertTriangle, Info } from 'lucide-react';
export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<string>('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const tabs = [{
    id: 'general',
    label: 'General Settings',
    icon: Settings
  }, {
    id: 'property',
    label: 'Property Settings',
    icon: Home
  }, {
    id: 'booking',
    label: 'Booking & Policies',
    icon: Calendar
  }, {
    id: 'verification',
    label: 'User Verification',
    icon: Shield
  }, {
    id: 'payments',
    label: 'Payments & Commission',
    icon: DollarSign
  }, {
    id: 'messaging',
    label: 'Messaging & Moderation',
    icon: MessageSquare
  }, {
    id: 'notifications',
    label: 'Notifications & Emails',
    icon: Bell
  }, {
    id: 'api',
    label: 'API & Integrations',
    icon: Code
  }, {
    id: 'security',
    label: 'Security & Compliance',
    icon: Lock
  }];
  return <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        {/* Page Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-2">
              Platform Configuration & Settings
            </h1>
            <p className="text-sm text-charcoal/60">
              Last modified: Dec 25, 2024 by Admin Sarah
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-sm hover:-translate-y-0.5 font-medium">
              <Save className="w-5 h-5" />
              <span>Save All Changes</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 border border-charcoal/20 text-charcoal/70 rounded-lg hover:bg-sand transition-colors">
              <RotateCcw className="w-5 h-5" />
              <span>Reset to Defaults</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-all shadow-sm hover:-translate-y-0.5">
              <Download className="w-5 h-5" />
              <span>Export Configuration</span>
            </button>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.1
        }} className="w-80 flex-shrink-0">
            <div className="bg-sand rounded-2xl p-4 border border-charcoal/5 shadow-sm sticky top-24">
              <nav className="space-y-1">
                {tabs.map(tab => {
                const Icon = tab.icon;
                return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id ? 'bg-warm-green/10 text-warm-green border-l-4 border-warm-green' : 'text-charcoal/70 hover:bg-sand/50 border-l-4 border-transparent'}`}>
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>;
              })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="flex-1">
            {/* General Settings */}
            {activeTab === 'general' && <div className="space-y-6">
                {/* Brand & Identity */}
                <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
                  <h2 className="font-serif text-3xl text-charcoal mb-6">
                    Brand & Identity
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-2">
                        Platform Name
                      </label>
                      <input type="text" placeholder="e.g., StayNest, VacationHub, LuxeStay" className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-2">
                        Tagline
                      </label>
                      <input type="text" placeholder="e.g., Find your perfect getaway" className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors" />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">
                          Main Logo
                        </label>
                        <div className="border-2 border-dashed border-gold rounded-lg p-6 text-center hover:bg-gold/5 transition-colors cursor-pointer">
                          <Upload className="w-8 h-8 text-gold mx-auto mb-2" />
                          <p className="text-sm text-charcoal/60">
                            Upload Logo
                          </p>
                          <p className="text-xs text-charcoal/40 mt-1">
                            PNG/SVG, max 500KB
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">
                          Favicon
                        </label>
                        <div className="border-2 border-dashed border-gold rounded-lg p-6 text-center hover:bg-gold/5 transition-colors cursor-pointer">
                          <Upload className="w-8 h-8 text-gold mx-auto mb-2" />
                          <p className="text-sm text-charcoal/60">
                            Upload Favicon
                          </p>
                          <p className="text-xs text-charcoal/40 mt-1">
                            32x32px
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">
                          Email Header Logo
                        </label>
                        <div className="border-2 border-dashed border-gold rounded-lg p-6 text-center hover:bg-gold/5 transition-colors cursor-pointer">
                          <Upload className="w-8 h-8 text-gold mx-auto mb-2" />
                          <p className="text-sm text-charcoal/60">
                            Upload Logo
                          </p>
                          <p className="text-xs text-charcoal/40 mt-1">
                            200x50px
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-3">
                        Brand Colors
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-charcoal/60 mb-2">
                            Primary Color
                          </label>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-lg bg-warm-green border-2 border-sand cursor-pointer"></div>
                            <input type="text" value="#2D5F3F" className="flex-1 px-3 py-2 bg-cream border border-charcoal/20 rounded-lg text-sm font-mono" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-charcoal/60 mb-2">
                            Secondary Color
                          </label>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-lg bg-terracotta border-2 border-sand cursor-pointer"></div>
                            <input type="text" value="#E07A5F" className="flex-1 px-3 py-2 bg-cream border border-charcoal/20 rounded-lg text-sm font-mono" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-charcoal/60 mb-2">
                            Accent Color
                          </label>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-lg bg-gold border-2 border-sand cursor-pointer"></div>
                            <input type="text" value="#D4AF37" className="flex-1 px-3 py-2 bg-cream border border-charcoal/20 rounded-lg text-sm font-mono" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Localization */}
                <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
                  <h2 className="font-serif text-3xl text-charcoal mb-6">
                    Localization
                  </h2>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-2">
                        Default Language
                      </label>
                      <select className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
                        <option>English</option>
                        <option>French</option>
                        <option>Arabic</option>
                        <option>Spanish</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-2">
                        Default Currency
                      </label>
                      <select className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                        <option>MAD - Moroccan Dirham</option>
                        <option>GBP - British Pound</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-2">
                        Date Format
                      </label>
                      <select className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-2">
                        Time Zone
                      </label>
                      <select className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
                        <option>GMT</option>
                        <option>EST</option>
                        <option>CET</option>
                        <option>Morocco Time</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Platform Status */}
                <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
                  <h2 className="font-serif text-3xl text-charcoal mb-6">
                    Platform Status
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
                      <div>
                        <h3 className="font-medium text-charcoal mb-1">
                          Maintenance Mode
                        </h3>
                        <p className="text-sm text-charcoal/60">
                          Temporarily disable public access
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
                      <div>
                        <h3 className="font-medium text-charcoal mb-1">
                          Public Registration
                        </h3>
                        <p className="text-sm text-charcoal/60">
                          Allow new users to sign up
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
                      <div>
                        <h3 className="font-medium text-charcoal mb-1">
                          Accept New Listings
                        </h3>
                        <p className="text-sm text-charcoal/60">
                          Allow hosts to create new properties
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>}

            {/* Payments & Commission */}
            {activeTab === 'payments' && <div className="space-y-6">
                {/* Commission Structure */}
                <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
                  <h2 className="font-serif text-3xl text-charcoal mb-6">
                    Commission Structure
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">
                          Host Commission Rate
                        </label>
                        <div className="relative">
                          <input type="number" defaultValue="15" className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-gold transition-colors pr-12" />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gold font-bold">
                            %
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">
                          Guest Service Fee
                        </label>
                        <div className="relative">
                          <input type="number" defaultValue="0" className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-gold transition-colors pr-12" />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gold font-bold">
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-charcoal mb-4">
                        Commission by Property Type
                      </h3>
                      <div className="bg-sand rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-charcoal/5">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-charcoal/70">
                                Property Type
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-charcoal/70">
                                Commission Rate
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-charcoal/5">
                            {[{
                          type: 'Entire Place',
                          rate: 15
                        }, {
                          type: 'Private Room',
                          rate: 12
                        }, {
                          type: 'Shared Room',
                          rate: 10
                        }].map((item, index) => <tr key={index} className={index % 2 === 0 ? 'bg-cream' : 'bg-white'}>
                                <td className="px-4 py-3 text-sm text-charcoal">
                                  {item.type}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center space-x-2">
                                    <input type="number" defaultValue={item.rate} className="w-24 px-3 py-2 bg-white border border-charcoal/20 rounded-lg text-sm" />
                                    <span className="text-gold font-bold">
                                      %
                                    </span>
                                  </div>
                                </td>
                              </tr>)}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
                  <h2 className="font-serif text-3xl text-charcoal mb-6">
                    Payment Methods
                  </h2>

                  <div className="space-y-4">
                    {[{
                  name: 'Credit/Debit Card',
                  enabled: true
                }, {
                  name: 'Bank Transfer',
                  enabled: true
                }, {
                  name: 'PayPal',
                  enabled: true
                }, {
                  name: 'Local Payment Methods',
                  enabled: true
                }, {
                  name: 'Cryptocurrency',
                  enabled: false,
                  badge: 'Pilot'
                }].map((method, index) => <div key={index} className="flex items-center justify-between p-4 bg-sand rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className={`w-5 h-5 ${method.enabled ? 'text-warm-green' : 'text-charcoal/20'}`} />
                          <span className="font-medium text-charcoal">
                            {method.name}
                          </span>
                          {method.badge && <span className="px-2 py-0.5 bg-gold text-white text-xs font-bold rounded-full">
                              {method.badge}
                            </span>}
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={method.enabled} />
                          <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
                        </label>
                      </div>)}
                  </div>
                </div>

                {/* Payout Settings */}
                <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
                  <h2 className="font-serif text-3xl text-charcoal mb-6">
                    Payout Settings
                  </h2>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-2">
                        Payout Schedule
                      </label>
                      <select className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-gold transition-colors">
                        <option>24 hours after checkout</option>
                        <option>3 days after checkout</option>
                        <option>7 days after checkout</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-2">
                        Minimum Payout Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold font-bold">
                          $
                        </span>
                        <input type="number" defaultValue="50" className="w-full pl-8 pr-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-gold transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>}

            {/* Security & Compliance */}
            {activeTab === 'security' && <div className="space-y-6">
                {/* Data Privacy */}
                <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
                  <h2 className="font-serif text-3xl text-charcoal mb-6">
                    Data Privacy
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-charcoal">
                            GDPR Compliance
                          </h3>
                          <span className="px-2 py-0.5 bg-warm-green text-white text-xs font-bold rounded-full">
                            Enabled
                          </span>
                        </div>
                        <p className="text-sm text-charcoal/60">
                          Enable data export and deletion requests
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
                      <div>
                        <h3 className="font-medium text-charcoal mb-1">
                          Cookie Consent Banner
                        </h3>
                        <p className="text-sm text-charcoal/60">
                          Display cookie consent to visitors
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
                  <h2 className="font-serif text-3xl text-charcoal mb-6">
                    Security Settings
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-charcoal">
                            Two-Factor Authentication
                          </h3>
                          <span className="px-2 py-0.5 bg-warm-green text-white text-xs font-bold rounded-full">
                            Required for Admins
                          </span>
                        </div>
                        <p className="text-sm text-charcoal/60">
                          Enhance account security with 2FA
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">
                          Session Timeout (minutes)
                        </label>
                        <input type="number" defaultValue="30" className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">
                          Max Login Attempts
                        </label>
                        <input type="number" defaultValue="5" className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backup & Recovery */}
                <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
                  <h2 className="font-serif text-3xl text-charcoal mb-6">
                    Backup & Recovery
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-charcoal">
                            Automated Backups
                          </h3>
                          <span className="px-2 py-0.5 bg-warm-green text-white text-xs font-bold rounded-full">
                            Active
                          </span>
                        </div>
                        <p className="text-sm text-charcoal/60">
                          Daily automated database backups
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
                      </label>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors">
                        <Download className="w-5 h-5" />
                        <span>Manual Backup</span>
                      </button>
                      <button className="flex items-center space-x-2 px-6 py-3 border-2 border-terracotta text-terracotta rounded-lg hover:bg-terracotta/5 transition-colors">
                        <AlertTriangle className="w-5 h-5" />
                        <span>Restore from Backup</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>}

            {/* Placeholder for other tabs */}
            {!['general', 'payments', 'security'].includes(activeTab) && <div className="bg-white rounded-2xl p-12 border border-charcoal/5 shadow-sm text-center">
                <Settings className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-charcoal mb-2">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h3>
                <p className="text-charcoal/60">
                  Configuration options for this section will be displayed here.
                </p>
              </div>}
          </motion.div>
        </div>
      </div>
    </div>;
}