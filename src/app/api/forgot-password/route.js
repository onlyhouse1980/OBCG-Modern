import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

import { dbConnect } from '@/lib/dbConnect';
import WaterReading from '@/models/WaterReading';

const resend = new Resend(process.env.RESEND_API_KEY);
const JWT_SECRET = process.env.JWT_SECRET;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const APP_DOMAIN = process.env.YOUR_APP_DOMAIN;

export async function POST(request) {
  console.log('*** FORGOT PASSWORD API LOGS ***');
  console.log('API call received.');

  const body = await request.json();
  const { email } = body || {};

  if (!email) {
    return NextResponse.json(
      { message: 'Email address is required.' },
      { status: 400 },
    );
  }

  console.log('Attempting to connect to the database...');
  const connection = await dbConnect();
  if (!connection) {
    console.error('Database connection error: unavailable.');
    return NextResponse.json(
      { message: 'Database connection failed.' },
      { status: 503 },
    );
  }

  try {
    console.log(`Searching for user with email: ${email}`);
    const user = await WaterReading.findOne({ email });

    if (!user) {
      console.log(`User not found for email: ${email}`);
      return NextResponse.json(
        {
          message:
            'A password reset email has been sent if a user with that email exists.',
        },
        { status: 200 },
      );
    }

    console.log(`User found: ${user.email}`);

    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log('JWT token created.');

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;

    console.log('Attempting to save the user document with new token...');
    await user.save();
    console.log('User document successfully saved.');

    if (!APP_DOMAIN) {
      console.error('Error: YOUR_APP_DOMAIN is not defined in .env.local');
      return NextResponse.json(
        { message: 'Server configuration error.' },
        { status: 500 },
      );
    }

    const resetUrl = `${APP_DOMAIN}/reset-password?token=${resetToken}`;
    console.log(`Reset URL being sent: ${resetUrl}`);

    console.log('Attempting to send email with Resend...');
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: 'Password Reset Request',
      html: `
        <p>Hello ${user.last_name},</p>
        <p>You have requested a password reset. Please click the link below to reset your password:</p>
        <p><a href="${resetUrl}" style="color:#ffffff; background-color:#4F46E5; padding:12px 24px; border-radius:6px; text-decoration:none;">Reset Password</a></p>
        <p>This link is valid for one hour. If you did not request this, please ignore this email.</p>
      `,
    });
    console.log('Email sent successfully.');

    return NextResponse.json(
      {
        message:
          'A password reset email has been sent if a user with that email exists.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Caught an error in forgot-password API:', error);
    return NextResponse.json(
      { message: 'Server error. Please try again later.' },
      { status: 500 },
    );
  } finally {
    console.log('*** END FORGOT PASSWORD API LOGS ***');
  }
}
