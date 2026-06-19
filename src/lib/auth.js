import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function verifyAdminAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    if (!token) return false;

    const jwtSecret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwtSecret);

    return decoded && decoded.role === 'admin';
  } catch (error) {
    console.error('JWT verification failed:', error);
    return false;
  }
}
