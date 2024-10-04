import {
  PortableTextComponentProps,
  PortableTextComponents,
  PortableTextMarkComponentProps,
} from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { ImQuotesLeft } from 'react-icons/im'
import { dataset, projectId } from 'sanity-studio/env'
import { BlockLink } from 'sanity-studio/types'
import { getBlockLinkAttributes } from 'sanity-studio/utils'

import PortableVideo from '@/components/common/portable/components/portable-video'

const builder = imageUrlBuilder({ projectId, dataset })

export const PortableImage = ({
  value,
  isInline,
}: PortableTextComponentProps<any>) => {
  const { width, height } = getImageDimensions(value)
  return (
    <Image
      src={builder
        .image(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url()}
      alt={value?.alt || ' '}
      width={width}
      height={height}
      loading='lazy'
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
      className='mx-auto max-w-[85vw] lg:max-w-md rounded'
    />
  )
}

export const PortableCode = ({ children }: PortableTextComponentProps<any>) => {
  return <code className='text-brand'>{children}</code>
}

export const PortableQuote = ({
  children,
}: PortableTextComponentProps<any>) => {
  return (
    <div className='flex items-start gap-4'>
      <ImQuotesLeft className='text-brand-gray-medium' />
      <blockquote className='mb-0'>{children}</blockquote>
    </div>
  )
}

export const PortableDivider = ({
  children,
}: PortableTextMarkComponentProps<any>) => {
  return (
    <>
      <span>{children}</span>
      <hr className='w-full border-brand-gray-medium/50' />
    </>
  )
}

export const PortableLink = ({
  children,
  value,
}: PortableTextMarkComponentProps<BlockLink>) => {
  const { rel, target } = getBlockLinkAttributes(value)

  if (!value?.url) return <span>{children}</span>

  if (value?.external) {
    return (
      <a
        href={value?.url}
        rel={rel}
        target={target}
        className='inline-flex items-center gap-1__ w-fit__'
        aria-description='This is an external link.'
      >
        {children}
        <HiOutlineExternalLink />
      </a>
    )
  }
  return (
    <Link className='text-red-500' href={value?.url} rel={rel} target={target}>
      {children}
    </Link>
  )
}

// export const PortableReferenceLink = ({
//   children,
//   value,
//   ...props
// }: PortableTextMarkComponentProps<BlockLink>) => {
//   console.log(value, props)
// return props.
//   // return value?.url ? (
//   //   <Link href={value?.url} className='w-full border-brand-gray-medium/50'>
//   //     {children}
//   //   </Link>
//   // ) : (
//   //   <span>{children}</span>
//   // )
// }

export const portableComponents: PortableTextComponents = {
  types: {
    image: PortableImage,
    videoEmbed: PortableVideo,
  },
  block: {
    blockquote: PortableQuote,
  },
  marks: {
    divider: PortableDivider,
    link: PortableLink,
    // referenceLink: PortableReferenceLink,
  },
}
