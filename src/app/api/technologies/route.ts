import { NextRequest } from 'next/server';
import { validateMethod, createApiResponse, handleApiError } from '@/lib/api-utils';
import type { TechnologyStack } from '@/lib/types';

// Mock database
const technologies: TechnologyStack[] = [
  {
    id: "1",
    name: "Next.js",
    category: "frontend",
    description: "React framework for production-grade applications",
    icon: "/tech/nextjs.svg",
    proficiencyLevel: 95
  },
  {
    id: "2",
    name: "Node.js",
    category: "backend",
    description: "JavaScript runtime for scalable server-side applications",
    icon: "/tech/nodejs.svg",
    proficiencyLevel: 90
  },
  {
    id: "3",
    name: "PostgreSQL",
    category: "database",
    description: "Advanced open-source relational database",
    icon: "/tech/postgresql.svg",
    proficiencyLevel: 85
  },
  {
    id: "4",
    name: "AWS",
    category: "cloud",
    description: "Comprehensive cloud computing platform",
    icon: "/tech/aws.svg",
    proficiencyLevel: 88
  },
  {
    id: "5",
    name: "Docker",
    category: "tools",
    description: "Container platform for modern applications",
    icon: "/tech/docker.svg",
    proficiencyLevel: 92
  }
];

export async function GET(request: NextRequest) {
  try {
    validateMethod(request, ['GET']);
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const minProficiency = searchParams.get('minProficiency');
    
    let filteredTechnologies = [...technologies];
    
    // Apply category filter
    if (category) {
      filteredTechnologies = filteredTechnologies.filter(
        tech => tech.category === category
      );
    }
    
    // Apply proficiency filter
    if (minProficiency) {
      const minLevel = parseInt(minProficiency);
      if (!isNaN(minLevel)) {
        filteredTechnologies = filteredTechnologies.filter(
          tech => tech.proficiencyLevel >= minLevel
        );
      }
    }
    
    return createApiResponse(filteredTechnologies);
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