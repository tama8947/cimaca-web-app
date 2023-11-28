import { type PrismaClient } from '@prisma/client';
import { type DefaultSession, type DefaultUser } from 'next-auth';
import { type DefaultJWT } from 'next-auth/jwt';

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

declare type UserType = UnwrapPromise<ReturnType<typeof PrismaClient['prototype']['users']['findFirst']>>;

declare module 'next-auth'{
  type Session = {
    user: UserType & DefaultSession
  }
  type User = {
    role: string
  } & UserType & DefaultUser
}

declare module 'next-auth/jwt'{
  type JWT = {
    role: string
  } & DefaultJWT
}
