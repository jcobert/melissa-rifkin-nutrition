import { FC } from 'react'
import { PreviewProps } from 'sanity'
import { VideoEmbed } from 'sanity-studio/types'

import VideoPlayer from '@/components/common/video-player'

type Props = PreviewProps & {
  file?: VideoEmbed['file']
}

const SanityVideoPreview: FC<Props> = (props) => {
  const { file, renderDefault } = props

  return (
    <div>
      {renderDefault(props)}
      <VideoPlayer url={file?.asset?.url} />
    </div>
  )
}

export default SanityVideoPreview
