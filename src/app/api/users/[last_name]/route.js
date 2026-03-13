import { NextResponse } from 'next/server';

import { getMongoClient } from '@/lib/mongodb';
import { spreadsheetFallback } from '@/data/fallbackReadings';

export async function GET(_request, context) {
  const { last_name } = await context.params;

  try {
    const client = await getMongoClient();
    let user = null;

    if (client) {
      const db = client.db('meter');
      user = await db.collection('readings').findOne({ last_name });
    } else {
      user = spreadsheetFallback.find((entry) => entry.last_name === last_name);
      console.warn(
        `MongoDB unavailable; using fallback data for last name ${last_name}`,
      );
    }

    if (user) {
      return NextResponse.json({ status: 200, data: user }, { status: 200 });
    }

    return NextResponse.json(
      { status: 404, message: 'User not found' },
      { status: 404 },
    );
  } catch (error) {
    console.error('users/[last_name] error', error);
    return NextResponse.json(
      { status: 500, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
