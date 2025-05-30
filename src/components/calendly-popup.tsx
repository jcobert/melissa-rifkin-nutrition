'use client'

import React, { FC } from 'react'
import { PopupButton } from 'react-calendly'

import { cn } from '@/utils/style'

import { pageSettings } from '@/components/calendly'

import { calendlyDiscoveryUrl } from '@/configuration/site'

type Props = {
  className?: string
}

const CalendlyPopup: FC<Props> = ({ className = '' }) => {
  return (
    <PopupButton
      url={calendlyDiscoveryUrl}
      pageSettings={pageSettings}
      text='Schedule a Consultation'
      rootElement={
        typeof window !== 'undefined'
          ? document.body
          : (null as unknown as HTMLElement)
      }
      className={cn('btn w-fit', [className])}
    />
  )
}

export default CalendlyPopup
