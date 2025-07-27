import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/token';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    if (!token) {
      return Response.json({ success: false, message: 'Not logged in' }, { status: 401 });
    }

    const userData = await verifyToken(token);
    if (!userData) {
      return Response.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: Number(userData.userId) } });
    return Response.json({ success: true, user });
  } catch (error) {
    return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
  }
}
