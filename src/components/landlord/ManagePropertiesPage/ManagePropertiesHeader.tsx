import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface ManagePropertiesHeaderProps {
  totalProperties: number;
}

export function ManagePropertiesHeader({
  totalProperties,
}: ManagePropertiesHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-12"
    >
      <div>
        <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
          Your Properties
        </h1>
        <p className="text-xl text-charcoal/70 font-light">
          Manage your portfolio of {totalProperties} beautiful spaces
        </p>
      </div>
      <Link
        to="/landlord/properties/new"
        className="flex items-center space-x-2 px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-all shadow-lg shadow-warm-green/20 hover:-translate-y-1"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add Property</span>
      </Link>
    </motion.div>
  );
}
