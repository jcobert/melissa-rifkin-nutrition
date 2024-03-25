import { FC } from 'react'
import { FaEnvelope, FaFacebook, FaXTwitter } from 'react-icons/fa6'
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share'

import PrintButton, {
  PrintHandler,
} from '@/components/common/buttons/print-button'

type Props = {
  url: string
  printHandler?: PrintHandler
  iconClassName?: string
}

const ShareBar: FC<Props> = ({
  url,
  iconClassName = 'text-3xl sm:text-2xl text-brand-gray-dark hover:text-brand-dark transition',
  printHandler,
}) => {
  return (
    <div className='w-full flex gap-8 sm:gap-6 md:gap-4 items-center justify-evenly sm:justify-center md:justify-end print:hidden'>
      <FacebookShareButton url={url}>
        <FaFacebook className={iconClassName} />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <FaXTwitter className={iconClassName} />
      </TwitterShareButton>

      <EmailShareButton url={url}>
        <FaEnvelope className={iconClassName} />
      </EmailShareButton>

      {printHandler ? (
        <PrintButton onClick={printHandler} className='sm:ml-4' />
      ) : null}
    </div>
  )
}

export default ShareBar
