import { NextResponse } from 'next/server';

import { Members } from '../../../../../data5';

export async function GET(_request, context) {
  const { last_name } = await context.params;
  const match = Members.find((member) => member.last_name === last_name);

  if (match) {
    return NextResponse.json(match, { status: 200 });
  }

  return NextResponse.json(
    { message: `User with last_name: ${last_name} not found.` },
    { status: 404 },
  );
}
