import React, { useState } from 'react';
import { AlertTriangle, Plus, Trash2 } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import { Category } from '../../../types/framework';
import { Card, CardContent } from '../../../components/ui/Card';
import { useFrameworkFormStore } from '../../../store/frameworkFormStore';

const DEFAULT_CATEGORIES = [
  { name: 'Board', code: 'board' },
  { name: 'Medium', code: 'medium' },
  { name: 'Subject', code: 'subject' },
  { name: 'Course Type', code: 'courseType' },
];

const StepCategories: React.FC = () => {
  const categories = useFrameworkFormStore((state) => state.categories);
  const setCategories = useFrameworkFormStore((state) => state.setCategories);
  const setCurrentCategory = useFrameworkFormStore((state) => state.setCurrentCategory);

  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState<Category>({
    name: '',
    code: '',
    description: ''
  });
  const [error, setError] = useState('');

  // Track which default categories have been added
  const addedDefaultCodes = categories.map(cat => cat.code);
  const availableDefaults = DEFAULT_CATEGORIES.filter(def => !addedDefaultCodes.includes(def.code));

  const handleAddDefaultCategory = (def: { name: string; code: string }) => {
    setCategories([...categories, { ...def }]);
  };

  const handleAddCategory = () => {
    // Validation
    if (!newCategory.name.trim() || !newCategory.code.trim()) {
      setError('Category name and code are required');
      return;
    }
    // Check for duplicate codes
    if (categories.some(cat => cat.code === newCategory.code)) {
      setError('Category code must be unique');
      return;
    }
    setCategories([...categories, { ...newCategory }]);
    setNewCategory({ name: '', code: '', description: '' });
    setError('');
    setShowNewCategoryForm(false);
  };

  const handleRemoveCategory = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Framework Categories
        </h3>
        <p className="text-muted-foreground mt-1">
          Define categories for your framework. Each category can have multiple terms.
        </p>
      </div>

      {/* Default categories selection */}
      {availableDefaults.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Select from default categories:</h4>
          <div className="flex flex-wrap gap-2">
            {availableDefaults.map(def => (
              <Button
                key={def.code}
                variant="outline"
                onClick={() => handleAddDefaultCategory(def)}
                className="capitalize"
              >
                {def.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Create new category button */}
      {!showNewCategoryForm && (
        <Button
          variant="secondary"
          onClick={() => setShowNewCategoryForm(true)}
          leftIcon={<Plus size={16} />}
          className="mb-4"
        >
          Create new category
        </Button>
      )}

      {/* New category form */}
      {showNewCategoryForm && (
        <div className="mb-4 border rounded-md p-4 bg-slate-50">
          <h4 className="text-sm font-medium mb-2">Create a new category</h4>
          <div className="grid gap-6 sm:grid-cols-2">
            <Input
              label="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              placeholder="e.g., Custom Category"
              required
            />
            <Input
              label="Category Code"
              value={newCategory.code}
              onChange={(e) => setNewCategory({ ...newCategory, code: e.target.value })}
              placeholder="e.g., custom_category"
              hint="Use lowercase with no spaces"
              required
            />
          </div>
          <Textarea
            label="Description"
            value={newCategory.description || ''}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            placeholder="Describe this category"
            rows={2}
          />
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-800 flex items-center">
              <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <div className="flex gap-2 mt-2">
            <Button onClick={handleAddCategory} leftIcon={<Plus size={16} />}>
              Add Category
            </Button>
            <Button variant="ghost" onClick={() => setShowNewCategoryForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Added categories list */}
      {categories.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Added Categories ({categories.length})</h3>
          <div className="space-y-3">
            {categories.map((category, index) => (
              <Card key={index} className="overflow-visible hover:border-indigo-200 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">Code: {category.code}</p>
                      {category.description && (
                        <p className="text-sm mt-2">{category.description}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveCategory(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepCategories;