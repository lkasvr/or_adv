import { NextResponse } from 'next/server';

import { Category } from './domain';

export async function GET() {
  const res = await fetch(
    `${process.env.ARTICLES_API_BASE_URL}/categories?populate=icon`,
    {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.STRAPI_API_KEY ?? '',
      },
      cache: 'no-store',
    },
  );
  const { data }: { data: Category[] } = await res.json();

  return NextResponse.json(data);
}

//export async function POST(req: Request) { }
