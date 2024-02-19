import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC, ReactNode } from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from 'react-icons/fa6'
import { GENERAL_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { General, SocialNetworks } from 'sanity-studio/types'

import CalendlyPopup from '@/components/calendly-popup'

import { siteConfig } from '@/configuration/site'

type FooterLink = {
  id: keyof typeof SocialNetworks
  name: SocialNetworks
  url: string
  icon: ReactNode
}

const socialIcons: {
  [key in keyof typeof SocialNetworks]: JSX.Element
} = {
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  pinterest: <FaPinterest />,
  twitter: <FaTwitter />,
}

const Footer: FC = async () => {
  const general = await loadQuery<SanityDocument<General>>(
    GENERAL_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  const socialLinks = general?.data?.socialLinks || {}

  const currentYear = new Date().getFullYear()
  const links: FooterLink[] = Object.keys(socialLinks)?.map(
    (key) =>
      ({
        id: key,
        name: SocialNetworks[key],
        url: socialLinks[key],
        icon: socialIcons[key],
      }) as FooterLink,
  )

  return (
    <div className='w-full bg-brand-gray-medium pb-safe mt-8'>
      <div className='flex flex-col items-center py-8 mx-auto text-almost-white max-w-layoutMax md:w-11/12 md:py-2 md:flex-row gap-y-6 md:justify-between gap-x-8'>
        {/* Links */}
        <div className='flex text-2xl md:text-xl gap-x-16 md:gap-x-10 flex-wrap'>
          {links?.map((link) => (
            <a
              key={link?.id}
              className='transition-all hover:text-theme-secondary'
              href={link?.url}
            >
              {link?.icon}
            </a>
          ))}
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
