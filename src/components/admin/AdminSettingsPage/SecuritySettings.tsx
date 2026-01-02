import { AlertTriangle, Download } from "lucide-react";

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      {/* Data Privacy */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">Data Privacy</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-medium text-charcoal">GDPR Compliance</h3>
                <span className="px-2 py-0.5 bg-warm-green text-white text-xs font-bold rounded-full">
                  Enabled
                </span>
              </div>
              <p className="text-sm text-charcoal/60">
                Enable data export and deletion requests
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
                Cookie Consent Banner
              </h3>
              <p className="text-sm text-charcoal/60">
                Display cookie consent to visitors
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Security Settings
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-medium text-charcoal">
                  Two-Factor Authentication
                </h3>
                <span className="px-2 py-0.5 bg-warm-green text-white text-xs font-bold rounded-full">
                  Required for Admins
                </span>
              </div>
              <p className="text-sm text-charcoal/60">
                Enhance account security with 2FA
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Max Login Attempts
              </label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Backup & Recovery */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Backup & Recovery
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-medium text-charcoal">Automated Backups</h3>
                <span className="px-2 py-0.5 bg-warm-green text-white text-xs font-bold rounded-full">
                  Active
                </span>
              </div>
              <p className="text-sm text-charcoal/60">
                Daily automated database backups
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors">
              <Download className="w-5 h-5" />
              <span>Manual Backup</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 border-2 border-terracotta text-terracotta rounded-lg hover:bg-terracotta/5 transition-colors">
              <AlertTriangle className="w-5 h-5" />
              <span>Restore from Backup</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
