import { NextResponse } from 'next/server';

import { getMongoClient } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const client = await getMongoClient();

    if (!client) {
      return NextResponse.json(
        { message: 'Database unavailable; cannot update data.' },
        { status: 503 },
      );
    }

    const db = client.db('meter');
    const collection = db.collection('readings');

    const { data } = await request.json();

    if (!Array.isArray(data)) {
      return NextResponse.json({ message: 'Invalid data format' }, { status: 400 });
    }

    await collection.deleteMany({});
    if (data.length) {
      await collection.insertMany(data);
    }

    return NextResponse.json({ message: 'Data updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to update data:', error);
    return NextResponse.json({ message: 'Failed to update data' }, { status: 500 });
  }
}
