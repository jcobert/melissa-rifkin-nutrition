import { PortableTextComponentProps } from '@portabletext/react'
import { SanityKeyed, VideoEmbed } from 'sanity-studio/types'

import VideoPlayer from '@/components/common/video-player'

const PortableVideo = ({
  value,
}: PortableTextComponentProps<SanityKeyed<VideoEmbed>>) => {
  const { url } = value?.file?.asset || {}

  if (!url) return null
  return (
    <div className='h-[800px] max-h-[75dvh]'>
      <VideoPlayer url={url} />
    </div>
  )
}

export default PortableVideo
