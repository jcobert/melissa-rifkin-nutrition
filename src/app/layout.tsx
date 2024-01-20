import { Metadata } from 'next'
import {
  Jost,
  Karla,
  Manrope,
  Quicksand,
  Raleway,
  Vazirmatn,
} from 'next/font/google'
import { ReactNode } from 'react'

import NextUIProvider from '@/providers/next-ui-provider'
import QueryProvider from '@/providers/query-provider'

import Footer from '@/components/common/layout/footer'
import Header from '@/components/common/layout/header'

import { siteConfig } from '@/configuration/site'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
}

const jost = Jost({ subsets: ['latin'], variable: '--font-jost' })
const karla = Karla({ subsets: ['latin'], variable: '--font-karla' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
})
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' })
const vazirmatn = Vazirmatn({
  subsets: ['latin'],
  variable: '--font-vazirmatn',
})

const fontVars = `${jost.variable} ${karla.variable} ${manrope.variable} ${quicksand.variable} ${raleway.variable} ${vazirmatn.variable}`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={fontVars}>
      <body>
        <QueryProvider>
          <NextUIProvider>
            <div className='flex-grow'>
              <Header />
              <div className='flex flex-col min-h-screen'>{children}</div>
              <Footer />
            </div>
          </NextUIProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
