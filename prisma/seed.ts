import { State } from "@prisma/client";

const  { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {email: 'admin@gmail.com'  },
    update: {},
    create: {
      name: "Administrador",
      last_name: "",
      email: "admin@gmail.com",
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
