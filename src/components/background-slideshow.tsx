import { sortBy } from 'lodash'
import { FC } from 'react'

type Props = {
  imagePaths: { path: string; order: number }[]
  duration?: number
}

const BackgroundSlideshow: FC<Props> = ({ imagePaths, duration = 7 }) => {
  const transition = 0

  const orderedImages = sortBy(imagePaths, (img) => img?.order)

  return (
    <div>
      <figure
        className='h-[calc(100vh-4rem)] w-full absolute top-16 left-0 bg-cover bg-center bg-no-repeat m-0 before:absolute before:block before:top-42 sm:before:top-16__ before:left-0 before:w-full before:h-[calc(100vh-4rem)] before:bg-[#0000006c] animate-fade opacity-0'
        style={{
          backgroundImage: `url(${orderedImages?.[0]?.path})`,
          animationDuration: '5s',
          zIndex: 9,
        }}
      />
      {orderedImages?.map((img) => (
        <figure
          key={img?.path}
          className='h-[calc(100vh-4rem)] w-full absolute top-16 left-0 bg-cover bg-center bg-no-repeat m-0 before:absolute before:block before:top-42 sm:before:top-16__ before:left-0 before:w-full before:h-[calc(100vh-4rem)] before:bg-[#0000006c] animate-slideshow'
          style={{
            backgroundImage: `url(${img?.path})`,
            animationDelay: `${(duration + transition) * img?.order}s`,
            animationDuration: `${duration * imagePaths?.length}s`,
            zIndex: 9 - img?.order,
          }}
        />
      ))}
    </div>
  )
}

export default BackgroundSlideshow
