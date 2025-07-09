import { jwtVerify, SignJWT } from "jose";

const secretKey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function createToken( userId: number, role: 'ADMIN' | 'USER' | 'STAFF', username: string) {
  const expiresIn = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // 1 days expiration
  return new SignJWT({ userId: userId.toString(), role, username,  expires: expiresIn })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
};

export async function verifyToken(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session', (error as Error).message);
  }
}