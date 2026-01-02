import { Lock, Shield } from "lucide-react";

export function SecuritySection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6">
        <h3 className="font-bold text-charcoal mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-terracotta" />
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
          </div>
        </div>
        <button className="mt-6 px-6 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium">
          Update Password
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6">
        <h3 className="font-bold text-charcoal mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-warm-green" />
          Two-Factor Authentication
        </h3>
        <p className="text-charcoal/60 mb-4">
          Add an extra layer of security to your account
        </p>
        <button className="px-6 py-2 border border-warm-green text-warm-green rounded-lg hover:bg-warm-green hover:text-white transition-colors font-medium">
          Enable 2FA
        </button>
      </div>
    </div>
  );
}
