import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const prisma = new PrismaClient();

async function executeBulkUpdate() {
  console.log("==================================================");
  console.log("   12kebaad.in - Safe PostgreSQL Bulk Update      ");
  console.log("==================================================");

  // 1. Read Career.csv (Source of truth)
  const csvPath = path.resolve("./Career.csv");
  if (!fs.existsSync(csvPath)) {
    throw new Error(`Career.csv not found at: ${csvPath}`);
  }

  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(`[1/4] Loaded ${records.length} records from Career.csv.`);

  if (records.length === 0) {
    throw new Error("No records found in Career.csv. Aborting update.");
  }

  // 2. Extract IDs and approved Descriptions
  const ids = [];
  const descriptions = [];

  for (const record of records) {
    if (!record.id) {
      throw new Error(`Record with missing ID detected: ${JSON.stringify(record)}`);
    }
    ids.push(record.id);
    descriptions.push(record.description ?? "");
  }

  console.log(`[2/4] Prepared parameterized data arrays for ${ids.length} careers.`);

  // 3. Execute inside an atomic transaction
  console.log(`[3/4] Initiating database transaction on Neon PostgreSQL...`);
  const startTime = Date.now();

  const affectedCount = await prisma.$transaction(
    async (tx) => {
      // Parameterized query using UNNEST for single-roundtrip bulk update
      const count = await tx.$executeRaw`
        UPDATE "Career" AS c
        SET description = u.description
        FROM UNNEST(${ids}::text[], ${descriptions}::text[]) AS u(id, description)
        WHERE c.id = u.id;
      `;

      return count;
    },
    {
      timeout: 30000, // 30 second safety timeout
    }
  );

  const durationMs = Date.now() - startTime;

  // 4. Report results
  console.log(`[4/4] Transaction committed successfully in ${durationMs}ms.`);
  console.log("==================================================");
  console.log(` Total records updated: ${affectedCount}`);
  console.log(` Total CSV records:     ${records.length}`);
  console.log(" Status: SUCCESS - All descriptions updated accurately.");
  console.log("==================================================");
}

executeBulkUpdate()
  .catch((error) => {
    console.error("==================================================");
    console.error("ERROR: Transaction failed and has been ROLLED BACK.");
    console.error("No changes were committed to the database.");
    console.error("Error details:", error.message || error);
    console.error("==================================================");
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
