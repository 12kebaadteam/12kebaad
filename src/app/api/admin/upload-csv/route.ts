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
      for (const [index, row] of records.entries()) {
        try {
          if (!row.name || !row.stream) {
            errors.push({ row: index + 1, reason: "Missing name or stream" });
            continue;
          }

          await prisma.career.upsert({
            where: { name: row.name },
            update: {
              stream: row.stream,
              description: row.description || "",
              salaryRangeMin: parseInt(row.salaryRangeMin) || 0,
              salaryRangeMax: parseInt(row.salaryRangeMax) || 0,
              difficulty: parseInt(row.difficulty) || 5,
              demand: parseInt(row.demand) || 5,
              growth: parseInt(row.growth) || 5,
            },
            create: {
              name: row.name,
              stream: row.stream,
              description: row.description || "",
              salaryRangeMin: parseInt(row.salaryRangeMin) || 0,
              salaryRangeMax: parseInt(row.salaryRangeMax) || 0,
              difficulty: parseInt(row.difficulty) || 5,
              demand: parseInt(row.demand) || 5,
              growth: parseInt(row.growth) || 5,
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
