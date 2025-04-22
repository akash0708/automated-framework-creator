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
import { FrameworkFormData, Category, Term } from '../../types/framework';
import StepFramework from './steps/StepFramework';
import StepCategories from './steps/StepCategories';
import StepTerms from './steps/StepTerms';
import StepAssociations from './steps/StepAssociations';
import StepReview from './steps/StepReview';
import StepPublish from './steps/StepPublish';
import { simulateApiCall } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

const INITIAL_FORM_DATA: FrameworkFormData = {
  framework: {
    name: '',
    code: '',
    channels: [{ identifier: 'in.ekstep' }],
    description: '',
    status: 'draft'
  },
  categories: [],
  step: 1
};

const steps = [
  { number: 1, title: 'Framework', icon: <FileCheck size={16} /> },
  { number: 2, title: 'Categories', icon: <ListPlus size={16} /> },
  { number: 3, title: 'Terms', icon: <ListTree size={16} /> },
  { number: 4, title: 'Associations', icon: <Edit3 size={16} /> },
  { number: 5, title: 'Review', icon: <Eye size={16} /> },
  { number: 6, title: 'Publish', icon: <Send size={16} /> }
];

const CreateFramework: React.FC = () => {
  const [formData, setFormData] = useState<FrameworkFormData>(INITIAL_FORM_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call based on current step
      switch(formData.step) {
        case 1:
          await simulateApiCall('/framework/v1/create', 'POST', {
            request: { framework: formData.framework }
          });
          break;
        case 2:
          if (formData.categories.length > 0) {
            for (const category of formData.categories) {
              await simulateApiCall('/framework/v1/category/create', 'POST', {
                request: { category }
              });
            }
          }
          break;
        case 3:
          // Term creation would happen here
          break;
        case 4:
          // Associations would be updated here
          break;
        case 5:
          // Nothing to submit on review step
          break;
        case 6:
          await simulateApiCall('/framework/v1/publish', 'POST', {});
          // After successful publish, redirect to frameworks list
          navigate('/frameworks');
          return;
      }
      
      // Move to next step if not the final step
      if (formData.step < steps.length) {
        setFormData(prev => ({ ...prev, step: prev.step + 1 }));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (formData.step > 1) {
      setFormData(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const updateFrameworkData = (frameworkData: any) => {
    setFormData(prev => ({
      ...prev,
      framework: {
        ...prev.framework,
        ...frameworkData
      }
    }));
  };

  const updateCategories = (categories: Category[]) => {
    setFormData(prev => ({
      ...prev,
      categories
    }));
  };

  const setCurrentCategory = (category: Category) => {
    setFormData(prev => ({
      ...prev,
      currentCategory: category
    }));
  };

  const addTermToCategory = (categoryIndex: number, term: Term) => {
    setFormData(prev => {
      const updatedCategories = [...prev.categories];
      
      if (!updatedCategories[categoryIndex].terms) {
        updatedCategories[categoryIndex].terms = [];
      }
      
      updatedCategories[categoryIndex].terms?.push(term);
      
      return {
        ...prev,
        categories: updatedCategories
      };
    });
  };

  const updateTermAssociations = (
    categoryIndex: number, 
    termIndex: number, 
    associationsWith: string[]
  ) => {
    setFormData(prev => {
      const updatedCategories = [...prev.categories];
      const terms = updatedCategories[categoryIndex].terms || [];
      
      if (terms[termIndex]) {
        terms[termIndex] = {
          ...terms[termIndex],
          associationsWith
        };
      }
      
      return {
        ...prev,
        categories: updatedCategories
      };
    });
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
          {steps.map((step, i) => (
            <div 
              key={step.number}
              className={`step-item ${formData.step === step.number ? 'active' : ''} ${formData.step > step.number ? 'complete' : ''}`}
            >
              <div 
                className={`step ${formData.step === step.number ? 'active' : ''} ${formData.step > step.number ? 'complete' : ''}`}
              >
                {formData.step > step.number ? (
                  <CheckCircle size={16} />
                ) : (
                  step.number
                )}
              </div>
              <p className="text-xs font-medium mt-1">
                {step.title}
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
              {steps[formData.step - 1].icon}
            </span>
            Step {formData.step}: {steps[formData.step - 1].title}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {formData.step === 1 && (
            <StepFramework 
              frameworkData={formData.framework}
              updateFrameworkData={updateFrameworkData}
            />
          )}
          
          {formData.step === 2 && (
            <StepCategories
              categories={formData.categories}
              updateCategories={updateCategories}
              setCurrentCategory={setCurrentCategory}
            />
          )}
          
          {formData.step === 3 && (
            <StepTerms
              categories={formData.categories}
              addTermToCategory={addTermToCategory}
            />
          )}
          
          {formData.step === 4 && (
            <StepAssociations
              categories={formData.categories}
              updateTermAssociations={updateTermAssociations}
            />
          )}
          
          {formData.step === 5 && (
            <StepReview
              formData={formData}
            />
          )}
          
          {formData.step === 6 && (
            <StepPublish
              formData={formData}
            />
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between border-t border-border pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={formData.step === 1 || isLoading}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            isLoading={isLoading}
            rightIcon={formData.step < steps.length ? <ArrowRight size={16} /> : undefined}
          >
            {formData.step < steps.length ? 'Continue' : 'Publish Framework'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateFramework;