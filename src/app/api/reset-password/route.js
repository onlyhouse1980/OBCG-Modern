import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { dbConnect } from '@/lib/dbConnect';
import WaterReading from '@/models/WaterReading';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  console.log('*** RESET PASSWORD API LOGS ***');
  console.log('API call received.');

  const { token, password } = await request.json();
  console.log(`Token received: ${token}`);

  if (!token || !password) {
    return NextResponse.json(
      { message: 'Token and new password are required.' },
      { status: 400 },
    );
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken || !decodedToken.userId) {
      return NextResponse.json(
        { message: 'Invalid or malformed token.' },
        { status: 400 },
      );
    }
    console.log(`Token successfully decoded. User ID: ${decodedToken.userId}`);

    const connection = await dbConnect();
    if (!connection) {
      console.error('Database connection unavailable for password reset.');
      return NextResponse.json(
        { message: 'Database connection failed.' },
        { status: 503 },
      );
    }

    const user = await WaterReading.findOne({
      _id: decodedToken.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    console.log('Result of database query for user:', user);

    if (!user) {
      console.log(
        'Password reset query failed. User not found or token expired/invalid.',
      );
      return NextResponse.json(
        { message: 'Password reset token is invalid or has expired.' },
        { status: 404 },
      );
    }

    console.log(`User found in DB. Expiration time: ${user.resetPasswordExpires}`);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log('Password successfully reset.');
    return NextResponse.json(
      { message: 'Password has been successfully reset.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in reset-password API:', error);
    if (error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { message: 'Password reset token has expired.' },
        { status: 400 },
      );
    }
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ message: 'Invalid token.' }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Server error. Please try again later.' },
      { status: 500 },
    );
  } finally {
    console.log('*** END RESET PASSWORD API LOGS ***');
  }
}
