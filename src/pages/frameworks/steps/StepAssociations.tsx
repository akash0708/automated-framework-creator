import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Card, CardContent } from '../../../components/ui/Card';
import { Category, Term } from '../../../types/framework';

interface StepAssociationsProps {
  categories: Category[];
  updateTermAssociations: (
    categoryIndex: number,
    termIndex: number,
    associationsWith: Array<{ identifier: string }>
  ) => void;
}

const StepAssociations: React.FC<StepAssociationsProps> = ({
  categories,
  updateTermAssociations
}) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(
    categories.length > 0 ? 0 : null
  );
  const [selectedTermIndex, setSelectedTermIndex] = useState<number | null>(null);
  const [selectedAssociations, setSelectedAssociations] = useState<Array<{ identifier: string }>>([]);
  const [error, setError] = useState('');

  const handleCategoryChange = (value: string) => {
    const index = parseInt(value, 10);
    setSelectedCategoryIndex(index);
    setSelectedTermIndex(null);
    setSelectedAssociations([]);
  };

  const handleTermChange = (value: string) => {
    const index = parseInt(value, 10);
    setSelectedTermIndex(index);
    
    // Load existing associations if any
    if (selectedCategoryIndex !== null) {
      const category = categories[selectedCategoryIndex];
      const term = category.terms?.[index];
      if (term && term.associationsWith) {
        // Transform string array to required format
        setSelectedAssociations(term.associationsWith.map(id => ({ identifier: id })));
      } else {
        setSelectedAssociations([]);
      }
    }
  };

  const handleAssociationToggle = (termId: string) => {
    setSelectedAssociations(prev => {
      const identifier = { identifier: termId };
      if (prev.some(assoc => assoc.identifier === termId)) {
        return prev.filter(assoc => assoc.identifier !== termId);
      } else {
        return [...prev, identifier];
      }
    });
  };

  const handleSaveAssociations = () => {
    if (selectedCategoryIndex === null || selectedTermIndex === null) {
      setError('Please select a category and term');
      return;
    }

    updateTermAssociations(
      selectedCategoryIndex,
      selectedTermIndex,
      selectedAssociations
    );

    setError('');
  };

  // Get all terms from other categories
  const getOtherCategoryTerms = () => {
    if (selectedCategoryIndex === null) return [];

    const result: { category: Category; term: Term; id: string }[] = [];

    categories.forEach((category, catIndex) => {
      if (catIndex !== selectedCategoryIndex && category.terms) {
        category.terms.forEach(term => {
          result.push({
            category,
            term,
            id: `${category.code}:${term.code}`
          });
        });
      }
    });

    return result;
  };

  const selectedCategory = selectedCategoryIndex !== null ? categories[selectedCategoryIndex] : null;
  const selectedTerm = selectedCategory && selectedTermIndex !== null 
    ? selectedCategory.terms?.[selectedTermIndex] 
    : null;
  const otherTerms = getOtherCategoryTerms();

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Term Associations
        </h3>
        <p className="text-muted-foreground mt-1">
          Create associations between terms from different categories. This is optional.
        </p>
      </div>

      {categories.length === 0 || categories.every(cat => !cat.terms || cat.terms.length === 0) ? (
        <div className="p-4 rounded-md bg-amber-50 text-amber-800 flex items-center">
          <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
          <span>You need to create terms in multiple categories before creating associations.</span>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            <Select
              label="Select Category"
              options={categories.map((category, index) => ({
                value: index.toString(),
                label: category.name
              }))}
              value={selectedCategoryIndex !== null ? selectedCategoryIndex.toString() : ''}
              onChange={handleCategoryChange}
              required
            />

            <Select
              label="Select Term"
              options={(selectedCategory?.terms || []).map((term, index) => ({
                value: index.toString(),
                label: term.name
              }))}
              value={selectedTermIndex !== null ? selectedTermIndex.toString() : ''}
              onChange={handleTermChange}
              disabled={selectedCategoryIndex === null || !selectedCategory?.terms?.length}
              required
            />
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-800 flex items-center">
              <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {selectedTerm && otherTerms.length > 0 ? (
            <>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">
                  Associate "{selectedTerm.name}" with terms from other categories
                </h3>
                <div className="space-y-3">
                  {otherTerms.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`term-${index}`}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedAssociations.some(assoc => assoc.identifier === item.id)}
                        onChange={() => handleAssociationToggle(item.id)}
                      />
                      <label htmlFor={`term-${index}`} className="ml-2 block text-sm text-gray-900">
                        {item.term.name} <span className="text-gray-500">({item.category.name})</span>
                      </label>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleSaveAssociations}
                  className="mt-4 w-full sm:w-auto"
                >
                  Save Associations
                </Button>
              </div>

              {selectedAssociations.length > 0 && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Current Associations</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAssociations.map((assoc, index) => {
                        const [categoryCode, termCode] = assoc.identifier.split(':');
                        const matchedItem = otherTerms.find(
                          item => item.category.code === categoryCode && item.term.code === termCode
                        );
                        
                        return matchedItem ? (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {matchedItem.term.name} ({matchedItem.category.name})
                          </span>
                        ) : null;
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : selectedTerm ? (
            <div className="p-4 mt-4 rounded-md bg-amber-50 text-amber-800">
              No terms available in other categories for associations.
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default StepAssociations;