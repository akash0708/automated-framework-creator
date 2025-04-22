import React from 'react';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import { Framework } from '../../../types/framework';

interface StepFrameworkProps {
  frameworkData: Framework;
  updateFrameworkData: (data: Partial<Framework>) => void;
}

const StepFramework: React.FC<StepFrameworkProps> = ({ 
  frameworkData, 
  updateFrameworkData 
}) => {
  return (
    <div className="space-y-6 animate-slide-in">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Framework Information
        </h3>
        <p className="text-muted-foreground mt-1">
          Provide basic details about the framework you're creating.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Framework Name"
          value={frameworkData.name}
          onChange={(e) => updateFrameworkData({ name: e.target.value })}
          placeholder="e.g., Mathematics Framework"
          hint="Name should be descriptive and unique"
          required
        />

        <Input
          label="Framework Code"
          value={frameworkData.code}
          onChange={(e) => updateFrameworkData({ code: e.target.value })}
          placeholder="e.g., math_framework"
          hint="Code must be unique and use underscores"
          required
        />
      </div>

      <Textarea
        label="Description"
        value={frameworkData.description || ''}
        onChange={(e) => updateFrameworkData({ description: e.target.value })}
        placeholder="Describe the purpose and scope of this framework"
        rows={4}
      />
    </div>
  );
};

export default StepFramework;