import { NextResponse } from 'next/server';
import { prismaInstance } from '../../../services/db/prisma';
import { PaginationService } from '../../../services/pagination/pagination-service';

const prisma = prismaInstance;

export async function GET (request: Request) {
  const pagination = new PaginationService(request.url);

  if (!pagination.areCorrectPaginationParams()) {
    return NextResponse.json({ data: [] });
  }

  try {
    const [data, count] = await prisma.$transaction([
      prisma.roles.findMany({
        include: {
          roles_modules_permissions: {
            include: {
              module: true
            }
          }
        },
        ...pagination.getPaginationQuery()
      }),
      prisma.roles.count({ where: pagination.getWhere() as never })
    ]);
    return NextResponse.json({ data, totalRecords: count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
