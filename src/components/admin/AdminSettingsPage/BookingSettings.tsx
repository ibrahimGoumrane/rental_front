import { Info } from "lucide-react";

export function BookingSettings() {
  return (
    <div className="space-y-6">
      {/* Booking Rules */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Booking Rules
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Minimum Stay (nights)
              </label>
              <input
                type="number"
                defaultValue="1"
                className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Maximum Stay (nights)
              </label>
              <input
                type="number"
                defaultValue="90"
                className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-charcoal/70 mb-2">
                Minimum Notice (days)
              </label>
              <input
                type="number"
                defaultValue="1"
                className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
              />
              <p className="text-xs text-charcoal/60 mt-2">
                Hosts must manually validate guests before accepting
                reservations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Limits & Cancellation */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Reservation Limits & Cancellation
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Maximum Recurring Reservations
            </label>
            <input
              type="number"
              defaultValue="3"
              className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
            <p className="text-xs text-charcoal/60 mt-2">
              Limits how many times the same guest can book the same property
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Client Cancellation Window (days)
            </label>
            <input
              type="number"
              defaultValue="7"
              className="w-full px-4 py-3 bg-cream border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
            />
            <p className="text-xs text-charcoal/60 mt-2">
              Only clients can cancel reservations within this window. Hosts
              cannot cancel.
            </p>
          </div>

          <div className="bg-terracotta/10 border border-terracotta/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-charcoal mb-1">
                  Cancellation Policy
                </h3>
                <p className="text-sm text-charcoal/60">
                  Only guests can cancel reservations. Hosts must contact admin
                  for cancellation requests. This prevents abuse and protects
                  guest bookings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Requirements */}
      <div className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm">
        <h2 className="font-serif text-3xl text-charcoal mb-6">
          Guest Requirements
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-sand rounded-lg">
            <div>
              <h3 className="font-medium text-charcoal mb-1">
                Verified ID Required
              </h3>
              <p className="text-sm text-charcoal/60">
                Guests must verify identity before booking
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
                Profile Photo Required
              </h3>
              <p className="text-sm text-charcoal/60">
                Guests must have a profile photo
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-14 h-7 bg-charcoal/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-warm-green"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
