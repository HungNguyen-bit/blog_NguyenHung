import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const postsPath = path.join(process.cwd(), 'data', 'posts.json');

export async function GET() {
  const data = fs.readFileSync(postsPath, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(request: Request) {
  const body = await request.json();
  fs.writeFileSync(postsPath, JSON.stringify(body, null, 2));
  return NextResponse.json({ success: true });
}
