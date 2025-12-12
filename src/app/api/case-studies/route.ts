import { NextRequest } from 'next/server';
import { validateMethod, createApiResponse, handleApiError } from '@/lib/api-utils';
import type { CaseStudy } from '@/lib/types';

// This is a mock database for now. In production, you'd use a real database.
const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'E-Commerce Platform Transformation',
    description: 'Modernizing an outdated e-commerce system with cutting-edge technology',
    challenge: "The client's legacy e-commerce platform was struggling with performance issues and couldn't scale to meet growing demand.",
    solution: 'Implemented a modern microservices architecture using Next.js, Node.js, and MongoDB, with real-time inventory management.',
    results: '300% increase in page load speed, 50% increase in conversion rate, and successful handling of peak season traffic.',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
    industry: 'Retail',
    imageUrl: '/case-studies/ecommerce.jpg',
    clientName: 'Global Retail Solutions',
    testimonial: 'The new platform has transformed our business operations and significantly improved our customer experience.'
  },
  {
    id: '2',
    title: 'FinTech Analytics Dashboard',
    description: 'Real-time financial analytics platform for investment professionals',
    challenge: 'Need for real-time data processing and visualization for complex financial data.',
    solution: 'Built a responsive dashboard with real-time data processing using React, TypeScript, and WebSocket.',
    results: 'Reduced data latency by 90% and improved decision-making efficiency by 60%.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSocket'],
    industry: 'Finance',
    imageUrl: '/case-studies/fintech.jpg',
    clientName: 'Investment Analytics Pro',
    testimonial: 'The dashboard has become an indispensable tool for our investment decisions.'
  },
  {
    id: '3',
    title: 'Healthcare Management System',
    description: 'Secure and compliant healthcare management platform',
    challenge: 'Creating a HIPAA-compliant system for managing patient data and healthcare workflows.',
    solution: 'Developed a secure platform using Next.js, GraphQL, and PostgreSQL with end-to-end encryption.',
    results: '40% reduction in administrative time and zero security incidents.',
    technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Auth0', 'Azure'],
    industry: 'Healthcare',
    imageUrl: '/case-studies/healthcare.jpg',
    clientName: 'MedTech Solutions',
    testimonial: 'This system has revolutionized how we manage patient data and care delivery.'
  }
];

export async function GET(request: NextRequest) {
  try {
    validateMethod(request, ['GET']);
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry');
    const technology = searchParams.get('technology');
    
    let filteredCaseStudies = [...caseStudies];
    
    // Apply filters
    if (industry) {
      filteredCaseStudies = filteredCaseStudies.filter(
        cs => cs.industry.toLowerCase() === industry.toLowerCase()
      );
    }
    
    if (technology) {
      filteredCaseStudies = filteredCaseStudies.filter(
        cs => cs.technologies.some(tech => 
          tech.toLowerCase() === technology.toLowerCase()
        )
      );
    }
    
    return createApiResponse(filteredCaseStudies);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    validateMethod(request, ['POST']);
    
    // In a real application, you would:
    // 1. Validate the request body
    // 2. Authenticate the user
    // 3. Save to a database
    // 4. Return the created case study
    
    return createApiResponse({ message: 'Not implemented' }, 501);
  } catch (error) {
    return handleApiError(error);
  }
}