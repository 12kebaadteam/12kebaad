import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const privateDisallows = [
    '/admin',
    '/admin-login',
    '/api/',
    '/results',
    '/bookmarks',
    '/update-profile',
    '/onboarding',
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privateDisallows,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: privateDisallows,
      },
    ],
    sitemap: 'https://12kebaad.in/sitemap.xml',
  }
}
