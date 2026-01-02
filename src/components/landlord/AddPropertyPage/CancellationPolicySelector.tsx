interface CancellationPolicySelectorProps {
  selectedPolicy: string;
  onPolicyChange: (policy: string) => void;
}

const POLICIES = [
  {
    value: "flexible",
    label: "Flexible",
    desc: "Full refund 24 hours before check-in",
  },
  {
    value: "moderate",
    label: "Moderate",
    desc: "Full refund 5 days before check-in",
  },
  {
    value: "strict",
    label: "Strict",
    desc: "50% refund 7 days before check-in",
  },
];

export function CancellationPolicySelector({
  selectedPolicy,
  onPolicyChange,
}: CancellationPolicySelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal/80 mb-4">
        Cancellation Policy
      </label>
      <div className="space-y-3">
        {POLICIES.map((policy) => (
          <label
            key={policy.value}
            className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedPolicy === policy.value
                ? "border-warm-green bg-warm-green/5"
                : "border-charcoal/20 hover:border-charcoal/40"
            }`}
          >
            <input
              type="radio"
              name="cancellation"
              value={policy.value}
              checked={selectedPolicy === policy.value}
              onChange={(e) => onPolicyChange(e.target.value)}
              className="mt-1 w-5 h-5 accent-warm-green"
            />
            <div>
              <p className="font-medium">{policy.label}</p>
              <p className="text-sm text-charcoal/60">{policy.desc}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
