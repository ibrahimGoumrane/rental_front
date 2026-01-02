import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ADD_HOUSE_RULE_GROUPS } from "@/lib/constants/pages/AddPropertyPage";

interface HouseRulesSelectorProps {
  selectedRules: Record<string, boolean>;
  expandedGroups: string[];
  onToggleGroup: (groupId: string) => void;
  onToggleRule: (ruleId: string) => void;
}

export function HouseRulesSelector({
  selectedRules,
  expandedGroups,
  onToggleGroup,
  onToggleRule,
}: HouseRulesSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal/80 mb-4">
        House Rules
      </label>
      <div className="space-y-4">
        {ADD_HOUSE_RULE_GROUPS.map((group) => (
          <div
            key={group.id}
            className="border border-charcoal/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => onToggleGroup(group.id)}
              className="w-full flex items-center justify-between p-4 bg-sand/20 hover:bg-sand/40 transition-colors"
            >
              <span className="font-medium text-charcoal">{group.title}</span>
              <ChevronDown
                className={`w-5 h-5 text-charcoal/60 transition-transform duration-300 ${
                  expandedGroups.includes(group.id) ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {expandedGroups.includes(group.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 space-y-3 bg-white">
                    {group.rules.map((rule) => (
                      <label
                        key={rule.id}
                        className="flex items-start space-x-3 p-2 hover:bg-charcoal/5 rounded-lg transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={!!selectedRules[rule.id]}
                          onChange={() => onToggleRule(rule.id)}
                          className="mt-1 w-5 h-5 accent-warm-green flex-shrink-0"
                        />
                        <span className="text-charcoal/80 text-sm">
                          {rule.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
