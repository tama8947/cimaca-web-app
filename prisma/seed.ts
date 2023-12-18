/* eslint-disable @typescript-eslint/no-var-requires */
// import { PrismaClient, State } from '@prisma/client';
const { State, PrismaClient } = require('@prisma/client');
//
const prisma = new PrismaClient();

async function main () {
  const role = await prisma.roles.upsert({
    where  : { name: 'admin' },
    update : {},
    create : {
      name: 'admin'
    }
  });

  await prisma.roles.upsert({
    where  : { name: 'normalUser' },
    update : {},
    create : {
      name: 'normalUser'
    }
  });

  const moduleUsers = await prisma.modules.upsert({
    where  : { name: 'users' },
    update : {
      name  : 'users',
      label : 'Usuarios',
      icon  : 'pi pi-fw pi-users',
      url   : '/users'
    },
    create: {
      name  : 'users',
      label : 'Usuarios',
      icon  : 'pi pi-fw pi-users',
      url   : '/users'
    }
  });

  const moduleRoles = await prisma.modules.upsert({
    where  : { name: 'roles' },
    update : {
      name  : 'roles',
      label : 'Roles',
      icon  : 'pi pi-fw pi-id-card',
      url   : '/roles'
    },
    create: {
      name  : 'roles',
      label : 'Roles',
      icon  : 'pi pi-fw pi-id-card',
      url   : '/roles'
    }
  });

  const moduleModules = await prisma.modules.upsert({
    where  : { name: 'modules' },
    update : {
      name  : 'modules',
      label : 'Modules',
      icon  : 'pi pi-fw pi-th-large',
      url   : '/modules'
    },
    create: {
      name  : 'modules',
      label : 'Modules',
      icon  : 'pi pi-fw pi-th-large',
      url   : '/modules'
    }
  });

  const permissions = await prisma.references.findMany({
    where: {
      OR: [{ range_value: 'create' },
        { range_value: 'read' },
        { range_value: 'update' }]
    }
  });

  type Refs = { range_value: string }

  if (!permissions.some((p: Refs) => p.range_value === 'create')) {
    await prisma.references.create({
      data: {
        domain      : 'DOM_PERMISSIONS',
        range_value : 'create',
        state       : State.enabled
      }
    });
  }

  if (!permissions.some((p: Refs) => p.range_value === 'read')) {
    await prisma.references.create({
      data: {
        domain      : 'DOM_PERMISSIONS',
        range_value : 'read',
        state       : State.enabled
      }
    });
  }

  if (!permissions.some((p: Refs) => p.range_value === 'read')) {
    await prisma.references.create({
      data: {
        domain      : 'DOM_PERMISSIONS',
        range_value : 'update',
        state       : State.enabled
      }
    });
  }

  // console.log(role);
  await prisma.rolesModulesPermissions.upsert({
    where: {
      role_id_module_id: {
        role_id: role.id, module_id: moduleUsers.id
      }
    },
    update : {},
    create : {
      role        : { connect: { id: role.id } },
      module      : { connect: { id: moduleUsers.id } },
      permissions : ['create', 'read', 'update']
    }
  });

  await prisma.rolesModulesPermissions.upsert({
    where: {
      role_id_module_id: {
        role_id: role.id, module_id: moduleRoles.id
      }
    },
    update : {},
    create : {
      role        : { connect: { id: role.id } },
      module      : { connect: { id: moduleRoles.id } },
      permissions : ['create', 'read', 'update']
    }
  });

  await prisma.rolesModulesPermissions.upsert({
    where: {
      role_id_module_id: {
        role_id: role.id, module_id: moduleModules.id
      }
    },
    update : {},
    create : {
      role        : { connect: { id: role.id } },
      module      : { connect: { id: moduleModules.id } },
      permissions : ['create', 'read', 'update']
    }
  });

  await prisma.users.upsert({
    where  : { email: 'admin@admin.com' },
    update : {
      role: { connect: { id: role.id } }
    },
    create: {
      name      : 'Usuario Dummy',
      last_name : 'Dummy Alejandro the Admin',
      email     : 'admin@admin.com',
      password  : '$2a$10$mARD/qq0PY4YJwTG85HyZORkVISq7CZwT2Y3F/I1vU89UGnspnW62',
      state     : State.enabled
    }
  });

  // await prisma.modules.upset;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
