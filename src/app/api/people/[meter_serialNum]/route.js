import { NextResponse } from 'next/server';

import { getMongoClient } from '@/lib/mongodb';
import { spreadsheetFallback } from '@/data/fallbackReadings';

export async function GET(_request, context) {
  const { meter_serialNum } = await context.params;

  try {
    const client = await getMongoClient();
    let user = null;

    if (client) {
      const db = client.db('meter');
      user = await db.collection('readings').findOne({ meter_serialNum });
    } else {
      user = spreadsheetFallback.find(
        (entry) => entry.meter_serialNum === meter_serialNum,
      );
      console.warn(
        `MongoDB unavailable; using fallback data for meter ${meter_serialNum}`,
      );
    }

    if (user) {
      return NextResponse.json({ status: 200, data: user }, { status: 200 });
    }

    return NextResponse.json(
      { status: 404, message: 'Serial not found' },
      { status: 404 },
    );
  } catch (error) {
    console.error('people/[meter_serialNum] error', error);
    return NextResponse.json(
      { status: 500, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
