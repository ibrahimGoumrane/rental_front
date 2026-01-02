import { CheckCircle } from "lucide-react";

export function PaymentsSettings() {
  return (
    <div className="space-y-6">
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
                <input
                  type="number"
                  defaultValue="15"
                  className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-gold transition-colors pr-12"
                />
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
                <input
                  type="number"
                  defaultValue="0"
                  className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-gold transition-colors pr-12"
                />
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
                  {[
                    { type: "Entire Place", rate: 15 },
                    { type: "Private Room", rate: 12 },
                    { type: "Shared Room", rate: 10 },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-cream" : "bg-white"}
                    >
                      <td className="px-4 py-3 text-sm text-charcoal">
                        {item.type}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            defaultValue={item.rate}
                            className="w-24 px-3 py-2 bg-white border border-charcoal/20 rounded-lg text-sm"
                          />
                          <span className="text-gold font-bold">%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
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
          {[
            { name: "Credit/Debit Card", enabled: true },
            { name: "Bank Transfer", enabled: true },
            { name: "PayPal", enabled: true },
            { name: "Local Payment Methods", enabled: true },
            { name: "Cryptocurrency", enabled: false, badge: "Pilot" },
          ].map((method, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-sand rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle
                  className={`w-5 h-5 ${
                    method.enabled ? "text-warm-green" : "text-charcoal/20"
                  }`}
                />
                <span className="font-medium text-charcoal">{method.name}</span>
                {method.badge && (
                  <span className="px-2 py-0.5 bg-gold text-white text-xs font-bold rounded-full">
                    {method.badge}
                  </span>
                )}
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked={method.enabled}
                />
                <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
              </label>
            </div>
          ))}
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
              <input
                type="number"
                defaultValue="50"
                className="w-full pl-8 pr-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
