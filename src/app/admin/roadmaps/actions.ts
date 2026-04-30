"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addRoadmapStage(careerId: string, stepNumber: number, title: string, description: string, timelineStage: string) {
  await prisma.roadmap.create({
    data: {
      careerId,
      stepNumber,
      title,
      description,
      timelineStage,
    }
  });
  revalidatePath('/admin/roadmaps');
}

export async function updateRoadmapStage(id: string, stepNumber: number, title: string, timelineStage: string) {
  await prisma.roadmap.update({
    where: { id },
    data: {
      stepNumber,
      title,
      timelineStage,
    }
  });
  revalidatePath('/admin/roadmaps');
}

export async function deleteRoadmapStage(id: string) {
  await prisma.roadmap.delete({
    where: { id }
  });
  revalidatePath('/admin/roadmaps');
}
