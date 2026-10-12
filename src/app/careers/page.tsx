import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import CareersClient from './CareersClient'

export const metadata: Metadata = {
  title: 'Explore Career Options & Roadmaps After Class 12 | 12kebaad',
  description: 'Browse 360+ comprehensive career roadmaps across Science, Commerce, and Arts in India. Compare salaries, entrance exam requirements, required degrees, and top colleges.',
  alternates: {
    canonical: 'https://12kebaad.in/careers',
  },
  openGraph: {
    title: 'Explore Career Options & Roadmaps After Class 12 | 12kebaad',
    description: 'Detailed career roadmaps, salaries, eligibility, and top colleges after 12th.',
    url: 'https://12kebaad.in/careers',
    type: 'website',
  },
}

export default async function BrowseCareersPage() {
  const careers = await prisma.career.findMany({
    orderBy: { salaryRangeMax: 'desc' },
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Career Options & Roadmaps After Class 12",
    "description": "Comprehensive career directory with salary benchmarks, required entrance exams, and college pathways.",
    "url": "https://12kebaad.in/careers",
    "isPartOf": {
      "@type": "WebSite",
      "name": "12kebaad",
      "url": "https://12kebaad.in"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareersClient initialCareers={careers} />
    </>
  )
}
