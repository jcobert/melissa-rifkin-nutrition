import { FC } from 'react'
import {
  FaEnvelope,
  FaFacebook, // FaPinterest,
  FaXTwitter,
} from 'react-icons/fa6'
import {
  EmailShareButton,
  FacebookShareButton, // PinterestShareButton,
  TwitterShareButton,
} from 'react-share'
import { Image } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import PrintButton, {
  PrintHandler,
} from '@/components/common/buttons/print-button'

type Props = {
  url: string
  printHandler?: PrintHandler
  className?: string
  iconClassName?: string
  mainImage?: Image
}

const ShareBar: FC<Props> = ({
  url,
  printHandler,
  className,
  iconClassName,
  mainImage,
}) => {
  const iconStyle =
    'text-3xl sm:text-2xl text-brand-gray-dark hover:text-brand-dark transition'

  return (
    <div
      className={cn(
        'w-full flex gap-8 sm:gap-6 md:gap-4 items-center justify-evenly sm:justify-center md:justify-end print:hidden',
        className,
      )}
    >
      <FacebookShareButton url={url}>
        <FaFacebook className={cn(iconStyle, iconClassName)} />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <FaXTwitter className={cn(iconStyle, iconClassName)} />
      </TwitterShareButton>

      {/* {mainImage ? (
        <PinterestShareButton media={mainImage?.asset?.url} url={url}>
          <FaPinterest className={cn(iconStyle, iconClassName)} />
        </PinterestShareButton>
      ) : null} */}

      <EmailShareButton url={url}>
        <FaEnvelope className={cn(iconStyle, iconClassName)} />
      </EmailShareButton>

      {printHandler ? (
        <PrintButton onClick={printHandler} className='sm:ml-4' />
      ) : null}
    </div>
  )
}

export default ShareBar
