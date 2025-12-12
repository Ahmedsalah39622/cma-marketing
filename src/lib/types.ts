// Common response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Case Study types
export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  industry: string;
  imageUrl: string;
  clientName?: string;
  testimonial?: string;
}

// Service types
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  benefits: string[];
}

// Technology Stack types
export interface TechnologyStack {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'tools';
  description: string;
  icon: string;
  proficiencyLevel: number;
}

// Solution types
export interface Solution {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  features: string[];
  targetIndustries: string[];
  imageUrl: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  subject?: string;
  phone?: string;
}

// Newsletter subscription types
export interface NewsletterSubscription {
  email: string;
  name?: string;
  subscriptionDate: Date;
}