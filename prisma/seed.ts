const { State } = require("@prisma/client");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "Usuario",
      last_name: "Administrador",
      email: "admin@admin.com",
      password: "$2a$10$mARD/qq0PY4YJwTG85HyZORkVISq7CZwT2Y3F/I1vU89UGnspnW62",
      role: "admin",
      state: State.enabled,
    },
  });
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
