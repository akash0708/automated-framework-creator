import React from 'react';
import { useFrameworkFormStore } from '../../../store/frameworkFormStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';

const StepReview: React.FC = () => {
  const framework = useFrameworkFormStore((state) => state.framework);
  const categories = useFrameworkFormStore((state) => state.categories);

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Review Information
        </h3>
        <p className="text-muted-foreground mt-1">
          Review all the information before publishing the framework.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="bg-slate-50">
          <CardTitle className="text-lg">Framework Details</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="font-medium">{framework.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Code</p>
              <p className="font-medium">{framework.code}</p>
            </div>
            {framework.description && (
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p>{framework.description}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {categories.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader className="bg-slate-50">
            <CardTitle className="text-lg">Categories ({categories.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-6">
              {categories.map((category, index) => (
                <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-medium mb-2">{category.name}</h4>
                    <span className="text-sm text-muted-foreground">Code: {category.code}</span>
                  </div>
                  
                  {category.description && (
                    <p className="text-sm mb-3">{category.description}</p>
                  )}
                  
                  {category.terms && category.terms.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2">Terms ({category.terms.length})</p>
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {category.terms.map((term, tIndex) => (
                          <div key={tIndex} className="border border-border rounded-md p-2">
                            <p className="font-medium text-sm">{term.name}</p>
                            <p className="text-xs text-muted-foreground">Code: {term.code}</p>
                            {term.associationsWith && term.associationsWith.length > 0 && (
                              <div className="mt-1">
                                <p className="text-xs font-medium">Associations</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {term.associationsWith.map((assoc, aIndex) => (
                                    <span 
                                      key={aIndex}
                                      className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800"
                                    >
                                      {assoc}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="p-4 rounded-md bg-amber-50 text-amber-800">
        <p className="font-medium">Important Note</p>
        <p className="mt-1 text-sm">
          Please review all information carefully. After publishing, certain properties cannot be modified without creating a new version.
        </p>
      </div>
    </div>
  );
};

export default StepReview;