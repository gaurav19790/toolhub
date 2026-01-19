import { NextRequest, NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun } from 'docx';

// Setup polyfills before importing pdf-parse
declare global {
  var DOMMatrix: any;
  var Path2D: any;
  var ImageData: any;
}

if (!globalThis.DOMMatrix) {
  globalThis.DOMMatrix = class DOMMatrix {
    a = 1;
    b = 0;
    c = 0;
    d = 1;
    e = 0;
    f = 0;

    constructor(init?: string | number[]) {
      if (!init) return;
      if (typeof init === 'string') return;
      if (Array.isArray(init) && init.length === 6) {
        [this.a, this.b, this.c, this.d, this.e, this.f] = init;
      }
    }

    multiply(other: any) {
      return new (globalThis.DOMMatrix as any)([
        this.a * other.a + this.c * other.b,
        this.b * other.a + this.d * other.b,
        this.a * other.c + this.c * other.d,
        this.b * other.c + this.d * other.d,
        this.a * other.e + this.c * other.f + this.e,
        this.b * other.e + this.d * other.f + this.f,
      ]);
    }
  };
}

if (!globalThis.Path2D) {
  globalThis.Path2D = class Path2D {
    constructor(path?: any) {}
  };
}

if (!globalThis.ImageData) {
  globalThis.ImageData = class ImageData {
    constructor(data: any, width: number, height?: number) {}
  };
}

// Now import pdf-parse after polyfills are set up
import * as pdfParseModule from 'pdf-parse';

const pdfParse = (pdfParseModule as any).default || (pdfParseModule as any);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('pdf') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Parse PDF
    const data = await pdfParse(buffer);
    const text = data.text || '';

    // Split text into paragraphs
    const paragraphs = text
      .split('\n')
      .filter((line: string) => line.trim())
      .map(
        (line: string) =>
          new Paragraph({
            children: [new TextRun(line)],
          })
      );

    const doc = new Document({
      sections: [
        {
          properties: {},
          children:
            paragraphs.length > 0
              ? paragraphs
              : [
                  new Paragraph({
                    children: [new TextRun('PDF conversion completed.')],
                  }),
                ],
        },
      ],
    });

    const bufferDocx = await Packer.toBuffer(doc);

    return new Response(new Uint8Array(bufferDocx), {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="converted.docx"',
      },
    });
  } catch (error) {
    console.error('PDF conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert PDF to Word' },
      { status: 500 }
    );
  }
}