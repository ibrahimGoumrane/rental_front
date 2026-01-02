import { Star } from "lucide-react";

interface PropertyHeaderProps {
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
}

export function PropertyHeader({
  title,
  location,
  rating,
  reviewCount,
}: PropertyHeaderProps) {
  return (
    <div className="border-b border-charcoal/10 pb-8 mb-10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
            {title}
          </h2>
          <p className="text-charcoal/60">{location}</p>
        </div>
      </div>

      {/* Property Stats */}
      <div className="flex items-center space-x-4 text-charcoal/70 text-sm md:text-base">
        <span className="flex items-center">
          <Star className="w-4 h-4 text-terracotta mr-1 fill-current" />
          <span className="font-medium text-charcoal">{rating}</span>
          <span className="mx-1">·</span>
          <span className="underline cursor-pointer">
            {reviewCount} reviews
          </span>
        </span>
      </div>
    </div>
  );
}
