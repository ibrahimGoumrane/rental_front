import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Camera,
  CreditCard,
  Globe,
  Lock,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";
export function AccountSettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Travel enthusiast and architecture lover.",
    dateOfBirth: "1990-05-15",
    address: "123 Main St, San Francisco, CA",
  });
  const profileCompletion = 75;
  const sections = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: Globe,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "payments",
      label: "Payments",
      icon: CreditCard,
    },
  ];
  return (
    <div className="min-h-screen bg-sand pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-charcoal mb-2">
            Account Settings
          </h1>
          <p className="text-charcoal/60">
            Manage your account preferences and settings
          </p>
        </div>

        {/* Profile Completion Progress */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-gradient-to-br from-warm-green/10 to-terracotta/10 rounded-xl p-6 mb-8 border border-charcoal/10"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-charcoal mb-1">
                Profile Completion
              </h3>
              <p className="text-sm text-charcoal/60">
                Complete your profile to unlock all features
              </p>
            </div>
            <div className="text-3xl font-bold text-warm-green">
              {profileCompletion}%
            </div>
          </div>
          <div className="w-full h-3 bg-white rounded-full overflow-hidden">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${profileCompletion}%`,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="h-full bg-gradient-to-r from-warm-green to-terracotta rounded-full"
            />
          </div>
        </motion.div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-2 sticky top-24">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? "bg-warm-green text-white shadow-sm"
                      : "text-charcoal hover:bg-sand"
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            <AnimatePresence mode="wait">
              {activeSection === "profile" && (
                <motion.div
                  key="profile"
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
                    duration: 0.2,
                  }}
                >
                  {/* Profile Photo */}
                  <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6 mb-6">
                    <h3 className="font-bold text-charcoal mb-4 flex items-center">
                      <Camera className="w-5 h-5 mr-2 text-terracotta" />
                      Profile Photo
                    </h3>
                    <div className="flex items-center space-x-6">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-warm-green to-terracotta flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                          JD
                        </div>
                        <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="w-6 h-6 text-white" />
                        </button>
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors text-sm font-medium mb-2">
                          Upload new photo
                        </button>
                        <p className="text-xs text-charcoal/60">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6">
                    <h3 className="font-bold text-charcoal mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal/80 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal/80 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal/80 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal/80 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-charcoal/80 mb-1">
                          Bio
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              bio: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors resize-none"
                        />
                      </div>
                    </div>
                    <button className="mt-6 px-6 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium">
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}

              {activeSection === "security" && (
                <motion.div
                  key="security"
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
                    duration: 0.2,
                  }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6">
                    <h3 className="font-bold text-charcoal mb-4 flex items-center">
                      <Lock className="w-5 h-5 mr-2 text-terracotta" />
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal/80 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal/80 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal/80 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
                        />
                      </div>
                    </div>
                    <button className="mt-6 px-6 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium">
                      Update Password
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6">
                    <h3 className="font-bold text-charcoal mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-warm-green" />
                      Two-Factor Authentication
                    </h3>
                    <p className="text-charcoal/60 mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <button className="px-6 py-2 border border-warm-green text-warm-green rounded-lg hover:bg-warm-green hover:text-white transition-colors font-medium">
                      Enable 2FA
                    </button>
                  </div>
                </motion.div>
              )}

              {activeSection === "preferences" && (
                <motion.div
                  key="preferences"
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
                    duration: 0.2,
                  }}
                  className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6"
                >
                  <h3 className="font-bold text-charcoal mb-6">Preferences</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal/80 mb-2">
                        Language
                      </label>
                      <select className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
                        <option>English</option>
                        <option>Français</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal/80 mb-2">
                        Currency
                      </label>
                      <select className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                        <option>GBP - British Pound</option>
                        <option>MAD - Moroccan Dirham</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal/80 mb-2">
                        Time Zone
                      </label>
                      <select className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>Central European Time (CET)</option>
                      </select>
                    </div>
                  </div>
                  <button className="mt-6 px-6 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium">
                    Save Preferences
                  </button>
                </motion.div>
              )}

              {activeSection === "notifications" && (
                <motion.div
                  key="notifications"
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
                    duration: 0.2,
                  }}
                  className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6"
                >
                  <h3 className="font-bold text-charcoal mb-6">
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Booking confirmations",
                        description:
                          "Get notified when your booking is confirmed",
                      },
                      {
                        label: "Messages",
                        description: "Receive notifications for new messages",
                      },
                      {
                        label: "Special offers",
                        description: "Get updates about promotions and deals",
                      },
                      {
                        label: "Trip reminders",
                        description: "Receive reminders before your trips",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-3 border-b border-charcoal/10 last:border-0"
                      >
                        <div>
                          <h4 className="font-medium text-charcoal">
                            {item.label}
                          </h4>
                          <p className="text-sm text-charcoal/60">
                            {item.description}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked={idx < 2}
                          />
                          <div className="w-11 h-6 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-warm-green"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === "payments" && (
                <motion.div
                  key="payments"
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
                    duration: 0.2,
                  }}
                  className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6"
                >
                  <h3 className="font-bold text-charcoal mb-6">
                    Payment Methods
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="border border-charcoal/20 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">•••• 4242</p>
                          <p className="text-sm text-charcoal/60">
                            Expires 12/25
                          </p>
                        </div>
                      </div>
                      <button className="text-sm text-terracotta hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                  <button className="px-6 py-2 border border-warm-green text-warm-green rounded-lg hover:bg-warm-green hover:text-white transition-colors font-medium">
                    Add Payment Method
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
