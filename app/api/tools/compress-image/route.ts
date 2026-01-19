import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File;
  const targetSizeKB = parseInt(formData.get('targetSize') as string) || 100;
  const targetSizeBytes = targetSizeKB * 1024;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  let quality = 90;
  let compressed: Buffer;
  do {
    compressed = await sharp(buffer)
      .jpeg({ quality })
      .toBuffer();
    if (compressed.length <= targetSizeBytes) break;
    quality -= 10;
    if (quality < 10) quality = 10;
  } while (compressed.length > targetSizeBytes && quality > 10);

  return new Response(new Uint8Array(compressed), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'attachment; filename="compressed.jpg"',
    },
  });
}