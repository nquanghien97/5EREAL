import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  const imagePath = path.join(process.cwd(), 'images', ...pathSegments);

  if (fs.existsSync(imagePath)) {
    const imageBuffer = await fs.promises.readFile(imagePath);
    const fileExtension = path.extname(imagePath).toLowerCase();
    
    const response = new NextResponse(new Uint8Array(imageBuffer));
    
    switch (fileExtension) {
      case '.jpg':
      case '.jpeg':
        response.headers.set('Content-Type', 'image/jpeg');
        break;
      case '.png':
        response.headers.set('Content-Type', 'image/png');
        break;
      // Thêm các loại file khác nếu cần
      default:
        response.headers.set('Content-Type', 'application/octet-stream');
    }
    
    return response;
  } else {
    return new NextResponse('Image not found', { status: 404 });
  }
}