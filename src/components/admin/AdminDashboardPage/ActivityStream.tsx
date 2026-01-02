import { motion } from "framer-motion";
import { Activity, Calendar } from "lucide-react";
import type { AdminDashboardBooking, ActivityItem } from "@/lib/types/admin";

interface ActivityStreamProps {
  bookings: AdminDashboardBooking[];
  activities: ActivityItem[];
  getActivityColor: (type: string) => string;
  getActivityBg: (type: string) => string;
}

export function ActivityStream({
  bookings,
  activities,
  getActivityColor,
  getActivityBg,
}: ActivityStreamProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-2xl text-charcoal mb-6 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-warm-green" />
          Recent Bookings
        </h2>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="border border-charcoal/10 rounded-xl p-4 hover:border-warm-green/30 transition-all"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={booking.property.image}
                  alt={booking.property.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-charcoal truncate">
                        {booking.property.name}
                      </h4>
                      <p className="text-xs text-charcoal/60">
                        {booking.property.location}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        booking.status === "confirmed"
                          ? "bg-warm-green text-white"
                          : "bg-gold text-white"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={booking.guest.avatar}
                      alt={booking.guest.name}
                      className="w-6 h-6 rounded-full border-2 border-sand"
                    />
                    <span className="text-sm text-charcoal/70">
                      {booking.guest.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/60">{booking.dates}</span>
                    <div className="text-right">
                      <p className="font-medium text-charcoal">
                        ${booking.value}
                      </p>
                      <p className="text-xs text-gold">
                        Commission: ${booking.commission}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal/50 mt-2">
                    {booking.timestamp}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Platform Activity */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-2xl text-charcoal mb-6 flex items-center">
          <Activity className="w-6 h-6 mr-2 text-terracotta" />
          Platform Activity
        </h2>
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-cream transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityBg(
                  activity.type
                )}`}
              >
                <activity.icon
                  className={`w-5 h-5 ${getActivityColor(activity.type)}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-charcoal/80">{activity.text}</p>
                <p className="text-xs text-charcoal/50 mt-1">
                  {activity.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
