import { motion } from "framer-motion";
import type { PropertyEarning } from "@/lib/types/landlord";

interface PropertyEarningsBreakdownProps {
  properties: PropertyEarning[];
  filterBy: "all" | "property";
  totalFiltered?: {
    gross: number;
    net: number;
    bookings: number;
  };
}

export function PropertyEarningsBreakdown({
  properties,
  filterBy,
  totalFiltered,
}: PropertyEarningsBreakdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-2xl p-8 border border-charcoal/5 shadow-sm"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-3xl text-charcoal">
          {filterBy === "property"
            ? "Property Performance"
            : "Property Breakdown"}
        </h2>
        {filterBy === "property" && totalFiltered && (
          <div className="text-right">
            <p className="text-sm text-charcoal/60 mb-1">Total Filtered</p>
            <p className="font-serif text-2xl font-bold text-gold">
              ${totalFiltered.net.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border border-charcoal/10 rounded-xl p-6 hover:border-warm-green/30 hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-6">
              <img
                src={property.image}
                alt={property.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-serif text-xl text-charcoal mb-1">
                  {property.name}
                </h3>
                <p className="text-sm text-charcoal/60 mb-3">
                  {property.location}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-charcoal/60 mb-1">Bookings</p>
                    <p className="font-bold text-charcoal">
                      {property.bookings}
                    </p>
                  </div>
                  <div>
                    <p className="text-charcoal/60 mb-1">Gross</p>
                    <p className="font-bold text-charcoal">
                      ${property.gross.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-charcoal/60 mb-1">Commission</p>
                    <p className="font-bold text-terracotta">
                      -${property.commission.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-charcoal/60 mb-1">Net</p>
                    <p className="font-bold text-gold">
                      ${property.net.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-charcoal/60 mb-1">Avg/Booking</p>
                    <p className="font-bold text-charcoal">
                      ${property.avgPerBooking.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
