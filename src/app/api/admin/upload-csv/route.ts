import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parse } from 'csv-parse/sync';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session as any).user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type"); // "colleges" or "careers"

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const text = await file.text();
    const records = parse(text, { columns: true, skip_empty_lines: true, bom: true }) as any[];

    const errors: any[] = [];
    let count = 0;

    if (type === "colleges") {
      for (const [index, row] of records.entries()) {
        try {
          if (!row.name || !row.location) {
            errors.push({ row: index + 1, reason: "Missing name or location" });
            continue;
          }

          await prisma.college.upsert({
            where: { name: row.name },
            update: {
              location: row.location,
              state: row.state || row.location || 'Not Specified',
              address: row.address || null,
              fees: parseInt(row.fees) || 0,
              placements: parseInt(row.placements) || 0,
              cutoff: parseFloat(row.cutoff) || null,
              realityScore: parseInt(row.realityScore) || 5,
              pros: row.pros ? row.pros.split('|').map((p: string) => p.trim()) : [],
              cons: row.cons ? row.cons.split('|').map((c: string) => c.trim()) : [],
            },
            create: {
              name: row.name,
              location: row.location,
              state: row.state || row.location || 'Not Specified',
              address: row.address || null,
              fees: parseInt(row.fees) || 0,
              placements: parseInt(row.placements) || 0,
              cutoff: parseFloat(row.cutoff) || null,
              realityScore: parseInt(row.realityScore) || 5,
              pros: row.pros ? row.pros.split('|').map((p: string) => p.trim()) : [],
              cons: row.cons ? row.cons.split('|').map((c: string) => c.trim()) : [],
            }
          });
          count++;
        } catch (e: any) {
          errors.push({ row: index + 1, reason: e.message });
        }
      }
    } else if (type === "careers") {
      const wipe = formData.get("wipe") === "true";
      if (wipe) {
        await prisma.career.deleteMany({});
      }

      const validStreams = [
        "Science_PCM", "Science_PCB", "Science_PCM_PCB", 
        "Commerce", "Arts", "Any", "ITI", "Skilled", "Self_Employed"
      ];

      const validSectors = [
        "Technology", "Healthcare", "Finance", "Creative", "Education", 
        "Law", "Science", "Media", "Sports", "Agriculture", 
        "Engineering", "Travel", "Business", "Skilled Trades", "Government"
      ];

      for (const [index, row] of records.entries()) {
        try {
          if (!row.name || !row.stream) {
            errors.push({ row: index + 1, reason: "Missing name or stream" });
            continue;
          }

          // Standardize stream
          let stream = row.stream.trim();
          if (!validStreams.includes(stream)) {
            if (stream.toLowerCase().includes("pcm") && stream.toLowerCase().includes("pcb")) stream = "Science_PCM_PCB";
            else if (stream.toLowerCase().includes("pcm")) stream = "Science_PCM";
            else if (stream.toLowerCase().includes("pcb")) stream = "Science_PCB";
            else if (stream.toLowerCase().includes("science")) stream = "Science_PCM"; // Default
            else if (stream.toLowerCase().includes("commerce")) stream = "Commerce";
            else if (stream.toLowerCase().includes("arts") || stream.toLowerCase().includes("humanities")) stream = "Arts";
            else stream = "Any";
          }

          // Standardize sector
          let sector = row.sector || "Other";
          const matchedSector = validSectors.find(s => s.toLowerCase() === sector.toLowerCase());
          sector = matchedSector || "Other";

          const slug = row.slug || row.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

          await prisma.career.upsert({
            where: { name: row.name },
            update: {
              slug,
              stream,
              sector: row.sector || "Other",
              description: row.description || "",
              interestTags: row.interestTags ? row.interestTags.split(/[|,]/).map((s: string) => s.trim()) : [],
              salaryRangeMin: parseInt(row.salaryRangeMin) || 0,
              salaryRangeMax: parseInt(row.salaryRangeMax) || 0,
              difficulty: parseInt(row.difficulty) || 5,
              demand: parseInt(row.demand) || 5,
              growth: parseInt(row.growth) || 5,
              entryExam: row.entryExam || "None",
              degreeRequired: row.degreeRequired || "Bachelor's",
              topColleges: row.topColleges || "",
              keySkills: row.keySkills ? row.keySkills.split(/[|,]/).map((s: string) => s.trim()) : [],
              roadmapSteps: row.roadmapSteps ? row.roadmapSteps.split('|').map((s: string) => s.trim()) : [],
            },
            create: {
              name: row.name,
              slug,
              stream,
              sector: row.sector || "Other",
              description: row.description || "",
              interestTags: row.interestTags ? row.interestTags.split(/[|,]/).map((s: string) => s.trim()) : [],
              salaryRangeMin: parseInt(row.salaryRangeMin) || 0,
              salaryRangeMax: parseInt(row.salaryRangeMax) || 0,
              difficulty: parseInt(row.difficulty) || 5,
              demand: parseInt(row.demand) || 5,
              growth: parseInt(row.growth) || 5,
              entryExam: row.entryExam || "None",
              degreeRequired: row.degreeRequired || "Bachelor's",
              topColleges: row.topColleges || "",
              keySkills: row.keySkills ? row.keySkills.split(/[|,]/).map((s: string) => s.trim()) : [],
              roadmapSteps: row.roadmapSteps ? row.roadmapSteps.split('|').map((s: string) => s.trim()) : [],
            }
          });
          count++;
        } catch (e: any) {
          errors.push({ row: index + 1, reason: e.message });
        }
      }
    }

    return NextResponse.json({ success: true, count, errors });

  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
