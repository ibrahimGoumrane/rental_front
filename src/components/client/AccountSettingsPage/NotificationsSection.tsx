import type { NotificationItem } from "@/lib/types/client";

const NOTIFICATION_ITEMS: NotificationItem[] = [
  {
    label: "Booking confirmations",
    description: "Get notified when your booking is confirmed",
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
];

export function NotificationsSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6">
      <h3 className="font-bold text-charcoal mb-6">Notification Preferences</h3>
      <div className="space-y-4">
        {NOTIFICATION_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-3 border-b border-charcoal/10 last:border-0"
          >
            <div>
              <h4 className="font-medium text-charcoal">{item.label}</h4>
              <p className="text-sm text-charcoal/60">{item.description}</p>
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
    </div>
  );
}
