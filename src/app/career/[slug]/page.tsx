import { Metadata } from "next";
import { notFound } from "next/navigation";
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

  const canonicalUrl = `https://12kebaad.in/career/${career.slug || career.id}`;

  return {
    title: `${career.name} Roadmap & Career Guide after Class 12 | 12kebaad`,
    description: `Discover how to become a ${career.name} in India. Complete step-by-step roadmap from Class 12, top colleges, entrance exams, and salary guide for ${career.stream} students.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${career.name} - Career Roadmap | 12kebaad`,
      description: `How to become a ${career.name} in India after Class 12. Salary, roadmap, and top colleges.`,
      url: canonicalUrl,
      type: 'article',
    },
  };
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let career = await prisma.career.findUnique({
    where: { slug: slug },
    include: {
      skills: true,
      roadmaps: { orderBy: { stepNumber: 'asc' } },
    }
  }) || await prisma.career.findUnique({
    where: { id: slug },
    include: {
      skills: true,
      roadmaps: { orderBy: { stepNumber: 'asc' } },
    }
  });

  if (!career) {
    notFound();
  }

  // Find related careers
  const related = await prisma.career.findMany({
    where: {
      OR: [
        { stream: career.stream },
        { sector: career.sector }
      ],
      NOT: { id: career.id }
    },
    take: 4,
    select: {
      id: true,
      name: true,
      slug: true,
      stream: true,
      salaryRangeMin: true,
      salaryRangeMax: true,
    }
  });

  const canonicalUrl = `https://12kebaad.in/career/${career.slug || career.id}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Occupation",
        "@id": `${canonicalUrl}/#occupation`,
        "name": career.name,
        "description": career.description,
        "occupationalCategory": career.sector,
        "estimatedSalary": [
          {
            "@type": "MonetaryAmountDistribution",
            "name": "annual",
            "currency": "INR",
            "minValue": career.salaryRangeMin * 100000,
            "maxValue": career.salaryRangeMax * 100000
          }
        ],
        "qualifications": career.degreeRequired || "Bachelor's Degree",
        "skills": career.keySkills?.length ? career.keySkills.join(", ") : undefined
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://12kebaad.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Careers",
            "item": "https://12kebaad.in/careers"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": career.name,
            "item": canonicalUrl
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareerDetailClient initialCareer={{ ...career, related }} />
    </>
  );
}
