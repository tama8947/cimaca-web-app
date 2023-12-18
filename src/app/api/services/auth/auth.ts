import { type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prismaInstance } from '../db/prisma';

export const thereIsSession = async (request: Request) => {
  const session = await getToken({
    req    : request as NextRequest,
    secret : process.env.NEXTAUTH_SECRET
  });
  return session;
};
type DataForPermission = {
  email: string
  module: string
  permission: string
}

export const hasPermission = async (dataPermission: DataForPermission, request: Request) => {
  const { email, module, permission } = dataPermission;
  const result = await prismaInstance.users.findUnique({
    where: {
      email
    },
    include: {
      role: {
        include: {
          roles_modules_permissions: {
            where: {
              module: {
                name: module
              },
              permissions: {
                hasSome: [permission]
              }
            }
          }
        }
      }
    }
  });

  return (result?.role?.roles_modules_permissions?.length ?? 0) > 0;
};
