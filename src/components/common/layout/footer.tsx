import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import { GENERAL_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { ContactInfo, General } from 'sanity-studio/types'

import CalendlyPopup from '@/components/calendly-popup'
import { SocialLinks } from '@/components/social-links'

import { siteConfig } from '@/configuration/site'

const Footer: FC = async () => {
  const general = await loadQuery<SanityDocument<General>>(
    GENERAL_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  const socialLinks = general?.data?.socialLinks || {}
  const email = general?.data?.email
  const phone = general?.data?.phone
  const contactInfo: ContactInfo = { email, phone }

  const currentYear = new Date().getFullYear()

  return (
    <div className='w-full bg-brand-gray-medium pb-safe mt-8'>
      <div className='flex flex-col items-center py-8 mx-auto text-almost-white max-w-layoutMax md:w-11/12 md:py-2 md:flex-row gap-y-8 md:justify-between gap-x-8'>
        {/* Links */}
        <div className='flex gap-x-16 md:gap-x-10 flex-wrap'>
          {socialLinks || contactInfo ? (
            <SocialLinks
              socialLinks={socialLinks}
              contactInfo={contactInfo}
              className='flex gap-x-16 md:gap-x-10 flex-wrap'
              linkClassName='text-2xl md:text-xl text-almost-white hover:text-brand-gray-light'
            />
          ) : null}
        </div>
        <div className='flex-grow'>
          <CalendlyPopup className='md:text-sm md:px-2 border border-brand-gray-light/50' />
        </div>
        {/* Credit */}
        <div className='flex flex-col items-center md:flex-row gap-y-8 gap-x-8'>
          <div className='text-xs'>
            <p id='copyright' className='transition hover:text-theme-secondary'>
              {`© ${currentYear} ${siteConfig?.businessName}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
