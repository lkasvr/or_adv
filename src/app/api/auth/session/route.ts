import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getSession();

    if (!session) return new Response(JSON.stringify(session));

    return NextResponse.json(session);
  } catch (error) {
    return new Response(
      JSON.stringify(new Error('Unknown Error', { cause: error })),
    );
  }
}
