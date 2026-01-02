import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";

interface BlockedKeywordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  blockedKeywords: string[];
  onAddKeyword: (keyword: string) => void;
  onRemoveKeyword: (keyword: string) => void;
  newKeyword: string;
  onNewKeywordChange: (value: string) => void;
}

export function BlockedKeywordsModal({
  isOpen,
  onClose,
  blockedKeywords,
  onAddKeyword,
  onRemoveKeyword,
  newKeyword,
  onNewKeywordChange,
}: BlockedKeywordsModalProps) {
  const handleAddKeyword = () => {
    if (
      newKeyword.trim() &&
      !blockedKeywords.includes(newKeyword.trim().toLowerCase())
    ) {
      onAddKeyword(newKeyword.trim().toLowerCase());
      onNewKeywordChange("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
              <h3 className="font-serif text-2xl text-charcoal">
                Blocked Keywords Management
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Add New Keyword
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => onNewKeywordChange(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
                    placeholder="Enter keyword to block..."
                    className="flex-1 px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                  />
                  <button
                    onClick={handleAddKeyword}
                    className="px-4 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-charcoal mb-3">
                  Current Blocked Keywords ({blockedKeywords.length})
                </h4>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {blockedKeywords.map((keyword) => (
                    <div
                      key={keyword}
                      className="flex items-center justify-between p-3 bg-sand rounded-lg"
                    >
                      <span className="text-sm text-charcoal font-mono">
                        {keyword}
                      </span>
                      <button
                        onClick={() => onRemoveKeyword(keyword)}
                        className="p-1 hover:bg-terracotta/10 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-terracotta" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-gold/10 border border-gold/20 rounded-lg">
                <p className="text-sm text-charcoal/70">
                  <strong>Note:</strong> Changes apply globally to all chat
                  moderation. Messages containing these keywords will be
                  automatically flagged and deleted.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
