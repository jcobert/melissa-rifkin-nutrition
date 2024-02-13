import { Metadata } from 'next'
import React, { FC } from 'react'

import Logo from '@/components/common/logo'

export const metadata: Metadata = {
  title: 'Not Found',
}

const NotFound: FC = () => {
  return (
    <main>
      <section>
        <div className='layout flex min-h-screen flex-col gap-2 items-center justify-center text-center text-black'>
          {/* <RiAlarmWarningFill
            size={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          /> */}
          <Logo variant='small' />
          <h1 className='mt-8 mb-2 text-4xl md:text-4xl font-prata text-brand-gray-dark'>
            Page Not Found
          </h1>
          <a href='/' className='text-brand hover:text-brand-dark transition'>
            Back to home
          </a>
        </div>
      </section>
    </main>
  )
}

export default NotFound
