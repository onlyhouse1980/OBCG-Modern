import { NextResponse } from 'next/server';

import { people } from '../../../../data';

export async function GET() {
  return NextResponse.json(people, { status: 200 });
}
