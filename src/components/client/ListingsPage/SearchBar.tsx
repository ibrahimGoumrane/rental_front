import { Search } from "lucide-react";
import { LocationInput } from "./LocationInput";
import { DateInputs } from "./DateInputs";

interface SearchBarProps {
  locationQuery: string;
  onLocationChange: (value: string) => void;
  locationSuggestions: string[];
  checkInDate: string;
  checkOutDate: string;
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
  dateError: string;
  onSearch: () => void;
}

export function SearchBar({
  locationQuery,
  onLocationChange,
  locationSuggestions,
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
  dateError,
  onSearch,
}: SearchBarProps) {
  return (
    <div className="bg-white p-2 rounded-xl shadow-xl shadow-charcoal/5 flex flex-col lg:flex-row items-start lg:items-center gap-2 mb-8 border border-charcoal/5 relative z-20">
      {/* Location Input */}
      <LocationInput
        value={locationQuery}
        onChange={onLocationChange}
        suggestions={locationSuggestions}
      />

      <div className="w-px h-10 bg-charcoal/10 hidden lg:block" />

      {/* Date Inputs */}
      <DateInputs
        checkIn={checkInDate}
        checkOut={checkOutDate}
        onCheckInChange={onCheckInChange}
        onCheckOutChange={onCheckOutChange}
        error={dateError}
      />

      <button
        onClick={onSearch}
        className="w-full lg:w-auto bg-charcoal text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-2 rounded-lg"
      >
        <Search className="w-4 h-4" />
        <span>Search</span>
      </button>
    </div>
  );
}
