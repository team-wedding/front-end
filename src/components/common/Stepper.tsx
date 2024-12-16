import React from "react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center bg-white p-4 rounded-lg">
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;

        return (
          <React.Fragment key={index}>
            {/* Step Indicator */}
            <div className="flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                  isActive
                    ? "text-pinkCustom border border-pinkCustom"
                    : isCompleted
                    ? "bg-gray-200 text-gray-400"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`ml-2 font-semibold ${
                  isActive ? "text-pinkCustom" : "text-gray-400"
                }`}
              >
                {step}
              </div>
            </div>

            {/* Divider */}
            {index < steps.length - 1 && (
              <div className="flex-grow h-px bg-gray-300 mx-2"></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
