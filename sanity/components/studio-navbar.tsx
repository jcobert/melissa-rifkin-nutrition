import Link from 'next/link'
import React, { FC } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { NavbarProps } from 'sanity'

import Logo from '@/components/common/logo'

export const Icon: FC = () => <Logo variant='small' />

const StudioNavBar: FC<NavbarProps> = (props) => {
  return (
    <div className='flex max-md:flex-col'>
      <Link
        className='max-md:hidden w-fit p-4 text-brand font-medium text-sm flex items-center gap-2 hover:text-brand/hover'
        href='/'
      >
        <FaArrowLeft />
        <span>Exit Studio</span>
      </Link>
      <div className='flex-auto'>{props?.renderDefault(props)}</div>
    </div>
  )
}

export default StudioNavBar
