interface CheckInOutTimesProps {
  checkInTime: string;
  checkOutTime: string;
  onTimeChange: (field: string, value: string) => void;
}

export function CheckInOutTimes({
  checkInTime,
  checkOutTime,
  onTimeChange,
}: CheckInOutTimesProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-charcoal/80 mb-2">
          Check-in Time
        </label>
        <input
          type="time"
          value={checkInTime}
          onChange={(e) => onTimeChange("checkInTime", e.target.value)}
          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal/80 mb-2">
          Check-out Time
        </label>
        <input
          type="time"
          value={checkOutTime}
          onChange={(e) => onTimeChange("checkOutTime", e.target.value)}
          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
        />
      </div>
    </div>
  );
}
