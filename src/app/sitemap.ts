import { MetadataRoute } from 'next'
import prisma from '../../lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://12kebaad.in'

  // Fetch dynamic IDs for all resources
  const colleges = await prisma.college.findMany({ select: { id: true } })
  const courses = await prisma.course.findMany({ select: { id: true } })
  const profCourses = await prisma.professionalCourse.findMany({ select: { id: true } })
  const entranceTests = await prisma.entranceTest.findMany({ select: { id: true } })

  const mainRoutes = [
    '',
    '/courses',
    '/colleges',
    '/form',
    '/about',
    '/courses-after-12th',
    '/courses-after-12th-science',
    '/courses-after-12th-commerce',
    '/courses-after-12th-arts',
    '/high-salary-courses-after-12th',
    '/entrance-tests',
    '/professional-courses',
    '/recommendations',
    '/questions',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const collegeRoutes = colleges.map(c => ({
    url: `${baseUrl}/college/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const courseRoutes = courses.map(c => ({
    url: `${baseUrl}/course/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const profCourseRoutes = profCourses.map(c => ({
    url: `${baseUrl}/professional-course/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const testRoutes = entranceTests.map(t => ({
    url: `${baseUrl}/entrance-test/${t.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...mainRoutes,
    ...collegeRoutes,
    ...courseRoutes,
    ...profCourseRoutes,
    ...testRoutes,
  ]
}
