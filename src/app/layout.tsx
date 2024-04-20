import { Metadata } from 'next'
import {
  Bellota,
  Jost,
  Karla,
  Manrope,
  Prata,
  Quicksand,
  Raleway,
  Vazirmatn,
} from 'next/font/google'
import { draftMode } from 'next/headers'
import { ReactNode } from 'react'

import NextUIProvider from '@/providers/next-ui-provider'
import QueryProvider from '@/providers/query-provider'

import Footer from '@/components/common/layout/footer'
import Header from '@/components/common/layout/header'
import VisualEditing from '@/components/sanity/visual-editing'

import { baseOpenGraph, baseTwitter } from '@/configuration/seo'
import { siteConfig } from '@/configuration/site'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  // title: {
  //   default: siteConfig.title,
  //   template: `%s | ${siteConfig.title}`,
  // },
  title: siteConfig?.title,
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-icon.png',
  },
  manifest: `/manifest.webmanifest`,
  openGraph: { ...baseOpenGraph },
  twitter: { ...baseTwitter },
}

// Sans-serif
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
// Serif
const prata = Prata({
  subsets: ['latin'],
  variable: '--font-prata',
  weight: '400',
})
const bellota = Bellota({
  subsets: ['latin'],
  variable: '--font-bellota',
  weight: ['300', '400', '700'],
})

const fontVars = `${jost.variable} ${karla.variable} ${manrope.variable} ${quicksand.variable} ${raleway.variable} ${vazirmatn.variable} ${prata.variable} ${bellota.variable}`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={fontVars}>
      <body>
        <QueryProvider>
          <NextUIProvider>
            <div className='flex-grow'>
              <Header />
              {/* Top margin added to offset the Cart element contained in the header. */}
              <div className='flex flex-col min-h-screen mt-16'>
                {children}
                {draftMode().isEnabled && <VisualEditing />}
              </div>
              <Footer />
            </div>
          </NextUIProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
