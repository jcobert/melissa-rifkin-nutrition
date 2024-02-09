'use client'

import React, { FC } from 'react'
import { InlineWidget } from 'react-calendly'
import { PageSettings } from 'react-calendly/typings/calendly'

import { calendlyDiscoveryUrl } from '@/configuration/site'

export const pageSettings: PageSettings = {
  primaryColor: 'E46169',
  // backgroundColor: 'FAFBFF',
  hideEventTypeDetails: true,
  hideGdprBanner: true,
}

const Calendly: FC = () => {
  return (
    <InlineWidget
      url={calendlyDiscoveryUrl}
      pageSettings={pageSettings}
      styles={{
        // height: '42rem',
        // height: '900px',
        width: '100%',
        height: '600px',
      }}
    />
  )
}

export default Calendly
