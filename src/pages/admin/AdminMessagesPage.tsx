import { useState } from "react";
import {
  INITIAL_BLOCKED_KEYWORDS,
  MOCK_CONVERSATIONS,
  MockConversation,
} from "@/lib/constants/pages/AdminMessagesPage";
import {
  PageHeader,
  StatsCards,
  FilterBar,
  ConversationsTable,
  BlockedKeywordsModal,
  ExportModal,
  ConfirmActionModal,
} from "@/components/admin/AdminMessagesPage";

export function AdminMessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    userName: "",
    flagReason: "all",
    dateFrom: "",
    dateTo: "",
    status: "all",
  });
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Modals
  const [showBlockedKeywordsModal, setShowBlockedKeywordsModal] =
    useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Blocked keywords management
  const [blockedKeywords, setBlockedKeywords] = useState(
    INITIAL_BLOCKED_KEYWORDS
  );
  const [newKeyword, setNewKeyword] = useState("");

  // Export filters
  const [exportFilters, setExportFilters] = useState({
    dateFrom: "",
    dateTo: "",
    userName: "",
    flagReason: "all",
  });

  // Confirmation modal state
  const [confirmAction, setConfirmAction] = useState<{
    type: "warn" | "suspend" | "false-positive";
    conversationId: number;
    userName: string;
  } | null>(null);

  const stats = {
    totalToday: 2847,
    flagged: 7,
    autoBlocked: 23,
    avgResponseTime: 2.3,
  };

  const handleAddKeyword = (keyword: string) => {
    if (keyword && !blockedKeywords.includes(keyword)) {
      setBlockedKeywords([...blockedKeywords, keyword]);
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setBlockedKeywords(blockedKeywords.filter((k) => k !== keyword));
  };

  const handleExport = () => {
    console.log("Exporting conversations with filters:", exportFilters);
    setShowExportModal(false);
  };

  const handleConfirmAction = () => {
    if (!confirmAction) return;
    console.log(
      `Executing ${confirmAction.type} for conversation ${confirmAction.conversationId}`
    );
    setConfirmAction(null);
    setOpenMenuId(null);
  };

  const resetFilters = () => {
    setFilters({
      userName: "",
      flagReason: "all",
      dateFrom: "",
      dateTo: "",
      status: "all",
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full flex items-center space-x-1">
            <span className="w-2 h-2 bg-white rounded-full" />
            <span>High</span>
          </span>
        );
      case "medium":
        return (
          <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full flex items-center space-x-1">
            <span className="w-2 h-2 bg-white rounded-full" />
            <span>Medium</span>
          </span>
        );
      case "low":
        return (
          <span className="px-3 py-1 bg-warm-green/60 text-white text-xs font-bold rounded-full flex items-center space-x-1">
            <span className="w-2 h-2 bg-white rounded-full" />
            <span>Low</span>
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (
    status: string,
    extra?: { assignedAdmin?: string }
  ) => {
    switch (status) {
      case "unreviewed":
        return (
          <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
            Unreviewed
          </span>
        );
      case "under-review":
        return (
          <div>
            <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
              Under Review
            </span>
            {extra?.assignedAdmin && (
              <p className="text-xs text-charcoal/60 mt-1">
                {extra.assignedAdmin}
              </p>
            )}
          </div>
        );
      case "resolved":
        return (
          <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  const handleWarn = (conversation: MockConversation) => {
    setConfirmAction({
      type: "warn",
      conversationId: conversation.id,
      userName: conversation.guest.name,
    });
  };

  const handleSuspend = (conversation: MockConversation) => {
    setConfirmAction({
      type: "suspend",
      conversationId: conversation.id,
      userName: conversation.guest.name,
    });
  };

  const handleMarkFalsePositive = (conversation: MockConversation) => {
    setConfirmAction({
      type: "false-positive",
      conversationId: conversation.id,
      userName: conversation.guest.name,
    });
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <PageHeader
          onBlockedKeywordsClick={() => setShowBlockedKeywordsModal(true)}
          onExportClick={() => setShowExportModal(true)}
        />

        <StatsCards stats={stats} />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFiltersChange={setFilters}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onResetFilters={resetFilters}
        />

        <ConversationsTable
          conversations={MOCK_CONVERSATIONS}
          openMenuId={openMenuId}
          onToggleMenu={setOpenMenuId}
          onWarn={handleWarn}
          onSuspend={handleSuspend}
          onMarkFalsePositive={handleMarkFalsePositive}
          getPriorityBadge={getPriorityBadge}
          getStatusBadge={getStatusBadge}
        />
      </div>

      <BlockedKeywordsModal
        isOpen={showBlockedKeywordsModal}
        onClose={() => setShowBlockedKeywordsModal(false)}
        blockedKeywords={blockedKeywords}
        onAddKeyword={handleAddKeyword}
        onRemoveKeyword={handleRemoveKeyword}
        newKeyword={newKeyword}
        onNewKeywordChange={setNewKeyword}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        filters={exportFilters}
        onFilterChange={setExportFilters}
        onExport={handleExport}
      />

      <ConfirmActionModal
        confirmAction={confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}
