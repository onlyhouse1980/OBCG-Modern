import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { dbConnect } from '@/lib/dbConnect';
import WaterReading from '@/models/WaterReading';

export async function POST(request) {
  const connection = await dbConnect();
  if (!connection) {
    console.error('Database connection unavailable.');
    return NextResponse.json(
      { success: false, message: 'Database connection unavailable.' },
      { status: 503 },
    );
  }

  const body = await request.json();
  console.log('Received request body:', body);

  const { email, password, lastName } = body;

  if (!email || !lastName || !password) {
    console.error('Validation failed: Missing required fields.');
    return NextResponse.json(
      {
        success: false,
        message: 'Email, last name, and password are required',
      },
      { status: 400 },
    );
  }

  try {
    const existingUser = await WaterReading.findOne({ email });
    if (existingUser) {
      console.log('Signup failed: Email already exists.');
      return NextResponse.json(
        {
          success: false,
          message: 'Email already exists. Please login instead.',
        },
        { status: 409 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await WaterReading.create({
      email,
      password: hashedPassword,
      last_name: lastName,
    });

    console.log('New user created successfully:', newUser);

    return NextResponse.json(
      {
        success: true,
        message: 'User created and logged in successfully!',
        user: {
          id: newUser._id,
          email: newUser.email,
          lastName: newUser.last_name,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error during user creation:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Server error during user creation.',
        error: error.message,
      },
      { status: 500 },
    );
  }
}
