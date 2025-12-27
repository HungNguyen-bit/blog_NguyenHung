import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const projectsPath = path.join(process.cwd(), 'data', 'projects.json');

export async function GET() {
  const data = fs.readFileSync(projectsPath, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(request: Request) {
  const body = await request.json();
  fs.writeFileSync(projectsPath, JSON.stringify(body, null, 2));
  return NextResponse.json({ success: true });
}
