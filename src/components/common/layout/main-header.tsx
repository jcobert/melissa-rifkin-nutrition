import React, { FC } from 'react'

import Header from '@/components/common/layout/header'
import Cart from '@/components/shop/cart'

const MainHeader: FC = async () => {
  return (
    <>
      <Header />
      <div className='sticky z-50 top-4 -mt-16 h-px flex justify-end layout'>
        <Cart />
      </div>
    </>
  )
}

export default MainHeader
