import { Upload } from "lucide-react";

export function GeneralSettings() {
  return (
    <div className="space-y-6">
      {/* Brand & Identity */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Brand & Identity
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Platform Name
            </label>
            <input
              type="text"
              placeholder="e.g., StayNest, VacationHub, LuxeStay"
              className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Tagline
            </label>
            <input
              type="text"
              placeholder="e.g., Find your perfect getaway"
              className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Main Logo
              </label>
              <div className="border-2 border-dashed border-gold rounded-lg p-6 text-center hover:bg-gold/5 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="text-sm text-charcoal/60">Upload Logo</p>
                <p className="text-xs text-charcoal/40 mt-1">
                  PNG/SVG, max 500KB
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Favicon
              </label>
              <div className="border-2 border-dashed border-gold rounded-lg p-6 text-center hover:bg-gold/5 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="text-sm text-charcoal/60">Upload Favicon</p>
                <p className="text-xs text-charcoal/40 mt-1">32x32px</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Email Header Logo
              </label>
              <div className="border-2 border-dashed border-gold rounded-lg p-6 text-center hover:bg-gold/5 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="text-sm text-charcoal/60">Upload Logo</p>
                <p className="text-xs text-charcoal/40 mt-1">200x50px</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-3">
              Brand Colors
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-charcoal/60 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-warm-green border-2 border-sand cursor-pointer"></div>
                  <input
                    type="text"
                    defaultValue="#2D5F3F"
                    className="flex-1 px-3 py-2 bg-cream border border-charcoal/20 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-charcoal/60 mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-terracotta border-2 border-sand cursor-pointer"></div>
                  <input
                    type="text"
                    defaultValue="#E07A5F"
                    className="flex-1 px-3 py-2 bg-cream border border-charcoal/20 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-charcoal/60 mb-2">
                  Accent Color
                </label>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-gold border-2 border-sand cursor-pointer"></div>
                  <input
                    type="text"
                    defaultValue="#D4AF37"
                    className="flex-1 px-3 py-2 bg-cream border border-charcoal/20 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Localization */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">Localization</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Default Language
            </label>
            <select className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
              <option>English</option>
              <option>French</option>
              <option>Arabic</option>
              <option>Spanish</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Default Currency
            </label>
            <select className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
              <option>USD - US Dollar</option>
              <option>EUR - Euro</option>
              <option>MAD - Moroccan Dirham</option>
              <option>GBP - British Pound</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Date Format
            </label>
            <select className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Time Zone
            </label>
            <select className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
              <option>GMT</option>
              <option>EST</option>
              <option>CET</option>
              <option>Morocco Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Platform Status */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Platform Status
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
            <div>
              <h3 className="font-medium text-charcoal mb-1">
                Maintenance Mode
              </h3>
              <p className="text-sm text-charcoal/60">
                Temporarily disable public access
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
            <div>
              <h3 className="font-medium text-charcoal mb-1">
                Public Registration
              </h3>
              <p className="text-sm text-charcoal/60">
                Allow new users to sign up
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
                Accept New Listings
              </h3>
              <p className="text-sm text-charcoal/60">
                Allow hosts to create new properties
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
