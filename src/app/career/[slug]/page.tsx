import { Metadata } from "next";
import prisma from "@/lib/prisma";
import CareerDetailClient from "./CareerDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const career = await prisma.career.findUnique({
    where: { slug: slug }
  }) || await prisma.career.findUnique({
    where: { id: slug }
  });

  if (!career) return { title: "Career Not Found | 12kebaad" };

  return {
    title: `${career.name} Roadmap & Career Guide after Class 12 | 12kebaad`,
    description: `Discover how to become a ${career.name} in India. Complete step-by-step roadmap from Class 12, top colleges, entrance exams, and salary guide for ${career.stream} students.`,
  };
}

export default function CareerDetailPage() {
  return <CareerDetailClient />;
}
