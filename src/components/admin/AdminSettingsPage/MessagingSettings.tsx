import { Info, CheckCircle } from "lucide-react";

export function MessagingSettings() {
  return (
    <div className="space-y-6">
      {/* Messaging Settings */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Messaging Settings
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
            <div>
              <h3 className="font-medium text-charcoal mb-1">
                Allow Guest-Host Messaging
              </h3>
              <p className="text-sm text-charcoal/60">
                Enable direct messages between guests and hosts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Max Messages Before Decision
            </label>
            <input
              type="number"
              defaultValue="10"
              className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
            <p className="text-xs text-charcoal/60 mt-2">
              After reaching this limit, host must accept or decline the booking
              request
            </p>
          </div>
        </div>
      </div>

      {/* Content Moderation */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Content Moderation
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-medium text-charcoal">
                  Automated Content Filtering
                </h3>
                <span className="px-2 py-0.5 bg-warm-green text-white text-xs font-bold rounded-full">
                  Active
                </span>
              </div>
              <p className="text-sm text-charcoal/60">
                Block inappropriate content automatically
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
                Block External Contact Info
              </h3>
              <p className="text-sm text-charcoal/60">
                Prevent sharing of phone/email in messages
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
            </label>
          </div>

          <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm text-charcoal/60">
                <strong>Note:</strong> Blocked keywords are managed in a
                separate admin page, not here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Settings */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Review Settings
        </h2>

        <div className="space-y-6">
          <div className="bg-warm-green/10 border border-warm-green/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-warm-green flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-charcoal mb-1">
                  Automatic Review Publishing
                </h3>
                <p className="text-sm text-charcoal/60">
                  Reviews are automatically approved and published without
                  manual admin review.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
            <div>
              <h3 className="font-medium text-charcoal mb-1">
                Allow Host Responses
              </h3>
              <p className="text-sm text-charcoal/60">
                Hosts can publicly respond to reviews
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Review Window After Checkout
            </label>
            <select className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
              <option>7 days</option>
              <option>14 days</option>
              <option>30 days</option>
              <option>60 days</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
