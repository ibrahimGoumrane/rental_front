import { motion } from "framer-motion";
import { Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Property } from "@/lib/constants/pages/AdminPropertiesPage";

interface PropertyTableViewProps {
  properties: Property[];
  onStatusChange: (
    propertyId: number,
    propertyName: string,
    currentStatus: string,
    newStatus: string
  ) => void;
  onAddToCollection: (propertyId: number) => void;
  getStatusBadge: (status: string) => JSX.Element | null;
}

export function PropertyTableView({
  properties,
  onStatusChange,
  onAddToCollection,
  getStatusBadge,
}: PropertyTableViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-sand border-b border-charcoal/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Property
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Owner
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Bookings
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Revenue
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {properties.map((property, index) => (
              <motion.tr
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className={`hover:bg-sand/50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-cream"
                }`}
              >
                <td className="px-6 py-4">
                  <Link
                    to={`/property/${property.id}`}
                    className="flex items-center space-x-3 group"
                  >
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-charcoal group-hover:text-terracotta transition-colors">
                        {property.title}
                      </p>
                      {property.featured && (
                        <span className="inline-flex items-center text-xs text-gold font-bold">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Featured
                        </span>
                      )}
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {property.owner.avatar ? (
                      <img
                        src={property.owner.avatar}
                        alt={property.owner.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-warm-green/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-warm-green">
                          {property.owner.initials}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-charcoal">
                        {property.owner.name}
                      </p>
                      {property.owner.verified && (
                        <span className="text-xs text-gold flex items-center">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-terracotta/20 text-terracotta text-xs font-bold rounded-full capitalize">
                    {property.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-charcoal/70">{property.city}</p>
                </td>
                <td className="px-6 py-4">
                  <div>
                    {getStatusBadge(property.status)}
                    {property.status === "suspended" &&
                      property.autoDeleteDate && (
                        <p className="text-xs text-terracotta mt-1">
                          Auto-delete: {property.autoDeleteDate}
                        </p>
                      )}
                  </div>
                  <select
                    value={property.status}
                    onChange={(e) =>
                      onStatusChange(
                        property.id,
                        property.title,
                        property.status,
                        e.target.value
                      )
                    }
                    className="mt-2 w-full px-2 py-1 border border-charcoal/20 rounded text-xs outline-none focus:border-terracotta bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-charcoal">
                    {property.bookings}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-charcoal">
                      ${property.revenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-gold">
                      Commission: ${property.commission.toLocaleString()}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/property/${property.id}`}
                      className="px-3 py-1 bg-warm-green text-white text-xs font-medium rounded hover:bg-warm-green/90 transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => onAddToCollection(property.id)}
                      className="px-3 py-1 bg-gold text-white text-xs font-medium rounded hover:bg-gold/90 transition-colors"
                    >
                      Add to Collection
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
