import {
  UnauthenticatedException,
  ExpiredException,
  UnknownError,
} from '@/Errors/AppErrors';
import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getSession();

    if (
      session instanceof UnauthenticatedException ||
      session instanceof ExpiredException
    )
      return new Response(session.message, { status: session.statusCode });

    return NextResponse.json({ user: session.user });
  } catch (error) {
    return new Response(JSON.stringify(new UnknownError(error)));
  }
}
