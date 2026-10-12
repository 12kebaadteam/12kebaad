import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://12kebaad.in'

  // Fetch dynamic records
  const colleges = await prisma.college.findMany({ select: { id: true, createdAt: true } })
  const careers = await prisma.career.findMany({ select: { id: true, slug: true, createdAt: true } })
  const entranceTests = await prisma.entranceTest.findMany({ select: { id: true } })
  const courses = await prisma.course.findMany({ select: { id: true } })
  const professionalCourses = await prisma.professionalCourse.findMany({ select: { id: true } })

  // Only include genuine public educational content pages.
  // Excluded: /quiz-intro (app flow, not content), /search (utility), /form (auth page)
  const mainRoutes = [
    '',
    '/careers',
    '/colleges',
    '/courses',
    '/courses-after-12th',
    '/courses-after-12th-arts',
    '/courses-after-12th-commerce',
    '/courses-after-12th-science',
    '/high-salary-courses-after-12th',
    '/compare-careers',
    '/parents',
    '/about',
    '/terms',
    '/privacy',
  ]

  // Add directory pages only if they contain actual data
  if (entranceTests.length > 0) mainRoutes.push('/entrance-tests')
  if (professionalCourses.length > 0) mainRoutes.push('/professional-courses')

  const now = new Date()

  const staticEntries = mainRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === ''
      ? 1.0
      : (route === '/careers' || route === '/colleges' || route.startsWith('/courses-after-12th'))
        ? 0.9
        : 0.7,
  }))

  const careerRoutes = careers.map(c => ({
    url: `${baseUrl}/career/${c.slug || c.id}`,
    lastModified: c.createdAt || now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const collegeRoutes = colleges.map(c => ({
    url: `${baseUrl}/college/${c.id}`,
    lastModified: c.createdAt || now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const testRoutes = entranceTests.map(t => ({
    url: `${baseUrl}/entrance-test/${t.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const courseRoutes = courses.map(c => ({
    url: `${baseUrl}/course/${c.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const professionalCourseRoutes = professionalCourses.map(c => ({
    url: `${baseUrl}/professional-course/${c.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticEntries,
    ...careerRoutes,
    ...collegeRoutes,
    ...testRoutes,
    ...courseRoutes,
    ...professionalCourseRoutes,
  ]
}
