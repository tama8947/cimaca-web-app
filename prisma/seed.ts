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

  const roleNormal = await prisma.roles.upsert({
    where  : { name: 'normalUser' },
    update : {},
    create : {
      name: 'normalUser'
    }
  });

  const moduleRecord = await prisma.modules.upsert({
    where  : { name: 'users' },
    update : {
      name  : 'users',
      label : 'Usuarios',
      icon  : 'pi pi-fw pi-id-card',
      url   : '/users'
    },
    create: {
      name  : 'users',
      label : 'Usuarios',
      icon  : 'pi pi-fw pi-id-card',
      url   : '/users'
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
        role_id: role.id, module_id: moduleRecord.id
      }
    },
    update : {},
    create : {
      role        : { connect: { id: role.id } },
      module      : { connect: { id: moduleRecord.id } },
      permissions : ['create', 'read', 'update']
    }
  });

  await prisma.rolesModulesPermissions.upsert({
    where: {
      role_id_module_id: {
        role_id: roleNormal.id, module_id: moduleRecord.id
      }
    },
    update: {
      role        : { connect: { id: roleNormal.id } },
      module      : { connect: { id: moduleRecord.id } },
      permissions : ['read']
    },
    create: {
      role        : { connect: { id: roleNormal.id } },
      module      : { connect: { id: moduleRecord.id } },
      permissions : ['read']
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
