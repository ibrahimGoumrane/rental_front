import { CheckCircle } from "lucide-react";
import { RefundData } from "@/lib/constants/pages/AdminBillingPage";

interface RefundsTableProps {
  data: RefundData[];
  getStatusBadge: (status: string) => JSX.Element | null;
}

export function RefundsTable({ data, getStatusBadge }: RefundsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-sand border-b border-charcoal/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Refund ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Host
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Property
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Amount Refunded
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Affected Bookings
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Reason
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {data.map((refund, index) => (
              <tr
                key={refund.id}
                className={`hover:bg-sand/50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-cream"
                }`}
              >
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-charcoal font-medium">
                    {refund.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {refund.host.avatar ? (
                      <img
                        src={refund.host.avatar}
                        alt={refund.host.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-gold">
                          {refund.host.initials}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-charcoal">
                        {refund.host.name}
                      </p>
                      {refund.host.verified && (
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
                    <p className="font-medium text-charcoal">
                      {refund.property.name}
                    </p>
                    <p className="text-xs text-charcoal/60">
                      {refund.property.location}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-terracotta">
                    ${refund.amountRefunded.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-charcoal">
                    {refund.affectedBookings}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-charcoal/70">
                    {refund.reason}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-charcoal/60">
                    {refund.date}
                  </span>
                </td>
                <td className="px-6 py-4">{getStatusBadge(refund.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
