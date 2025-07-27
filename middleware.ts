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

  // Read token from HttpOnly cookie
  const token =
    req.cookies.get('access_token')?.value || // Đọc từ cookie mới
    req.headers.get('authorization')?.replace('Bearer ', '');

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
    const userParse = await verifyToken(token);

    if (!userParse || !userParse.userId) {
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

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('X-User-ID', userParse.userId.toString());
    requestHeaders.set('X-User-Role', String(userParse.role));

    // Set Authorization header if missing
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
