import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://12kebaad.in'

  // Fetch dynamic IDs
  const colleges = await prisma.college.findMany({ select: { id: true } })
  const careers = await prisma.career.findMany({ select: { id: true, slug: true } })
  const entranceTests = await prisma.entranceTest.findMany({ select: { id: true } })

  const mainRoutes = [
    '',
    '/quiz-intro',
    '/careers',
    '/about',
    '/terms',
    '/privacy',
    '/courses-after-12th',
    '/courses-after-12th-science',
    '/courses-after-12th-commerce',
    '/courses-after-12th-arts',
    '/high-salary-courses-after-12th',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const collegeRoutes = colleges.map(c => ({
    url: `${baseUrl}/college/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const careerRoutes = careers.map(c => ({
    url: `${baseUrl}/career/${c.slug || c.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const testRoutes = entranceTests.map(t => ({
    url: `${baseUrl}/entrance-test/${t.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...mainRoutes,
    ...collegeRoutes,
    ...careerRoutes,
    ...testRoutes,
  ]
}
