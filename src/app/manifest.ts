import { MetadataRoute } from 'next'

const manifest = (): MetadataRoute.Manifest => ({
  name: 'Melissa Rifkin Nutrition',
  short_name: 'MRN',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
  background_color: '#FAFBFF',
  // theme_color: '#e46169',
  // display: 'standalone',
  categories: ['health', 'lifestyle', 'food', 'nutrition'],
})

export default manifest
