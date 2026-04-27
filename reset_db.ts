import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function resetData() {
  console.log("Wiping old data...");
  try {
    await prisma.quizResult.deleteMany({});
    await prisma.quizSession.deleteMany({});
    await prisma.recommendationLog.deleteMany({});
    await prisma.careerSkill.deleteMany({});
    await prisma.roadmap.deleteMany({});
    await prisma.career.deleteMany({});
    await prisma.userPreference.deleteMany({});
    console.log("Wipe complete.");
  } catch (error) {
    console.error("Wipe failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetData();
