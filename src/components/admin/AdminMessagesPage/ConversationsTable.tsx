import { motion } from "framer-motion";
import { MockConversation } from "@/lib/constants/pages/AdminMessagesPage";
import { ConversationRow } from "./ConversationRow";

interface ConversationsTableProps {
  conversations: MockConversation[];
  openMenuId: number | null;
  onToggleMenu: (id: number | null) => void;
  onWarn: (conversation: MockConversation) => void;
  onSuspend: (conversation: MockConversation) => void;
  onMarkFalsePositive: (conversation: MockConversation) => void;
  getPriorityBadge: (priority: string) => React.ReactNode;
  getStatusBadge: (
    status: string,
    extra?: { assignedAdmin?: string }
  ) => React.ReactNode;
}

export function ConversationsTable({
  conversations,
  openMenuId,
  onToggleMenu,
  onWarn,
  onSuspend,
  onMarkFalsePositive,
  getPriorityBadge,
  getStatusBadge,
}: ConversationsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-sand border-b border-charcoal/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Priority
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Users
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Last Message
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Flag Reason
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Violations
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {conversations.map((conversation, index) => (
              <ConversationRow
                key={conversation.id}
                conversation={conversation}
                index={index}
                isMenuOpen={openMenuId === conversation.id}
                onToggleMenu={() =>
                  onToggleMenu(
                    openMenuId === conversation.id ? null : conversation.id
                  )
                }
                onCloseMenu={() => onToggleMenu(null)}
                onWarn={() => onWarn(conversation)}
                onSuspend={() => onSuspend(conversation)}
                onMarkFalsePositive={() => onMarkFalsePositive(conversation)}
                getPriorityBadge={getPriorityBadge}
                getStatusBadge={getStatusBadge}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-sand px-6 py-4 border-t border-charcoal/10 flex items-center justify-between">
        <p className="text-sm text-charcoal/70">
          Showing 1 to {conversations.length} of 7 flagged conversations
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
            Previous
          </button>
          <button className="px-4 py-2 bg-terracotta text-white rounded-lg font-medium text-sm">
            1
          </button>
          <button className="px-4 py-2 border border-charcoal/20 rounded-lg hover:bg-white transition-colors text-sm font-medium">
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
}
