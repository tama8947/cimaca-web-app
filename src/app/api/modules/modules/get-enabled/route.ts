import { State } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prismaInstance } from '../../../services/db/prisma';

const prisma = prismaInstance;

export async function GET (request: Request) {
  try {
    const data = await prisma.modules.findMany({
      where: {
        state: {
          equals: State.enabled
        }
      },
      select: { id: true, name: true, label: true, url: true, roles_modules_permissions: true }
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
