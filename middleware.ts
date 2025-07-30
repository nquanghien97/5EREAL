import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/token';

type ExcludeRoute = {
  path: string;
  method?: string;
};

const excludedRoutes: ExcludeRoute[] = [
  { path: '/api/auth/login', method: 'POST' },
  { path: '/api/auth/register', method: 'POST' },
  { path: '/api/news', method: 'GET' },
  { path: '/api/images', method: 'GET' },
];

const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

export const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  'Access-Control-Allow-Headers':
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // Handle preflight CORS
  if (method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Check if route is excluded
  const isExcluded = excludedRoutes.some(route => {
    const pathMatch = pathname.startsWith(route.path);
    const methodMatch = !route.method || route.method === method;
    return pathMatch && methodMatch;
  });

  if (isExcluded) {
    return NextResponse.next();
  }

  // Lấy token từ cookie hoặc header
  const tokenFromCookie = req.cookies.get('access_token')?.value;
  const tokenFromHeader = req.headers.get('authorization')?.replace('Bearer ', '');
  
  const token = tokenFromHeader || tokenFromCookie;

  if (!token || token === 'undefined') {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Access token not found!',
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }

  try {
    const user = await verifyToken(token);

    if (!user || !user.userId) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'Invalid token',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // ✨ KEY IMPROVEMENT: Clone request và thêm Authorization header
    const requestHeaders = new Headers(req.headers);
    
    // Nếu chưa có Authorization header, thêm từ cookie
    if (!requestHeaders.get('authorization') && tokenFromCookie) {
      requestHeaders.set('authorization', `Bearer ${tokenFromCookie}`);
    }
    
    // Thêm user info vào headers để API routes có thể sử dụng
    requestHeaders.set('x-user-id', user.userId.toString());
    requestHeaders.set('x-user-role', user.role?.toString() ?? '');

    // Tạo response với headers được modify
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // Set CORS headers
    response.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    return response;
  } catch (error) {
    console.error('Token verification error:', error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Token verification failed',
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
}

export const config = {
  matcher: ['/api/:path*'],
};