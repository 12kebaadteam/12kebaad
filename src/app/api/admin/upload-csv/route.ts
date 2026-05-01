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
    const records = parse(text, { 
      columns: (header) => header.map((col: string) => col.trim().toLowerCase()), 
      skip_empty_lines: true, 
      bom: true 
    }) as any[];

    const errors: any[] = [];
    let count = 0;

    if (type === "colleges") {
      for (const [index, row] of records.entries()) {
        try {
          if (!row.name || (!row.location && !row.state)) {
            errors.push({ row: index + 1, reason: "Missing 'name' or 'location'/'state' column" });
            continue;
          }

          const cleanNum = (str: any) => {
            if (!str) return 0;
            const parsed = parseInt(String(str).replace(/\D/g, ''), 10);
            return isNaN(parsed) ? 0 : parsed;
          };

          const location = row.location || row.state || 'Unknown';
          
          await prisma.college.upsert({
            where: { name: row.name },
            update: {
              location: location,
              state: row.state || location,
              address: row.address || null,
              fees: cleanNum(row.fees),
              placements: cleanNum(row.placements),
              cutoff: parseFloat(row.cutoff) || null,
              realityScore: cleanNum(row.realityscore) || 5,
              pros: row.pros ? row.pros.split('|').map((p: string) => p.trim()) : [],
              cons: row.cons ? row.cons.split('|').map((c: string) => c.trim()) : [],
            },
            create: {
              name: row.name,
              location: location,
              state: row.state || location,
              address: row.address || null,
              fees: cleanNum(row.fees),
              placements: cleanNum(row.placements),
              cutoff: parseFloat(row.cutoff) || null,
              realityScore: cleanNum(row.realityscore) || 5,
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

          const cleanNum = (str: any) => {
            if (!str) return 0;
            const parsed = parseInt(String(str).replace(/\D/g, ''), 10);
            return isNaN(parsed) ? 0 : parsed;
          };

          const slug = row.slug || row.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

          await prisma.career.upsert({
            where: { name: row.name },
            update: {
              slug,
              stream,
              sector: sector,
              description: row.description || "",
              interestTags: row.interesttags ? row.interesttags.split(/[|,]/).map((s: string) => s.trim()) : [],
              salaryRangeMin: cleanNum(row.salaryrangemin),
              salaryRangeMax: cleanNum(row.salaryrangemax),
              difficulty: cleanNum(row.difficulty) || 5,
              demand: cleanNum(row.demand) || 5,
              growth: cleanNum(row.growth) || 5,
              entryExam: row.entryexam || "None",
              degreeRequired: row.degreerequired || "Bachelor's",
              topColleges: row.topcolleges || "",
              keySkills: row.keyskills ? row.keyskills.split(/[|,]/).map((s: string) => s.trim()) : [],
              roadmapSteps: row.roadmapsteps ? row.roadmapsteps.split('|').map((s: string) => s.trim()) : [],
              avg_salary_lpa: parseFloat(row.avg_salary_lpa) || null,
              job_demand_trend: row.job_demand_trend || null,
              work_from_home_possible: row.work_from_home_possible || null,
              gender_diversity_index: parseFloat(row.gender_diversity_index) || null,
              state_specific_relevance: row.state_specific_relevance || null,
              certifications_recommended: row.certifications_recommended ? row.certifications_recommended.split(/[|,]/).map((s: string) => s.trim()) : [],
              career_cluster: row.career_cluster || null,
              years_to_first_job: cleanNum(row.years_to_first_job) || null,
              self_employment_possible: row.self_employment_possible || null,
              physical_demand: row.physical_demand || null,
            },
            create: {
              name: row.name,
              slug,
              stream,
              sector: sector,
              description: row.description || "",
              interestTags: row.interesttags ? row.interesttags.split(/[|,]/).map((s: string) => s.trim()) : [],
              salaryRangeMin: cleanNum(row.salaryrangemin),
              salaryRangeMax: cleanNum(row.salaryrangemax),
              difficulty: cleanNum(row.difficulty) || 5,
              demand: cleanNum(row.demand) || 5,
              growth: cleanNum(row.growth) || 5,
              entryExam: row.entryexam || "None",
              degreeRequired: row.degreerequired || "Bachelor's",
              topColleges: row.topcolleges || "",
              keySkills: row.keyskills ? row.keyskills.split(/[|,]/).map((s: string) => s.trim()) : [],
              roadmapSteps: row.roadmapsteps ? row.roadmapsteps.split('|').map((s: string) => s.trim()) : [],
              avg_salary_lpa: parseFloat(row.avg_salary_lpa) || null,
              job_demand_trend: row.job_demand_trend || null,
              work_from_home_possible: row.work_from_home_possible || null,
              gender_diversity_index: parseFloat(row.gender_diversity_index) || null,
              state_specific_relevance: row.state_specific_relevance || null,
              certifications_recommended: row.certifications_recommended ? row.certifications_recommended.split(/[|,]/).map((s: string) => s.trim()) : [],
              career_cluster: row.career_cluster || null,
              years_to_first_job: cleanNum(row.years_to_first_job) || null,
              self_employment_possible: row.self_employment_possible || null,
              physical_demand: row.physical_demand || null,
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
