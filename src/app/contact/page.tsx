import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React, { FC } from 'react'
import { FaEnvelope } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'
import { GENERAL_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { General } from 'sanity-studio/types'

import PageLayout from '@/components/common/layout/page-layout'
import { SocialLinks } from '@/components/social-links'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'

export const metadata: Metadata = generatePageMeta({
  title: 'Contact Us',
  description:
    "We'd love to learn about you and your wellness goals! Contact us, so we can identify the right path forward for you.",
  url: canonicalUrl('/contact'),
})

const ContactPage: FC = async () => {
  const general = await loadQuery<SanityDocument<General>>(
    GENERAL_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  const socialLinks = general?.data?.socialLinks || {}
  const email = general?.data?.email
  // const phone = general?.data?.phone
  // const contactInfo: ContactInfo = { email, phone }

  return (
    <PageLayout heading='Contact Us'>
      <div className='flex flex-col items-center gap-8'>
        {/* <h2>Schedule a Consultation</h2> */}
        <p className='prose text-pretty'>
          We'd love to learn about you and your wellness goals! Schedule a quick
          call with us, so we can identify the right path forward for you.
        </p>
        <span
          aria-hidden
          className='h-px max-md:w-1/3 w-3/4 border-b mx-auto mb-2'
        />

        <div className='w-full sm:w-10/12 md:w-3/4 lg:w-1/2__ flex flex-col gap-16 max-sm:text-center__'>
          {/* <div className='flex flex-col gap-4'>
            <h2 className='text-lg font-medium text-brand-gray-dark text-balance'>
              Reach Out
            </h2>
            <SocialLinks
              contactInfo={contactInfo}
              // socialLinks={socialLinks}
              showText
              // linkClassName='!text-3xl'
              // className='justify-evenly'
              className='flex-col items-start gap-6 justify-evenly'
            />
          </div> */}

          <div className='flex max-sm:flex-col gap-4 sm:w-fit__'>
            <a
              href={email ? `mailto:${email}` : '/contact'}
              className='btn sm:w-fit__ flex-1'
            >
              <FaEnvelope aria-hidden />
              <span>Send an Email</span>
            </a>
            <Link
              href='/about/partnerships'
              className='btn-outline sm:w-fit__ flex-1'
            >
              <span>Explore a Partnership</span>
              <IoIosArrowForward aria-hidden />
            </Link>
          </div>

          <div className='flex flex-col gap-4'>
            <h2 className='text-lg font-medium text-brand-gray-dark text-balance'>
              Follow on Social Media
            </h2>
            <SocialLinks
              // contactInfo={contactInfo}
              socialLinks={socialLinks}
              // showText
              linkClassName='text-2xl md:text-3xl'
              className='max-sm:justify-evenly sm:!gap-16 flex-wrap'
              // className='flex-col items-start gap-6'
            />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default ContactPage
