import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, ChevronDown, Globe, MessageSquare, Calendar, Settings, LogOut, MapPin, DollarSign, TrendingUp, Home, LayoutDashboard, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Add landlord mode prop
export function Header({
  isLandlordMode = false
}: {
  isLandlordMode?: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [currency, setCurrency] = useState('USD');
  const [region, setRegion] = useState('United States');
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  // Mock user stats
  const userStats = {
    upcomingTrips: 3,
    totalBookings: 12,
    profileCompletion: 75
  };
  // Landlord stats
  const landlordStats = {
    activeProperties: 5,
    pendingRequests: 2,
    monthlyEarnings: 12450
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    navigate('/');
  };
  const translations = {
    en: {
      login: 'Log in',
      signup: 'Sign up',
      messages: 'Messages',
      upcomingTrips: 'Upcoming trips',
      allBookings: 'All bookings',
      accountSettings: 'Account settings',
      logout: 'Log out',
      language: 'Language & region',
      currency: 'Currency',
      viewProfile: 'View profile',
      // Landlord translations
      dashboard: 'Dashboard',
      properties: 'Properties',
      reservations: 'Reservations',
      earnings: 'Earnings'
    },
    fr: {
      login: 'Connexion',
      signup: "S'inscrire",
      messages: 'Messages',
      upcomingTrips: 'Voyages à venir',
      allBookings: 'Toutes les réservations',
      accountSettings: 'Paramètres du compte',
      logout: 'Déconnexion',
      language: 'Langue et région',
      currency: 'Devise',
      viewProfile: 'Voir le profil',
      dashboard: 'Tableau de bord',
      properties: 'Propriétés',
      reservations: 'Réservations',
      earnings: 'Revenus'
    }
  };
  const t = translations[language];
  return <>
      <header className="sticky top-0 z-50 bg-sand/95 backdrop-blur-md border-b border-charcoal/10 py-4 px-6 md:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to={isLandlordMode ? '/landlord/dashboard' : '/'} className="font-serif text-2xl font-bold tracking-tight text-charcoal hover:text-warm-green transition-colors">
            Luxe<span className="text-terracotta">Stay</span>
            {isLandlordMode && <span className="text-gold text-sm ml-2">Host</span>}
          </Link>

          {/* Landlord Navigation */}
          {isLandlordMode && isLoggedIn && <nav className="hidden lg:flex items-center space-x-1">
              <Link to="/landlord/dashboard" className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center space-x-2 ${location.pathname === '/landlord/dashboard' ? 'bg-warm-green/10 text-warm-green' : 'text-charcoal/70 hover:text-charcoal hover:bg-sand'}`}>
                <LayoutDashboard className="w-4 h-4" />
                <span>{t.dashboard}</span>
              </Link>
              <Link to="/landlord/properties" className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center space-x-2 ${location.pathname === '/landlord/properties' ? 'bg-warm-green/10 text-warm-green' : 'text-charcoal/70 hover:text-charcoal hover:bg-sand'}`}>
                <Home className="w-4 h-4" />
                <span>{t.properties}</span>
              </Link>
              <Link to="/landlord/reservations" className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center space-x-2 relative ${location.pathname === '/landlord/reservations' ? 'bg-warm-green/10 text-warm-green' : 'text-charcoal/70 hover:text-charcoal hover:bg-sand'}`}>
                <Calendar className="w-4 h-4" />
                <span>{t.reservations}</span>
                {landlordStats.pendingRequests > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {landlordStats.pendingRequests}
                  </span>}
              </Link>
              <Link to="/landlord/messages" className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center space-x-2 ${location.pathname === '/landlord/messages' ? 'bg-warm-green/10 text-warm-green' : 'text-charcoal/70 hover:text-charcoal hover:bg-sand'}`}>
                <MessageSquare className="w-4 h-4" />
                <span>{t.messages}</span>
              </Link>
              <Link to="/landlord/earnings" className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center space-x-2 ${location.pathname === '/landlord/earnings' ? 'bg-warm-green/10 text-warm-green' : 'text-charcoal/70 hover:text-charcoal hover:bg-sand'}`}>
                <Wallet className="w-4 h-4" />
                <span>{t.earnings}</span>
              </Link>
            </nav>}

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Language/Region Selector */}
            <div className="relative" ref={languageMenuRef}>
              <button onClick={() => setShowLanguageMenu(!showLanguageMenu)} className="p-2 hover:bg-white/50 rounded-full transition-colors flex items-center space-x-1" aria-label="Language and region">
                <Globe className="w-5 h-5 text-charcoal" />
              </button>

              <AnimatePresence>
                {showLanguageMenu && <motion.div initial={{
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
              }} className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-charcoal/10 overflow-hidden">
                    <div className="p-4 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-2">
                          {t.language}
                        </h4>
                        <div className="space-y-1">
                          <button onClick={() => {
                        setLanguage('en');
                        setShowLanguageMenu(false);
                      }} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${language === 'en' ? 'bg-warm-green/10 text-warm-green font-medium' : 'hover:bg-charcoal/5 text-charcoal'}`}>
                            English
                          </button>
                          <button onClick={() => {
                        setLanguage('fr');
                        setShowLanguageMenu(false);
                      }} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${language === 'fr' ? 'bg-warm-green/10 text-warm-green font-medium' : 'hover:bg-charcoal/5 text-charcoal'}`}>
                            Français
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-charcoal/10 pt-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-2 flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {t.currency}
                        </h4>
                        <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors text-sm">
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="MAD">MAD - Moroccan Dirham</option>
                        </select>
                      </div>

                      <div className="border-t border-charcoal/10 pt-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-2 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          Region
                        </h4>
                        <select value={region} onChange={e => setRegion(e.target.value)} className="w-full px-3 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors text-sm">
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="France">France</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </div>

            {/* Auth Buttons or Profile Menu */}
            {!isLoggedIn ? <>
                <Link to="/login" className="hidden md:block px-4 py-2 text-charcoal hover:bg-white/50 rounded-lg transition-colors font-medium text-sm">
                  {t.login}
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-warm-green hover:bg-warm-green/90 text-white rounded-lg transition-colors font-medium text-sm shadow-sm">
                  {t.signup}
                </Link>
              </> : <div className="relative" ref={profileMenuRef}>
                <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center space-x-3 p-2 pl-4 pr-3 hover:bg-white/50 rounded-full transition-all border border-charcoal/10 group" aria-label="Profile menu">
                  <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-warm-green to-terracotta text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      JD
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-charcoal/60 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showProfileMenu && <motion.div initial={{
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
              }} className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-charcoal/10 overflow-hidden">
                      {/* User Stats Header */}
                      <div className="p-4 bg-gradient-to-br from-warm-green/5 to-terracotta/5 border-b border-charcoal/10">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-warm-green to-terracotta text-white flex items-center justify-center font-bold shadow-sm">
                            JD
                          </div>
                          <div>
                            <h3 className="font-bold text-charcoal">
                              John Doe
                            </h3>
                            <p className="text-xs text-charcoal/60">
                              {isLandlordMode ? 'Verified Host' : t.viewProfile}
                            </p>
                          </div>
                        </div>

                        {isLandlordMode ? <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white rounded-lg p-2 border border-charcoal/10">
                              <div className="flex items-center space-x-1 mb-1">
                                <Home className="w-3 h-3 text-warm-green" />
                                <span className="text-xs text-charcoal/60">
                                  Properties
                                </span>
                              </div>
                              <p className="text-lg font-bold text-charcoal">
                                {landlordStats.activeProperties}
                              </p>
                            </div>
                            <div className="bg-white rounded-lg p-2 border border-charcoal/10">
                              <div className="flex items-center space-x-1 mb-1">
                                <DollarSign className="w-3 h-3 text-gold" />
                                <span className="text-xs text-charcoal/60">
                                  This Month
                                </span>
                              </div>
                              <p className="text-lg font-bold text-gold">
                                $
                                {(landlordStats.monthlyEarnings / 1000).toFixed(1)}
                                k
                              </p>
                            </div>
                          </div> : <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white rounded-lg p-2 border border-charcoal/10">
                              <div className="flex items-center space-x-1 mb-1">
                                <Calendar className="w-3 h-3 text-terracotta" />
                                <span className="text-xs text-charcoal/60">
                                  Upcoming
                                </span>
                              </div>
                              <p className="text-lg font-bold text-charcoal">
                                {userStats.upcomingTrips}
                              </p>
                            </div>
                            <div className="bg-white rounded-lg p-2 border border-charcoal/10">
                              <div className="flex items-center space-x-1 mb-1">
                                <TrendingUp className="w-3 h-3 text-warm-green" />
                                <span className="text-xs text-charcoal/60">
                                  Total
                                </span>
                              </div>
                              <p className="text-lg font-bold text-charcoal">
                                {userStats.totalBookings}
                              </p>
                            </div>
                          </div>}
                      </div>

                      <div className="py-2">
                        <Link to={isLandlordMode ? '/landlord/messages' : '/messages'} onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-3 px-4 py-3 hover:bg-sand transition-colors text-charcoal">
                          <MessageSquare className="w-5 h-5 text-charcoal/60" />
                          <span className="font-medium">{t.messages}</span>
                        </Link>

                        {!isLandlordMode && <Link to="/bookings" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-3 px-4 py-3 hover:bg-sand transition-colors text-charcoal">
                            <Calendar className="w-5 h-5 text-charcoal/60" />
                            <span className="font-medium">{t.allBookings}</span>
                          </Link>}

                        <div className="border-t border-charcoal/10 my-2"></div>

                        <Link to="/account" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-3 px-4 py-3 hover:bg-sand transition-colors text-charcoal">
                          <Settings className="w-5 h-5 text-charcoal/60" />
                          <span className="font-medium">
                            {t.accountSettings}
                          </span>
                        </Link>

                        <div className="border-t border-charcoal/10 my-2"></div>

                        <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 hover:bg-sand transition-colors text-charcoal w-full text-left">
                          <LogOut className="w-5 h-5 text-charcoal/60" />
                          <span className="font-medium">{t.logout}</span>
                        </button>
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </div>}
          </div>
        </div>
      </header>

      {/* Floating Demo Toggle */}
      <motion.div initial={{
      opacity: 0,
      scale: 0.8
    }} animate={{
      opacity: 1,
      scale: 1
    }} className="fixed bottom-6 right-6 z-50">
        <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="px-4 py-2 bg-terracotta hover:bg-terracotta/90 text-white rounded-full shadow-2xl text-xs font-bold flex items-center space-x-2 border-2 border-white transition-all hover:scale-105">
          <div className={`w-2 h-2 rounded-full ${isLoggedIn ? 'bg-green-300' : 'bg-red-300'} animate-pulse`} />
          <span>Demo: {isLoggedIn ? 'Logged In' : 'Logged Out'}</span>
        </button>
      </motion.div>
    </>;
}