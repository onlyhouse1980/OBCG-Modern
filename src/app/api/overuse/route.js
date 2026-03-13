import { NextResponse } from 'next/server';

import { LastNames } from '../../../../data1';

export async function GET() {
  return NextResponse.json(LastNames, { status: 200 });
}
