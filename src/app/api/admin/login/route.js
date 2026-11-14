import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import {
  decryptLoginPayload,
  getAdminLoginPublicKeySpkiBase64,
  safeEqualString,
} from '@/lib/adminLoginCrypto';

const LOGIN_PAYLOAD_MAX_AGE_MS = 2 * 60 * 1000;

export async function GET() {
  try {
    const publicKey = getAdminLoginPublicKeySpkiBase64();
    return NextResponse.json({ publicKey });
  } catch (error) {
    console.error('Login public key error:', error.message);
    return NextResponse.json({ error: 'Login unavailable' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body?.payload || typeof body.payload !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid login request' },
        { status: 400 }
      );
    }

    let credentials;
    try {
      credentials = decryptLoginPayload(body.payload);
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    if (Date.now() - credentials.ts > LOGIN_PAYLOAD_MAX_AGE_MS) {
      return NextResponse.json({ success: false, error: 'Login expired, try again' }, { status: 401 });
    }

    const { username, password } = credentials;

    const envUsername = process.env.ADMIN_USERNAME || 'admin';
    const envPassword = process.env.ADMIN_PASSWORD || 'admin_secure_anmol_2026';
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error('JWT_SECRET is not configured');
      return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
    }

    const validUser = safeEqualString(username, envUsername);
    const validPass = safeEqualString(password, envPassword);

    if (validUser && validPass) {
      const token = jwt.sign({ role: 'admin' }, jwtSecret, { expiresIn: '1d' });

      const cookieStore = await cookies();
      cookieStore.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      return NextResponse.json({ success: true, message: 'Logged in successfully' });
    }

    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error.message);
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}