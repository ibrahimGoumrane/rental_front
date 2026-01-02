import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { AdminCollection } from "@/lib/types/admin";

interface AddToCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  collections: AdminCollection[];
  selectedCollection: string;
  onCollectionChange: (collectionId: string) => void;
  onAdd: () => void;
}

export function AddToCollectionModal({
  isOpen,
  onClose,
  collections,
  selectedCollection,
  onCollectionChange,
  onAdd,
}: AddToCollectionModalProps) {
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
            className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
              <h3 className="font-serif text-2xl text-charcoal">
                Add to Collection
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            <div className="p-6">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Select Collection
              </label>
              <select
                value={selectedCollection}
                onChange={(e) => onCollectionChange(e.target.value)}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                <option value="">Choose a collection...</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name} ({collection.propertyCount} properties)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-charcoal/10 bg-sand/30">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onAdd}
                disabled={!selectedCollection}
                className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Collection
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
