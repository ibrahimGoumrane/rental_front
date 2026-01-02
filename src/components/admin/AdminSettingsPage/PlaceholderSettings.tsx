import { Settings } from "lucide-react";

interface PlaceholderSettingsProps {
  label: string;
}

export function PlaceholderSettings({ label }: PlaceholderSettingsProps) {
  return (
    <div className="bg-white rounded-2xl p-12 border border-charcoal/5 shadow-sm text-center">
      <Settings className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
      <h3 className="font-serif text-2xl text-charcoal mb-2">{label}</h3>
      <p className="text-charcoal/60">
        Configuration options for this section will be displayed here.
      </p>
    </div>
  );
}
