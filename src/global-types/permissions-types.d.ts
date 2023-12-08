import { type PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const user = await prisma.users.findFirst({
  where: {
    email: credentials?.email
  },
  include: {
    role: {
      include: {
        roles_modules_permissions: {
          include: {
            module: true
          }
        }
      }
    }
  }
});
type UserWithRoleType = typeof user;
type RolesType = typeof user.role;
type ModuleType = typeof user.role.roles_modules_permissions[number];
