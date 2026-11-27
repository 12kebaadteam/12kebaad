import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const prisma = new PrismaClient();

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(retries = 3, delay = 2000) {
  for (let i = 1; i <= retries; i++) {
    try {
      return await prisma.career.findMany({
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
    } catch (err) {
      console.warn(`Attempt ${i} failed. Retrying in ${delay}ms...`);
      if (i === retries) throw err;
      await sleep(delay);
    }
  }
}

async function verify() {
  console.log("==================================================");
  console.log("   Verifying Post-Update Database State           ");
  console.log("==================================================");

  // 1. Read Career.csv
  const csvContent = fs.readFileSync(path.resolve("./Career.csv"), "utf-8");
  const csvRecords = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  const csvMap = new Map();
  for (const r of csvRecords) {
    csvMap.set(r.id, r);
  }

  // 2. Fetch all database records
  const dbRecords = await fetchWithRetry(3, 2000);

  console.log(`CSV records count: ${csvRecords.length}`);
  console.log(`DB records count : ${dbRecords.length}`);

  if (csvRecords.length !== dbRecords.length) {
    throw new Error(`Record count mismatch! CSV: ${csvRecords.length}, DB: ${dbRecords.length}`);
  }

  let matchCount = 0;
  let mismatchCount = 0;
  const mismatches = [];

  for (const dbRow of dbRecords) {
    const csvRow = csvMap.get(dbRow.id);
    if (!csvRow) {
      mismatchCount++;
      mismatches.push({ type: "ID_NOT_FOUND_IN_CSV", id: dbRow.id, name: dbRow.name });
      continue;
    }

    if (dbRow.description !== csvRow.description) {
      mismatchCount++;
      mismatches.push({
        type: "DESCRIPTION_MISMATCH",
        id: dbRow.id,
        name: dbRow.name,
        dbDesc: dbRow.description,
        csvDesc: csvRow.description,
      });
    } else {
      matchCount++;
    }
  }

  console.log(`Matched descriptions: ${matchCount} / ${csvRecords.length}`);
  console.log(`Mismatched descriptions: ${mismatchCount}`);

  if (mismatchCount > 0) {
    console.error("Mismatches found:", mismatches);
    process.exit(1);
  } else {
    console.log("==================================================");
    console.log("VERIFICATION SUCCESS: 100% of descriptions match Career.csv perfectly!");
    console.log("==================================================");
  }
}

verify()
  .catch((err) => {
    console.error("Verification failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
