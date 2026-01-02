import { Home, CheckCircle } from "lucide-react";

export function PropertySettings() {
  return (
    <div className="space-y-6">
      {/* Listing Requirements */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Listing Requirements
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Minimum Photos Required
              </label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Maximum Photos Allowed
              </label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Minimum Description Length
              </label>
              <input
                type="number"
                defaultValue="100"
                placeholder="characters"
                className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Minimum Amenities Required
              </label>
              <input
                type="number"
                defaultValue="3"
                className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-charcoal">Required Fields</h3>
            {[
              "Property title",
              "Full address",
              "Property type",
              "Number of guests",
              "Bedrooms & bathrooms",
              "Check-in/out times",
              "House rules",
            ].map((field, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-sand rounded-lg"
              >
                <span className="text-sm text-charcoal">{field}</span>
                <CheckCircle className="w-5 h-5 text-warm-green" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Approval */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Property Approval Process
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
            <div>
              <h3 className="font-medium text-charcoal mb-1">
                Manual Approval Required
              </h3>
              <p className="text-sm text-charcoal/60">
                Admin must approve all new listings
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Average Approval Time
            </label>
            <select className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
              <option>24 hours</option>
              <option>48 hours</option>
              <option>72 hours</option>
              <option>1 week</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Categories */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Property Categories & Types
        </h2>

        <div className="space-y-4">
          {[
            { name: "Entire Place", enabled: true },
            { name: "Private Room", enabled: true },
            { name: "Shared Room", enabled: true },
            { name: "Villa", enabled: true },
            { name: "Apartment", enabled: true },
            { name: "House", enabled: true },
            { name: "Cabin", enabled: true },
            { name: "Unique Stays", enabled: false },
          ].map((category, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-sand rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Home className="w-5 h-5 text-terracotta" />
                <span className="font-medium text-charcoal">
                  {category.name}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked={category.enabled}
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
