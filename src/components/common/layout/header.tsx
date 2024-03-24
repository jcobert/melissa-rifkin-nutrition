import React, { FC } from 'react'

import HeaderNav from '@/components/common/layout/header-nav'
import Cart from '@/components/shop/cart'

const Header: FC = async () => {
  return (
    <>
      <HeaderNav />
      <div className='sticky z-50 top-4 -mt-16 h-px flex justify-end layout print:hidden'>
        <Cart />
      </div>
    </>
  )
}

export default Header
