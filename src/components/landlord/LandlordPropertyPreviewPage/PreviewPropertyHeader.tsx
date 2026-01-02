import { PreviewActionsMenu } from "./PreviewActionsMenu";
import type { PreviewProperty } from "@/lib/types/landlord";

interface PreviewPropertyHeaderProps {
  property: PreviewProperty;
  isPublished: boolean;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onTogglePublish: () => void;
  onEdit: () => void;
}

export function PreviewPropertyHeader({
  property,
  isPublished,
  isMenuOpen,
  onToggleMenu,
  onTogglePublish,
  onEdit,
}: PreviewPropertyHeaderProps) {
  return (
    <div className="border-b border-charcoal/10 pb-8">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
            {property.title}
          </h2>
          <p className="text-charcoal/60">{property.location}</p>
        </div>

        {/* Actions Menu Dropdown */}
        <PreviewActionsMenu
          isPublished={isPublished}
          isOpen={isMenuOpen}
          onToggle={onToggleMenu}
          onTogglePublish={onTogglePublish}
          onEdit={onEdit}
        />
      </div>

      {/* Property Stats */}
      <div className="flex items-center space-x-4 text-charcoal/70 text-sm md:text-base">
        <span className="flex items-center">
          <span className="font-medium text-charcoal">{property.rating}</span>
          <span className="mx-1">·</span>
          <span className="underline cursor-pointer">
            {property.reviewCount} reviews
          </span>
        </span>
      </div>
    </div>
  );
}
