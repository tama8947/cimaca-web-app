import { NextResponse } from 'next/server';
import { hasPermission, thereIsSession } from '@/app/api/services/auth/auth';
import { prismaInstance } from '@/app/api/services/db/prisma';

const prisma = prismaInstance;

export async function GET (request: Request) {
  const session = await thereIsSession(request);

  if (session?.name === undefined) { return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized' }); }
  const isAllowed = await hasPermission({ email: session?.email as string, module: 'modules', permission: 'create' }, request);

  if (!isAllowed) { return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized' }); }

  const id = new URL(request.url).searchParams.get('id') as string;
  const data = await prisma.modules.findUnique({ where: { id } });

  return NextResponse.json(data);
}
