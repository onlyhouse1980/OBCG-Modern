import { NextResponse } from 'next/server';

import { LastNames } from '../../../../../data1';

export async function GET(_request, context) {
  const { last_name } = await context.params;
  const match = LastNames.find((entry) => entry.last_name === last_name);

  if (match) {
    return NextResponse.json(match, { status: 200 });
  }

  return NextResponse.json(
    { message: `User with last_name: ${last_name} not found.` },
    { status: 404 },
  );
}
