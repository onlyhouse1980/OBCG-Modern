import { NextResponse } from 'next/server';

import { Members } from '../../../../data5';

export async function GET() {
  return NextResponse.json(Members, { status: 200 });
}
