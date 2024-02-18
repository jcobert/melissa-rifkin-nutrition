import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import React, { FC } from 'react'
import { dataset, projectId } from 'sanity-studio/env'
import { Bio } from 'sanity-studio/types'

import { portableComponents } from '@/components/common/portable/portable-components'
import { SocialLink, SocialLinks, socialIcons } from '@/components/social-links'

const builder = imageUrlBuilder({ projectId, dataset })

type Props = {
  bio?: Bio
}

const FullBio: FC<Props> = ({ bio }) => {
  const { name, background, photo, contactInfo, socialLinks } = bio || {}

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
            <div className='flex items-center gap-6 md:gap-4'>
              {socialLinks ? <SocialLinks socialLinks={socialLinks} /> : null}
              {contactInfo?.email ? (
                <SocialLink
                  link={{
                    id: 'email',
                    name: 'Email',
                    url: `mailto:${contactInfo?.email}`,
                    icon: socialIcons?.email,
                  }}
                  className='w-fit'
                />
              ) : null}
              {contactInfo?.phone ? (
                <SocialLink
                  link={{
                    id: 'phone',
                    name: 'Phone',
                    url: `tel:${contactInfo?.phone}`,
                    icon: socialIcons?.phone,
                  }}
                  className='w-fit'
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <div className='prose'>
        {background ? (
          <PortableText value={background} components={portableComponents} />
        ) : null}
      </div>
    </section>
  )
}

export default FullBio
