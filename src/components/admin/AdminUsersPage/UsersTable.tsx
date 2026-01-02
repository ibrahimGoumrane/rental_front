import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { User } from "@/lib/constants/pages/AdminUsersPage";
import { UserRow } from "./UserRow";

interface UsersTableProps {
  users: User[];
  selectedUsers: number[];
  onSelectAll: () => void;
  onSelectUser: (userId: number) => void;
  openMenuId: number | null;
  onToggleMenu: (id: number | null) => void;
  onReviewDocs: (user: User) => void;
  onSuspend: (user: User) => void;
  onActivate: (user: User) => void;
  onResetPassword: (user: User) => void;
}

export function UsersTable({
  users,
  selectedUsers,
  onSelectAll,
  onSelectUser,
  openMenuId,
  onToggleMenu,
  onReviewDocs,
  onSuspend,
  onActivate,
  onResetPassword,
}: UsersTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-sand border-b border-charcoal/10">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length}
                  onChange={onSelectAll}
                  className="w-4 h-4 accent-warm-green"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Profile
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Name & Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Verification
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Bookings/Listings
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Registered
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {users.map((user, index) => (
              <UserRow
                key={user.id}
                user={user}
                index={index}
                isSelected={selectedUsers.includes(user.id)}
                onSelect={() => onSelectUser(user.id)}
                openMenuId={openMenuId}
                onToggleMenu={onToggleMenu}
                onReviewDocs={onReviewDocs}
                onSuspend={onSuspend}
                onActivate={onActivate}
                onResetPassword={onResetPassword}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-sand px-6 py-4 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-charcoal/70">
          Showing 1 to {users.length} of 12,847 users
        </p>
        <div className="flex items-center flex-wrap gap-2">
          <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium flex items-center space-x-1">
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <button className="px-4 py-2 bg-warm-green text-white rounded-lg font-medium text-sm">
            1
          </button>
          <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
            2
          </button>
          <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
            3
          </button>
          <span className="px-2 text-charcoal/60">...</span>
          <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
            257
          </button>
          <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium flex items-center space-x-1">
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
