import { verifyToken } from '@/utils/token';
import { cookies, headers } from 'next/headers';

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || (await headers()).get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  try {
    const user = await verifyToken(token);
    if (!user) return null;
    return {
      userId: user.userId,
      role: user.role,
    };
  } catch {
    return null;
  }
}
