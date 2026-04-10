import { College, CollegeCourse, Course } from '@prisma/client'

type CollegeWithCourses = College & {
  courses: (CollegeCourse & {
    course: Course
  })[]
}

export default function CollegeSchema({ college }: { college: CollegeWithCourses }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": college.name,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": college.state,
      "streetAddress": college.address || ""
    },
    "description": `Top college in ${college.state} offering various courses including ${college.courses.map(cc => cc.course.title).slice(0, 5).join(', ')}.`,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Courses Offered",
      "itemListElement": college.courses.map((cc, index) => ({
        "@type": "Course",
        "position": index + 1,
        "name": cc.course.title,
        "description": `${cc.course.title} course in the ${cc.course.stream} stream.`,
        "provider": {
          "@type": "EducationalOrganization",
          "name": college.name
        }
      }))
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
