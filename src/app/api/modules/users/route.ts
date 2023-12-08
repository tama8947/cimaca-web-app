import { NextResponse } from 'next/server';
import { prismaInstance } from '../../services/db/prisma';
import { PaginationService } from '../../services/pagination/pagination-service';

const prisma = prismaInstance;

export async function GET (request: Request) {
  const pagination = new PaginationService(request.url);

  if (!pagination.areCorrectPaginationParams()) {
    return NextResponse.json({ data: [] });
  }

  try {
    await prisma.$connect();
    const [users, count] = await prisma.$transaction([
      prisma.users.findMany({
        include: {
          role: { include: { roles_modules_permissions: { include: { module: true } } } }
        },
        ...pagination.getPaginationQuery()
      }),
      prisma.users.count({ where: pagination.getWhere() as never })
    ]);
    return NextResponse.json({ data: users, totalRecords: count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
