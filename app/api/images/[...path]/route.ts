import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;

  // Thư mục chứa ảnh
  const BASE_DIR = path.join(process.cwd(), 'images');

  // Ghép đường dẫn sạch, loại bỏ ký tự xấu
  const safePath = path.join(BASE_DIR, ...pathSegments);

  // ❌ Nếu đường dẫn chui ra ngoài thư mục images → chặn
  // (bảo vệ chống ../../../../../)
  if (!safePath.startsWith(BASE_DIR)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Kiểm tra file tồn tại
  if (!fs.existsSync(safePath)) {
    return new NextResponse('Image not found', { status: 404 });
  }

  const ext = path.extname(safePath).toLowerCase();

  // ❌ Chỉ cho phép file ảnh
  if (!ALLOWED_EXT.includes(ext)) {
    return new NextResponse('Invalid file type', { status: 400 });
  }

  // Đọc file
  const imageBuffer = await fs.promises.readFile(safePath);

  const response = new NextResponse(new Uint8Array(imageBuffer));

  // Set Content-Type đúng
  const types: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
  };

  response.headers.set('Content-Type', types[ext] || 'application/octet-stream');

  return response;
}
