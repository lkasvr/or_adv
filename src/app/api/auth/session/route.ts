import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';

import StrapiRestAPIResponseError, {
  ExpiredException,
} from '../../Errors/types';

export async function GET() {
  try {
    const session = await getSession();

    if (
      session instanceof StrapiRestAPIResponseError ||
      session instanceof ExpiredException
    )
      return new Response(JSON.stringify(session));

    return NextResponse.json({ session });
  } catch (error) {
    return new Response(
      JSON.stringify(new Error('Unknown Error', { cause: error })),
    );
  }
}
