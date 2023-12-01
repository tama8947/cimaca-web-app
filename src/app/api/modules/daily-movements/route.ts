import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { PaginationService } from '../../services/pagination/pagination-service';

const prisma = new PrismaClient();

export async function GET (request: Request) {
  const pagination = new PaginationService(request.url);

  if (!pagination.areCorrectPaginationParams()) {
    return NextResponse.json({ data: [] });
  }

  try {
    await prisma.$connect();
    const [dailyIncomeCuts, count] = await prisma.$transaction([
      prisma.dailyIncomeCuts.findMany({
        include: {
          category: true
        },
        ...pagination.getPaginationQuery()
      }),
      prisma.dailyIncomeCuts.count({ where: pagination.getWhere() as never })
    ]);
    await prisma.$disconnect();
    return NextResponse.json({ data: dailyIncomeCuts, totalRecords: count });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return NextResponse.json({ message: 'Internal server error' });
  }
}
