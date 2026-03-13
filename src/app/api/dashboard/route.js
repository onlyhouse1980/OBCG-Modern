import { NextResponse } from 'next/server';

import { dbConnect } from '@/lib/dbConnect';
import WaterReading from '@/models/WaterReading';
import { spreadsheetFallback } from '@/data/fallbackReadings';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const lastName = searchParams.get('lastName');

  const connection = await dbConnect();

  if (!lastName) {
    console.error('Dashboard API: Missing last name in query.');
    return NextResponse.json(
      {
        success: false,
        message: 'Last name is required to fetch dashboard data.',
      },
      { status: 400 },
    );
  }

  try {
    const searchRegex = new RegExp(`^${lastName}`, 'i');
    console.log('Dashboard API: Searching for last_name with regex:', searchRegex);

    if (!connection) {
      const fallbackMatches = spreadsheetFallback.filter((entry) =>
        searchRegex.test(entry.last_name),
      );
      console.warn(
        'Database unavailable; serving dashboard data from fallback dataset.',
      );
      return NextResponse.json(
        { success: true, data: fallbackMatches },
        { status: 200 },
      );
    }

    const readings = await WaterReading.find({ last_name: searchRegex });

    console.log(`Dashboard API: Found ${readings.length} documents.`);

    return NextResponse.json({ success: true, data: readings }, { status: 200 });
  } catch (error) {
    console.error('Error during dashboard data query:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Server error during data query.',
        error: error.message,
      },
      { status: 500 },
    );
  }
}
