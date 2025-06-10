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
  identifier?: string;
  name: string;
  code: string;
  description?: string;
  categoryId?: string;
  associationsWith?: Array<{
    code: string;
    category: string;
    associatedTermIdentifier: string;
  }>;
}

export interface FrameworkFormData {
  channel: {
    name: string;
    code: string;
  };
  framework: {
    name: string;
    code: string;
    channels: Array<{ identifier: string }>;
    description: string;
    status: 'draft' | 'published';
  };
  categories: Category[];
  step: number;
}