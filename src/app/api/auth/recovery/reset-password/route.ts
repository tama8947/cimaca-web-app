import bcrypt from 'bcrypt';
import { validateToken } from './functions/validations';
import { prismaInstance } from '@/app/api/services/db/prisma';

const prisma = prismaInstance;

type RequestData = { password: string }

export async function POST (request: Request) {
  const authorization = request.headers.get('Authorization');
  const onlyValidaton = request.headers.get('OnlyValidation');

  const { password }: RequestData = await request.json();
  if (onlyValidaton === 'true') {
    const { message, status } = await validateToken(authorization);

    return new Response(message, { status });
  }

  const { message, status, data } = await validateToken(authorization);

  if (status === 200) {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_OR_ROUNDS_PASS!)
    );

    await prisma.users.update({
      where : { email: data?.email ?? '' },
      data  : { password: hashedPassword }
    });

    return new Response('Contraseña Actualizada con éxito', { status: 200 });
  } else {
    return new Response(message, { status });
  }
}
