import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import StepIndicator from './StepIndicator';
import { useToast } from '@/components/ui/use-toast';

const TOTAL_STEPS = 7;

const DiscoveryForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    situation: '',
    fulfillment: 5,
    dream: '',
    ageRange: '',
    reason: '',
  });
  const { toast } = useToast();

  const handleAreaSelect = (area: string) => {
    setSelectedAreas(prev => {
      if (prev.includes(area)) {
        return prev.filter(a => a !== area);
      } else {
        return [...prev, area];
      }
    });
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      if (currentStep > 1) {
        toast({
          title: "Progress saved!",
          description: `Step ${currentStep} completed successfully.`,
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="question-text">
              What areas of your life do you want to focus on?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Mindset', 'Wealth', 'Health', 'Relationships', 'Business', 'Leadership', 'Happiness'].map((area) => (
                <button
                  key={area}
                  className={`option-button ${selectedAreas.includes(area) ? 'selected' : ''}`}
                  onClick={() => handleAreaSelect(area)}
                  type="button"
                  aria-pressed={selectedAreas.includes(area)}
                >
                  {area}
                </button>
              ))}
            </div>
          </>
        );
      // Additional steps will be implemented here
      default:
        return <div>Step {currentStep} content coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="form-container animate-fadeIn">
        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        
        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-4">
            DISCOVERY CALL WITH RESK&apos;QUE
          </h1>
          <h2 className="text-xl mb-6">
            WHAT&apos;S YOUR CONCEPT? LET&apos;S TALK!
          </h2>
          <p className="text-gray-600">
            Thank you for taking the first step toward transformation! This short questionnaire 
            will help us better understand your unique situation so that Resk&apos;Que can 
            provide tailored guidance during your discovery call.
          </p>
        </div>

        <div className="mb-8">
          {renderStep()}
        </div>

        <div className="flex justify-between mt-12">
          {currentStep > 1 && (
            <button 
              onClick={handlePrevious}
              className="form-button"
            >
              Previous
            </button>
          )}
          <button 
            onClick={handleNext}
            className="form-button ml-auto"
            disabled={selectedAreas.length === 0}
          >
            Next step
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryForm;