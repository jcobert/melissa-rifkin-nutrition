'use client'

import { FC, useEffect, useState } from 'react'
// import { TbMovieOff } from 'react-icons/tb'
import ReactPlayer, { FilePlayerProps } from 'react-player/file'

// import Logo from '@/components/common/logo'

type Props = FilePlayerProps & {
  //
}

// const Fallback = (
//   <div className='flex flex-col gap-1 items-center absolute top-0'>
//     <TbMovieOff className='text-2xl' />
//     <Logo variant='small' />
//     <p>This video cannot be played.</p>
//   </div>
// )

const VideoPlayer: FC<Props> = (props) => {
  // Prevents hydration errors
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  // const [isReady, setIsReady] = useState(false)
  // const [isError, setIsError] = useState(false)

  if (!isClient) return <></>

  return (
    <>
      {/* {!isError && Fallback} */}
      <ReactPlayer
        width='100%'
        height='100%'
        controls
        // onReady={() => setIsReady(true)}
        // onError={() => setIsError(true)}
        // style={{ display: isError ? 'none' : '' }}
        {...props}
      />
    </>
  )
}

export default VideoPlayer
