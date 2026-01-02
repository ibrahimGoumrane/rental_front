import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { ADD_STEPS } from "@/lib/constants/pages/AddPropertyPage";

interface NavigationButtonsProps {
  currentStep: number;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function NavigationButtons({
  currentStep,
  canProceed,
  onBack,
  onNext,
  onSubmit,
}: NavigationButtonsProps) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onBack}
        disabled={currentStep === 1}
        className="flex items-center space-x-2 px-6 py-3 border border-charcoal/20 rounded-lg hover:border-charcoal/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {currentStep < ADD_STEPS.length ? (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center space-x-2 px-8 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-warm-green/20"
        >
          <span>Continue</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={onSubmit}
          className="flex items-center space-x-2 px-8 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors shadow-lg shadow-warm-green/20"
        >
          <Check className="w-5 h-5" />
          <span>Publish Property</span>
        </button>
      )}
    </div>
  );
}
