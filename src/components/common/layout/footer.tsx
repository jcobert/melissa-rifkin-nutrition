import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React, { FC } from 'react'
import { FaEnvelope } from 'react-icons/fa6'
import { GENERAL_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { ContactInfo, General } from 'sanity-studio/types'

import { SocialLinks } from '@/components/social-links'

import { NavId, navItems } from '@/configuration/nav'
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

  const navLinks = navItems
    ?.flatMap((item) =>
      !item?.url && item?.menu?.links?.length ? item?.menu?.links : item,
    )
    ?.filter((link) => !(['mealPlans'] as NavId[])?.includes(link?.id))

  return (
    <div className='w-full bg-brand-gray-medium pb-safe mt-8 print:hidden'>
      <ul className='flex flex-col gap-2 md:gap-2 layout py-8 md:py-4'>
        {navLinks?.map((link) => (
          <li key={link?.id} className='max-md:py-2'>
            <Link
              href={link?.url}
              className='text-almost-white hover:text-brand-gray-light max-md:text-lg transition max-md:p-2'
            >
              {link?.name}
            </Link>
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className='h-px w-full border-b border-brand-gray-dark/25'
      />

      <div className='flex max-md:px-4 flex-col items-center py-8 mx-auto text-almost-white w-full md:layout md:py-2 md:flex-row gap-y-8 md:justify-between gap-x-8'>
        {/* Links */}
        {socialLinks || contactInfo ? (
          <SocialLinks
            socialLinks={socialLinks}
            // contactInfo={contactInfo}
            className='max-md:w-full max-md:justify-evenly md:gap-x-8'
            linkClassName='text-2xl md:text-xl text-almost-white hover:text-brand-gray-light'
          />
        ) : null}

        <div className='flex-grow'>
          {/* <CalendlyPopup className='md:text-sm md:px-2 border border-brand-gray-light/50' /> */}
          <a
            href={email ? `mailto:${email}` : '/contact'}
            className='btn sm:w-fit md:text-sm md:px-2 border border-brand-gray-light/50'
          >
            <FaEnvelope aria-hidden />
            <span>Email Us</span>
          </a>
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
