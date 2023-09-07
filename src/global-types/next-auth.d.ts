import { type PrismaClient } from '@prisma/client';
import { type DefaultSession, type DefaultUser } from 'next-auth';
import { type DefaultJWT } from 'next-auth/jwt';

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

declare type UserType = UnwrapPromise<ReturnType<typeof PrismaClient['prototype']['user']['findFirst']>>;

declare module 'next-auth'{
  interface Session {
    user: UserType & DefaultSession
  }
  interface User extends UserType extends DefaultUser {
    role: string
  }
}

declare module 'next-auth/jwt'{
  interface JWT extends DefaultJWT {
    role: string
  }
}
