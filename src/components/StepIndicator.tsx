import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="text-sm font-medium text-gray-500 mb-4">
      STEP {currentStep} OF {totalSteps}
    </div>
  );
};

export default StepIndicator;