import { AnimatePresence, motion } from "framer-motion";
import { Edit, Eye, EyeOff, MoreVertical } from "lucide-react";

interface PreviewActionsMenuProps {
  isPublished: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onTogglePublish: () => void;
  onEdit: () => void;
}

export function PreviewActionsMenu({
  isPublished,
  isOpen,
  onToggle,
  onTogglePublish,
  onEdit,
}: PreviewActionsMenuProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="p-3 hover:bg-sand rounded-xl transition-colors border border-charcoal/10"
      >
        <MoreVertical className="w-5 h-5 text-charcoal" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={onToggle} />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-charcoal/10 overflow-hidden z-50"
            >
              <div className="p-3">
                {/* Guest Preview Badge */}
                <div className="px-4 py-3 bg-sand/50 rounded-xl mb-2">
                  <div className="flex items-center space-x-2 text-charcoal/60 text-sm">
                    <Eye className="w-4 h-4" />
                    <span className="font-medium">Guest Preview Mode</span>
                  </div>
                  <p className="text-xs text-charcoal/50 mt-1">
                    Viewing as your guests see it
                  </p>
                </div>

                {/* Publish Toggle */}
                <button
                  onClick={() => {
                    onTogglePublish();
                    onToggle();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all mb-2 ${
                    isPublished
                      ? "bg-warm-green/10 hover:bg-warm-green/20"
                      : "bg-charcoal/5 hover:bg-charcoal/10"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {isPublished ? (
                      <Eye className="w-5 h-5 text-warm-green" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-charcoal/60" />
                    )}
                    <div className="text-left">
                      <p
                        className={`font-bold text-sm ${
                          isPublished ? "text-warm-green" : "text-charcoal"
                        }`}
                      >
                        {isPublished ? "Published" : "Unpublished"}
                      </p>
                      <p className="text-xs text-charcoal/60">
                        {isPublished
                          ? "Visible to guests"
                          : "Hidden from guests"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      isPublished ? "bg-warm-green" : "bg-charcoal/20"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        isPublished ? "left-5" : "left-1"
                      }`}
                    />
                  </div>
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => {
                    onEdit();
                    onToggle();
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-warm-green/10 transition-colors group"
                >
                  <Edit className="w-5 h-5 text-charcoal/60 group-hover:text-warm-green transition-colors" />
                  <div className="text-left">
                    <p className="font-bold text-sm text-charcoal group-hover:text-warm-green transition-colors">
                      Edit Property
                    </p>
                    <p className="text-xs text-charcoal/60">
                      Update details, photos, pricing
                    </p>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
