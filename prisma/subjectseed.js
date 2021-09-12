const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const run = await prisma.subject.create({
    data: {
      name: "Math",
    },
  });
  console.log(run);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
