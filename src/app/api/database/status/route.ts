import { NextResponse } from 'next/server';
import { cloudAuthorized, cloudSession, databaseConfigured } from '@/services/serverDatabase';

export async function GET(request: Request) {
  return NextResponse.json({ configured: databaseConfigured(), authorized: cloudAuthorized(request) });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return new Response(null, { status: 403 });
  const body = await request.json().catch(() => null);
  const session = cloudSession(request, body?.accessKey);
  if (!session) return NextResponse.json({ error: 'Invalid cloud access key.' }, { status: 401 });
  return NextResponse.json({ authorized: true }, { headers: { 'Set-Cookie': session } });
}

export async function DELETE(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return new Response(null, { status: 403 });
  return NextResponse.json({ authorized: false }, { headers: { 'Set-Cookie': 'jp_book_cloud=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0' } });
}
