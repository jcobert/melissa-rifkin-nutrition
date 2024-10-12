import { FC } from 'react'
import { FaEnvelope, FaFacebook, FaXTwitter } from 'react-icons/fa6'
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share'

import { cn } from '@/utils/style'

import PrintButton, {
  PrintHandler,
} from '@/components/common/buttons/print-button'

type Props = {
  url: string
  printHandler?: PrintHandler
  className?: string
  iconClassName?: string
}

const ShareBar: FC<Props> = ({
  url,
  printHandler,
  className,
  iconClassName,
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
