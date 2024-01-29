'use client'

import React, { FC } from 'react'
import { InlineWidget } from 'react-calendly'

const Calendly: FC = () => {
  return (
    <InlineWidget
      url='https://calendly.com/josh-sl8/30min'
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
