import {
  Key,
  TrendingUp,
  DollarSign,
  Mail,
  Smartphone,
  MapPin,
} from "lucide-react";

export function ApiSettings() {
  return (
    <div className="space-y-6">
      {/* API Access */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">API Access</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-medium text-charcoal">Public API</h3>
                <span className="px-2 py-0.5 bg-warm-green text-white text-xs font-bold rounded-full">
                  Enabled
                </span>
              </div>
              <p className="text-sm text-charcoal/60">
                Allow third-party integrations
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              API Rate Limit (requests/minute)
            </label>
            <input
              type="number"
              defaultValue="60"
              className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
          </div>

          <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Key className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-charcoal mb-1">API Key</h3>
                <p className="text-sm text-charcoal/60 mb-3">
                  Use this key for API authentication
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value="sk_live_xxxxxxxxxxxxxxxxxxxxx"
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-charcoal/20 rounded-lg text-sm font-mono"
                  />
                  <button className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors text-sm font-medium">
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third-Party Integrations */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Third-Party Integrations
        </h2>

        <div className="space-y-4">
          {[
            {
              name: "Google Analytics",
              desc: "Track website traffic and user behavior",
              enabled: true,
              icon: TrendingUp,
            },
            {
              name: "Stripe",
              desc: "Payment processing",
              enabled: true,
              icon: DollarSign,
            },
            {
              name: "Mailchimp",
              desc: "Email marketing automation",
              enabled: false,
              icon: Mail,
            },
            {
              name: "Twilio",
              desc: "SMS notifications",
              enabled: false,
              icon: Smartphone,
            },
            {
              name: "Google Maps",
              desc: "Location services and mapping",
              enabled: true,
              icon: MapPin,
            },
          ].map((integration, index) => {
            const Icon = integration.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-sand rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-warm-green" />
                  <div>
                    <h3 className="font-medium text-charcoal">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-charcoal/60">
                      {integration.desc}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {integration.enabled && (
                    <button className="px-3 py-1 text-sm text-warm-green hover:underline">
                      Configure
                    </button>
                  )}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked={integration.enabled}
                    />
                    <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Webhooks */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">Webhooks</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Webhook URL
            </label>
            <input
              type="url"
              placeholder="https://your-domain.com/webhook"
              className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-3">
              Events to Subscribe
            </label>
            <div className="space-y-2">
              {[
                "booking.created",
                "booking.confirmed",
                "booking.cancelled",
                "payment.succeeded",
                "payout.processed",
                "review.created",
              ].map((event, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-sand rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-warm-green"
                  />
                  <code className="text-sm text-charcoal font-mono">
                    {event}
                  </code>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
