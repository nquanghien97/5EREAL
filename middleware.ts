import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/token';

type ExcludeRoute = {
  path: string;
  method?: string;
};

const excludedRoutes: ExcludeRoute[] = [
  { path: '/api/auth/login', method: 'POST' },
  { path: '/api/news', method: 'GET' },
  { path: '/api/images', method: 'GET' },
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // Xử lý preflight CORS request
  if (method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Kiểm tra route được loại trừ
  const isExcluded = excludedRoutes.some(route => {
    const pathMatch = pathname.startsWith(route.path);
    const methodMatch = !route.method || route.method === method;
    return pathMatch && methodMatch;
  });

  if (isExcluded) {
    return NextResponse.next();
  }

  // Lấy token từ cookie hoặc header
  const token = 
    req.cookies.get('token')?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  // Kiểm tra token có tồn tại không
  if (!token || token === 'undefined') {
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        message: 'Access token not found!!' 
      }),
      { 
        status: 401, 
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  }

  // Verify token
  try {
    const userParse = await verifyToken(token);

    if (!userParse || !userParse.userId) {
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid token' 
        }),
        { 
          status: 401, 
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          } 
        }
      );
    }

    // Tạo headers mới với thông tin user
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('X-User-ID', userParse.userId.toString());
    requestHeaders.set('X-User-Role', String(userParse.role));
    
    // Gắn token vào Authorization header nếu chưa có
    if (!requestHeaders.get('authorization')) {
      requestHeaders.set('authorization', `Bearer ${token}`);
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        message: 'Token verification failed' 
      }),
      { 
        status: 401, 
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  }
}

export const config = {
  matcher: ['/api/:path*'],
};