import type { StatusChip } from "@/lib/types/client";

interface StatusChipsProps {
  chips: StatusChip[];
  active: string;
  onSelect: (id: string) => void;
}

export function StatusChips({ chips, active, onSelect }: StatusChipsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {chips.map((chip) => (
        <button
          key={chip.id}
          onClick={() => onSelect(chip.id)}
          className={`px-4 py-2 rounded-full border-2 transition-all font-medium text-sm ${
            active === chip.id
              ? "bg-warm-green text-white border-warm-green shadow-sm"
              : "bg-white text-charcoal border-charcoal/20 hover:border-warm-green"
          }`}
        >
          {chip.label}
          <span
            className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              active === chip.id ? "bg-white/20" : "bg-charcoal/10"
            }`}
          >
            {chip.count}
          </span>
        </button>
      ))}
    </div>
  );
}
