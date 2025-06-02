import React from 'react';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import { useFrameworkFormStore } from '../../../store/frameworkFormStore';

const StepFramework: React.FC = () => {
  const framework = useFrameworkFormStore((state) => state.framework);
  const setFramework = useFrameworkFormStore((state) => state.setFramework);

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
          value={framework.name}
          onChange={(e) => setFramework({ name: e.target.value })}
          placeholder="e.g., Mathematics Framework"
          hint="Name should be descriptive and unique"
          required
        />

        <Input
          label="Framework Code"
          value={framework.code}
          onChange={(e) => setFramework({ code: e.target.value })}
          placeholder="e.g., math_framework"
          hint="Code must be unique and use underscores"
          required
        />
      </div>

      <Textarea
        label="Description"
        value={framework.description || ''}
        onChange={(e) => setFramework({ description: e.target.value })}
        placeholder="Describe the purpose and scope of this framework"
        rows={4}
      />
    </div>
  );
};

export default StepFramework;