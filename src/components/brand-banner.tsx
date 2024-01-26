'use client'

import bazaar from 'public/images/organizations/bazaar-200.png'
import cosmo from 'public/images/organizations/cosmo-200.png'
import glamour from 'public/images/organizations/glamour-200.png'
import health from 'public/images/organizations/health-200.png'
import nbc from 'public/images/organizations/nbc-200.png'
import reuters from 'public/images/organizations/reuters-200.png'
import usnwr from 'public/images/organizations/usnwr-200.png'
import wsj from 'public/images/organizations/wsj-200.png'
import React, { FC } from 'react'

const brands = [
  { img: bazaar, name: 'Bazaar' },
  { img: cosmo, name: 'Cosmopolitan' },
  { img: glamour, name: 'Glamour' },
  { img: health, name: 'Health' },
  { img: nbc, name: 'NBC News' },
  { img: reuters, name: 'Reuters' },
  { img: usnwr, name: 'U.S. News & World Report' },
  { img: wsj, name: 'Wall Street Journal' },
]

type Props = {
  //
}

const BrandBanner: FC<Props> = () => {
  return (
    <div className='gap-4 items-center grid grid-flow-col sm:grid-rows-1 max-sm:grid-rows-2 px-4 rounded'>
      {brands?.map((brand) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={brand?.img?.src}
          src={brand?.img?.src}
          alt={brand?.name}
          className='rounded-full'
        />
      ))}
    </div>
  )
}
export default BrandBanner
