import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Logout successfully' },
    { status: 200 }
  );

  // Xóa cookie access_token
  response.cookies.set({
    name: 'access_token',
    value: '',
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    secure: false,
    sameSite: 'strict',
    path: '/',
    maxAge: -1, // xóa cookie ngay lập tức
  });

  return response;
}
