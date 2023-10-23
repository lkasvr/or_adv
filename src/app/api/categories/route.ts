import { NextResponse } from 'next/server';

import { Category } from './domain';

const baseUrl =
  process.env.DEVAPI_BASE_URL ?? process.env.ARTICLES_API_BASE_URL;

export async function GET() {
  const res = await fetch(`${baseUrl}/categories?populate=icon`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.STRAPI_API_KEY ?? '',
    },
    cache: 'no-store',
  });
  const { data }: { data: Category[] } = await res.json();

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const requestBody = await req.json();

  const res = await fetch(`${baseUrl}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.STRAPI_API_KEY ?? '',
      Authorization: `${req.headers.get('Authorization')}`,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const { id }: { id: string } = await req.json();
  const res = await fetch(`${baseUrl}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.STRAPI_API_KEY ?? '',
      Authorization: `${req.headers.get('Authorization')}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
