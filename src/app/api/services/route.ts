import { NextRequest } from 'next/server';
import { validateMethod, createApiResponse, handleApiError } from '@/lib/api-utils';
import type { Service } from '@/lib/types';

// Mock database
const services: Service[] = [
  {
    id: "1",
    title: "Custom Software Development",
    description: "Tailored software solutions designed to meet your specific business needs and challenges.",
    features: [
      "Custom web and mobile applications",
      "Enterprise software solutions",
      "Legacy system modernization",
      "API development and integration"
    ],
    icon: "code",
    benefits: [
      "Improved operational efficiency",
      "Enhanced user experience",
      "Scalable solutions",
      "Competitive advantage"
    ]
  },
  {
    id: "2",
    title: "Cloud Solutions",
    description: "Comprehensive cloud services to optimize your infrastructure and enhance scalability.",
    features: [
      "Cloud migration",
      "Cloud-native development",
      "Serverless architecture",
      "Cloud optimization"
    ],
    icon: "cloud",
    benefits: [
      "Reduced operational costs",
      "Improved scalability",
      "Enhanced security",
      "Better disaster recovery"
    ]
  },
  {
    id: "3",
    title: "AI & Machine Learning",
    description: "Advanced AI solutions to transform your data into actionable insights.",
    features: [
      "Predictive analytics",
      "Natural language processing",
      "Computer vision",
      "Machine learning models"
    ],
    icon: "brain",
    benefits: [
      "Data-driven decisions",
      "Automated processes",
      "Improved accuracy",
      "Competitive insights"
    ]
  }
];

export async function GET(request: NextRequest) {
  try {
    validateMethod(request, ['GET']);
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let filteredServices = [...services];
    
    // Apply filters if category is provided
    if (category) {
      filteredServices = filteredServices.filter(
        service => service.title.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    return createApiResponse(filteredServices);
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
    // 4. Return the created service
    
    return createApiResponse({ message: "Not implemented" }, 501);
  } catch (error) {
    return handleApiError(error);
  }
}