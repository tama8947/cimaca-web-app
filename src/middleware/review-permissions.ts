import { type JWT } from 'next-auth/jwt';
import { type ModuleType } from '@/global-types/permissions-types';

const allowedRoutes = ['login', 'dashboard'];

const validatePermission = (pathName: string, module: ModuleType) => {
  if (pathName.includes('create')) {
    return module.permissions.includes('create');
  }

  if (pathName.includes('update')) {
    return module.permissions.includes('create');
  } else return module.permissions.includes('read');
};

export const reviewPermissions = (pathName: string, session: JWT | null) => {
  const module = session?.role?.roles_modules_permissions.find((module) => pathName.includes(
    module?.module?.url as string));
  // console.log(session?.role?.roles_modules_permissions, pathName, module);

  if (allowedRoutes.some((route) => pathName.includes(route))) return true;

  if (module === undefined) return false;

  return validatePermission(pathName, module);
};
