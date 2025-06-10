import React, { useState } from 'react';
import { 
  CheckCircle, 
  ChevronRight,
  ArrowLeft, 
  ArrowRight, 
  FileCheck, 
  ListPlus, 
  ListTree, 
  Edit3, 
  Eye,
  Send
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import StepChannel from './steps/StepChannel';
import StepFramework from './steps/StepFramework';
import StepCategories from './steps/StepCategories';
import StepTerms from './steps/StepTerms';
import StepAssociations from './steps/StepAssociations';
import StepReview from './steps/StepReview';
import StepPublish from './steps/StepPublish';
import { simulateApiCall } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useFrameworkFormStore } from '../../store/frameworkFormStore';

const steps = [
  { number: 1, title: 'Channel', icon: <FileCheck size={16} /> },
  { number: 2, title: 'Framework', icon: <FileCheck size={16} /> },
  { number: 3, title: 'Categories', icon: <ListPlus size={16} /> },
  { number: 4, title: 'Terms', icon: <ListTree size={16} /> },
  { number: 5, title: 'Associations', icon: <Edit3 size={16} /> },
  { number: 6, title: 'Review', icon: <Eye size={16} /> },
  { number: 7, title: 'Publish', icon: <Send size={16} /> }
];

const CreateFramework: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { framework, categories, step, setStep, reset, channel } = useFrameworkFormStore();

  const handleNext = async () => {
    setIsLoading(true);
    try {
      switch (step) {
        case 1:
          // Channel selection step, nothing to submit
          break;
        case 2:
          await simulateApiCall('/framework/v1/create', 'POST', { request: { framework } });
          break;
        case 3:
          if (categories.length > 0) {
            for (const category of categories) {
              await simulateApiCall('/framework/v1/category/create', 'POST', { request: { category } });
            }
          }
          break;
        case 4:
          // Term creation would happen here
          break;
        case 5:
          // Associations would be updated here
          break;
        case 6:
          // Nothing to submit on review step
          break;
        case 7:
          await simulateApiCall('/framework/v1/publish', 'POST', {});
          navigate('/frameworks');
          return;
      }
      if (step < steps.length) setStep(step + 1);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Framework</h1>
        <p className="text-muted-foreground">
          Follow the steps to create a new educational framework
        </p>
      </div>

      <div className="flex justify-between items-center py-4 overflow-x-auto">
        <div className="flex items-center">
          {steps.map((stepObj, i) => (
            <div 
              key={stepObj.number}
              className={`step-item ${step === stepObj.number ? 'active' : ''} ${step > stepObj.number ? 'complete' : ''}`}
            >
              <div 
                className={`step ${step === stepObj.number ? 'active' : ''} ${step > stepObj.number ? 'complete' : ''}`}
              >
                {step > stepObj.number ? (
                  <CheckCircle size={16} />
                ) : (
                  stepObj.number
                )}
              </div>
              <p className="text-xs font-medium mt-1">
                {stepObj.title}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute -right-3 top-1/3 transform -translate-y-1/2">
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="p-2 rounded-full bg-indigo-50 text-indigo-600 mr-3">
              {steps[step - 1].icon}
            </span>
            Step {step}: {steps[step - 1].title}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {step === 1 && <StepChannel />}
          {step === 2 && <StepFramework />}
          {step === 3 && <StepCategories />}
          {step === 4 && <StepTerms />}
          {step === 5 && <StepAssociations />}
          {step === 6 && <StepReview />}
          {step === 7 && <StepPublish />}
        </CardContent>
        
        <CardFooter className="flex justify-between border-t border-border pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1 || isLoading}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            isLoading={isLoading}
            rightIcon={step < steps.length ? <ArrowRight size={16} /> : undefined}
            disabled={(step === 1 && !channel?.code) || isLoading}
          >
            {step < steps.length ? 'Continue' : 'Publish Framework'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateFramework;