import { type NextRequest, NextResponse } from 'next/server';
import { hasPermission, thereIsSession } from '@/app/api/services/auth/auth';
import { prismaInstance } from '@/app/api/services/db/prisma';

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '1mb'
//     }
//   }
// };

export async function POST (request: NextRequest) {
  const data = await request.json();

  const session = await thereIsSession(request);

  if (session?.name === undefined) { return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized' }); }
  const isAllowed = await hasPermission({ email: session?.email ?? '', module: 'modules', permission: 'create' }, request);

  if (!isAllowed) { return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized' }); }

  const resultRequest = await prismaInstance.modules.create({
    data
  });

  return NextResponse.json(resultRequest);
}
