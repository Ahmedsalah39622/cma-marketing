import { NextResponse } from 'next/server';
import { defaultContent } from '@/lib/content';

// In-memory content for demo (replace with DB in production)
let siteContent = defaultContent;

export async function GET() {
  return NextResponse.json(siteContent);
}

export async function POST(request: Request) {
  const data = await request.json();
  siteContent = data;
  return NextResponse.json({ success: true });
}
