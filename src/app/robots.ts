import { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => {
  const BASE_URL = process.env.SITE_BASE_URL || ''

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}

export default robots
