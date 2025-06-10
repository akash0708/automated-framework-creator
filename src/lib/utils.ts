import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import slugify from 'slugify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Simulates API calls for demo purposes
export const simulateApiCall = async (
  endpoint: string, 
  method: 'GET' | 'POST' | 'PATCH' = 'POST',
  data?: unknown
): Promise<unknown> => {
  console.log(`Making ${method} request to ${endpoint}`, data);
  await delay(800); // Simulate network delay
  
  // Mock successful response
  return {
    status: 'success',
    message: 'Operation completed successfully',
    data: data || { id: generateUniqueId() },
  };
};

// Utility to generate a slug from a string (for codes)
export function slugifyString(input: string): string {
  return slugify(input, { lower: true, strict: true });
}