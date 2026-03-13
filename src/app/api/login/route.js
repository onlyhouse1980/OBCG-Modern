import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { dbConnect } from '@/lib/dbConnect';
import WaterReading from '@/models/WaterReading';

export async function POST(request) {
  console.log('*** LOGIN API LOGS ***');

  const connection = await dbConnect();
  if (!connection) {
    console.error('Database connection unavailable.');
    return NextResponse.json(
      { message: 'Database connection unavailable.' },
      { status: 503 },
    );
  }

  const body = await request.json();
  console.log('Received request body:', body);

  const { email, password } = body;

  if (!email || !password) {
    console.error('Validation failed: Missing required fields.');
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 },
    );
  }

  try {
    const user = await WaterReading.findOne({ email });

    if (!user) {
      console.log('Login failed: User not found.');
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      console.log('Login failed: Incorrect password.');
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Login successful for user:', user.email);
    return NextResponse.json(
      {
        message: 'Login successful!',
        user: {
          id: user._id,
          email: user.email,
          lastName: user.last_name,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { message: 'Server error during login.', error: error.message },
      { status: 500 },
    );
  } finally {
    console.log('*** END LOGIN API LOGS ***');
  }
}
