import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET (_: Request) {
  try {
    const dailyIncomeCuts = await prisma.dailyIncomeCuts.findMany(
      {
        orderBy: {
          id: 'desc'
        },
        include: {
          category: true
        }
      }
    );
    return NextResponse.json({ data: dailyIncomeCuts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
