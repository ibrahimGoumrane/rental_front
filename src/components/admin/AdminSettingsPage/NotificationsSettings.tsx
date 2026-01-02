import { Mail, FileText } from "lucide-react";

export function NotificationsSettings() {
  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Email Notifications
        </h2>

        <div className="space-y-4">
          {[
            {
              name: "Booking Confirmation",
              desc: "Send to guest when booking is confirmed",
              enabled: true,
            },
            {
              name: "Booking Request",
              desc: "Notify host of new booking request",
              enabled: true,
            },
            {
              name: "Check-in Reminder",
              desc: "Remind guest 24h before check-in",
              enabled: true,
            },
            {
              name: "Review Request",
              desc: "Ask for review after checkout",
              enabled: true,
            },
            {
              name: "Payout Notification",
              desc: "Notify host when payout is processed",
              enabled: true,
            },
          ].map((notification, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-sand rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-warm-green" />
                <div>
                  <h3 className="font-medium text-charcoal">
                    {notification.name}
                  </h3>
                  <p className="text-sm text-charcoal/60">
                    {notification.desc}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked={notification.enabled}
                />
                <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Email Templates */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Email Templates
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              From Name
            </label>
            <input
              type="text"
              defaultValue="StayNest Team"
              className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              From Email
            </label>
            <input
              type="email"
              defaultValue="noreply@staynest.com"
              className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Support Email
            </label>
            <input
              type="email"
              defaultValue="support@staynest.com"
              className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
          </div>

          <button className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors">
            <FileText className="w-5 h-5" />
            <span>Customize Email Templates</span>
          </button>
        </div>
      </div>
    </div>
  );
}
