import { create } from 'zustand';
import { FrameworkFormData, Category, Term } from '../types/framework';

const INITIAL_FORM_DATA: FrameworkFormData = {
  channel: { name: '', code: '' },
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

type FrameworkFormStore = FrameworkFormData & {
  setStep: (step: number) => void;
  setChannel: (channel: { name: string; code: string }) => void;
  setFramework: (framework: Partial<FrameworkFormData['framework']>) => void;
  setCategories: (categories: Category[]) => void;
  setCurrentCategory: (category: Category) => void;
  addTermToCategory: (categoryIndex: number, term: Term) => void;
  updateTermAssociations: (
    categoryIndex: number,
    termIndex: number,
    associationsWith: Array<{ code: string; category: string; associatedTermIdentifier: string }>
  ) => void;
  reset: () => void;
};

export const useFrameworkFormStore = create<FrameworkFormStore>((set, get) => ({
  ...INITIAL_FORM_DATA,
  setStep: (step: number) => set({ step }),
  setChannel: (channel: { name: string; code: string }) => set((state) => ({ ...state, channel })),
  setFramework: (framework: Partial<FrameworkFormData['framework']>) =>
    set((state) => ({ ...state, framework: { ...state.framework, ...framework } })),
  setCategories: (categories: Category[]) => set((state) => ({ ...state, categories })),
  setCurrentCategory: (category: Category) =>
    set((state) => ({ ...state, currentCategory: category })),
  addTermToCategory: (categoryIndex: number, term: Term) =>
    set((state) => {
      const updatedCategories = [...state.categories];
      if (!updatedCategories[categoryIndex].terms) {
        updatedCategories[categoryIndex].terms = [];
      }
      updatedCategories[categoryIndex].terms?.push(term);
      return { ...state, categories: updatedCategories };
    }),
  updateTermAssociations: (categoryIndex: number, termIndex: number, associationsWith: Array<{ code: string; category: string; associatedTermIdentifier: string }>) =>
    set((state) => {
      const updatedCategories = [...state.categories];
      const terms = updatedCategories[categoryIndex].terms || [];
      if (terms[termIndex]) {
        terms[termIndex] = {
          ...terms[termIndex],
          associationsWith: associationsWith
        };
      }
      return { ...state, categories: updatedCategories };
    }),
  reset: () => set({ ...INITIAL_FORM_DATA })
})); 