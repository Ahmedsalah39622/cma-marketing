import { NextRequest } from 'next/server';
import { validateMethod, createApiResponse, handleApiError } from '@/lib/api-utils';
import type { Solution } from '@/lib/types';

// Mock database
const solutions: Solution[] = [
  {
    id: "1",
    title: "Digital Transformation Suite",
    description: "Complete digital transformation solution for enterprises",
    benefits: [
      "Accelerated digital adoption",
      "Improved operational efficiency",
      "Enhanced customer experience",
      "Data-driven decision making"
    ],
    features: [
      "Process automation",
      "Digital workflow management",
      "Analytics dashboard",
      "Integration capabilities"
    ],
    targetIndustries: ["Manufacturing", "Retail", "Healthcare"],
    imageUrl: "/solutions/digital-transformation.jpg"
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description: "Scalable e-commerce solution for modern businesses",
    benefits: [
      "Increased sales conversion",
      "Enhanced customer engagement",
      "Streamlined operations",
      "Real-time analytics"
    ],
    features: [
      "Product management",
      "Order processing",
      "Inventory management",
      "Customer analytics"
    ],
    targetIndustries: ["Retail", "Fashion", "Consumer Goods"],
    imageUrl: "/solutions/ecommerce.jpg"
  },
  {
    id: "3",
    title: "Enterprise Analytics Platform",
    description: "Advanced analytics solution for data-driven enterprises",
    benefits: [
      "Actionable insights",
      "Predictive analytics",
      "Performance optimization",
      "Risk management"
    ],
    features: [
      "Real-time analytics",
      "Predictive modeling",
      "Custom dashboards",
      "Data visualization"
    ],
    targetIndustries: ["Finance", "Healthcare", "Manufacturing"],
    imageUrl: "/solutions/analytics.jpg"
  }
];

export async function GET(request: NextRequest) {
  try {
    validateMethod(request, ['GET']);
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry');
    
    let filteredSolutions = [...solutions];
    
    // Apply industry filter
    if (industry) {
      filteredSolutions = filteredSolutions.filter(
        solution => solution.targetIndustries.some(
          target => target.toLowerCase() === industry.toLowerCase()
        )
      );
    }
    
    return createApiResponse(filteredSolutions);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    validateMethod(request, ['POST']);
    return createApiResponse({ message: "Not implemented" }, 501);
  } catch (error) {
    return handleApiError(error);
  }
}