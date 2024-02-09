'use client'

import React, { FC } from 'react'
import { InstagramEmbed, InstagramEmbedProps } from 'react-social-media-embed'

type Props = {
  //
} & Partial<InstagramEmbedProps>

const Instagram: FC<Props> = () => {
  //
  return (
    <InstagramEmbed
      url='https://www.instagram.com/confessionofadietitian/?utm_source=ig_embed&amp;utm_campaign=loading'
      // placeholderProps={{ linkText: 'View on Instagram' }}
      // width={400}
    />
  )
}

export default Instagram
