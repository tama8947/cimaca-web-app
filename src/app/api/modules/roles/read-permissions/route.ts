import { NextResponse } from 'next/server';
import { thereIsSession } from '../../../services/auth/auth';
import { prismaInstance } from '../../../services/db/prisma';

const prisma = prismaInstance;

export async function GET (request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email') as string;

  const session = await thereIsSession(request);

  if (session?.name === undefined) return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized' });

  const userWithModulesAndPermissions = await prisma.users.findUnique({
    where: {
      email
    },
    include: {
      role: {
        include: {
          roles_modules_permissions: {
            include: {
              module: true
            },
            where: {
              permissions: {
                has: 'read'
              }
            }
          }
        }
      }
    }
  });

  return NextResponse.json(userWithModulesAndPermissions?.role?.roles_modules_permissions);
}
