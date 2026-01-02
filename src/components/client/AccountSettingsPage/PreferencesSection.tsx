export function PreferencesSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6">
      <h3 className="font-bold text-charcoal mb-6">Preferences</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-2">
            Language
          </label>
          <select className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
            <option>English</option>
            <option>Français</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-2">
            Currency
          </label>
          <select className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
            <option>USD - US Dollar</option>
            <option>EUR - Euro</option>
            <option>GBP - British Pound</option>
            <option>MAD - Moroccan Dirham</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-2">
            Time Zone
          </label>
          <select className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors">
            <option>Pacific Time (PT)</option>
            <option>Eastern Time (ET)</option>
            <option>Central European Time (CET)</option>
          </select>
        </div>
      </div>
      <button className="mt-6 px-6 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium">
        Save Preferences
      </button>
    </div>
  );
}
