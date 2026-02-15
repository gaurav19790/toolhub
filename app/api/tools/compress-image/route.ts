import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll('image') as File[];
  const targetSizeKB = parseInt((formData.get('targetSize') as string) || '100') || 100;
  const targetSizeBytes = targetSizeKB * 1024;

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'No file(s) uploaded' }, { status: 400 });
  }

  const out: { name: string; data: string; size: number }[] = [];

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());

    let quality = 90;
    let compressed: Buffer;
    do {
      compressed = await sharp(buffer).jpeg({ quality }).toBuffer();
      if (compressed.length <= targetSizeBytes) break;
      quality -= 10;
      if (quality < 10) quality = 10;
    } while (compressed.length > targetSizeBytes && quality > 10);

    const base64 = compressed.toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64}`;
    const name = (file.name || 'image').replace(/\.[^/.]+$/, '') + '-compressed.jpg';
    out.push({ name, data: dataUrl, size: compressed.length });
  }

  return NextResponse.json({ files: out });
}