import React, { useState } from 'react';
import { AlertTriangle, Plus, Trash2 } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import Select from '../../../components/ui/Select';
import { Category, Term } from '../../../types/framework';
import { Card, CardContent } from '../../../components/ui/Card';
import { useFrameworkFormStore } from '../../../store/frameworkFormStore';

const StepTerms: React.FC = () => {
  const categories = useFrameworkFormStore((state) => state.categories);
  const addTermToCategory = useFrameworkFormStore((state) => state.addTermToCategory);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(
    categories.length > 0 ? 0 : null
  );
  const [newTerm, setNewTerm] = useState<Term>({
    name: '',
    code: '',
    description: ''
  });
  const [error, setError] = useState('');

  const handleCategoryChange = (value: string) => {
    const index = parseInt(value, 10);
    setSelectedCategoryIndex(index);
  };

  const handleAddTerm = () => {
    if (selectedCategoryIndex === null) {
      setError('Please select a category');
      return;
    }

    if (!newTerm.name.trim() || !newTerm.code.trim()) {
      setError('Term name and code are required');
      return;
    }

    // Check for duplicate term codes in the selected category
    const selectedCategory = categories[selectedCategoryIndex];
    if (selectedCategory.terms?.some(term => term.code === newTerm.code)) {
      setError('Term code must be unique within a category');
      return;
    }

    addTermToCategory(selectedCategoryIndex, { ...newTerm });
    setNewTerm({ name: '', code: '', description: '' });
    setError('');
  };

  const selectedCategory = selectedCategoryIndex !== null ? categories[selectedCategoryIndex] : null;

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Category Terms
        </h3>
        <p className="text-muted-foreground mt-1">
          Add terms to your categories. Terms are specific values within each category.
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="p-4 rounded-md bg-amber-50 text-amber-800 flex items-center">
          <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
          <span>You need to create at least one category before adding terms.</span>
        </div>
      ) : (
        <>
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

          <div className="grid gap-6 sm:grid-cols-2 mt-4">
            <Input
              label="Term Name"
              value={newTerm.name}
              onChange={(e) => setNewTerm({ ...newTerm, name: e.target.value })}
              placeholder="e.g., English"
              required
            />

            <Input
              label="Term Code"
              value={newTerm.code}
              onChange={(e) => setNewTerm({ ...newTerm, code: e.target.value })}
              placeholder="e.g., english"
              hint="Use lowercase with no spaces"
              required
            />
          </div>

          <Textarea
            label="Description"
            value={newTerm.description || ''}
            onChange={(e) => setNewTerm({ ...newTerm, description: e.target.value })}
            placeholder="Describe this term"
            rows={2}
          />

          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-800 flex items-center">
              <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            onClick={handleAddTerm}
            leftIcon={<Plus size={16} />}
            className="w-full sm:w-auto"
          >
            Add Term
          </Button>

          {selectedCategory && selectedCategory.terms && selectedCategory.terms.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">
                Terms for {selectedCategory.name} ({selectedCategory.terms.length})
              </h3>
              <div className="space-y-3">
                {selectedCategory.terms.map((term, index) => (
                  <Card key={index} className="overflow-visible hover:border-indigo-200 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{term.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">Code: {term.code}</p>
                          {term.description && (
                            <p className="text-sm mt-2">{term.description}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StepTerms;