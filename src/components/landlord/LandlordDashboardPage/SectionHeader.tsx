import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  description: string;
  viewAllLink: string;
  viewAllText?: string;
}

export function SectionHeader({
  title,
  description,
  viewAllLink,
  viewAllText = "View all",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="font-serif text-4xl text-charcoal mb-2">{title}</h2>
        <p className="text-charcoal/60">{description}</p>
      </div>
      <Link
        to={viewAllLink}
        className="flex items-center space-x-2 text-warm-green hover:text-warm-green/80 transition-colors font-medium"
      >
        <span>{viewAllText}</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
