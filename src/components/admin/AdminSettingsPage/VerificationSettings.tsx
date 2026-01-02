import { Shield, FileText } from "lucide-react";

export function VerificationSettings() {
  return (
    <div className="space-y-6">
      {/* Identity Verification */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Identity Verification
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-medium text-charcoal">
                  Require ID Verification for Hosts
                </h3>
                <span className="px-2 py-0.5 bg-warm-green text-white text-xs font-bold rounded-full">
                  Mandatory
                </span>
              </div>
              <p className="text-sm text-charcoal/60">
                All hosts must verify identity before listing
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
                Require ID Verification for Guests
              </h3>
              <p className="text-sm text-charcoal/60">
                Guests must verify before first booking
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-3">
              Accepted ID Documents
            </label>
            <div className="space-y-3">
              {[
                "National ID Card",
                "Passport",
                "Driver's License",
                "Residence Permit",
              ].map((doc, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-sand rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-warm-green"
                  />
                  <FileText className="w-5 h-5 text-warm-green" />
                  <span className="text-sm text-charcoal">{doc}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Verification Process */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Verification Process
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Verification Method
            </label>
            <select className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
              <option>Manual Review by Admin</option>
              <option>Automated AI Verification</option>
              <option>Third-Party Service (Stripe Identity)</option>
              <option>Hybrid (AI + Manual Review)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Average Verification Time
            </label>
            <select className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
              <option>Instant (Automated)</option>
              <option>24 hours</option>
              <option>48 hours</option>
              <option>72 hours</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
            <div>
              <h3 className="font-medium text-charcoal mb-1">
                Re-verification Required
              </h3>
              <p className="text-sm text-charcoal/60">
                Require re-verification every 2 years
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Trust & Safety Badges */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Trust & Safety Badges
        </h2>

        <div className="space-y-4">
          {[
            {
              name: "Verified ID",
              desc: "Identity confirmed",
              enabled: true,
            },
            {
              name: "Superhost",
              desc: "Exceptional host performance",
              enabled: true,
            },
            {
              name: "Long-term Guest",
              desc: "10+ completed stays",
              enabled: true,
            },
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-sand rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gold" />
                <div>
                  <h3 className="font-medium text-charcoal">{badge.name}</h3>
                  <p className="text-sm text-charcoal/60">{badge.desc}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked={badge.enabled}
                />
                <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
