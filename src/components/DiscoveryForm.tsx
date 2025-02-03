import { Toaster } from "@/components/ui/toaster";
import { useState } from 'react';
import ProgressBar from './ProgressBar';
import StepIndicator from './StepIndicator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from "@/hooks/use-toast";

const TOTAL_STEPS = 7;

const DiscoveryForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    situation: '',
    fulfillment: 5,
    dream: '',
    changeDesire: '',
    ageRange: '',
    reason: '',
    otherReason: '',
    
    // Step 2
    businessDescription: '',
    businessDuration: '',
    businessChallenges: '',
    revenueGoals: '',
    confidenceLevel: 5,
    biggestWin: '',
    lifeStatus: '',
    challengingAreas: '',
    currentFeeling: '',

    // Step 3
    successVision: '',
    focusArea: '',
    hadCoach: '',
    coachExperience: '',
    noCoachReason: '',

    // Step 4
    biggestObstacle: '',
    obstacleConfidence: '',
    uncertaintyReason: '',
    biggestFrustration: '',
    limitingBeliefs: '',
    previousAttempts: '',
    inspiration: '',

    // Step 5
    supportType: '',
    guidancePreference: '',
    commitmentLevel: 5,
    openToOptions: false,
    investmentApproach: '',

    // Step 6
    preferredDate: '',
    generalAvailability: '',

    // Step 7
    additionalInfo: '',
    timeZone: '',
    aiCallPreference: '',
    aiCallDuration: '',
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'bcdce293-887c-4f5f-b654-aaf23118eceb',
          subject: `Discovery Call Request from ${formData.name}`,
          from_name: formData.name,
          to_email: 'thee.lifeguide+discoverycall@gmail.com',
          message: JSON.stringify(formData, null, 2),
          ...formData
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Thank you for your submission!",
          description: "Thank you for sharing your thoughts and insights! We truly appreciate your honesty and openness. Based on your responses, we'll prepare personalized recommendations for your upcoming discovery call with Resk'Que. An AI assistant will contact you within the next few minutes to confirm your information and answer any immediate questions you might have. This will also help us prepare for your scheduled discovery call with Resk'Que. We look forward to connecting with you soon!",
          duration: 10000,
          className: "bg-green-50 border-green-200",
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="question-text">About You & Your Dreams</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">What's your name?</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <Label htmlFor="situation">What's your current situation?</Label>
                <Input
                  id="situation"
                  placeholder="e.g., employed, entrepreneur, student, etc."
                  value={formData.situation}
                  onChange={(e) => handleInputChange('situation', e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <Label>How fulfilled are you in your current situation?</Label>
                <Slider
                  value={[formData.fulfillment]}
                  onValueChange={(value) => handleInputChange('fulfillment', value[0])}
                  max={10}
                  step={1}
                  className="mt-2"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {formData.fulfillment}/10
                </div>
              </div>

              <div>
                <Label htmlFor="dream">What's your biggest dream or aspiration right now?</Label>
                <Textarea
                  id="dream"
                  placeholder="Be as specific as possible!"
                  value={formData.dream}
                  onChange={(e) => handleInputChange('dream', e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <Label htmlFor="changeDesire">What's the one thing you'd change about your life or career if you could?</Label>
                <Textarea
                  id="changeDesire"
                  value={formData.changeDesire}
                  onChange={(e) => handleInputChange('changeDesire', e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <Label>Select your age range</Label>
                <RadioGroup
                  value={formData.ageRange}
                  onValueChange={(value) => handleInputChange('ageRange', value)}
                  className="grid grid-cols-2 gap-4 mt-2"
                >
                  {['14-25', '26-39', '40-55', '56-71', '72+'].map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <RadioGroupItem value={range} id={range} />
                      <Label htmlFor={range}>{range}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="question-text">Your Business/Career</h2>
            {formData.situation.toLowerCase().includes('entrepreneur') || 
             formData.situation.toLowerCase().includes('business') ? (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="businessDescription">Tell us about your business/career. What do you do?</Label>
                  <Textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <Label>How would you describe where you are right now in life?</Label>
                  <RadioGroup
                    value={formData.lifeStatus}
                    onValueChange={(value) => handleInputChange('lifeStatus', value)}
                    className="space-y-2 mt-2"
                  >
                    {[
                      'Feeling stuck or overwhelmed',
                      'On the verge of a breakthrough but need clarity',
                      'Doing well but wanting to level up',
                      'Rebuilding after a major setback',
                      'Exploring new possibilities'
                    ].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <RadioGroupItem value={status} id={status} />
                        <Label htmlFor={status}>{status}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            ) : (
              <div>
                <Label>How would you describe where you are right now in life?</Label>
                <RadioGroup
                  value={formData.lifeStatus}
                  onValueChange={(value) => handleInputChange('lifeStatus', value)}
                  className="space-y-2 mt-2"
                >
                  {[
                    'Feeling stuck or overwhelmed',
                    'On the verge of a breakthrough but need clarity',
                    'Doing well but wanting to level up',
                    'Rebuilding after a major setback',
                    'Exploring new possibilities'
                  ].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <RadioGroupItem value={status} id={status} />
                      <Label htmlFor={status}>{status}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </>
        );

      case 3:
        return (
          <>
            <h2 className="question-text">Goals and Aspirations</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="successVision">What does success look like for you in the next 6-12 months?</Label>
                <Textarea
                  id="successVision"
                  value={formData.successVision}
                  onChange={(e) => handleInputChange('successVision', e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <Label>Which of these areas do you want to focus on improving FIRST?</Label>
                <RadioGroup
                  value={formData.focusArea}
                  onValueChange={(value) => handleInputChange('focusArea', value)}
                  className="space-y-2 mt-2"
                >
                  {[
                    'Mindset & Confidence',
                    'Leadership Skills',
                    'Business Growth',
                    'Work-Life Balance',
                    'Relationships',
                    'Finances',
                    'Physical/Mental Health'
                  ].map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <RadioGroupItem value={area} id={area} />
                      <Label htmlFor={area}>{area}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h2 className="question-text">Challenges and Obstacles</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="biggestObstacle">What's holding you back from achieving your goals?</Label>
                <Textarea
                  id="biggestObstacle"
                  value={formData.biggestObstacle}
                  onChange={(e) => handleInputChange('biggestObstacle', e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <Label>How confident are you in overcoming these obstacles?</Label>
                <RadioGroup
                  value={formData.obstacleConfidence}
                  onValueChange={(value) => handleInputChange('obstacleConfidence', value)}
                  className="space-y-2 mt-2"
                >
                  {[
                    '1-3 (Not very confident)',
                    '4-6 (Somewhat confident)',
                    '7-10 (Very confident)'
                  ].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={level} />
                      <Label htmlFor={level}>{level}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <h2 className="question-text">Expectations and Preferences</h2>
            <div className="space-y-6">
              <div>
                <Label>What type of support would benefit you most?</Label>
                <RadioGroup
                  value={formData.supportType}
                  onValueChange={(value) => handleInputChange('supportType', value)}
                  className="space-y-2 mt-2"
                >
                  {[
                    'Accountability partner to keep me on track',
                    'Strategic advice to solve specific problems',
                    'Emotional support and encouragement',
                    'Guidance / Tools and frameworks I can implement myself',
                    'Ongoing Mentorship through my Journey',
                    'A combination of all the above'
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={type} />
                      <Label htmlFor={type}>{type}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label>How committed are you to achieving your goals?</Label>
                <Slider
                  value={[formData.commitmentLevel]}
                  onValueChange={(value) => handleInputChange('commitmentLevel', value[0])}
                  max={10}
                  step={1}
                  className="mt-2"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {formData.commitmentLevel}/10
                </div>
              </div>
            </div>
          </>
        );

      case 6:
        return (
          <>
            <h2 className="question-text">Scheduling Your Discovery Call</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="generalAvailability">If none of the listed times work for you, please indicate your general availability</Label>
                <Textarea
                  id="generalAvailability"
                  value={formData.generalAvailability}
                  onChange={(e) => handleInputChange('generalAvailability', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </>
        );

      case 7:
        return (
          <>
            <h2 className="question-text">Final Thoughts</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="additionalInfo">Is there anything else you'd like Resk'Que to know?</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <Label>Would you be open to a quick follow-up call with our AI assistant?</Label>
                <RadioGroup
                  value={formData.aiCallPreference}
                  onValueChange={(value) => handleInputChange('aiCallPreference', value)}
                  className="space-y-2 mt-2"
                >
                  {['Yes', 'No'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {formData.aiCallPreference === 'Yes' && (
                <div>
                  <Label>Preferred duration for AI assistant call</Label>
                  <RadioGroup
                    value={formData.aiCallDuration}
                    onValueChange={(value) => handleInputChange('aiCallDuration', value)}
                    className="space-y-2 mt-2"
                  >
                    {['Under 1 minute', '5 minutes', '15 minutes'].map((duration) => (
                      <div key={duration} className="flex items-center space-x-2">
                        <RadioGroupItem value={duration} id={duration} />
                        <Label htmlFor={duration}>{duration}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>
          </>
        );

      default:
        return <div>Step {currentStep} content coming soon...</div>;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.situation && formData.ageRange;
      case 2:
        return formData.lifeStatus;
      case 3:
        return formData.successVision && formData.focusArea;
      case 4:
        return formData.biggestObstacle && formData.obstacleConfidence;
      case 5:
        return formData.supportType;
      case 6:
        return true; // Allow proceeding even if availability is not specified
      case 7:
        return true; // Allow submission with optional final thoughts
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="form-container animate-fadeIn">
        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        
        {currentStep === 1 && (
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
        )}

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
          {currentStep === TOTAL_STEPS ? (
            <button 
              onClick={handleSubmit}
              className="form-button ml-auto"
              disabled={!isStepValid() || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="form-button ml-auto"
              disabled={!isStepValid()}
            >
              Next step
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoveryForm;