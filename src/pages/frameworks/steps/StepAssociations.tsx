import React, { useState } from 'react';
import { AlertTriangle, ChevronRight, CheckCircle } from 'lucide-react';
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
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [selectedTermIndex, setSelectedTermIndex] = useState<number | null>(null);
  const [selectedAssociations, setSelectedAssociations] = useState<Array<{ identifier: string }>>([]);
  const [selectedSourceCategoryIndex, setSelectedSourceCategoryIndex] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCategoryChange = (value: string) => {
    const index = parseInt(value, 10);
    setSelectedCategoryIndex(index);
    setSelectedTermIndex(null);
    setSelectedAssociations([]);
  };

  const handleTermChange = (value: string) => {
    const index = parseInt(value, 10);
    setSelectedTermIndex(index);
    
    if (selectedCategoryIndex !== null) {
      const category = categories[selectedCategoryIndex];
      const term = category.terms?.[index];
      if (term && term.associationsWith) {
        setSelectedAssociations(term.associationsWith.map(id => ({ identifier: id })));
      } else {
        setSelectedAssociations([]);
      }
    }
  };

  const handleSourceCategorySelect = (categoryIndex: number) => {
    setSelectedSourceCategoryIndex(categoryIndex);
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
    setSuccess('Associations saved successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  const getOtherCategories = () => {
    if (selectedCategoryIndex === null) return categories;
    return categories.filter((_, index) => index !== selectedCategoryIndex);
  };

  const selectedCategory = selectedCategoryIndex !== null ? categories[selectedCategoryIndex] : null;
  const selectedTerm = selectedCategory && selectedTermIndex !== null 
    ? selectedCategory.terms?.[selectedTermIndex] 
    : null;
  const sourceCategory = selectedSourceCategoryIndex !== null 
    ? categories[selectedSourceCategoryIndex] 
    : null;

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Term Associations
        </h3>
        <p className="text-muted-foreground mt-1">
          Create associations between terms from different categories.
        </p>
      </div>

      {categories.length === 0 || categories.every(cat => !cat.terms || cat.terms.length === 0) ? (
        <div className="p-4 rounded-md bg-amber-50 text-amber-800 flex items-center">
          <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
          <span>You need to create terms in multiple categories before creating associations.</span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {/* Left Pane: Current Term Selection */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-4">Select Term to Associate</h4>
              <div className="space-y-4">
                <Select
                  label="Category"
                  options={[
                    { value: '', label: 'Select a category' },
                    ...categories.map((category, index) => ({
                      value: index.toString(),
                      label: category.name
                    }))
                  ]}
                  value={selectedCategoryIndex !== null ? selectedCategoryIndex.toString() : ''}
                  onChange={handleCategoryChange}
                  required
                />
                <Select
                  label="Term"
                  options={[
                    { value: '', label: 'Select a term' },
                    ...(selectedCategory?.terms || []).map((term, index) => ({
                      value: index.toString(),
                      label: term.name
                    }))
                  ]}
                  value={selectedTermIndex !== null ? selectedTermIndex.toString() : ''}
                  onChange={handleTermChange}
                  disabled={selectedCategoryIndex === null || !selectedCategory?.terms?.length}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Center Pane: Available Categories */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-4">Available Categories</h4>
              <div className="space-y-2">
                {getOtherCategories().map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleSourceCategorySelect(index)}
                    className={`w-full text-left p-2 rounded-md hover:bg-gray-50 ${
                      selectedSourceCategoryIndex === index ? 'bg-indigo-50 text-indigo-700' : ''
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Pane: Terms from Selected Category */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-4">
                {sourceCategory ? `Terms in ${sourceCategory.name}` : 'Select a Category'}
              </h4>
              {sourceCategory && sourceCategory.terms && sourceCategory.terms.length > 0 ? (
                <div className="space-y-2">
                  {sourceCategory.terms.map((term, index) => {
                    const termIdentifier = `${sourceCategory.code}:${term.code}`;
                    return (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`term-${index}`}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedAssociations.some(assoc => assoc.identifier === termIdentifier)}
                          onChange={() => handleAssociationToggle(termIdentifier)}
                          disabled={!selectedTerm}
                        />
                        <label htmlFor={`term-${index}`} className="ml-2 block text-sm text-gray-900">
                          {term.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  {sourceCategory ? 'No terms available in this category' : 'Select a category to view terms'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Association Preview */}
      {selectedTerm && selectedAssociations.length > 0 && (
        <Card className="mt-6">
          <CardContent className="p-4">
            <h4 className="font-medium mb-4">Current Associations</h4>
            <div className="flex items-center">
              <span className="font-medium">{selectedTerm.name}</span>
              <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {selectedAssociations.map((assoc, index) => {
                  const [categoryCode, termCode] = assoc.identifier.split(':');
                  const category = categories.find(cat => cat.code === categoryCode);
                  const term = category?.terms?.find(t => t.code === termCode);
                  
                  return term ? (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {term.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="p-3 rounded-md bg-red-50 text-red-800 flex items-center">
          <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3 rounded-md bg-green-50 text-green-800 flex items-center animate-fade-in">
          <CheckCircle size={16} className="mr-2 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleSaveAssociations}
          disabled={!selectedTerm || selectedAssociations.length === 0}
          className="relative"
        >
          {success ? (
            <span className="flex items-center">
              <CheckCircle size={16} className="mr-2" />
              Saved
            </span>
          ) : (
            'Save Associations'
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepAssociations;