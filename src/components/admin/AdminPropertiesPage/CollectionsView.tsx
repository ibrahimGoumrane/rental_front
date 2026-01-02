import { motion } from "framer-motion";
import { Folder } from "lucide-react";
import type { AdminCollection } from "@/lib/types/admin";

interface CollectionsViewProps {
  collections: AdminCollection[];
  onViewCollectionProperties: (
    collectionId: number,
    collectionName: string
  ) => void;
}

export function CollectionsView({
  collections,
  onViewCollectionProperties,
}: CollectionsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gold/10 border border-gold/20 rounded-xl p-6">
        <p className="text-sm text-charcoal/70">
          <strong>Note:</strong> Collections are view-only in this scope. You
          can view existing collections and their properties, but cannot create,
          edit, or delete collections here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Folder className="w-6 h-6 text-gold" />
              </div>
              <span className="px-3 py-1 bg-warm-green text-white text-xs font-bold rounded-full">
                {collection.propertyCount} properties
              </span>
            </div>
            <h3 className="font-serif text-xl text-charcoal mb-2">
              {collection.name}
            </h3>
            <p className="text-sm text-charcoal/60 mb-4">
              {collection.description}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
              <span className="text-xs text-charcoal/60">
                Created: {collection.createdDate}
              </span>
              <button
                onClick={() =>
                  onViewCollectionProperties(collection.id, collection.name)
                }
                className="text-sm text-warm-green font-medium hover:underline transition-colors"
              >
                View Properties
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
