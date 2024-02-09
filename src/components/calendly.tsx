'use client'

import React, { FC } from 'react'
import { InlineWidget } from 'react-calendly'

import { calendlyDiscoveryUrl } from '@/configuration/site'

const Calendly: FC = () => {
  return (
    <InlineWidget
      url={calendlyDiscoveryUrl}
      pageSettings={{
        primaryColor: 'E46169',
        // backgroundColor: 'FAFBFF',
        hideEventTypeDetails: true,
        hideGdprBanner: true,
      }}
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
