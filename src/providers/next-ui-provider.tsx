'use client'

import { NextUIProvider as NextUI } from '@nextui-org/react'
import React, { FC, ReactNode } from 'react'

const NextUIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <NextUI>{children}</NextUI>
}

export default NextUIProvider
