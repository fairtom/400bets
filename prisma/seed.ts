import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.prediction.deleteMany();
  await prisma.match.deleteMany();
  await prisma.team.deleteMany();
  await prisma.tournament.deleteMany();
  await prisma.user.deleteMany();

  const tournament = await prisma.tournament.create({
    data: {
      name: "World Cup 2026",
      slug: "world-cup-2026",
      year: 2026,
    },
  });

  const france = await prisma.team.create({
    data: {
      name: "France",
      code: "FRA",
      tournamentId: tournament.id,
    },
  });

  const brazil = await prisma.team.create({
    data: {
      name: "Brazil",
      code: "BRA",
      tournamentId: tournament.id,
    },
  });

  const argentina = await prisma.team.create({
    data: {
      name: "Argentina",
      code: "ARG",
      tournamentId: tournament.id,
    },
  });

  const germany = await prisma.team.create({
    data: {
      name: "Germany",
      code: "GER",
      tournamentId: tournament.id,
    },
  });

  await prisma.match.createMany({
    data: [
      {
        tournamentId: tournament.id,
        homeTeamId: france.id,
        awayTeamId: brazil.id,
        kickoffAt: new Date("2026-06-12T19:00:00Z"),
        status: "SCHEDULED",
      },
      {
        tournamentId: tournament.id,
        homeTeamId: argentina.id,
        awayTeamId: germany.id,
        kickoffAt: new Date("2026-06-13T19:00:00Z"),
        status: "SCHEDULED",
      },
    ],
  });

  await prisma.user.create({
    data: {
      username: "demo",
      passwordHash: "demo-password-hash",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });