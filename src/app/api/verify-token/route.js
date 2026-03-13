import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your_fallback_secret_key';

export async function POST(request) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ message: 'Token is required' }, { status: 400 });
  }

  try {
    verify(token, JWT_SECRET);
    return NextResponse.json({ message: 'Token is valid.' }, { status: 200 });
  } catch (error) {
    console.error('Token verification error:', error);
    if (error.name === 'TokenExpiredError') {
      return NextResponse.json({ message: 'Token has expired.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Invalid token.' }, { status: 400 });
  }
}
