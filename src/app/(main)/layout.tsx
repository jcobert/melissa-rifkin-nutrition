import { GoogleAnalytics } from '@next/third-parties/google'
import { ReactNode } from 'react'

import { GOOGLE_ANALYTICS_ID } from '@/configuration/google-analytics/env'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  )
}

export default Layout
