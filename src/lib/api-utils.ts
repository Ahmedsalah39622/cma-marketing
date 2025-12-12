import { NextResponse } from 'next/server';
import { ApiResponse } from './types';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const validateMethod = (request: Request, allowedMethods: string[]) => {
  if (!allowedMethods.includes(request.method)) {
    throw new ApiError(`Method ${request.method} Not Allowed`, 405);
  }
};

export const validateRequiredFields = <T extends Record<string, unknown>>(
  data: T,
  requiredFields: (keyof T)[]
) => {
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new ApiError(`Missing required field: ${String(field)}`, 400);
    }
  }
};

export const handleApiError = (error: unknown) => {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
      } as ApiResponse<never>,
      { status: error.statusCode }
    );
  }

  // Handle unknown errors
  return NextResponse.json(
    {
      success: false,
      error: 'An unexpected error occurred',
    } as ApiResponse<never>,
    { status: 500 }
  );
};

export const createApiResponse = <T>(
  data: T,
  status: number = 200
): NextResponse<ApiResponse<T>> => {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
};