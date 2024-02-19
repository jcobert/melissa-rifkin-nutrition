import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { dataset, projectId } from 'sanity-studio/env'
import { Bio } from 'sanity-studio/types'

import CalendlyPopup from '@/components/calendly-popup'
import { portableComponents } from '@/components/common/portable/portable-components'
import { SocialLinks } from '@/components/social-links'

const builder = imageUrlBuilder({ projectId, dataset })

type Props = {
  bio?: Bio
}

const FullBio: FC<Props> = ({ bio }) => {
  const { name, background, photo, contactInfo, socialLinks, _id } = bio || {}

  const isMelissa = _id === '97e84b85-0b3b-4a7d-bbb8-a53ff7fd3a93'

  return (
    <section className='flex flex-col gap-6'>
      <div className='flex gap-x-4 items-center md:items-end max-md:flex-col gap-y-4'>
        {photo ? (
          <Image
            src={builder
              .image(photo)
              .width(600)
              .height(600)
              .fit('crop')
              .crop('focalpoint')
              .focalPoint(photo?.hotspot?.x || 0, photo?.hotspot?.y || 0)
              .quality(80)
              .url()}
            alt={name || ''}
            width={600}
            height={600}
            className='object-cover object-center size-64 rounded-full outline outline-6 outline-brand-gray-light'
          />
        ) : null}
        <div className='flex flex-col max-md:items-center gap-y-2 md:pb-8'>
          <h3 className='text-balance font-semibold font-prata text-2xl md:text-3xl text-brand-blue-dark'>
            {name}
          </h3>
          {socialLinks || contactInfo ? (
            <SocialLinks socialLinks={socialLinks} contactInfo={contactInfo} />
          ) : null}
        </div>
      </div>

      <div className='prose'>
        {background ? (
          <PortableText value={background} components={portableComponents} />
        ) : null}
      </div>
      {isMelissa && (
        <div className='flex justify-around sm:items-center max-sm:flex-col gap-x-6 gap-y-8'>
          <CalendlyPopup className='max-sm:w-full' />
          <Link href='/about/partnerships' className='btn-outline'>
            <span>Explore a Partnership</span>
            <IoIosArrowForward aria-hidden />
          </Link>
        </div>
      )}
    </section>
  )
}

export default FullBio
