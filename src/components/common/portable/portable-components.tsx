import {
  PortableTextComponentProps,
  PortableTextComponents,
} from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import { dataset, projectId } from 'sanity-studio/env'

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

export const portableComponents: PortableTextComponents = {
  types: {
    image: PortableImage,
  },
}
