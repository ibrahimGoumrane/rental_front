interface ProgressIndicatorProps {
  progress: number; // 0-100
}

export function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  return (
    <div className="h-1 w-full bg-sand">
      <div
        className="h-full bg-warm-green transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
