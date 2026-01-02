import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onTitleChange: (title: string) => void;
  onMessageChange: (message: string) => void;
  onSend: () => void;
}

export function BroadcastModal({
  isOpen,
  onClose,
  title,
  message,
  onTitleChange,
  onMessageChange,
  onSend,
}: BroadcastModalProps) {
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
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
              <h3 className="font-serif text-2xl text-charcoal">
                Broadcast Notification
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Notification Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder="Enter notification title..."
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Message (Markdown supported)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => onMessageChange(e.target.value)}
                  placeholder="Enter your message... You can use **bold**, *italic*, and other Markdown formatting."
                  rows={8}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-all resize-none font-mono text-sm"
                />
                <p className="text-xs text-charcoal/60 mt-2">
                  This message will be sent to all users on the platform
                  immediately.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onSend}
                disabled={!title.trim() || !message.trim()}
                className="px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Broadcast
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
