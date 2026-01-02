import type { SettingsSection } from "@/lib/types/client";

interface SettingsSidebarProps {
  sections: SettingsSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function SettingsSidebar({
  sections,
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-2 sticky top-24">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
            activeSection === section.id
              ? "bg-warm-green text-white shadow-sm"
              : "text-charcoal hover:bg-sand"
          }`}
        >
          <section.icon className="w-5 h-5" />
          <span className="font-medium">{section.label}</span>
        </button>
      ))}
    </div>
  );
}
