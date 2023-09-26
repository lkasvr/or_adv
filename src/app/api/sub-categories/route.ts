import { SubCategory } from '@/components/Article/Search/filters/domain/SubCategories';
import { ExpiredException, UnauthenticatedException } from '@/Errors/AppErrors';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

import { StrapiRestAPIResponseError } from '../types';

export async function POST(req: Request) {
  const session = await getSession();

  if (
    session instanceof UnauthenticatedException ||
    session instanceof ExpiredException
  )
    return NextResponse.json(session.message, {
      status: session.httpStatusCode,
    });

  console.log(req.body);
  console.log({ data: JSON.stringify(req.body) });
  // const res = await fetch(
  //   `${process.env.ARTICLES_API_BASE_URL}/sub-categories`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'API-Key': process.env.DATA_API_KEY ?? '',
  //       Authorization: `Bearer ${session?.token}`,
  //     },
  //     body: JSON.stringify({ data: { name: 'ola route handler' } }),
  //   },
  // );

  //const data: SubCategory | StrapiRestAPIResponseError = await res.json();

  return NextResponse.json(data);
}

export type StrapiRestAPIResponse = {
  data: SubCategory;
};
