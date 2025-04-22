import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FrameworkFormData } from '../../../types/framework';
import { Card, CardContent } from '../../../components/ui/Card';

interface StepPublishProps {
  formData: FrameworkFormData;
}

const StepPublish: React.FC<StepPublishProps> = ({ formData }) => {
  const { framework } = formData;

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Publish Framework
        </h3>
        <p className="text-muted-foreground mt-1">
          Your framework is ready to be published.
        </p>
      </div>

      <Card className="bg-emerald-50 border-emerald-200">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
          <h3 className="text-xl font-semibold text-emerald-800">
            Ready to Publish
          </h3>
          <p className="text-emerald-700 mt-2 max-w-lg">
            Your framework <strong>{framework.name}</strong> is complete and ready to be published.
            Once published, it will be available to all users of the platform.
          </p>
        </CardContent>
      </Card>

      <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
        <h4 className="font-medium">Framework Summary</h4>
        <ul className="mt-2 space-y-1 text-sm">
          <li><span className="font-medium">Name:</span> {framework.name}</li>
          <li><span className="font-medium">Code:</span> {framework.code}</li>
          <li><span className="font-medium">Categories:</span> {formData.categories.length}</li>
          <li>
            <span className="font-medium">Terms:</span> {
              formData.categories.reduce((count, category) => 
                count + (category.terms?.length || 0), 0
              )
            }
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StepPublish;