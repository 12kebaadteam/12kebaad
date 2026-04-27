import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding sample careers...");
  const sampleCareers = [
    {
      name: "Software Engineer",
      slug: "software-engineer",
      stream: "Science_PCM",
      sector: "Technology",
      description: "Design and build software applications and systems.",
      interestTags: ["Tech", "Business"],
      salaryRangeMin: 6,
      salaryRangeMax: 40,
      difficulty: 7,
      demand: 9,
      growth: 9,
      roadmapSteps: ["Class 12 PCM", "B.Tech CSE", "Internships", "Junior Dev Role"]
    },
    {
      name: "Data Scientist",
      slug: "data-scientist",
      stream: "Science_PCM",
      sector: "Technology",
      description: "Analyze complex data to help organizations make better decisions.",
      interestTags: ["Tech", "Science"],
      salaryRangeMin: 8,
      salaryRangeMax: 50,
      difficulty: 8,
      demand: 10,
      growth: 10,
      roadmapSteps: ["Class 12 PCM", "Degree in Math/Stats/CS", "Learn Python/R", "Data Internships"]
    },
    {
      name: "Digital Marketer",
      slug: "digital-marketer",
      stream: "Commerce",
      sector: "Media",
      description: "Promote products and services using digital channels.",
      interestTags: ["Creative", "Business"],
      salaryRangeMin: 4,
      salaryRangeMax: 25,
      difficulty: 5,
      demand: 8,
      growth: 8,
      roadmapSteps: ["Class 12", "Degree in Marketing/Business", "Digital Marketing Certs", "Agency Role"]
    },
    {
      name: "Graphic Designer",
      slug: "graphic-designer",
      stream: "Arts",
      sector: "Creative",
      description: "Create visual concepts to communicate ideas that inspire and captivate.",
      interestTags: ["Creative", "Media"],
      salaryRangeMin: 3,
      salaryRangeMax: 20,
      difficulty: 6,
      demand: 7,
      growth: 7,
      roadmapSteps: ["Class 12 Arts", "Design Degree (B.Des)", "Portfolio Building", "Freelance/Junior Role"]
    },
    {
      name: "Clinical Psychologist",
      slug: "clinical-psychologist",
      stream: "Arts",
      sector: "Healthcare",
      description: "Diagnose and treat mental, emotional, and behavioral disorders.",
      interestTags: ["Medical", "Education"],
      salaryRangeMin: 5,
      salaryRangeMax: 30,
      difficulty: 7,
      demand: 8,
      growth: 9,
      roadmapSteps: ["Class 12", "B.A./B.Sc. Psychology", "M.A. Clinical Psychology", "M.Phil Clinical Psychology"]
    },
    {
      name: "Chartered Accountant",
      slug: "chartered-accountant",
      stream: "Commerce",
      sector: "Finance",
      description: "Provide financial advice, audit accounts and provide trustworthy information about financial records.",
      interestTags: ["Business", "Law"],
      salaryRangeMin: 8,
      salaryRangeMax: 60,
      difficulty: 9,
      demand: 10,
      growth: 8,
      roadmapSteps: ["Class 12 Commerce", "CA Foundation", "Articleship", "CA Final"]
    }
  ];

  for (const career of sampleCareers) {
    await prisma.career.upsert({
      where: { name: career.name },
      update: career,
      create: career,
    });
  }
  console.log("Seeding complete.");
}

seed().catch(console.error).finally(() => prisma.$disconnect());
