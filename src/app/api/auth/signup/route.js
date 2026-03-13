import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';
import WaterReading from '@/models/WaterReading';

export async function POST(request) {
  const connection = await dbConnect();
  if (!connection) {
    return NextResponse.json(
      { message: 'Database unavailable; cannot create user.' },
      { status: 503 },
    );
  }

  const { lastName, password } = await request.json();

  if (!lastName || !password) {
    return NextResponse.json(
      { message: 'Last name and password are required' },
      { status: 400 },
    );
  }

  try {
    const waterReadings = await WaterReading.find({ last_name: lastName });

    if (waterReadings.length === 0) {
      return NextResponse.json(
        { message: 'No existing customer found with that last name' },
        { status: 404 },
      );
    }

    const existingUser = await User.findOne({ username: lastName });
    if (existingUser) {
      return NextResponse.json(
        { message: 'A user with this last name already exists' },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: lastName,
      password: hashedPassword,
      readingIds: waterReadings.map((reading) => reading._id),
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          _id: newUser._id,
          username: newUser.username,
          readingIds: newUser.readingIds,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 },
    );
  }
}
