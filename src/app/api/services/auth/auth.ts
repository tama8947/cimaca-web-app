import { type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const thereIsSession = async (request: Request) => {
  const session = await getToken({
    req    : request as NextRequest,
    secret : process.env.NEXTAUTH_SECRET
  });
  return session;
};
