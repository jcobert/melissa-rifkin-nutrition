import { FC } from 'react'

type Props = {
  imagePaths: string[]
}

const BackgroundSlideshow: FC<Props> = ({ imagePaths }) => {
  const duration = 10
  const transition = 0

  return (
    <div>
      {imagePaths?.map((img, i) => (
        <figure
          key={img}
          className='h-[calc(100vh-4rem)] w-full absolute top-16 left-0 bg-cover bg-center bg-no-repeat m-0 before:absolute before:block before:top-42 sm:before:top-16__ before:left-0 before:w-full before:h-[calc(100vh-4rem)] before:bg-[#0000006c] animate-slideshow'
          style={{
            backgroundImage: `url(${img})`,
            animationDelay: `${(duration + transition) * i}s`,
            animationDuration: `${duration * imagePaths?.length}s`,
            zIndex: 9 - i,
          }}
        />
      ))}
    </div>
  )
}

export default BackgroundSlideshow
