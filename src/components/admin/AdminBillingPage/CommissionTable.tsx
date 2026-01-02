import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { CommissionData } from "@/lib/constants/pages/AdminBillingPage";

interface CommissionTableProps {
  data: CommissionData[];
  getStatusBadge: (status: string) => JSX.Element | null;
}

export function CommissionTable({
  data,
  getStatusBadge,
}: CommissionTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-sand border-b border-charcoal/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Host
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Property
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Total Bookings
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Gross Revenue
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Commission (10%)
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                TVA (20%)
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Net Revenue
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Period
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:bg-sand/50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-cream"
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {item.host.avatar ? (
                      <img
                        src={item.host.avatar}
                        alt={item.host.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-gold">
                          {item.host.initials}
                        </span>
                      </div>
                    )}
                    <div>
                      <Link
                        to={`/admin/users/${item.host.name}`}
                        className="font-medium text-charcoal hover:text-gold transition-colors"
                      >
                        {item.host.name}
                      </Link>
                      {item.host.verified && (
                        <p className="text-xs text-gold flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <Link
                      to={`/admin/properties/${item.property.id}`}
                      className="font-medium text-charcoal hover:text-warm-green transition-colors"
                    >
                      {item.property.name}
                    </Link>
                    <p className="text-xs text-charcoal/60">
                      {item.property.location}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-charcoal">
                    {item.totalBookings}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-charcoal">
                    ${item.grossRevenue.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-warm-green">
                    ${item.commission.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-terracotta">
                    ${item.tva.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-gold">
                    ${item.netRevenue.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-charcoal/70">
                    {item.period}
                  </span>
                </td>
                <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
