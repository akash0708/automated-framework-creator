export interface Channel {
  identifier: string;
}

export interface Framework {
  id?: string;
  name: string;
  code: string;
  channels: Channel[];
  description?: string;
  categories?: Category[];
  status?: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id?: string;
  name: string;
  code: string;
  description?: string;
  terms?: Term[];
  frameworkId?: string;
}

export interface Term {
  id?: string;
  name: string;
  code: string;
  description?: string;
  categoryId?: string;
  associationsWith?: string[];
}

export interface FrameworkFormData {
  framework: Framework;
  categories: Category[];
  step: number;
  currentCategory?: Category;
  currentTerm?: Term;
}