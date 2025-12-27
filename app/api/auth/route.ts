import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body || {};
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
    if (password && password === ADMIN_PASSWORD) {
      // In a real app create a signed token. Here we return a simple token.
      return NextResponse.json({ ok: true, token: 'admintoken' });
    }
    return NextResponse.json({ ok: false }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
