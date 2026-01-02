import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeftRight,
  Ban,
  CheckCircle,
  Eye,
  MoreVertical,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MockConversation } from "@/lib/constants/pages/AdminMessagesPage";

interface ConversationRowProps {
  conversation: MockConversation;
  index: number;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onWarn: () => void;
  onSuspend: () => void;
  onMarkFalsePositive: () => void;
  getPriorityBadge: (priority: string) => React.ReactNode;
  getStatusBadge: (
    status: string,
    extra?: { assignedAdmin?: string }
  ) => React.ReactNode;
}

export function ConversationRow({
  conversation,
  index,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onWarn,
  onSuspend,
  onMarkFalsePositive,
  getPriorityBadge,
  getStatusBadge,
}: ConversationRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 + index * 0.05 }}
      className={`hover:bg-sand/50 transition-colors ${
        index % 2 === 0 ? "bg-white" : "bg-cream"
      }`}
    >
      <td className="px-6 py-4">{getPriorityBadge(conversation.priority)}</td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          {/* Guest */}
          <div className="flex items-center space-x-2">
            {conversation.guest.avatar ? (
              <img
                src={conversation.guest.avatar}
                alt={conversation.guest.name}
                className="w-8 h-8 rounded-full border-2 border-sand"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-warm-green/10 flex items-center justify-center border-2 border-sand">
                <span className="text-xs font-bold text-warm-green">
                  {conversation.guest.initials}
                </span>
              </div>
            )}
            <Link
              to={`/admin/users/${conversation.id}`}
              className="text-sm text-charcoal hover:text-warm-green transition-colors"
            >
              {conversation.guest.name}
            </Link>
          </div>

          <ArrowLeftRight className="w-4 h-4 text-charcoal/40" />

          {/* Host */}
          <div className="flex items-center space-x-2">
            {conversation.host.avatar ? (
              <img
                src={conversation.host.avatar}
                alt={conversation.host.name}
                className="w-8 h-8 rounded-full border-2 border-sand"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center border-2 border-sand">
                <span className="text-xs font-bold text-terracotta">
                  {conversation.host.initials}
                </span>
              </div>
            )}
            <Link
              to={`/admin/users/${conversation.id}`}
              className="text-sm text-charcoal hover:text-warm-green transition-colors"
            >
              {conversation.host.name}
            </Link>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="max-w-xs">
          <p className="text-sm text-charcoal">
            {conversation.flaggedPortion ? (
              <>
                {conversation.lastMessage.split(conversation.flaggedPortion)[0]}
                <span className="bg-terracotta/20 px-1 rounded">
                  {conversation.flaggedPortion}
                </span>
                {conversation.lastMessage.split(conversation.flaggedPortion)[1]}
              </>
            ) : (
              conversation.lastMessage
            )}
          </p>
          <p className="text-xs text-charcoal/60 mt-1">
            {conversation.timestamp}
          </p>
          <p className="text-xs text-terracotta mt-1 font-medium">
            ⚠️ Message auto-deleted
          </p>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="space-y-2">
          <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
            {conversation.flagReason}
          </span>
          <div className="flex flex-wrap gap-1">
            {conversation.secondaryTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p
            className={`font-bold text-lg ${
              conversation.violationCount >= 3
                ? "text-terracotta"
                : conversation.violationCount >= 2
                ? "text-gold"
                : "text-charcoal/60"
            }`}
          >
            {conversation.violationCount}
          </p>
          <p className="text-xs text-charcoal/60">
            {conversation.violationCount >= 3
              ? "Repeat offender"
              : conversation.violationCount >= 2
              ? "Multiple flags"
              : "First offense"}
          </p>
        </div>
      </td>
      <td className="px-6 py-4">
        {getStatusBadge(conversation.status, {
          assignedAdmin: conversation.assignedAdmin,
        })}
      </td>
      <td className="px-6 py-4 relative">
        <button
          onClick={onToggleMenu}
          className="p-2 hover:bg-sand rounded-lg transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-charcoal/60" />
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={onCloseMenu} />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-64 bg-cream rounded-xl shadow-2xl border border-charcoal/10 py-2 z-40"
              >
                <Link
                  to={`/admin/messages/${conversation.id}`}
                  className="flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm"
                >
                  <Eye className="w-4 h-4 text-charcoal/60" />
                  <span>View Full Conversation</span>
                </Link>
                <div className="border-t border-charcoal/10 my-2" />
                <button
                  onClick={onWarn}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-gold"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Warn User(s)</span>
                </button>
                <button
                  onClick={onSuspend}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-terracotta"
                >
                  <Ban className="w-4 h-4" />
                  <span>Suspend User(s)</span>
                </button>
                <div className="border-t border-charcoal/10 my-2" />
                <button
                  onClick={onMarkFalsePositive}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-sand transition-colors text-sm text-warm-green"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark as False Positive</span>
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </td>
    </motion.tr>
  );
}
