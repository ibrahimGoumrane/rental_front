export function PaymentsSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6">
      <h3 className="font-bold text-charcoal mb-6">Payment Methods</h3>
      <div className="space-y-4 mb-6">
        <div className="border border-charcoal/20 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
              VISA
            </div>
            <div>
              <p className="font-medium text-charcoal">•••• 4242</p>
              <p className="text-sm text-charcoal/60">Expires 12/25</p>
            </div>
          </div>
          <button className="text-sm text-terracotta hover:underline">
            Remove
          </button>
        </div>
      </div>
      <button className="px-6 py-2 border border-warm-green text-warm-green rounded-lg hover:bg-warm-green hover:text-white transition-colors font-medium">
        Add Payment Method
      </button>
    </div>
  );
}
