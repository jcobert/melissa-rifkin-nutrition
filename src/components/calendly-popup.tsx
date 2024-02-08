'use client'

import React, { FC } from 'react'
import { PopupButton } from 'react-calendly'

import { calendlyDiscoveryUrl } from '@/configuration/site'

type Props = {
  //
}

const CalendlyPopup: FC<Props> = () => {
  //
  return (
    <PopupButton
      url={calendlyDiscoveryUrl}
      text='Schedule a Consultation'
      rootElement={document.body}
      className='btn w-fit !py-4 text-lg'
    />
  )
}

export default CalendlyPopup
