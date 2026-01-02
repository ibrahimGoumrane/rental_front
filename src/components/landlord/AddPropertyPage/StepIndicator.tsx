import { Check } from "lucide-react";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { ADD_STEPS } from "@/lib/constants/pages/AddPropertyPage";

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm mb-8"
    >
      <div className="flex items-center justify-between">
        {ADD_STEPS.map((step, index) => (
          <Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  currentStep > step.id
                    ? "bg-warm-green text-white"
                    : currentStep === step.id
                    ? "bg-warm-green text-white ring-4 ring-warm-green/20"
                    : "bg-sand text-charcoal/40"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <step.icon className="w-6 h-6" />
                )}
              </div>
              <span
                className={`text-xs mt-2 font-medium ${
                  currentStep >= step.id ? "text-charcoal" : "text-charcoal/40"
                }`}
              >
                {step.name}
              </span>
            </div>
            {index < ADD_STEPS.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                  currentStep > step.id ? "bg-warm-green" : "bg-sand"
                }`}
              />
            )}
          </Fragment>
        ))}
      </div>
    </motion.div>
  );
}
