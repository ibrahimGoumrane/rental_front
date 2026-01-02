import { useState } from "react";
import { USERS_DATA, User } from "@/lib/constants/pages/AdminUsersPage";
import { PageHeader } from "@/components/admin/AdminUsersPage/PageHeader";
import { FilterBar } from "@/components/admin/AdminUsersPage/FilterBar";
import { BulkActionsBar } from "@/components/admin/AdminUsersPage/BulkActionsBar";
import { UsersTable } from "@/components/admin/AdminUsersPage/UsersTable";
import { ExportModal } from "@/components/admin/AdminUsersPage/ExportModal";
import { BulkEmailModal } from "@/components/admin/AdminUsersPage/BulkEmailModal";
import { ReviewDocsModal } from "@/components/admin/AdminUsersPage/ReviewDocsModal";
import { SuspendAccountModal } from "@/components/admin/AdminUsersPage/SuspendAccountModal";
import { ResetPasswordModal } from "@/components/admin/AdminUsersPage/ResetPasswordModal";
import { ActivateAccountModal } from "@/components/admin/AdminUsersPage/ActivateAccountModal";

export function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState<string>("all");
  const [verificationFilter, setVerificationFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "recent" | "registered" | "bookings" | "listings"
  >("recent");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Modals
  const [showExportModal, setShowExportModal] = useState(false);
  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);
  const [showReviewDocsModal, setShowReviewDocsModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);

  // Export filters
  const [exportFilters, setExportFilters] = useState({
    userType: "all",
    status: "all",
    verification: "all",
  });

  // Bulk email state
  const [bulkEmailFilters, setBulkEmailFilters] = useState({
    userType: "all",
    status: "all",
  });
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

  // Selected user for actions
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Suspend account state
  const [suspendDuration, setSuspendDuration] = useState("7");

  // Reset password state
  const [newPassword, setNewPassword] = useState("");
  const [emailPassword, setEmailPassword] = useState(false);

  const handleExport = () => {
    console.log("Exporting with filters:", exportFilters);
    setShowExportModal(false);
  };

  const resetExportFilters = () => {
    setExportFilters({
      userType: "all",
      status: "all",
      verification: "all",
    });
  };

  const handleBulkEmail = () => {
    console.log("Sending bulk email:", {
      bulkEmailFilters,
      emailSubject,
      emailContent,
    });
    setShowBulkEmailModal(false);
    setEmailSubject("");
    setEmailContent("");
  };

  const resetBulkEmailFilters = () => {
    setBulkEmailFilters({
      userType: "all",
      status: "all",
    });
  };

  const handleVerifyDocument = () => {
    console.log("Verifying document for user:", selectedUser?.id);
    setShowReviewDocsModal(false);
    setSelectedUser(null);
  };

  const handleRejectDocument = () => {
    console.log("Rejecting document for user:", selectedUser?.id);
    setShowReviewDocsModal(false);
    setSelectedUser(null);
  };

  const handleSuspendAccount = () => {
    console.log(
      "Suspending account:",
      selectedUser?.id,
      "for",
      suspendDuration,
      "days"
    );
    setShowSuspendModal(false);
    setSelectedUser(null);
    setSuspendDuration("7");
  };

  const handleResetPassword = () => {
    console.log("Resetting password for:", selectedUser?.id, {
      newPassword,
      emailPassword,
    });
    setShowResetPasswordModal(false);
    setSelectedUser(null);
    setNewPassword("");
    setEmailPassword(false);
  };

  const generateStrongPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
  };

  const handleActivateAccount = () => {
    console.log("Activating account:", selectedUser?.id);
    setShowActivateModal(false);
    setSelectedUser(null);
  };

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    if (selectedUsers.length === USERS_DATA.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(USERS_DATA.map((u) => u.id));
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <PageHeader
          totalUsers={USERS_DATA.length}
          onExportClick={() => setShowExportModal(true)}
          onBulkEmailClick={() => setShowBulkEmailModal(true)}
        />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          userTypeFilter={userTypeFilter}
          onUserTypeChange={setUserTypeFilter}
          sortBy={sortBy}
          onSortChange={(value) =>
            setSortBy(
              value as "recent" | "registered" | "bookings" | "listings"
            )
          }
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          verificationFilter={verificationFilter}
          onVerificationFilterChange={setVerificationFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onResetFilters={() => {
            setSearchQuery("");
            setUserTypeFilter("all");
            setVerificationFilter([]);
            setStatusFilter([]);
          }}
        />

        <BulkActionsBar
          selectedCount={selectedUsers.length}
          onClearSelection={() => setSelectedUsers([])}
        />

        <UsersTable
          users={USERS_DATA}
          selectedUsers={selectedUsers}
          onSelectAll={selectAllUsers}
          onSelectUser={toggleUserSelection}
          openMenuId={openMenuId}
          onToggleMenu={setOpenMenuId}
          onReviewDocs={(user) => {
            setSelectedUser(user);
            setShowReviewDocsModal(true);
          }}
          onSuspend={(user) => {
            setSelectedUser(user);
            setShowSuspendModal(true);
          }}
          onActivate={(user) => {
            setSelectedUser(user);
            setShowActivateModal(true);
          }}
          onResetPassword={(user) => {
            setSelectedUser(user);
            setShowResetPasswordModal(true);
          }}
        />
      </div>

      {/* Modals */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        filters={exportFilters}
        onFiltersChange={setExportFilters}
        onExport={handleExport}
        onReset={resetExportFilters}
      />

      <BulkEmailModal
        isOpen={showBulkEmailModal}
        onClose={() => setShowBulkEmailModal(false)}
        filters={bulkEmailFilters}
        onFiltersChange={setBulkEmailFilters}
        subject={emailSubject}
        onSubjectChange={setEmailSubject}
        content={emailContent}
        onContentChange={setEmailContent}
        onSend={handleBulkEmail}
        onReset={resetBulkEmailFilters}
      />

      <ReviewDocsModal
        isOpen={showReviewDocsModal}
        onClose={() => {
          setShowReviewDocsModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onVerify={handleVerifyDocument}
        onReject={handleRejectDocument}
      />

      <SuspendAccountModal
        isOpen={showSuspendModal}
        onClose={() => {
          setShowSuspendModal(false);
          setSelectedUser(null);
          setSuspendDuration("7");
        }}
        user={selectedUser}
        duration={suspendDuration}
        onDurationChange={setSuspendDuration}
        onSuspend={handleSuspendAccount}
      />

      <ResetPasswordModal
        isOpen={showResetPasswordModal}
        onClose={() => {
          setShowResetPasswordModal(false);
          setSelectedUser(null);
          setNewPassword("");
          setEmailPassword(false);
        }}
        user={selectedUser}
        newPassword={newPassword}
        onPasswordChange={setNewPassword}
        emailPassword={emailPassword}
        onEmailPasswordChange={setEmailPassword}
        onReset={handleResetPassword}
        onGenerate={generateStrongPassword}
      />

      <ActivateAccountModal
        isOpen={showActivateModal}
        onClose={() => {
          setShowActivateModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onActivate={handleActivateAccount}
      />
    </div>
  );
}
