import { verifyToken } from '@/utils/token';
import { USER_ROLE } from '@prisma/client';
import { cookies, headers } from 'next/headers';

export async function getUserFromCookie(): Promise<{ userId: number; role: USER_ROLE } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || (await headers()).get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  try {
    const user = await verifyToken(token);
    if (!user) return null;
    return {
      userId: Number(user.userId as string),
      role: user.role as USER_ROLE,
    };
  } catch {
    return null;
  }
}
