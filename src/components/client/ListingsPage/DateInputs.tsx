import { Calendar } from "lucide-react";
interface DateInputsProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  error: string;
}

export function DateInputs({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  error,
}: DateInputsProps) {
  return (
    <div className="flex-1 w-full flex flex-col sm:flex-row gap-2 relative group">
      <div className="flex-1 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none">
          <Calendar className="w-5 h-5" />
        </div>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => onCheckInChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-charcoal placeholder:text-charcoal/40 font-serif text-lg focus:bg-cream/30 transition-colors rounded-lg appearance-none cursor-pointer"
        />
        <span className="absolute left-12 top-2 text-xs text-charcoal/40 font-sans pointer-events-none">
          Check-in
        </span>
      </div>
      <div className="w-px h-10 bg-charcoal/10 hidden sm:block self-center" />
      <div className="flex-1 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none">
          <Calendar className="w-5 h-5" />
        </div>
        <input
          type="date"
          value={checkOut}
          min={checkIn}
          onChange={(e) => onCheckOutChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-charcoal placeholder:text-charcoal/40 font-serif text-lg focus:bg-cream/30 transition-colors rounded-lg appearance-none cursor-pointer"
        />
        <span className="absolute left-12 top-2 text-xs text-charcoal/40 font-sans pointer-events-none">
          Check-out
        </span>
      </div>

      {error && (
        <div className="absolute -bottom-6 left-0 text-red-500 text-xs font-medium">
          {error}
        </div>
      )}
    </div>
  );
}
