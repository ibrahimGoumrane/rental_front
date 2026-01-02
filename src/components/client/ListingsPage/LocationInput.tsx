import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
}

export function LocationInput({
  value,
  onChange,
  suggestions,
}: LocationInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex-1 w-full relative group" ref={ref}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold">
        <MapPin className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Where would you like to go?"
        className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-charcoal placeholder:text-charcoal/40 font-serif text-lg focus:bg-cream/30 transition-colors rounded-lg"
      />
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-charcoal/10 overflow-hidden z-30"
          >
            {suggestions.map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  onChange(loc);
                  setShowSuggestions(false);
                }}
                className="w-full text-left px-6 py-3 hover:bg-cream transition-colors flex items-center gap-3 text-charcoal"
              >
                <MapPin className="w-4 h-4 text-gold" />
                {loc}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
