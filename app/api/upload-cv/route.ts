import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = formData.get('token')?.toString() || '';
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admintoken';
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const file = formData.get('file') as File;
  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  // Save as cv.jpg (overwrite if exists)
  const fileName = 'cv.jpg';
  const filePath = path.join(process.cwd(), 'public', fileName);
  await fs.writeFile(filePath, buffer);
  return NextResponse.json({ url: '/' + fileName });
}
